import { BiCircle } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { useGetCompanyBySlugQuery } from "../../Redux/companyApi";
import parser from "html-react-parser";

export default function CompanyDetails() {
  window.scrollTo(0, 0);
  const { slug } = useParams();
  const { data } = useGetCompanyBySlugQuery(slug);
  const company = data?.data;

  return (
    <>
      <section>
        <img
          src="/images/banner.webp"
          alt="banner"
          className="w-full h-48 object-cover"
        />
      </section>

      {/* About */}
      <section className="py-10">
        <div className="container">
          <h2 className="text-3xl font-semibold text-primary">
            {company?.name}
          </h2>
          <div className="mt-4 text-neutral">
            {company?.description && parser(company?.description)}
          </div>

          <div className="mt-6">
            <Link
              to={`${import.meta.env.VITE_BACKEND_URL}/${company?.profile}`}
              target="_blank"
              className="primary_btn"
            >
              Profile
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
