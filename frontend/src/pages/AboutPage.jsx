import { useEffect } from "react";
import { useGetAboutBySlugQuery, useGetAboutQuery } from "../Redux/aboutApi";
import Spinner from "../components/Spinner/Spinner";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";

export default function AboutPage() {
  const { slug } = useParams();
  useEffect(() => {
    document.title = `business_portfolio - ${slug}`;
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading } = useGetAboutBySlugQuery(slug);
  const about = data?.data;

  if (isLoading) return <Spinner />;

  return (
    <section className="py-10 text-neutral">
      <div className="container">
        <h2 className="text-xl sm:text-3xl font-semibold">{about?.title}</h2>

        <div className="mt-3 text-[14.5px] flex flex-col gap-1">
          {about?.description && parse(about?.description)}
        </div>
      </div>
    </section>
  );
}
