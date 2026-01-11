const mongoose = require("mongoose");

module.exports = mongoose.model("Data", new mongoose.Schema({
  districtId: String,
  assemblyId: String,
  party: String,
  votes: Number,
  voteShare: Number
}));
