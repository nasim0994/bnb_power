import moment from "moment";
import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  const plainText = blog?.description.replace(/<[^>]+>/g, "");

  return (
    <div className="shadow rounded pb-2 blog_card">
      <div className="overflow-hidden">
        <img
          src={import.meta.env.VITE_BACKEND_URL + blog?.image}
          alt={blog?.title}
          className="w-full h-52 rounded-t object-cover"
          loading="lazy"
        />
      </div>
      <div className="py-4 px-2">
        <h3 className="text-neutral text-lg font-semibold">{blog?.title}</h3>

        <p className="text-[13px] text-neutral-content">
          {moment(blog?.createdAt).fromNow()}
        </p>

        <p className="mt-3 text-[13px] text-neutral-content">
          {plainText?.length > 50 ? plainText?.slice(0, 50) + "..." : plainText}
        </p>

        <div className="mt-5">
          <Link to={`/blogs/${blog?._id}`} className="primary_btn text-xs">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
