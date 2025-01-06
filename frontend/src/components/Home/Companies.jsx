import { Link } from "react-router-dom";
import { useGetAllCompanyQuery } from "../../Redux/companyApi";

export default function Companies() {
  const { data } = useGetAllCompanyQuery();
  const companies = data?.data;

  return (
    <section className="py-6">
      <div className="container">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
          {companies?.map((company) => (
            <Link
              key={company?._id}
              to={`/company/${company?.slug}`}
              className="flex flex-col gap-3 justify-center items-center hover:bg-gray-50 hover:shadow duration-300 rounded py-6 border"
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${company?.image}`}
                alt="atom"
                className="w-28 mx-auto"
              />
              <h2 className="text-xl">{company?.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
