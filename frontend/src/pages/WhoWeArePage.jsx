import { useEffect } from "react";
import Whoweare from "../components/Home/Whoweare";
import MoreAbout from "../components/Home/MoreAbout";

export default function WhoWeArePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "business_portfolio - Who We Are";
  }, []);

  return (
    <>
      <Whoweare />
      <MoreAbout />
    </>
  );
}
