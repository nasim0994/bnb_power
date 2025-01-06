import { Link } from "react-router-dom";

export default function Companies() {
  return (
    <section className="py-6">
      <div className="container">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
          <Link
            to="company/1"
            className="flex flex-col gap-3 justify-center items-center hover:bg-gray-50 hover:shadow duration-300 rounded py-6 border"
          >
            <img src="/images/atom.png" alt="atom" className="w-28 mx-auto" />
            <h2 className="text-xl">ATMOS ENGINEERING</h2>
          </Link>

          <Link
            to="company/2"
            className="flex flex-col gap-3 justify-center items-center hover:bg-gray-50 hover:shadow duration-300 rounded py-6 border"
          >
            <img src="/images/atom.png" alt="atom" className="w-28 mx-auto" />
            <h2 className="text-xl">ATMOS ENGINEERING</h2>
          </Link>

          <Link
            to="company/3"
            className="flex flex-col gap-3 justify-center items-center hover:bg-gray-50 hover:shadow duration-300 rounded py-6 border"
          >
            <img src="/images/atom.png" alt="atom" className="w-28 mx-auto" />
            <h2 className="text-xl">ATMOS ENGINEERING</h2>
          </Link>
        </div>
      </div>
    </section>
  );
}
