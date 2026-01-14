import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import path from "path";

import uploadRoutes from "./routes/upload.routes.js";
import dataRoutes from "./routes/data.routes.js";
import electionRoutes from "./routes/election.routes.js";


dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
  debug: false
});

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api", uploadRoutes);
app.use("/api", dataRoutes);
app.use("/api/election", electionRoutes);

export default app;
