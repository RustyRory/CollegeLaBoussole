import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPermission extends Document {
  _id: Types.ObjectId;
  documentId: Types.ObjectId;
  subjectType: "user" | "group";
  subjectUserId?: Types.ObjectId;
  subjectGroupId?: Types.ObjectId;
  role: "read" | "write" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const PermissionSchema = new Schema<IPermission>(
  {
    documentId: {
      type: Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    subjectType: { type: String, enum: ["user", "group"], required: true },
    subjectUserId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    subjectGroupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      default: null,
    },
    role: { type: String, enum: ["read", "write", "admin"], required: true },
  },
  { timestamps: true },
);

PermissionSchema.index({ documentId: 1 });

export default mongoose.model<IPermission>("Permission", PermissionSchema);
