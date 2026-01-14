import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    district: String,
    assembly: String,
    constituency: String,
    booth_no: Number,
    candidate: String,
    party: String,
    votes: Number
});

export default mongoose.model("Data", DataSchema);
