import { useEffect } from "react";
import { useGetDirectorsQuery } from "../../Redux/directorApi";
import parse from "html-react-parser";

export default function Directors() {
  useEffect(() => {
    document.title = "business_portfolio - Board of Directors";
    window.scrollTo(0, 0);
  }, []);

  const { data } = useGetDirectorsQuery();
  const directors = data?.data;

  return (
    <section className="py-10">
      <div className="container">
        <h2 className="text-center text-3xl font-medium">Board of Directors</h2>
        <div className="mt-5 flex flex-col gap-20">
          {directors?.map((director, index) => (
            <div key={director?._id}>
              <div className="flex items-start gap-4">
                {director?.image && (
                  <img
                    src={
                      import.meta.env.VITE_BACKEND_URL + "/" + director?.image
                    }
                    alt={director?.name}
                    className="w-32 rounded"
                  />
                )}

                <div>
                  <h4 className="text-2xl font-semibold">{director?.name}</h4>
                  <p className="text-[15px] font-semibold text-neutral">
                    {director?.designation}
                  </p>
                </div>
              </div>

              <div className="mt-2 text-neutral text-[15px]">
                {director?.description && parse(director?.description)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
