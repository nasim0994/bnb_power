import { BiCircle } from "react-icons/bi";

export default function OurCoreBusiness() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container">
        <h3 className="text-2xl sm:text-4xl font-semibold text-neutral text-center">
          <span className="primary_text">Our Core Business</span>
        </h3>

        <ul className="mt-6 flex flex-col gap-6 text-[15px] text-neutral">
          <li className="flex items-start gap-2">
            <i>
              <BiCircle className="mt-1" />
            </i>
            <div>
              <p className="font-semibold">Substation EPC Project:</p>
              <p className="pl-4">
                Engineering, Procurement& Construction of
                400kV/230kV/132kV/33kV/11kV/415vAISSubstation
              </p>
            </div>
          </li>

          <li className="flex items-start gap-2">
            <i>
              <BiCircle className="mt-1" />
            </i>
            <div>
              <p className="font-semibold">Power Generation:</p>
              <p className="pl-4">
                Supply, Installation, Testing Commissioning of Generators from
                40KVA to 1600KVA.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <i>
              <BiCircle className="mt-1" />
            </i>
            <div>
              <p className="font-semibold">Technical Services:</p>
              <p className="pl-4">
                Erection, Testing & Commissioning of 400kV/230kV/132kV/33kV/11kV
                AIS Substation, Mesh Earthing system, Cable Laying and
                Termination etc.{" "}
              </p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <i>
              <BiCircle className="mt-1" />
            </i>
            <div>
              <p className="font-semibold">Electrical Switchgears & Panels:</p>
              <p className="pl-4">
                Supply and Installation of MV & LV Switchgears and Motors, MCC,
                PCC, and Types Tested Panels.{" "}
              </p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <i>
              <BiCircle className="mt-1" />
            </i>
            <div>
              <p className="font-semibold">Elevators:</p>
              <p className="pl-4">
                Design, Supply &Installation, Testing, Commissioning andAMCof
                Elevators.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <i>
              <BiCircle className="mt-1" />
            </i>
            <div>
              <p className="font-semibold">Machineries:</p>
              <p className="pl-4">
                Food Processing and Packaging Machineries, Textile Machineries.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
