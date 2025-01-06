import { useGetAboutQuery } from "../../Redux/aboutApi";

export default function MoreAbout() {
  const { data } = useGetAboutQuery();
  const abouts = data?.data;

  return (
    <section className="py-5">
      <div className="container">
        <div className="flex flex-col">
          {abouts?.map((about) => (
            <div key={about?._id} className="more_about_card">
              <div className="content">
                <h2 className="text-4xl font-semibold">{about?.title}</h2>
                <p className="mt-1 text-gray-200 text-sm">
                  {about?.description}
                </p>
              </div>

              <div className="image">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${about?.image}`}
                  alt={about?.title}
                  className="w-[80%] sm:w-[60%] mx-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
