import { FaUserShield } from "react-icons/fa";
import { FaBloggerB } from "react-icons/fa";
import { MdDesignServices, MdOutlineFeaturedPlayList } from "react-icons/md";

import ClientMessage from "./ClientMessage/ClientMessage";
import { useGetAdminsQuery } from "../../Redux/user/userApi";
import { useGetServicesQuery } from "../../Redux/serviceApi";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { data: services } = useGetServicesQuery();
  const { data: admins } = useGetAdminsQuery();

  return (
    <section>
      {/* card */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <Link
              to="/admin/services"
              className="text-neutral font-dinMedium hover:text-primary duration-300"
            >
              Total Services
            </Link>
            <h3 className="text-primary font-bold">{services?.data?.length}</h3>
          </div>
          <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <MdDesignServices className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <Link
              to="/admin/administrator/all"
              className="text-neutral font-dinMedium hover:text-primary duration-300"
            >
              Total Admins
            </Link>
            <h3 className="text-green-600 font-bold">{admins?.data?.length}</h3>
          </div>

          <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <FaUserShield className="text-xl" />
          </div>
        </div>
      </div>

      <div className="mt-6 shadow-sm">
        <ClientMessage />
      </div>
    </section>
  );
}
