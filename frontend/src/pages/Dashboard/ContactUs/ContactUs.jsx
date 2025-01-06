import { useEffect, useState } from "react";
import {
  useAddContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
} from "../../../Redux/contactApi";
import toast from "react-hot-toast";
import MultiNumberInput from "./MultiNumberInput";
import MultiAddressInput from "./MultiAddressInput";
import MultiSocial from "./MultiSocial";

export default function ContactUs() {
  const [numbers, setNumbers] = useState([]);
  const [address, setAddress] = useState([]);
  const [social, setSocial] = useState([]);

  const { data } = useGetContactsQuery();
  const contactUs = data?.data;
  const id = contactUs?._id;

  useEffect(() => {
    if (contactUs) {
      setNumbers(contactUs.numbers);
      setAddress(contactUs.address);
      setSocial(contactUs.social);
    }
  }, [contactUs]);

  const [addContact, { isLoading: addIsLoading }] = useAddContactMutation();

  const [updateContact, { isLoading: updateIsLoading }] =
    useUpdateContactMutation();

  const hanldeAddUpdate = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const map = e.target.map.value;
    const title = e.target.sectionTitle.value;
    const description = e.target.description.value;
    const mainaddress = e.target.mainaddress.value;

    const data = {
      email,
      phone,
      map,
      title,
      description,
      mainaddress,
      numbers,
      address,
      social,
    };

    if (id) {
      const res = await updateContact({ id, data });
      if (res?.data?.success) {
        toast.success("Contact Update Success");
      } else {
        toast.error(
          res?.data?.message ? res?.data?.message : "something went wrong!"
        );

        console.log(res);
      }
    } else {
      const res = await addContact(data);
      if (res?.data?.success) {
        toast.success("Contact Add Success");
      } else {
        toast.error(
          res?.data?.message ? res?.data?.message : "something went wrong!"
        );

        console.log(res);
      }
    }
  };

  return (
    <section className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium text-neutral">Contact Us</h3>
      </div>

      <form className="p-4" onSubmit={hanldeAddUpdate}>
        <div className="text-neutral-content grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
          <div>
            <p className="mb-1">Section Title</p>
            <input
              type="text"
              name="sectionTitle"
              required
              defaultValue={contactUs?.title}
            />
          </div>

          <div className="sm:col-span-2">
            <p className="mb-1">Section Description</p>
            <input
              type="text"
              name="description"
              required
              defaultValue={contactUs?.description}
            />
          </div>

          <div className="sm:col-span-2">
            <p className="mb-1">Map Url</p>
            <input type="text" name="map" defaultValue={contactUs?.map} />
          </div>

          <div>
            <p className="mb-1">Primary Email</p>
            <input
              type="email"
              name="email"
              required
              defaultValue={contactUs?.email}
            />
          </div>

          <div>
            <p className="mb-1">Primary Number</p>
            <input
              type="tel"
              name="phone"
              required
              defaultValue={contactUs?.phone}
            />
          </div>

          <div className="sm:col-span-2">
            <p className="mb-1">Main Address</p>
            <textarea
              name="mainaddress"
              required
              defaultValue={contactUs?.mainaddress}
            ></textarea>
          </div>
        </div>

        <div className="grid ">
          <MultiNumberInput numbers={numbers} setNumbers={setNumbers} />
          <MultiAddressInput address={address} setAddress={setAddress} />
          <MultiSocial social={social} setSocial={setSocial} />
        </div>

        <div className="mt-5">
          <div className="flex gap-2">
            <button
              disabled={addIsLoading || (updateIsLoading && "disabled")}
              className="primary_btn"
            >
              {addIsLoading || updateIsLoading
                ? "Loading..."
                : contactUs?._id
                ? "Update"
                : "Add"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
