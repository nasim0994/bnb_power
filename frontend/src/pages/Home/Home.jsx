import "../../assets/css/home.css";
import Banner from "../../components/Home/Banner";
import Whoweare from "../../components/Home/Whoweare";
import WhatWeAre from "../../components/Home/WhatWeAre";
import Contact from "../../components/Home/Contact";
import Services from "../../components/Home/Services";
import OurCoreBusiness from "../../components/Home/OurCoreBusiness";
import OurBrands from "../../components/Home/OurBrands";
import SpareParts from "../../components/Home/SpareParts";
import Equipments from "../../components/Home/Equipments";
import OurClients from "../../components/Home/OurClients";
import Products from "../../components/Home/Products";

export default function Home() {
  window.scrollTo(0, 0);

  return (
    <>
      <Banner />
      <Whoweare />
      <Services />
      <Products />
      <WhatWeAre />
      <OurCoreBusiness />
      <OurBrands />
      <SpareParts />
      <Equipments />
      <OurClients />
      <Contact />
    </>
  );
}
