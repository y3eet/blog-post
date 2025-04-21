import mongoose, { Document, Model, ObjectId } from "mongoose";
const { Schema, model, models } = mongoose;

// Interface for the Blog document
export interface IBlog extends Document {
  _id: ObjectId;
  userId: string;
  userName: string;
  title: string;
  content: string;
  images?: string[];
}

// Schema definition
const blogSchema = new Schema<IBlog>(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

// Model creation
export const BlogModel: Model<IBlog> =
  models.Blog || model<IBlog>("Blog", blogSchema);
