import { useEffect, useMemo, useState } from "react";
import { useGetBlogsQuery } from "../Redux/blogsApi";
import Pagination from "../components/Pagination/Pagination";
import BlogCard from "../components/BlogCard";

export default function BlogsPage() {
  useEffect(() => {
    document.title = "business_portfolio - News & Blogs";
    window.scrollTo(0, 0);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  const { data } = useGetBlogsQuery({ page: currentPage, limit });
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

        {data?.meta?.pages > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={data?.meta?.pages}
          />
        )}
      </div>
    </section>
  );
}
