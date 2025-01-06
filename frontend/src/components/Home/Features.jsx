import { useMemo } from "react";
import { useGetFeaturesQuery } from "../../Redux/featureApi";
import { useGetFeatureSectionQuery } from "../../Redux/featureSectionApi";

export default function Features() {
  const { data: section } = useGetFeatureSectionQuery();
  const featureSection = section?.data;

  const { data } = useGetFeaturesQuery();
  const features = useMemo(() => data?.data, [data?.data]);

  return (
    <section className="py-6">
      <div className="container">
        <h1 className="text-center text-xl sm:text-3xl font-semibold sm:w-2/3 mx-auto">
          {featureSection?.title}
        </h1>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features?.map((feature) => (
            <div key={feature?._id} className="feature_card">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${feature?.icon}`}
                alt="feature"
                className="w-10 mx-auto"
                loading="lazy"
              />
              <h2>{feature?.title}</h2>
              <p>{feature?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
