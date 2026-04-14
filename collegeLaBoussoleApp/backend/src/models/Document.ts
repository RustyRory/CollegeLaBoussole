import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDocument extends Document {
  _id: Types.ObjectId;
  titre: string;
  url: string;
  type: "file" | "folder";
  folderId?: Types.ObjectId;
  ownerId: Types.ObjectId;
  uploadedBy: Types.ObjectId;
  inheritPermissions: boolean;
  classId?: Types.ObjectId;
  lectureId?: Types.ObjectId;
  yearId?: Types.ObjectId;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    titre: { type: String, required: true, trim: true },
    url: { type: String, required: true },
    type: { type: String, enum: ["file", "folder"], required: true },
    folderId: { type: Schema.Types.ObjectId, ref: "Document", default: null },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    inheritPermissions: { type: Boolean, default: true },
    classId: { type: Schema.Types.ObjectId, ref: "Class", default: null },
    lectureId: { type: Schema.Types.ObjectId, ref: "Lecture", default: null },
    yearId: { type: Schema.Types.ObjectId, ref: "Year", default: null },
    tags: [{ type: String }],
  },
  { timestamps: true },
);

DocumentSchema.index({ folderId: 1 });
DocumentSchema.index({ uploadedBy: 1 });

export default mongoose.model<IDocument>("Document", DocumentSchema);
