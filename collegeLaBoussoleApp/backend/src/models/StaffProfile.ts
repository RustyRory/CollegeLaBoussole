import mongoose, { Schema, Document, Types } from "mongoose";

export interface IStaffProfile extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  role: "admin" | "owner" | "teacher" | "other";
  createdAt: Date;
  updatedAt: Date;
}

const StaffProfileSchema = new Schema<IStaffProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "owner", "teacher", "other"],
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IStaffProfile>(
  "StaffProfile",
  StaffProfileSchema,
);
