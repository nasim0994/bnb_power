import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
} from "../../../Redux/blogsApi";
import toast from "react-hot-toast";
import Pagination from "../../../components/Pagination/Pagination";
import { useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";

export default function AllBlogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetBlogsQuery({ page: currentPage, limit });
  const blogs = data?.data;

  const [deleteBlog] = useDeleteBlogMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this blog?");
    if (isConfirm) {
      try {
        const res = await deleteBlog(id);
        if (res?.data?.success) {
          toast.success("Blog deleted successfully");
        } else {
          toast.error(
            res?.data?.message ? res?.data?.message : "Something went wrong!"
          );
          console.log(res);
        }
      } catch (error) {
        toast.error(error?.message);
      }
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section>
      <div className="p-4 border-b bg-base-100 rounded shadow">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-neutral">Blogs</h3>
          <Link to="/admin/blogs/add" className="primary_btn text-sm">
            Add New
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-2 bg-base-100 rounded shadow">
        <table>
          <thead>
            <tr>
              <th>Sl</th>
              <th>Image</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs?.map((blog, i) => (
              <tr key={blog?._id}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${blog?.image}`}
                    alt={blog?.title}
                    className="w-20 h-10"
                    loading="lazy"
                  />
                </td>
                <td>{blog?.title}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/blogs/edit/${blog?._id}`}>
                      <FaRegEdit className="text-base hover:text-green-500 duration-200" />
                    </Link>
                    <button onClick={() => handleDelete(blog?._id)}>
                      <AiOutlineDelete className="text-lg hover:text-red-500 duration-200" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data?.meta?.pages > 1 && (
        <Pagination
          pages={data?.meta?.pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
}
