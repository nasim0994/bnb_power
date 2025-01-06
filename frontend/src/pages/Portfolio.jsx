import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetAllPortfolioQuery } from "../Redux/portfolio/portfolioApi";
import { FaArrowDown } from "react-icons/fa";
import PortfolioBanner from "../components/PortfolioBanner";

export default function Portfolio() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "business_portfolio - Portfolio";
  }, []);

  const { data } = useGetAllPortfolioQuery();
  const portfolios = data?.data;

  return (
    <section>
      <PortfolioBanner />

      <div className="pt-5 pb-10">
        <div className="container">
          {portfolios?.length > 0 ? (
            <div className="flex flex-col gap-10">
              {portfolios.map((portfolio) => (
                <div key={portfolio?._id}>
                  <h3 className="text-center font-medium text-2xl">
                    {portfolio?.title}
                  </h3>

                  <div className="sm:flex justify-center items-start gap-4">
                    {portfolio?.classCategory?.map((category) => (
                      <div key={category?._id} className="mt-6">
                        <div className="bg-black text-white py-2 rounded px-8 text-center text-lg relative">
                          {category?.title}

                          <div className="absolute top-full left-1/2 -translate-x-1/2">
                            <FaArrowDown className="text-black" />
                          </div>
                        </div>

                        <div className="mt-5 flex flex-col gap-4">
                          {category?.class
                            .slice()
                            ?.sort((a, b) => a.order - b.order)
                            .map((item) => (
                              <Link
                                key={item?._id}
                                to={item?.mcl}
                                target="_blank"
                                className="bg-primary hover:bg-secondary duration-300 text-base-100 py-2 px-2 rounded-md text-center whitespace-nowrap "
                              >
                                {item?.title}
                              </Link>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <h4>No portfolio found</h4>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
