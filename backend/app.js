const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const uploadRoutes = require("./routes/upload.routes");
const dataRoutes = require("./routes/data.routes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/tn_elections");

app.use("/api", uploadRoutes);
app.use("/api", dataRoutes);

module.exports = app;
