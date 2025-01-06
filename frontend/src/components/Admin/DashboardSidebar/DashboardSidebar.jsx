import {
  MdMonitor,
  MdOutlineDashboard,
  MdContactPhone,
  MdDesignServices,
  MdOutlineFeaturedPlayList,
} from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import SidebarItems from "./SidebarItems";

import { FcAbout, FcBusinessman } from "react-icons/fc";
import { FaChartLine, FaVideo } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { FaBloggerB } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { BsFillPassportFill } from "react-icons/bs";

import { useGetLogosQuery } from "../../../Redux/logoApi";

const adminSidebarItems = [
  {
    icon: <MdOutlineDashboard />,
    title: "Dashbaord",
    path: "/admin/dashboard",
  },

  {
    icon: <MdDesignServices />,
    title: "Service",
    path: "/admin/services",
  },

  {
    icon: <FaBloggerB />,
    title: "blogs",
    path: "/admin/blogs",
  },
  {
    icon: <GoNumber className="text-lg" />,
    title: "Counter",
    path: "/admin/counter",
  },
  {
    icon: <MdOutlineFeaturedPlayList className="text-lg" />,
    title: "Feature",
    subMenu: [
      {
        title: "Feature Section",
        path: "/admin/feature-section",
      },
      {
        title: "All Features",
        path: "/admin/features",
      },
    ],
  },
  {
    icon: <FcAbout />,
    title: "About Us",
    subMenu: [
      {
        title: "Who we are",
        path: "/admin/who-we-are",
      },
      {
        title: "More About Us",
        path: "/admin/about-us",
      },
    ],
  },
  {
    icon: <FcBusinessman />,
    title: "Directors",
    path: "/admin/director/all",
  },
  {
    icon: <BsFillPassportFill />,
    title: "Portfolio",
    subMenu: [
      {
        title: "Portfolio",
        path: "/admin/portfolio/all",
      },
      {
        title: "Class Category",
        path: "/admin/portfolio/category/all",
      },
      {
        title: "Class",
        path: "/admin/portfolio/class/all",
      },
      {
        title: "Products",
        path: "/admin/portfolio/product/all",
      },
    ],
  },
  {
    icon: <MdContactPhone />,
    title: "Contact Us",
    path: "/admin/contact-us",
  },
  {
    icon: <FaRegMessage />,
    title: "Contact Message",
    path: "/admin/contact-message",
  },

  {
    icon: <FaVideo className="text-lg" />,
    title: "Video Section",
    path: "/admin/video-section",
  },
  {
    icon: <RiAdminFill />,
    title: "Administrator",
    path: "/admin/administrator/all",
  },
  {
    icon: <MdMonitor />,
    title: "Front-End Setting",
    subMenu: [
      {
        title: "Logo",
        path: "/admin/frontend/logo",
      },
      {
        title: "Favicon",
        path: "/admin/frontend/favicon",
      },
      {
        title: "Banner",
        path: "/admin/frontend/banners",
      },
    ],
  },

  {
    icon: <IoMdSettings />,
    title: "General Setting",
    subMenu: [
      {
        title: "Business Info",
        path: "/admin/general-setting/business-info",
      },
      {
        title: "Profile",
        path: "/admin/general-setting/profile",
      },
    ],
  },

  {
    icon: <FaChartLine />,
    title: "SEO Setting",
    path: "/admin/seo",
  },
];

export default function DashboardSidebar() {
  const { data } = useGetLogosQuery();
  const logo = data?.data?.logo;

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <nav className="admin_siderbar">
          <Link to="/admin/dashboard" className="py-[1.5px] block">
            <img
              src={import.meta.env.VITE_BACKEND_URL + logo}
              alt="logo"
              className="w-1/2 mx-auto"
              loading="lazy"
            />
          </Link>

          <ul>
            {adminSidebarItems?.map((item, i) => (
              <SidebarItems key={i} item={item} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
