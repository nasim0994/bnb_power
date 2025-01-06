import { useGetVideoSectionQuery } from "../../Redux/videoSectionApi";
import parse from "html-react-parser";

export default function VideoSection() {
  const { data } = useGetVideoSectionQuery();
  const videoSection = data?.data;

  return (
    <section className="py-10 bg-gray-50">
      <div className="container">
        <div className="grid sm:grid-cols-2 gap-10">
          <div>{videoSection?.videoUrl && parse(videoSection?.videoUrl)}</div>

          <div className="text-end">
            <h2 className="text-3xl sm:text-6xl lg:text-[75px] lg:leading-[80px] font-bold text-neutral">
              {videoSection?.title}
            </h2>

            <p className="text-neutral-content">{videoSection?.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
