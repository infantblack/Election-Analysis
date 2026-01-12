import sys
import pandas as pd
import json

file_path = sys.argv[1]

if file_path.endswith(".csv"):
    df = pd.read_csv(file_path)
elif file_path.endswith(".json"):
    df = pd.read_json(file_path)
else:
    raise Exception("Unsupported file")

generated_schema = {col: str(dtype) for col, dtype in df.dtypes.items()}
data = df.to_dict(orient="records")

print(json.dumps({
    "generated_schema": generated_schema,
    "data": data
}))
