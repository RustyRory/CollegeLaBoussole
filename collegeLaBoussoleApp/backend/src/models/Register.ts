import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRegister extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  classId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RegisterSchema = new Schema<IRegister>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
  },
  { timestamps: true },
);

RegisterSchema.index({ userId: 1, classId: 1 }, { unique: true });

export default mongoose.model<IRegister>("Register", RegisterSchema);
