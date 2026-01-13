import logging
import os
import sys
import tempfile
import shutil
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path

from app.file_parser import parse_file
from app.schema_service import generate_schema
from app.models import SchemaResponse

# Load config
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)
MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE", 2 * 1024 * 1024))

# Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("ElectionProcessor")

app = FastAPI(title="Election Data Processor")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.post("/process", response_model=SchemaResponse)
async def process_file(file: UploadFile = File(...)):
    # 1. Validation (Fast check before processing)
    if file.size and file.size > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large")
    
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in [".xlsx", ".csv", ".json"]:
        raise HTTPException(status_code=400, detail="Unsupported file format")

    # 2. Optimized File Handling: Stream directly to disk
    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as temp:
        try:
            shutil.copyfileobj(file.file, temp)
            temp_path = temp.name
        finally:
            file.file.close()

    try:
        # 3. Efficient Parsing
        df = parse_file(temp_path)

        if df.empty:
            raise ValueError("The uploaded file contains no data.")

        # Header Correction & Optimization
        # Using iloc and dropping in-place to save memory
        df.columns = df.iloc[0]
        df = df.drop(df.index[0]).reset_index(drop=True)
        
        # Convert types to most efficient formats (e.g., strings to categories or ints)
        df = df.convert_dtypes()

        # 4. Generate Schema & Response
        result = {
            "generated_schema": generate_schema(df),
            "data": df.to_dict(orient="records")
        }
        
        return result

    except Exception as e:
        logger.error(f"Processing failed for {file.filename}: {str(e)}")
        raise HTTPException(status_code=422, detail=str(e))
    
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)