import reportModel from "../models/report.model.js";

export async function clearReportContentById(reportId, userId) {
  const updated = await reportModel
    .findOneAndUpdate(
      { _id: reportId, user_id: userId },
      {
        $set: {
          content: "",
        },
        $unset: {
          "plagiarism_data.$[].matched_text": "",
        },
      },
      { new: true }
    )
    .exec();

  return updated;
}

export async function fetchUserReports(userId) {
  const rawReports = await reportModel
    .find({ user_id: userId })
    .select(
      "name date similarity word_count time_spent flagged plagiarism_data.source_url -_id"
    )
    .sort({ date: -1 })
    .lean()
    .exec();

  const processed = rawReports.map((r) => {
    const allUrls = Array.isArray(r.plagiarism_data)
      ? r.plagiarism_data.map((entry) => entry.source_url)
      : [];

    const uniqueUrls = [
      ...new Set(allUrls.filter((u) => typeof u === "string")),
    ];

    return {
      name: r.name,
      date: r.date,
      similarity: r.similarity,
      word_count: r.word_count,
      time_spent: r.time_spent,
      flagged: r.flagged,
      sources: uniqueUrls,
    };
  });

  return processed;
}

export async function fetchPlagiarisedReport(id) {
  const rawReport = await reportModel.find({ _id: id });

  return rawReport;
}
