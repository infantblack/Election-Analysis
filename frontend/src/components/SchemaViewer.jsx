export default function SchemaViewer({ schema }) {
  return (
    <>
      <h3>Generated Schema</h3>
      <pre>{schema ? JSON.stringify(schema, null, 2) : "No schema yet"}</pre>
    </>
  );
}
