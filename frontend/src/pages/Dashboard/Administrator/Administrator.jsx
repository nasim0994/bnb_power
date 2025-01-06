import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  useDeleteAdminMutation,
  useGetAdminsQuery,
} from "../../../Redux/user/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";

export default function Administrator() {
  const { loggedUser } = useSelector((store) => store.user);
  const { data, isLoading } = useGetAdminsQuery();
  const [deleteAdmin] = useDeleteAdminMutation();
  if (isLoading) return <div>Loading...</div>;

  const admins = data?.data;

  const handleDelete = async (id) => {
    if (loggedUser?.data?._id === id) {
      return toast.error("You can't delete yourself");
    }

    const isConfirm = window.confirm("are you sure delete this admin?");
    if (isConfirm) {
      try {
        const res = await deleteAdmin(id);
        if (res?.data?.success) {
          toast.success("Admin delete success");
        } else {
          toast.error(
            res?.data?.message ? res?.data?.message : "something went wrong!"
          );
          console.log(res);
        }
      } catch (error) {
        toast.error(error?.message);
      }
    }
  };

  return (
    <section>
      <div className="p-4 border-b bg-base-100 rounded">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-neutral">All Admin</h3>
          <Link to="/admin/administrator/add" className="primary_btn text-sm">
            Add Administrator
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto mt-2">
        <table>
          <thead>
            <tr>
              <th>User name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins?.map((admin) => (
              <tr key={admin?.id}>
                <td>
                  <div className="flex items-center gap-2">{admin?.name}</div>
                </td>
                <td>{admin?.email}</td>
                <td>{admin?.phone}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link to="/admin/general-setting/profile">
                      <FaEdit className="hover:text-primary" />
                    </Link>

                    <button onClick={() => handleDelete(admin?.id)}>
                      <AiOutlineDelete className="text-lg hover:text-red-500" />
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
