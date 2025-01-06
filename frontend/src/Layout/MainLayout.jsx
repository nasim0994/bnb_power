import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TopHeader from "../components/TopHeader";

export default function MainLayout() {
  return (
    <>
      <TopHeader />
      <Header />
      <div className="min-h-[70vh] bg-base-100">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
