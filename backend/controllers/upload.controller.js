import { validateFiles } from "../services/fileValidation.service.js";
import { sendToPythonService } from "../services/pythonApi.service.js";
import SchemaModel from "../models/Schema.model.js";
import DataModel from "../models/Data.model.js";

export const uploadFiles = async (req, res) => {
  try {
    validateFiles(req.files);

    const pythonResult = await sendToPythonService(req.files[0]);

 // 1. Store Schema
    const savedSchema = await SchemaModel.create({
      fields: pythonResult.generated_schema
    });

    // 2. Map data to include the schema ID (Optional but recommended for linking)
    const dataWithRef = pythonResult.data.map(row => ({
      ...row,
      schemaId: savedSchema._id // Links this row to the specific upload/schema
    }));

    await DataModel.insertMany(dataWithRef);

    res.status(200).json({
      success: true,
      schema: pythonResult?.generated_schema,
      data: pythonResult?.data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
