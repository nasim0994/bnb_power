import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { useGetBannersQuery } from "../../Redux/bannerApi";
import { useMemo } from "react";

export default function Banner() {
  const { data, isLoading } = useGetBannersQuery();
  const banners = useMemo(() => data?.data, [data?.data]);

  if (isLoading)
    return (
      <div className="bg-base-100 w-full h-[50vh] md:h-[70vh] lg:h-[75vh]"></div>
    );

  return (
    <section>
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {banners?.map((banner) => (
          <SwiperSlide key={banner?._id}>
            <div className="h-[50vh] md:h-[70vh] lg:h-[85vh] relative">
              <div className="absolute -z-0 top-0 left-0 w-full h-full">
                <img
                  src={import.meta.env.VITE_BACKEND_URL + banner?.bgImage}
                  alt="banner"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="banner_content">
                <div className="container relative">
                  <div className="text-base-100">
                    <h2 className="text-3xl sm:text-4xl lg:text-[70px] font-bold sm:leading-[70px] lg:w-2/3">
                      {banner?.title}
                    </h2>

                    <p className="mt-4 sm:mt-0 lg:mt-4 lg:w-2/3 text-gray-300 text-sm sm:text-base">
                      {banner?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
