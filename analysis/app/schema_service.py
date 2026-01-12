def generate_schema(df):
    schema = {}
    for col, dtype in df.dtypes.items():
        schema[col] = str(dtype)
    return schema

def validate_columns(df, required_cols):
    missing = set(required_cols) - set(df.columns)
    if missing:
        raise ValueError(f"Missing columns: {missing}")