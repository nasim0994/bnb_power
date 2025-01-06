import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {
  useDeleteClassMutation,
  useGetAllClassQuery,
} from "../../../../Redux/portfolio/classApi";

export default function AllClass() {
  const { data } = useGetAllClassQuery();
  const classes = data?.data;

  const [deleteClass] = useDeleteClassMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure you want to delete?");
    if (!isConfirm) return;

    const res = await deleteClass(id);
    if (res?.data?.success) {
      toast.success("Class deleted successfully");
    } else {
      toast.error(res?.data?.message || "Failed to delete class");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 rounded">
      <div className="flex justify-between items-center border-b p-3">
        <h4 className="font-medium">All Class</h4>
        <Link to="/admin/portfolio/class/add" className="primary_btn ">
          Add New
        </Link>
      </div>

      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Sl</th>
                <th>Title</th>
                <th>Order</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes?.map((cls, i) => (
                <tr key={cls?._id}>
                  <td>{i + 1}</td>
                  <td>{cls?.title}</td>
                  <td>{cls?.order}</td>
                  <td>
                    {cls?.category?.title} - {cls?.category?.portfolio?.title}
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/admin/portfolio/class/edit/${cls?._id}`}
                        className="hover:text-primary"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        onClick={() => handleDelete(cls?._id)}
                        className="hover:text-red-500 text-sm"
                      >
                        <FaTrash />
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
