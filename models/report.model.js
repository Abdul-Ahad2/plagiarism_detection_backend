// models/Report.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const PlagiarismDataSchema = new Schema({
  matched_text: { type: String },
  similarity: { type: Number },
  source_type: { type: String },
  source_title: { type: String },
  source_url: { type: String },
});

const ReportSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    similarity: {
      type: Number,
      required: true,
    },
    sources: [
      {
        type: String,
      },
    ],
    word_count: {
      type: Number,
      required: true,
    },
    time_spent: {
      type: String,
    },
    flagged: {
      type: Boolean,
      default: false,
    },
    plagiarism_data: [PlagiarismDataSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Report", ReportSchema);
