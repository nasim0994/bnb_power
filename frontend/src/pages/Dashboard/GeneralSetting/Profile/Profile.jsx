import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteAccountMutation,
  useUpdateInfoMutation,
  useUpdatePasswordMutation,
} from "../../../../Redux/user/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userLoggedIn } from "../../../../Redux/user/userSlice";
import { useState } from "react";

export default function Profile() {
  const { loggedUser } = useSelector((store) => store.user);
  const id = loggedUser?.data?._id;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateInfo, { isLoading }] = useUpdateInfoMutation();

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;

    const data = {
      name,
      email,
      phone,
    };

    const res = await updateInfo({ id, data });

    if (res?.data?.success) {
      toast.success("Update success");
      if (loggedUser?.data?.email != res?.data?.data?.email) {
        localStorage.removeItem("token");
        dispatch(userLoggedIn({ data: undefined }));
        navigate("/admin/login");
      }
    } else {
      toast.error(
        res?.data?.message ? res?.data?.message : "something went wrong!"
      );
      console.log(res);
    }
  };

  //   update Password
  const [updatePassword, { isLoading: passLoading }] =
    useUpdatePasswordMutation();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const form = e.target;
    const currentPassword = form.currentPassword.value;
    const password = form.password.value;
    const rePassword = form.rePassword.value;

    if (password !== rePassword) {
      return toast.error("Password and Re Password not match");
    }

    const data = {
      currentPassword,
      newPassword: password,
    };

    const res = await updatePassword({ id, data });

    console.log(data);

    if (res?.data?.success) {
      toast.success("Password update success");
      localStorage.removeItem("token");
      dispatch(userLoggedIn({ data: undefined }));
      navigate("/admin/login");
    } else {
      toast.error(
        res?.data?.message ? res?.data?.message : "something went wrong!"
      );
      console.log(res);
    }
  };

  //   delete account
  const [isDelete, setIsDelete] = useState(false);

  const [deleteAccount, { isLoading: deleteLoading }] =
    useDeleteAccountMutation();

  const HandleDeleteAccount = async (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;

    const data = {
      password,
    };

    const res = await deleteAccount({ id, data });

    if (res?.data?.success) {
      toast.success("Account delete success");
      localStorage.removeItem("token");
      dispatch(userLoggedIn({ data: undefined }));
      navigate("/admin/login");
    } else {
      toast.error(
        res?.data?.message ? res?.data?.message : "something went wrong!"
      );
      console.log(res);
    }
  };

  return (
    <section>
      <div className="border rounded p-4 bg-base-100">
        <h3 className="text-xl fonbt-medium mb-4">Admin Info</h3>
        <form onSubmit={handleUpdateInfo}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="mb-1">Name</p>
              <input
                type="text"
                name="name"
                defaultValue={loggedUser?.data?.name}
              />
            </div>

            <div>
              <p className="mb-1">Email</p>
              <input
                type="text"
                name="email"
                defaultValue={loggedUser?.data?.email}
              />
            </div>

            <div>
              <p className="mb-1">Phone</p>
              <input
                type="text"
                name="phone"
                defaultValue={loggedUser?.data?.phone}
              />
            </div>
          </div>

          <div className="mt-4">
            <button className="primary_btn text-sm">
              {isLoading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </div>

      <br />

      <div className="border rounded p-4 bg-base-100">
        <h3 className="text-xl fonbt-medium mb-4">Update Password</h3>

        <form onSubmit={handleUpdatePassword}>
          <div className="sm:w-1/2 grid gap-4">
            <div>
              <p className="mb-1">Current Password</p>
              <input type="password" name="currentPassword" />
            </div>

            <div>
              <p className="mb-1">New Password</p>
              <input type="password" name="password" />
            </div>

            <div>
              <p className="mb-1">Re Password</p>
              <input type="password" name="rePassword" />
            </div>
          </div>

          <div className="mt-4">
            <button className="primary_btn text-sm">
              {passLoading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </div>

      <br />

      <div className="border rounded p-4 bg-base-100 sm:w-1/2">
        {isDelete ? (
          <form onSubmit={HandleDeleteAccount}>
            <div>
              <p className="mb-1">Type Your Password</p>
              <input type="password" name="password" />
            </div>

            <div className="mt-3 flex gap-2">
              <button className="bg-red-500 text-base-100 px-4 py-2 rounded text-sm">
                {deleteLoading ? "Loading..." : "Delete Account"}
              </button>

              <button
                onClick={() => setIsDelete(!isDelete)}
                className="bg-gray-500 text-base-100 px-4 py-2 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsDelete(!isDelete)}
            className="bg-red-500 text-base-100 px-4 py-2 rounded text-sm"
          >
            Delete Account
          </button>
        )}
      </div>
    </section>
  );
}
