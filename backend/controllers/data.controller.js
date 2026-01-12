import DataModel from "../models/Data.model.js";

export const getChartData = async (req, res) => {
  const { district, assembly } = req.query;

  const query = {};
  if (district) query.districtId = district;
  if (assembly) query.assemblyId = assembly;

  const data = await DataModel.find(query);

  res.json(data);
};
