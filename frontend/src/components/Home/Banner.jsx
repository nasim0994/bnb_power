// import { useGetBannersQuery } from "../../Redux/bannerApi";
// import { useMemo } from "react";

export default function Banner() {
  // const { data, isLoading } = useGetBannersQuery();
  // const banners = useMemo(() => data?.data, [data?.data]);

  // if (isLoading)
  //   return (
  //     <div className="bg-base-100 w-full h-[50vh] md:h-[70vh] lg:h-[75vh]"></div>
  //   );

  return (
    <section>
      <img src="/images/banner.jpg" alt="bnb_banner" loading="lazy" />
    </section>
  );
}
