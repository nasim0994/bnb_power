import { HiOutlineMail } from "react-icons/hi";
import { FiSmartphone } from "react-icons/fi";
import { BiMap } from "react-icons/bi";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useGetWhoweareQuery } from "../../Redux/whoweareApi";

export default function Whoweare() {
  const { data } = useGetWhoweareQuery();
  const about = data?.data;

  return (
    <section className="py-10" id="about-us">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-xl sm:text-3xl text-neutral font-semibold">
              {about?.title}
            </h2>

            <div className="mt-3 text-neutral-content text-[14.5px] flex flex-col gap-1">
              {about?.description && parse(about?.description)}
            </div>
          </div>

          <div>
            <img
              src={import.meta.env.VITE_BACKEND_URL + about?.image}
              alt="about"
              className="w-full lg:w-[85%] ml-auto rounded object-cover"
            />
          </div>
        </div>

        <div className="mt-20 lg:mx-60 grid grid-cols-3 text-center text-sm text-neutral-content">
          <div className="flex flex-col items-center gap-2">
            <i className="bg-primary w-9 h-9 flex items-center justify-center rounded text-base-100">
              <BiMap className="text-2xl" />
            </i>

            <p>
              Hose - 11 (4th Floor) Road-1, Block-A, Gulshan (Niketon),
              Dhaka-1212
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <i className="bg-primary w-9 h-9 flex items-center justify-center rounded text-base-100">
              <FiSmartphone className="text-2xl" />
            </i>

            <p>+88 01717-143521</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <i className="bg-primary w-9 h-9 flex items-center justify-center rounded text-base-100">
              <HiOutlineMail className="text-2xl" />
            </i>

            <p>info@bnb-bd.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}
