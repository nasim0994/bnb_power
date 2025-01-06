import { useParams } from "react-router-dom";
import { useGetSingleMessageQuery } from "../../../Redux/contactMessageApi";

export default function ClientMsgDetail() {
  window.scrollTo(0, 0);
  const { id } = useParams();

  const { data, isLoading } = useGetSingleMessageQuery(id);
  const message = data?.data;

  let content = null;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (message) {
    content = (
      <div className="rounded bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Contact Message Details</h2>
        <p>
          <strong>Name:</strong> {message?.name}
        </p>
        <p>
          <strong>Email:</strong> {message?.email}
        </p>
        <p>
          <strong>Phone:</strong> {message?.phone}
        </p>
        <p>
          <strong>Message:</strong> {message?.message}
        </p>
      </div>
    );
  } else {
    content = <p>No message found!</p>;
  }

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <h3 className="mb-6 text-2xl font-medium">View Client Message</h3>
        {content}
      </div>
    </section>
  );
}
