import mongoose, { Document, Model } from "mongoose";
const { Schema, model, models } = mongoose;
import { Comment } from "@/lib/types";

export interface CommentDocument extends Omit<Comment, "_id">, Document {}

const CommentSchema = new Schema<CommentDocument>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const CommentModel: Model<CommentDocument> =
  models.Comment || model<CommentDocument>("Comment", CommentSchema);

export default CommentModel;
