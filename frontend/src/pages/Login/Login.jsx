import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLoginMutation } from "../../Redux/user/userApi";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    document.title = "B&B - Login";
  }, []);
  const { loggedUser } = useSelector((store) => store.user);
  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/dashboard";
  if (loggedUser?.success) {
    navigate(from, { replace: true });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const info = {
      email,
      password,
    };

    const res = await login(info);

    if (res?.data?.success) {
      toast.success("Login success");
      navigate(from, { replace: true });
    } else {
      toast.error(res?.data?.message);
      console.log(res);
    }
  };

  return (
    <div className="flex justify-between items-center h-screen w-full">
      <div className="w-full sm:w-[430px] mx-auto shadow rounded p-4">
        <h2 className="text-2xl font-semibold text-center text-neutral mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="p-4">
          <div className="mb-4">
            <p className="text-[15px]">Email *</p>
            <input
              type="text"
              placeholder="Enter email"
              name="email"
              required
            />
          </div>
          <div>
            <p className="text-[15px]">Password *</p>
            <input
              type="password"
              placeholder="******"
              name="password"
              required
            />
          </div>

          <div className="mt-4">
            <button
              className="w-full text-base-100 bg-primary px-4 py-2 rounded"
              disabled={isLoading && "disabled"}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
