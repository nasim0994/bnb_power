export default function ServiceCard({ service }) {
  return (
    <div className="service_card">
      <img
        src={import.meta.env.VITE_BACKEND_URL + service?.image}
        alt={service?.title}
        className="rounded"
        loading="lazy"
      />
      <h2 className="title text-2xl font-medium mb-2 mt-5">{service?.title}</h2>
    </div>
  );
}
