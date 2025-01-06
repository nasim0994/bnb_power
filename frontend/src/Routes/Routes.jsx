import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Spinner from "../components/Spinner/Spinner";

import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";

const Directors = lazy(() => import("../pages/Directors/Directors"));
const ServicesPage = lazy(() => import("../pages/ServicesPage"));
const BlogsPage = lazy(() => import("../pages/BlogsPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const BlogDetails = lazy(() => import("../pages/BlogDetails"));
import Login from "../pages/Login/Login";

// ----------------------Dashboard----------------------------------
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import AddAbout from "../pages/Dashboard/AboutUs/AddAbout";
import EditAbout from "../pages/Dashboard/AboutUs/EditAbout";
import Activities from "../pages/Activities";
import AllPortfolio from "../pages/Dashboard/Portfolio/Portfolio/AllPortfolio";
import AddPortfolio from "../pages/Dashboard/Portfolio/Portfolio/AddPortfolio";
import EditPortfolio from "../pages/Dashboard/Portfolio/Portfolio/EditPortfolio";
import AllCategory from "../pages/Dashboard/Portfolio/Category/AllCategory";
import AddCategory from "../pages/Dashboard/Portfolio/Category/AddCategory";
import EditCategory from "../pages/Dashboard/Portfolio/Category/EditCategory";
import AllClass from "../pages/Dashboard/Portfolio/Class/AllClass";
import AddClass from "../pages/Dashboard/Portfolio/Class/AddClass";
import EditClass from "../pages/Dashboard/Portfolio/Class/EditClass";
import Portfolio from "../pages/Portfolio";
import ClsCategoryByPortfolio from "../pages/ClsCategoryByPortfolio";
import WhoWeAre from "../pages/Dashboard/AboutUs/WhoWeAre/WhoWeAre";
import WhoWeArePage from "../pages/WhoWeArePage";
import FeatureSection from "../pages/Dashboard/Feature/FeatureSection";
import AllProducts from "../pages/Dashboard/Portfolio/Product/AllProducts";
import AddProduct from "../pages/Dashboard/Portfolio/Product/AddProduct";
import EditProduct from "../pages/Dashboard/Portfolio/Product/EditProduct";
import ProductPage from "../pages/ProductPage";
import ProductDetails from "../pages/ProductDetails";
import CompanyDetails from "../pages/Company/CompanyDetails";

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
const AllBlogs = lazy(() => import("../pages/Dashboard/Blog/AllBlogs"));
const AddBlog = lazy(() => import("../pages/Dashboard/Blog/AddBlog"));
const EditBlog = lazy(() => import("../pages/Dashboard/Blog/EditBlog"));
const AllServices = lazy(() =>
  import("../pages/Dashboard/Service/AllServices")
);
const AddService = lazy(() => import("../pages/Dashboard/Service/AddService"));
const EditService = lazy(() =>
  import("../pages/Dashboard/Service/EditService")
);
const VideoSection = lazy(() =>
  import("../pages/Dashboard/VideoSection/VideoSection")
);
const AllFeatures = lazy(() =>
  import("../pages/Dashboard/Feature/AllFeatures")
);
const AddFeature = lazy(() => import("../pages/Dashboard/Feature/AddFeature"));
const EditFeature = lazy(() =>
  import("../pages/Dashboard/Feature/EditFeature")
);
const ClientMessage = lazy(() =>
  import("../pages/Dashboard/ClientMessage/ClientMessage")
);
const ClientMsgDetail = lazy(() =>
  import("../pages/Dashboard/ClientMessage/ClientMsgDetail")
);
const AllDirector = lazy(() =>
  import("../pages/Dashboard/Director/AllDirector")
);
const AddDirector = lazy(() =>
  import("../pages/Dashboard/Director/AddDirector")
);
const EditDirector = lazy(() =>
  import("../pages/Dashboard/Director/EditDirector")
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
        path: "/company/:id",
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
        path: "/about-us/:slug",
        element: (
          <Suspense fallback={<Spinner />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "/activities",
        element: (
          <Suspense fallback={<Spinner />}>
            <Activities />
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
        path: "/about-us/board-directors",
        element: (
          <Suspense fallback={<Spinner />}>
            <Directors />
          </Suspense>
        ),
      },
      {
        path: "/portfolio",
        element: (
          <Suspense fallback={<Spinner />}>
            <Portfolio />
          </Suspense>
        ),
      },
      {
        path: "/portfolio/:slug",
        element: (
          <Suspense fallback={<Spinner />}>
            <ClsCategoryByPortfolio />
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

      // Product
      {
        path: "/products/:portfolio/:category/:cls",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProductPage />
          </Suspense>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProductDetails />
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

      // -----Features
      {
        path: "feature-section",
        element: <FeatureSection />,
      },
      {
        path: "features",
        element: <AllFeatures />,
      },
      {
        path: "feature/add",
        element: <AddFeature />,
      },
      {
        path: "feature/edit/:id",
        element: <EditFeature />,
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

      // -----Director
      {
        path: "director/all",
        element: <AllDirector />,
      },
      {
        path: "director/add",
        element: <AddDirector />,
      },
      {
        path: "director/edit/:id",
        element: <EditDirector />,
      },

      // ----------------Portfolio-----------
      // --------Portfolio
      {
        path: "portfolio/all",
        element: <AllPortfolio />,
      },
      {
        path: "portfolio/add",
        element: <AddPortfolio />,
      },
      {
        path: "portfolio/edit/:id",
        element: <EditPortfolio />,
      },

      // --------Class Category
      {
        path: "portfolio/category/all",
        element: <AllCategory />,
      },
      {
        path: "portfolio/category/add",
        element: <AddCategory />,
      },
      {
        path: "portfolio/category/edit/:id",
        element: <EditCategory />,
      },

      // --------Class
      {
        path: "portfolio/class/all",
        element: <AllClass />,
      },
      {
        path: "portfolio/class/add",
        element: <AddClass />,
      },
      {
        path: "portfolio/class/edit/:id",
        element: <EditClass />,
      },

      // --------Product
      {
        path: "portfolio/product/all",
        element: <AllProducts />,
      },
      {
        path: "portfolio/product/add",
        element: <AddProduct />,
      },
      {
        path: "portfolio/product/edit/:id",
        element: <EditProduct />,
      },

      // -----Video Section
      {
        path: "video-section",
        element: <VideoSection />,
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

      //--------Blogs
      {
        path: "blogs",
        element: <AllBlogs />,
      },
      {
        path: "blogs/add",
        element: <AddBlog />,
      },
      {
        path: "blogs/edit/:id",
        element: <EditBlog />,
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
