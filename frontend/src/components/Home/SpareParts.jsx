export default function SpareParts() {
  return (
    <section className="py-10">
      <div className="container">
        <h3 className="text-2xl sm:text-4xl font-semibold text-neutral text-center">
          <span className="primary_text">Spare Parts</span>
        </h3>

        <div className="mt-10 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-neutral/80 text-[15px] leading-8">
              We maintain stock for a comprehensive range of spare parts to
              ensure that we are always on standby to provide immediate backup
              support as required. Our range of nest quality genuine spare parts
              is sourced only from the primary global suppliers in their
              respective countries of origin. You can be assured of our
              proactivity, diligence, and responsiveness for all of your spare
              needs.
            </p>
          </div>

          <div>
            <img
              src="https://p2.zoon.ru/preview/LZikvqy846SP_NUBxhh9Cw/630x384x85/1/b/9/original_5f63aaa0e0dda95993116aae_60b15df881923.jpg"
              alt="SpareParts"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
