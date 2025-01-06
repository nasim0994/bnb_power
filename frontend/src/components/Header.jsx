import "../assets/css/header.css";
import { useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useGetLogosQuery } from "../Redux/logoApi";
import { useGetAboutQuery } from "../Redux/aboutApi";
import { IoIosArrowDown } from "react-icons/io";
import { useGetAllPortfolioQuery } from "../Redux/portfolio/portfolioApi";

export default function Header() {
  const [mobileMenu, setmobileMenu] = useState(false);

  const { data } = useGetLogosQuery();
  const logo = useMemo(() => data?.data.logo, [data?.data]);

  const { data: aData } = useGetAboutQuery();
  const abouts = aData?.data;

  const { data: pData } = useGetAllPortfolioQuery();
  const portfolios = pData?.data;

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        e.target.closest(".menu_wrap ul li a") &&
        !e.target.closest(".menu_btn") &&
        !e.target.closest(".menu_wrap ul li a svg")
      ) {
        setmobileMenu(false);
      }
    });
  }, []);

  return (
    <header className="sticky top-0 bg-[#ffffffcc] backdrop-blur-[30px] z-50 py-1.5 md:py-0 border-b">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img
              src={import.meta.env.VITE_BACKEND_URL + logo}
              alt="logo"
              className="w-36 sm:w-40 xl:w-48"
              loading="lazy"
            />
          </Link>

          <nav className="menu_wrap flex items-center gap-2">
            <button
              onClick={() => setmobileMenu(false)}
              className={`menu_overlay ${mobileMenu && "menu_overlay_show"}`}
            ></button>

            <button
              onClick={() => setmobileMenu(!mobileMenu)}
              className="min-[800px]:hidden menu_btn"
            >
              <HiOutlineMenuAlt3 className="text-2xl" />
            </button>

            <ul className={`flex items-center gap-4 ${mobileMenu && "show"}`}>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>

              <li>
                <NavLink to="/who-we-are">About</NavLink>
              </li>

              <li>
                <NavLink to="/services">Services</NavLink>
              </li>

              <li>
                <NavLink to="/portfolio">Company</NavLink>

                <div className="dropdown">
                  <ul>
                    {portfolios?.map((portfolio, i) => (
                      <li key={i}>
                        <Link to={`/portfolio/${portfolio?.slug}`}>
                          {portfolio?.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li>
                <NavLink to="/contact-us">Contact</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
