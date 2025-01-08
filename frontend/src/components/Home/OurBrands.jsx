export default function OurBrands() {
  return (
    <section className="py-10" id="our-brands">
      <div className="container">
        <h3 className="text-2xl sm:text-4xl font-semibold text-neutral text-center">
          <span className="primary_text">Our Brands</span>
        </h3>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:mx-28">
          <div className="border">
            <img
              src="/images/abb.png"
              alt="abb"
              className="w-32 mx-auto py-4"
            />
          </div>
          <div className="border">
            <img
              src="/images/siemens.png"
              alt="abb"
              className="w-32 mx-auto py-4"
            />
          </div>
          <div className="border">
            <img src="/images/b1.png" alt="abb" className="w-32 mx-auto py-4" />
          </div>
          <div className="border">
            <img src="/images/b2.png" alt="abb" className="w-32 mx-auto py-4" />
          </div>
          <div className="border">
            <img src="/images/b3.png" alt="abb" className="w-32 mx-auto py-4" />
          </div>
          <div className="border">
            <img src="/images/b4.png" alt="abb" className="w-32 mx-auto py-4" />
          </div>
          <div className="border">
            <img src="/images/b5.png" alt="abb" className="w-32 mx-auto py-4" />
          </div>
          <div className="border">
            <img src="/images/b6.png" alt="abb" className="w-32 mx-auto py-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
