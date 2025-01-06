import toast from "react-hot-toast";
import {
  useAddFeatureSectionMutation,
  useGetFeatureSectionQuery,
  useUpdateFeatureSectionMutation,
} from "../../../Redux/featureSectionApi";

export default function FeatureSection() {
  const { data } = useGetFeatureSectionQuery();
  const featureSection = data?.data;
  const id = featureSection?._id;

  const [addFeatureSection, { isLoading }] = useAddFeatureSectionMutation();
  const [updateFeatureSection, { isLoading: updateIsLoading }] =
    useUpdateFeatureSectionMutation();

  const handleFeatureSection = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");

    const data = {
      title,
    };

    if (id) {
      const res = await updateFeatureSection({ data, id });
      if (res.data?.success) {
        toast.success("Video Section Updated Successfully");
      } else {
        toast.error(res.data?.message || "Something went wrong");
        console.log(res);
      }
    } else {
      const res = await addFeatureSection(data);
      if (res.data?.success) {
        toast.success("Video Section Added Successfully");
      } else {
        toast.error(res.data?.message || "Something went wrong");
        console.log(res);
      }
    }
  };

  return (
    <section className="bg-base-100 p-4 rounded">
      <h1 className="font-medium text-neutral border-b pb-3">
        Feature Section
      </h1>

      <form onSubmit={handleFeatureSection} className="mt-3">
        <div>
          <p className="mb-1">Section Title</p>
          <input
            type="text"
            className="sm:w-96"
            name="title"
            defaultValue={featureSection?.title}
          />
        </div>

        <div className="mt-4">
          <button
            disabled={isLoading || updateIsLoading}
            className="primary_btn text-sm"
          >
            {isLoading || updateIsLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
}
