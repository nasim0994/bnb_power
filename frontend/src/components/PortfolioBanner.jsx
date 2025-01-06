import { useGetBusinessInfoQuery } from "../Redux/businessInfoApi";

export default function PortfolioBanner() {
  const { data: businessData } = useGetBusinessInfoQuery();
  const businessInfo = businessData?.data;

  return (
    <div className="py-20 relative h-[65vh] sm:h-[45vh]">
      <div className="absolute inset-0 h-full z-10 ">
        <img
          src="/images/portfolio3.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      <div className="container relative">
        <div className="absolute z-20 text-neutral">
          <h4 className="text-3xl font-semibold">Business Portfolio</h4>

          <p className="text-[15px] mt-3 sm:w-2/3">{businessInfo?.tagline}</p>
        </div>
      </div>
    </div>
  );
}
