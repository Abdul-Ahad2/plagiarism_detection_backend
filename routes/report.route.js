import express from "express";
import { verifyJwt } from "../middleware/jwt.middleware.js";
import {
  clearReportContent,
  getUserReports,
  getPlagiarisedReport,
} from "../controllers/report.controller.js";

const router = express.Router();

router.get("/get-reports", verifyJwt, getUserReports);
router.get("/plagiarized-report/:id", verifyJwt, getPlagiarisedReport); // Alias for get-reports
router.delete("/:reportId/clear-content", verifyJwt, clearReportContent);

export default router;
