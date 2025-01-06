import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Spinner from "../components/Spinner/Spinner";

import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";

const ServicesPage = lazy(() => import("../pages/ServicesPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
import Login from "../pages/Login/Login";

// ----------------------Dashboard----------------------------------
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import AddAbout from "../pages/Dashboard/AboutUs/AddAbout";
import EditAbout from "../pages/Dashboard/AboutUs/EditAbout";
import WhoWeAre from "../pages/Dashboard/AboutUs/WhoWeAre/WhoWeAre";
import WhoWeArePage from "../pages/WhoWeArePage";
import CompanyDetails from "../pages/Company/CompanyDetails";
import AllCompanies from "../pages/Dashboard/Company/Companies/AllCompanies";
import AddCompany from "../pages/Dashboard/Company/Companies/AddCompany";
import EditCompany from "../pages/Dashboard/Company/Companies/EditCompany";

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const SEO = lazy(() => import("../pages/Dashboard/SEO/SEO"));
const BusinessInfo = lazy(() =>
  import("../pages/Dashboard/GeneralSetting/BusinessInfo/BusinessInfo")
);
const Logo = lazy(() => import("../pages/Dashboard/FrontEndSetting/Logo/Logo"));
const Favicon = lazy(() =>
  import("../pages/Dashboard/FrontEndSetting/Favicon/Favicon")
);
const Banners = lazy(() =>
  import("../pages/Dashboard/FrontEndSetting/Banner/Banner")
);
const AddBanner = lazy(() =>
  import("../pages/Dashboard/FrontEndSetting/Banner/AddBanner")
);
const EditBanner = lazy(() =>
  import("../pages/Dashboard/FrontEndSetting/Banner/EditBanner")
);
const Counter = lazy(() => import("../pages/Dashboard/Counter/Counter"));
const ContactUs = lazy(() => import("../pages/Dashboard/ContactUs/ContactUs"));
const About = lazy(() => import("../pages/Dashboard/AboutUs/AboutUs"));
const Administrator = lazy(() =>
  import("../pages/Dashboard/Administrator/Administrator")
);
const AddAdministrator = lazy(() =>
  import("../pages/Dashboard/Administrator/AddAdministrator")
);
const AllServices = lazy(() =>
  import("../pages/Dashboard/Service/AllServices")
);
const AddService = lazy(() => import("../pages/Dashboard/Service/AddService"));
const EditService = lazy(() =>
  import("../pages/Dashboard/Service/EditService")
);
const ClientMessage = lazy(() =>
  import("../pages/Dashboard/ClientMessage/ClientMessage")
);
const ClientMsgDetail = lazy(() =>
  import("../pages/Dashboard/ClientMessage/ClientMsgDetail")
);
const Profile = lazy(() =>
  import("../pages/Dashboard/GeneralSetting/Profile/Profile")
);

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/company/:slug",
        element: (
          <Suspense fallback={<Spinner />}>
            <CompanyDetails />
          </Suspense>
        ),
      },
      {
        path: "/services",
        element: (
          <Suspense fallback={<Spinner />}>
            <ServicesPage />
          </Suspense>
        ),
      },
      {
        path: "/contact-us",
        element: (
          <Suspense fallback={<Spinner />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: "/who-we-are",
        element: (
          <Suspense fallback={<Spinner />}>
            <WhoWeArePage />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/admin/login",
    element: <Login />,
  },

  // -------------------------Dashboard--------------------------
  {
    path: "/admin",
    element: (
      <Suspense fallback={<Spinner />}>
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      </Suspense>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },

      // -----Counter
      {
        path: "counter",
        element: <Counter />,
      },

      // -----Contact Us
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "contact-message",
        element: <ClientMessage />,
      },
      {
        path: "contact-message/view/:id",
        element: <ClientMsgDetail />,
      },

      // -----About Us
      {
        path: "who-we-are",
        element: <WhoWeAre />,
      },

      // -----More About Us
      {
        path: "about-us",
        element: <About />,
      },
      {
        path: "about-us/add",
        element: <AddAbout />,
      },
      {
        path: "about-us/edit/:id",
        element: <EditAbout />,
      },

      // ---------------Company
      {
        path: "company/all",
        element: <AllCompanies />,
      },
      {
        path: "company/add",
        element: <AddCompany />,
      },
      {
        path: "company/edit/:id",
        element: <EditCompany />,
      },

      // -----Administrator
      {
        path: "administrator/all",
        element: <Administrator />,
      },
      {
        path: "administrator/add",
        element: <AddAdministrator />,
      },

      // -------services
      {
        path: "services",
        element: <AllServices />,
      },
      {
        path: "services/add",
        element: <AddService />,
      },
      {
        path: "services/edit/:id",
        element: <EditService />,
      },

      // -----------Frontend Setting-----------
      {
        path: "frontend/logo",
        element: <Logo />,
      },
      {
        path: "frontend/favicon",
        element: <Favicon />,
      },
      {
        path: "frontend/banners",
        element: <Banners />,
      },
      {
        path: "frontend/banner/add",
        element: <AddBanner />,
      },
      {
        path: "frontend/banner/edit/:id",
        element: <EditBanner />,
      },

      // -----------General Setting-----------
      {
        path: "general-setting/business-info",
        element: <BusinessInfo />,
      },
      {
        path: "general-setting/profile",
        element: <Profile />,
      },

      // -----------SEO Setting-----------
      {
        path: "seo",
        element: <SEO />,
      },
    ],
  },
]);
