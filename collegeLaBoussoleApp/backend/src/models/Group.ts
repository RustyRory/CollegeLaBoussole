import mongoose, { Schema, Document, Types } from "mongoose";

export interface IGroup extends Document {
  _id: Types.ObjectId;
  name: string;
  type: "class" | "staff" | "parents" | "year" | "custom" | "other";
  classId?: Types.ObjectId;
  yearId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const GroupSchema = new Schema<IGroup>(
  {
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["class", "staff", "parents", "year", "custom", "other"],
      required: true,
    },
    classId: { type: Schema.Types.ObjectId, ref: "Class", default: null },
    yearId: { type: Schema.Types.ObjectId, ref: "Year", default: null },
  },
  { timestamps: true },
);

export default mongoose.model<IGroup>("Group", GroupSchema);
