import React from "react";
import { Link } from "react-router-dom";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMail, MdOutlineLocationOn } from "react-icons/md";
import { useGetLogosQuery } from "../Redux/logoApi";
import { useGetContactsQuery } from "../Redux/contactApi";
import { useGetBusinessInfoQuery } from "../Redux/businessInfoApi";
import * as FaIcons from "react-icons/fa";
import { useGetAboutQuery } from "../Redux/aboutApi";

export default function Footer() {
  const { data: logos } = useGetLogosQuery();
  const logo = logos?.data;

  const { data: contactData } = useGetContactsQuery();
  const contact = contactData?.data;

  const { data: businessData } = useGetBusinessInfoQuery();
  const businessInfo = businessData?.data;

  const { data: aData } = useGetAboutQuery();
  const abouts = aData?.data?.about;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1F2530] pt-10 pb-5 text-base-100">
      <div className="container">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 pb-14">
          <div className="md:col-span-2">
            <img
              src={import.meta.env.VITE_BACKEND_URL + logo?.logo}
              alt="logo"
              className="w-60"
              loading="lazy"
            />
            <p className="text-sm mt-3 text-gray-300">
              {businessInfo?.tagline}
            </p>
          </div>

          <div>
            <h2 className="text-gray-200 text-xl font-medium">Informations</h2>
            <ul className="text-gray-300 font-light mt-2 flex flex-col gap-1.5 text-[15px]">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="who-we-are" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to={`/portfolio`} className="hover:underline">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to={`/blogs`} className="hover:underline">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to={`/contact-us`} className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-gray-200 text-xl font-medium">Contact</h2>
            <ul className="text-gray-300 font-light mt-2 flex flex-col gap-1.5 text-[15px]">
              <li>
                <p className="flex items-center gap-1.5">
                  <BsTelephone />
                  {contact?.phone}
                </p>
              </li>
              <li>
                <p className="flex items-center gap-1.5">
                  <MdOutlineMail />
                  {contact?.email}
                </p>
              </li>
              <li>
                <div className="flex gap-1">
                  <p className="text-lg mt-1">
                    <MdOutlineLocationOn />
                  </p>
                  <p>{contact?.mainaddress}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-5">
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-sm font-light">
              Copyright © {businessInfo?.businessStartYear}-{currentYear}{" "}
              {businessInfo?.businessName}. All rights reserved. developed by{" "}
              <Link
                to="https://emanagerit.com"
                target="_blank"
                className="underline text-primary"
              >
                eManager
              </Link>
            </p>

            <div className="flex gap-2 items-center">
              {contact?.social?.map((social, i) => (
                <Link
                  to={social?.url}
                  target="_blank"
                  key={i}
                  className="w-7 h-7 rounded-full bg-primary/50 flex justify-center items-center text-base-100 hover:-mt-1 duration-200"
                >
                  {React.createElement(FaIcons[social?.icon])}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
