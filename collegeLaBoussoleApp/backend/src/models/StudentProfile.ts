import mongoose, { Schema, Document, Types } from "mongoose";

export interface IStudentProfile extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  firstName: string;
  lastName: string;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const StudentProfileSchema = new Schema<IStudentProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    birthDate: { type: Date, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IStudentProfile>(
  "StudentProfile",
  StudentProfileSchema,
);
