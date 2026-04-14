import mongoose, { Schema, Document, Types } from "mongoose";

export interface IGroupUser extends Document {
  _id: Types.ObjectId;
  groupId: Types.ObjectId;
  userId: Types.ObjectId;
}

const GroupUserSchema = new Schema<IGroupUser>({
  groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

GroupUserSchema.index({ groupId: 1, userId: 1 }, { unique: true });

export default mongoose.model<IGroupUser>("GroupUser", GroupUserSchema);
