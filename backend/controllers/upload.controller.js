import { validateFiles } from "../services/fileValidation.service.js";
import { sendToPythonService } from "../services/pythonApi.service.js";
import SchemaModel from "../models/Schema.model.js";
import DataModel from "../models/Data.model.js";

export const uploadFiles = async (req, res) => {
  try {
    console.log(req.files,'request');
    
    validateFiles(req.files);

    const pythonResult = await sendToPythonService(req.files[0]);

    await SchemaModel.create({
      fields: pythonResult.generated_schema
    });

    await DataModel.insertMany(pythonResult.data);

    res.status(200).json({
      success: true,
      schema: pythonResult.generated_schema
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
