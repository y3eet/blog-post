import EditPost from "@/components/EditPost";
import UnAuthenticated from "@/components/UnAuthenticated";
import { BlogModel } from "@/lib/mongodb/models/Blog";
import connectToDatabase from "@/lib/mongodb/mongodb";
import { Blog } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await currentUser();
  if (!user) {
    return <UnAuthenticated />;
  }
  await connectToDatabase();
  const blog = (await BlogModel.findOne({
    _id: id,
    userId: user?.id,
  }).lean()) as Blog;
  blog._id = blog._id.toString();
  return (
    <div>
      <EditPost blog={blog} />
    </div>
  );
}
