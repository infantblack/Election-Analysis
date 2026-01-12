from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import os

from file_parser import parse_file
from schema_service import generate_schema
from models import SchemaResponse

from dotenv import load_dotenv
import os

load_dotenv()

MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE", 2097152))
ALLOWED_TYPES = os.getenv("ALLOWED_FILE_TYPES").split(",")
REQUIRED_COLUMNS = os.getenv("REQUIRED_COLUMNS").split(",")


app = FastAPI(title="Election Data Processor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/process", response_model=SchemaResponse)
async def process_file(file: UploadFile = File(...)):
    if file.size and file.size > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File too large")
    
    if not any(file.filename.endswith(ext) for ext in ALLOWED_TYPES):
        raise HTTPException(status_code=400, detail="Invalid file type")

    suffix = os.path.splitext(file.filename)[1]

    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp:
        content = await file.read()
        temp.write(content)
        temp_path = temp.name

    try:
        df = parse_file(temp_path)
        schema = generate_schema(df)
        data = df.to_dict(orient="records")
        return {"schema": schema, "data": data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        os.remove(temp_path)
