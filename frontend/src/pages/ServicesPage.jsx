import { useEffect } from "react";
import Services from "../components/Home/Services";

export default function ServicesPage() {
  useEffect(() => {
    document.title = "business_portfolio - Services";
    window.scrollTo(0, 0);
  }, []);

  return <Services />;
}
