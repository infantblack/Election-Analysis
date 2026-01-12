import logging
import os
import sys
import tempfile
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.file_parser import parse_file
from app.schema_service import generate_schema
from app.models import SchemaResponse

load_dotenv()

# ---------------- LOGGING ----------------
# Use a simpler StreamHandler to avoid fileno encoding issues on Windows
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler("app_execution.log", encoding="utf-8")
    ]
)
logger = logging.getLogger("ElectionProcessor")

app = FastAPI(title="Election Data Processor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/process", response_model=SchemaResponse)
async def process_file(files: UploadFile = File(...)): # Changed 'file' to 'files' to match your React append
    logger.info(f"Received file upload: {files.filename}")

    content = await files.read()
    file_size = len(content)
    logger.info(f"File content read. Size: {file_size} bytes")

    if file_size == 0:
        logger.warning(f"Rejecting empty file: {files.filename}")
        raise HTTPException(status_code=400, detail="Empty file received")

    # ... rest of your logic ...
    ext = os.path.splitext(files.filename)[1].lower()
    
    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as temp:
        temp.write(content)
        temp_path = temp.name

    try:
        df = parse_file(temp_path)
        generated_schema = generate_schema(df)
        
        logger.info(f"Successfully processed {files.filename}")
        return {
            "generated_schema": generated_schema,
            "data": df.to_dict(orient="records")
        }
    except Exception as e:
        logger.error(f"Processing failed: {str(e)}", exc_info=True)
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)