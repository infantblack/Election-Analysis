def generate_schema(df):
    data_schema = {}
    for col, dtype in df.dtypes.items():
        data_schema[col] = str(dtype)
    return data_schema

def validate_columns(df, required_cols):
    missing = set(required_cols) - set(df.columns)
    if missing:
        raise ValueError(f"Missing columns: {missing}")