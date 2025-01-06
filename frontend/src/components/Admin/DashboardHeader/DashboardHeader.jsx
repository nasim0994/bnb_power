import { useEffect, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../../../Redux/user/userSlice";
import { TbWorldWww } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";

export default function DashboardHeader({ setSidebar }) {
  const { loggedUser } = useSelector((store) => store.user);
  const [dropdown, setDropdown] = useState(false);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".d_btn")) {
        setDropdown(false);
      }
    });
  }, []);

  const dispatch = useDispatch();

  return (
    <header className="py-3 px-6 bg-base-100 text-neutral shadow">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebar(true)}
            className="admin_sidebar_btn lg:hidden"
          >
            <HiOutlineMenuAlt2 className="text-xl" />
          </button>

          <div title="Visit Front-End">
            <Link to="/" target="_blank">
              <TbWorldWww className="text-2xl" />
            </Link>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setDropdown(!dropdown)}
            className="d_btn flex items-center gap-2"
          >
            {loggedUser?.data?.name} <FaUserCircle className="text-2xl" />
          </button>

          {dropdown && (
            <div className="absolute z-50 top-[140%] right-0 min-w-52 bg-base-100 rounded shadow p-2">
              <div className="border-b p-2">
                <div className="text-sm font-semibold">
                  {loggedUser?.data?.name}
                </div>
                <div className="text-sm">{loggedUser?.data?.email}</div>
              </div>

              <ul>
                <li>
                  <Link
                    to="/admin/general-setting/profile"
                    className="hover:bg-gray-100 px-2 py-1 rounded duration-200 block border-b"
                  >
                    Profile
                  </Link>
                </li>
              </ul>

              <button
                onClick={() => dispatch(userLogout())}
                className="hover:bg-gray-100 text-red-500 w-full text-start px-2 py-1 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
