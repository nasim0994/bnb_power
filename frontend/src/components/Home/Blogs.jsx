import { useMemo } from "react";
import { useGetBlogsQuery } from "../../Redux/blogsApi";
import BlogCard from "../BlogCard";

export default function Blogs() {
  const { data } = useGetBlogsQuery({ limit: 3 });
  const blogs = useMemo(() => data?.data, [data?.data]);

  return (
    <section className="py-10">
      <div className="container">
        <h2 className="text-center text-3xl font-bold uppercase">
          Blog & News
        </h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.map((blog) => (
            <BlogCard key={blog?._id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
