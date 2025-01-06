import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  useDeleteBannerMutation,
  useGetBannersQuery,
} from "../../../../Redux/bannerApi";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

export default function Banners() {
  const { data, isLoading } = useGetBannersQuery();
  const [deleteBanner] = useDeleteBannerMutation();
  const banners = data?.data;

  const deleteClientHandler = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this client?");
    if (isConfirm) {
      try {
        const res = await deleteBanner(id);

        if (res?.data?.success) {
          toast.success("Banner deleted successfully");
        } else {
          toast.error(
            res?.data?.message ? res?.data?.message : "Something went wrong"
          );
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section>
      <div className="p-4 border-b bg-base-100 rounded">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-neutral">Banners</h3>
          <Link to="/admin/frontend/banner/add" className="primary_btn text-sm">
            Add New
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-2">
        <table>
          <thead>
            <tr>
              <th>Sl</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {banners?.map((banner, index) => (
              <tr key={banner?._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${
                      banner?.bgImage
                    }`}
                    alt={banner?.title}
                    className="w-28 h-10"
                    loading="lazy"
                  />
                </td>
                <td>{banner?.title}</td>
                <td>{banner?.description}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/frontend/banner/edit/${banner?._id}`}
                      className="hover:text-primary duration-200 text-[17px]"
                    >
                      <FaEdit />
                    </Link>
                    <button onClick={() => deleteClientHandler(banner?._id)}>
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
