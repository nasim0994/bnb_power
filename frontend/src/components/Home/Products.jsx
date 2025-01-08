import { FaDotCircle } from "react-icons/fa";

export default function Products() {
  return (
    <section className="bg-gray-50 py-10" id="our-products">
      <h3 className="text-2xl sm:text-4xl font-semibold text-neutral text-center">
        <span className="primary_text">Our Products</span>
      </h3>

      <div className="container">
        <div className="mt-6">
          <div>
            <h3 className="text-lg font-medium text-neutral w-max bg-gray-300 rounded-3xl px-4 py-1 mx-auto">
              Breakers and LPS
            </h3>

            <p className="mt-3 text-neutral/80 text-sm">
              BNB Power and Engineering is the provider all kind of LV/MV/HV
              electrical circuit breakers and lightning protection system
              devices. we provide early streamer emission LPS (such as OPR30,
              OPR45,OPR60) and services.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-8">
            <img
              src="https://cdn.shakedeal.com/images/thumbnails/330/330/detailed/350/SDSMS0057000.jpg?t=1699519456"
              alt="service"
              className="w-28 h-28 rounded-full border border-neutral"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6TqUuUu4vkUEW0cnbxTHqRajIky-f7iXXX-FKZWihzV2nNmaV"
              alt="service"
              className="w-32 h-32 rounded-full border border-neutral"
            />
            <img
              src="https://www.industrymart.com.bd/wp-content/uploads/2024/06/ABB-MCB-DP-16A-6KA-300x300.jpeg"
              alt="service"
              className="w-28 h-28 rounded-full border border-neutral"
            />
            <img
              src="https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_1.0,f_auto,q_auto,w_700/c_pad,w_700/R2437038-01"
              alt="service"
              className="w-32 h-32 rounded-full border border-neutral"
            />
            <img
              src="https://p.globalsources.com/IMAGES/PDT/B1081462713/lightning-protection-system-ESE-SEFCO-ABB-lightning-arrestor-air-terminal-rod-strike-counter.jpg"
              alt="service"
              className="w-28 h-28 rounded-full border border-neutral"
            />
            <img
              src="https://cdn.productimages.abb.com/9PAA00000045326_400x400.jpg"
              alt="service"
              className="w-28 h-28 rounded-full border border-neutral"
            />
            <img
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTtkERoZJwsYwc0NoudrWt_oZFOr6yR1W2TH8QWuiNOtt4eLx8d"
              alt="service"
              className="w-28 h-28 rounded-full border border-neutral"
            />
          </div>

          <div className="mt-10">
            <div className="flex items-center gap-6">
              <img src="/images/siemens.png" alt="" className="w-32" />
              <p>-</p>
              <p className="text-sm text-neutral/80">
                Channel Partner for Bangladesh
              </p>
            </div>
            <div className="flex items-center gap-6">
              <img src="/images/abb.png" alt="" className="w-32" />
              <p>-</p>
              <p className="text-sm text-neutral/80">Importer</p>
            </div>
            <div className="flex items-center gap-6">
              <img src="/images/schneider.png" alt="" className="w-32" />
              <p>-</p>
              <p className="text-sm text-neutral/80">Importer</p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="mt-6 flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-medium text-neutral w-max bg-gray-300 rounded-3xl px-4 py-1 mx-auto">
                Ball Bearings
              </h3>
              <ul className="mt-6 grid sm:grid-cols-2 gap-2 text-sm text-neutral">
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Angular Contact Ball Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Self-Aligning Ball Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Thrust Ball Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Angular Contact Thrust Ball Bearing</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Deep Groove Ball Bearings</p>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Roller Bearings</h2>
              <ul className="mt-2 grid sm:grid-cols-2 gap-2 text-sm text-neutral">
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Cylinderical Roller Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Full Complement Cylinderical Roller Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Needle Rolle Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Tapered Roller Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Spherical Roller Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Cylinderical Roller Thrust Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Needle Roller Thrust Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Tapered Roller Thrust Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Spherical Roller Thrust Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Cam Rollers</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Giant Roller Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Support Rollers</p>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Roller Bearings</h2>
              <ul className="mt-2 grid sm:grid-cols-2 gap-2 text-sm text-neutral">
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Automotive Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Clutch Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Sliding Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Precision Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Linear Guide Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Pillow Block Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Spherical Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Magnetic Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Fluid Bearings</p>
                </li>
                <li className="flex items-center gap-2">
                  <i>
                    <FaDotCircle className="text-xs" />
                  </i>
                  <p>Cam Followers</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
