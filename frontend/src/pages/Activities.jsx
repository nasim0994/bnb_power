import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
import { useGetAllPortfolioQuery } from "../Redux/portfolio/portfolioApi";

export default function Activities() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "business_portfolio - Activities";
  }, []);

  const { data } = useGetAllPortfolioQuery();
  const portfolios = data?.data;

  return (
    <section className="py-5">
      <div className="container">
        <h3 className="text-xl sm:text-2xl font-medium text-center">
          Dedicated segment wise activities
        </h3>

        <div className="pt-5 pb-10">
          <div className="container">
            {portfolios?.length > 0 ? (
              <div className="flex flex-col gap-6">
                {portfolios.map((portfolio) => (
                  <div key={portfolio?._id}>
                    <h3 className="text-center font-medium text-xl text-primary">
                      {portfolio?.title}
                    </h3>

                    <div className="sm:flex justify-center items-start gap-4">
                      {portfolio?.classCategory?.map((category) => (
                        <div key={category?._id} className="mt-4">
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
                                  to={`/products/${portfolio?.slug}/${category?.slug}/${item?.slug}`}
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
      </div>
    </section>
  );
}
