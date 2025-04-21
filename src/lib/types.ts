import { ObjectId } from "mongoose";

export type Blog = {
  _id: ObjectId | string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  images?: string[];
  createdAt: Date;
};
