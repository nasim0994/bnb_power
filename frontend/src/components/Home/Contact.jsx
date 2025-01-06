import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { useGetContactsQuery } from "../../Redux/contactApi";
import { useAddMessageMutation } from "../../Redux/contactMessageApi";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import { useLocation } from "react-router-dom";

export default function Contact() {
  const { pathname } = useLocation();
  const { data } = useGetContactsQuery();
  const contact = data?.data;

  const [addMessage, { isLoading }] = useAddMessageMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    const res = await addMessage(data);
    if (res?.data?.success) {
      e.target.reset();
      toast.success("Message sent successfully");
    } else {
      toast.error(res?.data?.message || "Something went wrong!");
      console.log(res);
    }
  };

  return (
    <section className="py-10 lg:py-20 bg-gray-50">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-14">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral">
              {contact?.title}
            </h2>
            <p className="text-neutral-content text-[15px] mt-1">
              {contact?.description}
            </p>

            <div className="mt-3 flex gap-3 items-center border rounded p-4 bg-base-100">
              <p>
                <FaLocationDot className="text-xl" />
              </p>
              <div>
                <p className="text-lg font-medium">Email</p>
                <p className="text-neutral-content">{contact?.email}</p>
              </div>
            </div>

            <div className="mt-2 flex flex-col gap-1.5 text-neutral">
              <div>
                <div className="flex gap-3 items-center border rounded p-4 bg-base-100">
                  <p>
                    <FaPhone className="text-xl" />
                  </p>
                  <div>
                    <p className="text-lg font-medium">Number</p>
                    <p className="text-neutral-content">{contact?.phone}</p>
                  </div>
                </div>

                {contact?.numbers?.length > 0 &&
                  contact?.numbers?.map((number, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-center border rounded p-4 bg-base-100"
                    >
                      <p>
                        <FaPhone className="text-xl" />
                      </p>
                      <div>
                        <p className="text-lg font-medium">{number?.title}</p>
                        <p className="text-neutral-content">{number?.number}</p>
                      </div>
                    </div>
                  ))}
              </div>

              <div>
                <div className="flex gap-3 items-center border rounded p-4 bg-base-100">
                  <p>
                    <FaLocationDot className="text-xl" />
                  </p>
                  <div>
                    <p className="text-lg font-medium">Address</p>
                    <p className="text-neutral-content">
                      {contact?.mainaddress}
                    </p>
                  </div>
                </div>
                {contact?.address?.length > 0 &&
                  contact?.address?.map((ads, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-center border rounded p-4 bg-base-100"
                    >
                      <p>
                        <FaLocationDot className="text-xl" />
                      </p>
                      <div>
                        <p className="text-lg font-medium">{ads?.title}</p>
                        <p className="text-neutral-content">{ads?.number}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-primary font-semibold text-xl mb-3">
              Get In Touch
            </h2>
            <form onSubmit={handleAdd} className="flex flex-col gap-3">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full border rounded px-4 py-2 outline-none"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full border rounded px-4 py-2 outline-none"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full border rounded px-4 py-2 outline-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="w-full border rounded px-4 py-2 outline-none"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Type you message..."
                  className="w-full border rounded px-4 py-2 outline-none"
                  required
                ></textarea>
              </div>

              <div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="primary_btn"
                >
                  {isLoading ? "Loading..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {pathname == "/contact-us" && (
          <div className="mt-4">{contact?.map && parse(contact?.map)}</div>
        )}
      </div>
    </section>
  );
}
