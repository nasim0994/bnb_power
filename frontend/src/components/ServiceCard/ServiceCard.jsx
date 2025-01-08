export default function ServiceCard({ service }) {
  return (
    <div className="service_card">
      <h2 className="title text-lg font-medium mb-2 mt-5">{service?.title}</h2>
    </div>
  );
}
