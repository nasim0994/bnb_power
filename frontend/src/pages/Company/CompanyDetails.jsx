import { BiCircle } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useGetCompanyBySlugQuery } from "../../Redux/companyApi";

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
            <p>
              <strong>ATMOS ENGINEERING</strong> was founded in 2018 by
              Engineers and Managers experienced in high-end Engineering and
              Turnkey solutions. We focus exclusively on providing the utmost
              services from planning to execution with the products and
              solutions offered by our valuable partners. We are working to
              reduce inherent inefficiency and preventable risk across our
              countries’ most resource-intensive global industries like Power
              Plant, Gas Plant, Pharmaceuticals, Healthcare, Cosmetics &
              Personal Care, Food & Beverage, and Steel & Cement. In
              collaboration with world-leading companies for engineering
              construction and high-end technical products & solutions, we are
              restlessly working to serve our customers with modernized systems
              and solutions to modernize and climate change mitigation.
            </p>

            <div className="mt-6">
              <strong>ORGANIZATION:</strong>
              <p>
                <span className="underline">Company:</span> ATMOS ENGINEERING
              </p>
              <p>
                <span className="underline">Address:</span> Chand Mansion (4th
                Floor), 66, Dilkusha-C/A, Motijheel, Dhaka-1000
              </p>
              <p>
                <span className="underline">Trade License No:</span>{" "}
                TRAD/DSCC/039070/2022
              </p>
              <p>
                <span className="underline">TIN Number:</span> 138930835381
              </p>
              <p>
                <span className="underline">BIN Number:</span> 005654793-0208
              </p>
              <p>
                <span className="underline">Bank Details:</span> ATMOS
                ENGINEERING
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* mission visssion */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 items-start text-center">
            <div className="flex flex-col gap-2 md:border-r sm:pr-10">
              <h2 className="text-2xl font-semibold">VISSION</h2>
              <p className="text-neutral-content">
                To preserve the best-in-class expiration to conclusion
                engineering solutions highest value addition to those we
                associate.{" "}
              </p>
            </div>

            <div className="flex flex-col gap-2 lg:border-r lg:pr-10">
              <h2 className="text-2xl font-semibold">MISSION</h2>
              <p className="text-neutral-content">
                To enhance customer Growth by providing reliable, efficient,
                competitive, and environmentally friendly power solutions.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold">VALUES</h2>
              <p className="text-neutral-content">
                We, the people (Board of directors, Management, and Employees)
                of ATMOS Engineering pledge to demonstrate the following values,
                beliefs, principles, and standards of professional behavior
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business */}
      <section className="py-10">
        <div className="container">
          <h2 className="text-3xl font-semibold text-primary">Our Business</h2>

          <div className="mt-4">
            <ul className="flex flex-col gap-4">
              <li>
                <h3 className="font-semibold text-xl flex items-center gap-2">
                  <BiCircle className="text-lg text-primary" /> Substation EPC
                  Project
                </h3>
                <p className="text-neutral/80">
                  Engineering, Procurement & Construction of
                  400kV/230kV/132kV/33kV/11kV/415v AIS Substation.
                </p>
              </li>
              <li>
                <h3 className="font-semibold text-xl flex items-center gap-2">
                  <BiCircle className="text-lg text-primary" /> Substation EPC
                  Project
                </h3>
                <p className="text-neutral/80">
                  Engineering, Procurement & Construction of
                  400kV/230kV/132kV/33kV/11kV/415v AIS Substation.
                </p>
              </li>
              <li>
                <h3 className="font-semibold text-xl flex items-center gap-2">
                  <BiCircle className="text-lg text-primary" /> Substation EPC
                  Project
                </h3>
                <p className="text-neutral/80">
                  Engineering, Procurement & Construction of
                  400kV/230kV/132kV/33kV/11kV/415v AIS Substation.
                </p>
              </li>
              <li>
                <h3 className="font-semibold text-xl flex items-center gap-2">
                  <BiCircle className="text-lg text-primary" /> Substation EPC
                  Project
                </h3>
                <p className="text-neutral/80">
                  Engineering, Procurement & Construction of
                  400kV/230kV/132kV/33kV/11kV/415v AIS Substation.
                </p>
              </li>
              <li>
                <h3 className="font-semibold text-xl flex items-center gap-2">
                  <BiCircle className="text-lg text-primary" /> Substation EPC
                  Project
                </h3>
                <p className="text-neutral/80">
                  Engineering, Procurement & Construction of
                  400kV/230kV/132kV/33kV/11kV/415v AIS Substation.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Brand */}
      <section className="py-10">
        <div className="container">
          <h2 className="text-3xl font-semibold text-primary">Our Brands</h2>

          <div className="mt-4 grid grid-cols-5 gap-8">
            <div>
              <img
                src="/images/atom.png"
                alt=""
                className="w-[80%] mx-auto object-cover"
              />
            </div>
            <div>
              <img
                src="/images/atom.png"
                alt=""
                className="w-[80%] mx-auto object-cover"
              />
            </div>
            <div>
              <img
                src="/images/atom.png"
                alt=""
                className="w-[80%] mx-auto object-cover"
              />
            </div>
            <div>
              <img
                src="/images/atom.png"
                alt=""
                className="w-[80%] mx-auto object-cover"
              />
            </div>
            <div>
              <img
                src="/images/atom.png"
                alt=""
                className="w-[80%] mx-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
