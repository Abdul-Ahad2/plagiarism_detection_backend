import {
  clearReportContentById,
  fetchUserReports,
} from "../service/report.service.js";

export async function clearReportContent(req, res) {
  try {
    const userId = req.user._id;
    const reportId = req.params.reportId;

    const updatedReport = await clearReportContentById(reportId, userId);

    if (!updatedReport) {
      return res
        .status(404)
        .json({ message: "Report not found or you do not have permission." });
    }

    return res
      .status(200)
      .json({ message: "Content and matched text cleared successfully." });
  } catch (err) {
    console.error("[reportController.clearReportContent] Error:", err);
    return res
      .status(500)
      .json({ message: "Failed to clear report content.", error: err.message });
  }
}

export async function getUserReports(req, res) {
  try {
    const userId = req.user._id; // string, set by verifyJwt

    const reports = await fetchUserReports(userId);

    return res.status(200).json({
      message: "Reports fetched successfully",
      reports: reports,
    });
  } catch (err) {
    console.error("[reportController.getUserReports] Error:", err);
    return res
      .status(500)
      .json({ message: "Failed to fetch reports", error: err.message });
  }
}
