import { useEffect } from "react";
import Whoweare from "../components/Home/Whoweare";

export default function WhoWeArePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "B&B - Who We Are";
  }, []);

  return (
    <>
      <Whoweare />
    </>
  );
}
