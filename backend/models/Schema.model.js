import mongoose from "mongoose";

const SchemaSchema = new mongoose.Schema({
  fields: Object,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Schema", SchemaSchema);
