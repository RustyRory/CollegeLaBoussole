import mongoose, { Schema, Document, Types } from "mongoose";

export interface IParentProfile extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ParentProfileSchema = new Schema<IParentProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IParentProfile>(
  "ParentProfile",
  ParentProfileSchema,
);
