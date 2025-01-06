import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAddAdminMutation } from "../../../Redux/user/userApi";

export default function AddAdministrator() {
  const navigate = useNavigate();
  const [addAdmin, { isLoading, isError, error }] = useAddAdminMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const password = form.password.value;
    const info = {
      name,
      email,
      phone,
      password,
    };

    try {
      const res = await addAdmin(info);

      if (res?.data?.success) {
        toast.success("Administrator Added Successfully");
        form.reset();
        navigate("/admin/administrator/all");
      } else {
        toast.error(
          res?.data?.message ? res?.data?.message : "Something went wrong!"
        );
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <section className="bg-base-100 shadow rounded pb-4">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Add Admins</h3>
      </div>

      <div className="p-4 border md:w-2/3 mx-auto mt-4 rounded">
        <form onSubmit={handleAdd} className="form_group flex flex-col gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-neutral-content text-sm">Full Name</p>
              <input type="text" name="name" required />
            </div>
            <div>
              <p className="text-neutral-content text-sm">Email</p>
              <input type="email" name="email" required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-neutral-content text-sm">Password</p>
              <input type="password" name="password" required />
            </div>
            <div>
              <p className="text-neutral-content text-sm">Phone</p>
              <input type="text" name="phone" required />
            </div>
          </div>

          {isError && (
            <p className="text-sm text-red-500">{error?.data?.message}</p>
          )}

          <div>
            <button
              disabled={isLoading && "disabled"}
              className="primary_btn my-4"
            >
              {isLoading ? "Loading..." : "Add Administrator"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
