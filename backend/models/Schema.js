const mongoose = require("mongoose");

module.exports = mongoose.model("Schema", new mongoose.Schema({
  fields: Object,
  createdAt: { type: Date, default: Date.now }
}));
