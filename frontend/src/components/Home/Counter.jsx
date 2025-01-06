import { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { useGetCounterQuery } from "../../Redux/counterApi";

export default function Counter() {
  const [count, setCount] = useState(false);

  const { data } = useGetCounterQuery();
  const counter = data?.data;

  return (
    <section
      className="py-10 sm:py-20 text-base-100"
      style={{
        backgroundImage: `linear-gradient(80deg, #0000009a, #0000009a),url(${
          import.meta.env.VITE_BACKEND_URL + counter?.bgImage
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container">
        <div>
          <h2 className="text-4xl font-bold text-center mb-10 text-secondary">
            {counter?.title}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-5 gap-2 sm:gap-4">
            {counter?.count?.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 items-center text-center"
              >
                <ScrollTrigger
                  onEnter={() => setCount(true)}
                  onExit={() => setCount(false)}
                >
                  {count && (
                    <h2 className="text-2xl sm:text-4xl font-semibold">
                      <CountUp start={0} end={item?.number} />+
                    </h2>
                  )}
                </ScrollTrigger>
                <p className="text-base text-gray-300">{item?.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
