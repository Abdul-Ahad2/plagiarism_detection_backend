import express from "express";
import { verifyJwt } from "../middleware/jwt.middleware.js";
import {
  clearReportContent,
  getUserReports,
} from "../controllers/report.controller.js";

const router = express.Router();

router.get("/get-reports", verifyJwt, getUserReports);
router.delete("/:reportId/clear-content", verifyJwt, clearReportContent);

export default router;
