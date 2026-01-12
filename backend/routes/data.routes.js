import { Router } from "express";
import { getChartData } from "../controllers/data.controller.js";

const router = Router();

router.get("/data", getChartData);

export default router;
