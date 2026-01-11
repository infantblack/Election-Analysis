const { validateFiles } = require("../services/fileValidation.service");
const { runPython } = require("../services/python.service");
const Schema = require("../models/Schema");
const Data = require("../models/Data");

exports.upload = async (req, res) => {
  try {
    validateFiles(req.files);

    const result = await runPython(req.files[0].path);

    await Schema.create({ fields: result.schema });
    await Data.insertMany(result.data);

    res.json({ schema: result.schema });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
