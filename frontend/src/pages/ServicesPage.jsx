import { useEffect } from "react";
import Services from "../components/Home/Services";

export default function ServicesPage() {
  useEffect(() => {
    document.title = "B&B - Services";
    window.scrollTo(0, 0);
  }, []);

  return <Services />;
}
