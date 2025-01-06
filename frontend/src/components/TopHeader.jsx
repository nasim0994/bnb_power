import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useGetContactsQuery } from "../Redux/contactApi";
import * as FaIcons from "react-icons/fa";
import React from "react";

export default function TopHeader() {
  const { data } = useGetContactsQuery();
  const contact = data?.data;

  return (
    <section className="bg-secondary text-base-100 hidden sm:block py-1">
      <div className="container">
        <div className="flex justify-between items-center text-[13px]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaPhoneAlt className="text-xs" />
              <p>{contact?.phone}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <MdEmail />
              <p>{contact?.email}</p>
            </div>
          </div>

          {/* Right Social icon */}
          <div className="flex gap-3 items-center text-lg">
            {contact?.social?.map((social, i) => (
              <Link key={i} to={social?.url} target="_blank">
                {React.createElement(FaIcons[social?.icon])}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
