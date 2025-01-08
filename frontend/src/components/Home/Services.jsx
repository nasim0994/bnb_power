// import { useMemo } from "react";
// import { useGetServicesQuery } from "../../Redux/serviceApi";
// import ServiceCard from "../ServiceCard/ServiceCard";

import ServiceCard from "../ServiceCard/ServiceCard";

export default function Services() {
  // const { data } = useGetServicesQuery();
  // const services = useMemo(() => data?.data, [data?.data]);
  const services = [
    {
      _id: "1",
      title: "LV/MV/HV Electrical Protection Devices",
    },
    {
      _id: "2",
      title: "Programmable Logic Array (PLC)",
    },
    {
      _id: "3",
      title: "Early Streamer Lightning Protection Equipments and Services",
    },
    {
      _id: "4",
      title: "Industrial Bearings",
    },
    {
      _id: "5",
      title: "Electrical Design and Drawings",
    },
    {
      _id: "6",
      title: "Sub-station Design and services",
    },
    {
      _id: "7",
      title: "Electrical Service provider",
    },
  ];

  return (
    <section className="py-10 bg-gray-50" id="our-services">
      <div className="container">
        <h3 className="text-2xl sm:text-4xl font-semibold text-neutral text-center">
          <span className="primary_text">Our Services</span>
        </h3>

        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {services?.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
