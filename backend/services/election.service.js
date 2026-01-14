import DataModel from "../models/Data.model.js";

export const getElectionInfoByQuery = async (query) => {
  const regex = new RegExp(query, "i"); // case-insensitive

  const records = await DataModel.find({
    $or: [
      { district: regex },
      { assembly: regex },
      { constituency: regex }
    ]
  }).limit(50);

  console.log(records, ">>>>>>>>>>>>>>>");
  
  if (!records.length) return null;

  return {
    totalRecords: records.length,
    records
  };
};
