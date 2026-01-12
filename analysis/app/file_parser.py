import pandas as pd
import os

def parse_file(file_path: str):
    ext = os.path.splitext(file_path)[1].lower()

    if ext == ".csv":
        return pd.read_csv(file_path)

    if ext == ".json":
        return pd.read_json(file_path)

    if ext in [".xlsx", ".xls"]:
        return pd.read_excel(file_path, engine="openpyxl")

    raise ValueError(f"Unsupported file format: {ext}")
