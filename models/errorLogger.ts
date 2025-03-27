import mongoose, { Schema, model, models } from "mongoose";

const errorLogSchema = new Schema(
  {
    message: { type: String, required: true },
    stack: { type: String },
    route: { type: String },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const ErrorLog = models.ErrorLog || model("ErrorLog", errorLogSchema);

export default ErrorLog;