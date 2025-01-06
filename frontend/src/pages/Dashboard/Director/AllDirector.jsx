import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import {
  useDeleteDirectorMutation,
  useGetDirectorsQuery,
} from "../../../Redux/directorApi";

export default function AllDirector() {
  const { data, isLoading } = useGetDirectorsQuery();
  const directors = data?.data;

  const [deleteDirector] = useDeleteDirectorMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this director?");
    if (isConfirm) {
      try {
        const res = await deleteDirector(id);
        if (res?.data?.success) {
          toast.success("Director deleted successfully");
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

  if (isLoading) return <div>Loading...</div>;

  return (
    <section>
      <div className="p-4 border-b bg-base-100 rounded shadow">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-neutral">Director</h3>
          <Link to="/admin/director/add" className="primary_btn text-sm">
            Add Director
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-2 bg-base-100 rounded shadow">
        <table>
          <thead>
            <tr>
              <th>Sl</th>
              <th>Image</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {directors?.map((director, i) => (
              <tr key={director?._id}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${
                      director?.image
                    }`}
                    alt="director"
                    className="w-20 h-10"
                    loading="lazy"
                  />
                </td>
                <td>{director?.name}</td>
                <td>{director?.designation}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/director/edit/${director?._id}`}>
                      <FaRegEdit className="text-base hover:text-green-500 duration-200" />
                    </Link>
                    <button onClick={() => handleDelete(director?._id)}>
                      <AiOutlineDelete className="text-lg hover:text-red-500 duration-200" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
