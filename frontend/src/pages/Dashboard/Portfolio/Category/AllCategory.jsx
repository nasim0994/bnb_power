import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {
  useDeleteClsCategoryMutation,
  useGetAllClsCategoryQuery,
} from "../../../../Redux/portfolio/categoryApi";

export default function AllCategory() {
  const { data } = useGetAllClsCategoryQuery();
  const categories = data?.data;

  const [deleteClsCategory] = useDeleteClsCategoryMutation();
  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure you want to delete?");
    if (!isConfirm) return;

    const res = await deleteClsCategory(id);
    if (res?.data?.success) {
      toast.success("Category deleted successfully");
    } else {
      toast.error(res?.data?.message || "Failed to delete Category");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 rounded">
      <div className="flex justify-between items-center border-b p-3">
        <h4 className="font-medium">All Category</h4>
        <Link to="/admin/portfolio/category/add" className="primary_btn ">
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
                <th>Portfolio</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category, i) => (
                <tr key={category?._id}>
                  <td>{i + 1}</td>
                  <td>{category?.title}</td>
                  <td>{category?.order}</td>
                  <td>{category?.portfolio?.title}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/admin/portfolio/category/edit/${category?._id}`}
                        className="hover:text-primary"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        onClick={() => handleDelete(category?._id)}
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
