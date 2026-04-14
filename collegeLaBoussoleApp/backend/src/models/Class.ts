import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClass extends Document {
  _id: Types.ObjectId;
  name: string;
  yearId: Types.ObjectId;
  teacherId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ClassSchema = new Schema<IClass>(
  {
    name: { type: String, required: true, trim: true },
    yearId: { type: Schema.Types.ObjectId, ref: "Year", required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

ClassSchema.index({ name: 1, yearId: 1 }, { unique: true });

export default mongoose.model<IClass>("Class", ClassSchema);
