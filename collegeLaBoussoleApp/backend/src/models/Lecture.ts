import mongoose, { Schema, Document, Types } from "mongoose";

export interface ILecture extends Document {
  _id: Types.ObjectId;
  name: string;
  classId: Types.ObjectId;
  teacherId: Types.ObjectId;
  day: "lundi" | "mardi" | "mercredi" | "jeudi" | "vendredi" | "samedi";
  startTime: string;
  endTime: string;
  createdAt: Date;
  updatedAt: Date;
}

const LectureSchema = new Schema<ILecture>(
  {
    name: { type: String, required: true, trim: true },
    classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    day: {
      type: String,
      enum: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
      required: true,
    },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<ILecture>("Lecture", LectureSchema);
