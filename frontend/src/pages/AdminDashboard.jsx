import "./AdminDashboard.scss"; // This imports the code above
import FileUpload from "../components/FileUpload";
import SchemaViewer from "../components/SchemaViewer";
import { useState } from "react";

export default function AdminDashboard() {
  const [schema, setSchema] = useState(null);

  return (
    <div className="admin-layout">
      {/* Apply the comet-container class here */}
      <div className="comet-container left-panel">
        <FileUpload onSchemaGenerated={setSchema} />
      </div>

      <div className="right-panel">
        <SchemaViewer schema={schema} />
      </div>
    </div>
  );
}