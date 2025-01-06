import { Suspense, lazy } from "react";
import Spinner from "../../components/Spinner/Spinner";
import "../../assets/css/home.css";
import Banner from "../../components/Home/Banner";
import Features from "../../components/Home/Features";
import Whoweare from "../../components/Home/Whoweare";
const Blogs = lazy(() => import("../../components/Home/Blogs"));
const Contact = lazy(() => import("../../components/Home/Contact"));
const Counter = lazy(() => import("../../components/Home/Counter"));
const Services = lazy(() => import("../../components/Home/Services"));
const VideoSection = lazy(() => import("../../components/Home/VideoSection"));

export default function Home() {
  window.scrollTo(0, 0);

  return (
    <>
      <Banner />
      <Features />
      <Whoweare />
      <Suspense fallback={<Spinner />}>
        <Counter />
        <Services />
        <VideoSection />
        <Blogs />
        <Contact />
      </Suspense>
    </>
  );
}
