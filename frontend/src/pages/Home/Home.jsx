import "../../assets/css/home.css";
import { Suspense, lazy } from "react";
import Spinner from "../../components/Spinner/Spinner";
import Banner from "../../components/Home/Banner";
import Whoweare from "../../components/Home/Whoweare";
import MoreAbout from "../../components/Home/MoreAbout";
const Contact = lazy(() => import("../../components/Home/Contact"));
const Counter = lazy(() => import("../../components/Home/Counter"));
const Services = lazy(() => import("../../components/Home/Services"));

export default function Home() {
  window.scrollTo(0, 0);

  return (
    <>
      <Banner />
      <Whoweare />
      <MoreAbout />
      <Suspense fallback={<Spinner />}>
        <Services />
        <Counter />
        <Contact />
      </Suspense>
    </>
  );
}
