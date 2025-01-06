import { useParams } from "react-router-dom";
import perser from "html-react-parser";
import { useGetBlogQuery } from "../Redux/blogsApi";
import { useEffect } from "react";
import Spinner from "../components/Spinner/Spinner";

export default function BlogDetails() {
  window.scrollTo(0, 0);

  const { id } = useParams();
  const { data, isLoading } = useGetBlogQuery(id);
  let blog = data?.data;

  useEffect(() => {
    document.title = `${blog?.title}`;
  }, [blog]);

  if (isLoading) return <Spinner />;

  return (
    <section className="py-5">
      <div className="container">
        <div className="md:w-2/3">
          <div>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${blog?.image}`}
              alt={blog?.title}
              className="w-full sm:h-80 rounded"
              loading="lazy"
            />
          </div>

          <div className="mt-3">
            <div>
              <h2 className="text-xl md:text-4xl font-semibold text-primary">
                {blog?.title}
              </h2>
            </div>

            <div className="mt-3 text-[15px] text-neutral">
              <p>{blog?.short_description}</p>
              <p className="mt-3">
                {blog?.description && perser(blog?.description)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
