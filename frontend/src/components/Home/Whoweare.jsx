import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useGetWhoweareQuery } from "../../Redux/whoweareApi";

export default function Whoweare() {
  const { data } = useGetWhoweareQuery();
  const about = data?.data;

  return (
    <section className="py-10 bg-gray-50">
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
              className="h-80 sm:h-[420px]  w-full lg:w-[85%] ml-auto rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
