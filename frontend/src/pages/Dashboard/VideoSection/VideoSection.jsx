import toast from "react-hot-toast";
import {
  useAddVideoSectionMutation,
  useGetVideoSectionQuery,
  useUpdateVideoSectionMutation,
} from "../../../Redux/videoSectionApi";

export default function VideoSection() {
  const { data } = useGetVideoSectionQuery();
  const videoSection = data?.data;
  const id = videoSection?._id;

  const [addVideoSection, { isLoading }] = useAddVideoSectionMutation();
  const [updateVideoSection, { isLoading: updateIsLoading }] =
    useUpdateVideoSectionMutation();

  const handleSubmite = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      videoUrl: formData.get("videoUrl"),
    };

    if (id) {
      const res = await updateVideoSection({ data, id });
      if (res.data?.success) {
        toast.success("Video Section Updated Successfully");
      } else {
        toast.error(
          res.data?.message ? res.data.message : "Something went wrong"
        );
        console.log(res);
      }
    } else {
      const res = await addVideoSection(data);
      if (res.data?.success) {
        toast.success("Video Section Added Successfully");
      } else {
        toast.error(
          res.data?.message ? res.data.message : "Something went wrong"
        );
        console.log(res);
      }
    }
  };

  return (
    <section className="bg-base-100 rounded p-4">
      <h3 className="text-xl text-center">Video Section Setting</h3>

      <form onSubmit={handleSubmite} className="mt-5">
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-1">Title</p>
            <input
              type="text"
              name="title"
              required
              defaultValue={videoSection?.title}
            />
          </div>

          <div>
            <p className="mb-1">Description</p>
            <textarea
              name="description"
              required
              defaultValue={videoSection?.description}
            ></textarea>
          </div>

          <div>
            <p className="mb-1">Video Ifame</p>
            <textarea
              name="videoUrl"
              rows={10}
              required
              defaultValue={videoSection?.videoUrl}
            ></textarea>
          </div>

          <button
            disabled={isLoading || updateIsLoading}
            className="primary_btn text-sm w-max"
          >
            {isLoading || updateIsLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
}
