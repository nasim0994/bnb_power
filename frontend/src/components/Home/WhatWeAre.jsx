import { BiCircle } from "react-icons/bi";
export default function WhatWeAre() {
  return (
    <section className="py-10">
      <div className="container">
        <h3 className="text-2xl sm:text-4xl font-semibold text-neutral text-center">
          <span className="primary_text">What We Are</span>
        </h3>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold text-neutral text-center">
              Our Expertise
            </h2>

            <ul className="mt-6 flex flex-col gap-6 text-[15px] text-primary">
              <li className="flex items-center gap-2">
                <i>
                  <BiCircle />
                </i>
                <p>Trunkey projects</p>
              </li>
              <li className="flex items-center gap-2">
                <i>
                  <BiCircle />
                </i>
                <p>Erection, Testing & Commissioning</p>
              </li>
              <li className="flex items-center gap-2">
                <i>
                  <BiCircle />
                </i>
                <p>Machineries</p>
              </li>
              <li className="flex items-center gap-2">
                <i>
                  <BiCircle />
                </i>
                <p>Spare Parts</p>
              </li>
              <li className="flex items-center gap-2">
                <i>
                  <BiCircle />
                </i>
                <p>Annual Maintenance & Service Contract.</p>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-neutral text-center">
              Why BNB?
            </h2>

            <ul className="mt-6 flex flex-col gap-4 text-sm text-neutral/90">
              <li className="flex items-center gap-2">
                <i>
                  <BiCircle />
                </i>
                <p>We have a proven track record of excellence.</p>
              </li>
              <li className="flex items-center gap-2">
                <i>
                  <BiCircle />
                </i>
                <p>
                  Our technicians are highly trained, certied, and dedicated to
                  delivering top-notch service.
                </p>
              </li>

              <li className="flex items-center gap-2">
                <i>
                  <BiCircle />
                </i>
                <p>
                  We tailor our services to meet your specic needs and budget.
                </p>
              </li>
              <li className="flex items-center gap-2">
                <i>
                  <BiCircle />
                </i>
                <p>
                  We understand the importance of a reliable power source and
                  respond promptly to your service requests.
                </p>
              </li>
              <li className="flex items-center gap-2">
                <i>
                  <BiCircle />
                </i>
                <p>
                  We use only the best quality spare parts and equipment to
                  ensure the longevity and eciency of your system.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
