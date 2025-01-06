import { useEffect } from "react";
import Contact from "../components/Home/Contact";

export default function ContactPage() {
  useEffect(() => {
    document.title = "B&B - Contact Us";
    window.scrollTo(0, 0);
  }, []);

  return <Contact />;
}
