import { useMemo } from "react";
import { useGetServicesQuery } from "../../Redux/serviceApi";
import ServiceCard from "../ServiceCard/ServiceCard";

export default function Services() {
  const { data } = useGetServicesQuery();
  const services = useMemo(() => data?.data, [data?.data]);

  return (
    <section className="py-10">
      <div className="container">
        <div className="text-center">
          <h3 className="text-2xl sm:text-4xl font-bold text-neutral ">
            <span className="primary_text">Our Services</span>
          </h3>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg::grid-cols-4 gap-2">
          {services?.map((service) => (
            <ServiceCard key={service?._id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
