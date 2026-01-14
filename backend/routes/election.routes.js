import express from "express";
import { searchElectionInfo } from "../controllers/election.controller.js";

const router = express.Router();

router.get("/search", searchElectionInfo);

export default router;
