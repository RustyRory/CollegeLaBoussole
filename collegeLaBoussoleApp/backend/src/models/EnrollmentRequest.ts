import mongoose, { Schema, Document, Types } from "mongoose";

export interface IEnrollmentRequest extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  birthDate: Date;
  parentEmail: string;
  requestedYearId: Types.ObjectId;
  status: "pending" | "approved" | "rejected";
  classId?: Types.ObjectId;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnrollmentRequestSchema = new Schema<IEnrollmentRequest>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    birthDate: { type: Date, required: true },
    parentEmail: { type: String, required: true, trim: true, lowercase: true },
    requestedYearId: {
      type: Schema.Types.ObjectId,
      ref: "Year",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    classId: { type: Schema.Types.ObjectId, ref: "Class", default: null },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model<IEnrollmentRequest>(
  "EnrollmentRequest",
  EnrollmentRequestSchema,
);
