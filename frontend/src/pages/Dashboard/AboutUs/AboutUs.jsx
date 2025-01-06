import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  useDeleteAboutMutation,
  useGetAboutQuery,
} from "../../../Redux/aboutApi";

export default function AboutUs() {
  const { data } = useGetAboutQuery();
  const abouts = data?.data;

  const [deleteAbout] = useDeleteAboutMutation();
  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure you want to delete?");
    if (!isConfirm) return;

    const res = await deleteAbout(id);
    if (res.data?.success) {
      toast.success(res.data.message || "Deleted successfully");
    } else {
      toast.error(res.data.message || "Something went wrong");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 rounded">
      <div className="flex justify-between items-center border-b p-3">
        <h3 className="font-medium">About Us</h3>
        <Link to="/admin/about-us/add" className="primary_btn text-sm">
          Add New
        </Link>
      </div>

      <div className="p-3">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {abouts?.map((about, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{about?.title}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/about-us/edit/${about?._id}`}
                        className="text-blue-500"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(about?._id)}
                        className="text-red-500"
                      >
                        <MdDelete className="text-[17px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
