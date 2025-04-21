export type Blog = {
  _id: ObjectId;
  userId: string;
  userName: string;
  title: string;
  content: string;
  images?: string[];
};
