from pydantic import BaseModel
from typing import Dict, List, Any

class SchemaResponse(BaseModel):
    schema: Dict[str, str]
    data: List[Any]
