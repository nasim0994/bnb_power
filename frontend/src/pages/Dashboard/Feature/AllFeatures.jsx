import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import {
  useDeleteFeatureMutation,
  useGetFeaturesQuery,
} from "../../../Redux/featureApi";

export default function AllFeatures() {
  const { data, isLoading } = useGetFeaturesQuery();
  const services = data?.data;

  const [deleteService] = useDeleteFeatureMutation();

  const handleDeleteService = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this service?");
    if (isConfirm) {
      try {
        const res = await deleteService(id);
        if (res?.data?.success) {
          toast.success("Service deleted successfully");
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
          <h3 className="font-medium text-neutral">Features</h3>
          <Link to="/admin/feature/add" className="primary_btn text-sm">
            Add New Feature
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
            {services?.map((service, i) => (
              <tr key={service?._id}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${service?.icon}`}
                    alt={service?.title}
                    className="w-20 h-10"
                    loading="lazy"
                  />
                </td>
                <td>{service?.title}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/feature/edit/${service?._id}`}>
                      <FaRegEdit className="text-base hover:text-green-500 duration-200" />
                    </Link>
                    <button onClick={() => handleDeleteService(service?._id)}>
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
