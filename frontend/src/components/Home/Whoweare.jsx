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

            <div className="mt-8">
              <Link
                to="/profile.pdf"
                target="_blank"
                className="primary_btn tetx-sm"
              >
                BNB Power & Engineering Prifile
              </Link>
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
      </div>
    </section>
  );
}
