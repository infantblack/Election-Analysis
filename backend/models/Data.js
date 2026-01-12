import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
  districtId: String,
  assemblyId: String,
  party: String,
  votes: Number,
  voteShare: Number
});

export default mongoose.model("Data", DataSchema);
