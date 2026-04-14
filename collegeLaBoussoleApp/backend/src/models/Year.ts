import mongoose, { Schema, Document, Types } from "mongoose";

export interface IYear extends Document {
  _id: Types.ObjectId;
  name: string;
  startDate: Date;
  endDate: Date;
  status: "active" | "archived" | "future";
  createdAt: Date;
  updatedAt: Date;
}

const YearSchema = new Schema<IYear>(
  {
    name: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["active", "archived", "future"],
      required: true,
      default: "future",
    },
  },
  { timestamps: true },
);

export default mongoose.model<IYear>("Year", YearSchema);
