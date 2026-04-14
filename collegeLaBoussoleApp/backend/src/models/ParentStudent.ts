import mongoose, { Schema, Document, Types } from "mongoose";

export interface IParentStudent extends Document {
  _id: Types.ObjectId;
  parentId: Types.ObjectId;
  studentId: Types.ObjectId;
}

const ParentStudentSchema = new Schema<IParentStudent>({
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "ParentProfile",
    required: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "StudentProfile",
    required: true,
  },
});

ParentStudentSchema.index({ parentId: 1, studentId: 1 }, { unique: true });

export default mongoose.model<IParentStudent>(
  "ParentStudent",
  ParentStudentSchema,
);
