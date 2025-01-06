import toast from "react-hot-toast";
import {
  useAddBusinessInfoMutation,
  useGetBusinessInfoQuery,
  useUpdateBusinessInfoMutation,
} from "../../../../Redux/businessInfoApi";

export default function BusinessInfo() {
  const { data } = useGetBusinessInfoQuery();
  const business = data?.data;
  const id = business?._id;

  const [addBusinessInfo, { isLoading: addIsLoading }] =
    useAddBusinessInfoMutation();
  const [updateBusinessInfo, { isLoading: updateIsLoading }] =
    useUpdateBusinessInfoMutation();

  const hanldeAddUpdate = async (e) => {
    e.preventDefault();

    const businessName = e.target.businessName.value;
    const businessStartYear = e.target.businessStartYear.value;
    const businessType = e.target.businessType.value;
    const tagline = e.target.tagline.value;

    const info = {
      businessName,
      businessStartYear,
      businessType,
      tagline,
    };

    if (id) {
      const res = await updateBusinessInfo({ id, info });
      if (res?.data?.success) {
        toast.success("Business Info Update Success");
      } else {
        toast.error(
          res?.data?.message ? res?.data?.message : "something went wrong!"
        );
        console.log(res);
      }
    } else {
      const res = await addBusinessInfo(info);
      if (res?.data?.success) {
        toast.success("Business Info Add Success");
      } else {
        toast.error(
          res?.data?.message ? res?.data?.message : "something went wrong!"
        );
        console.log(res);
      }
    }
  };

  return (
    <section className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium text-neutral">Business Info</h3>
      </div>

      <form className="p-4" onSubmit={hanldeAddUpdate}>
        <div className="text-neutral-content grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
          <div>
            <p className="mb-1">Business Name</p>
            <input
              type="text"
              name="businessName"
              required
              defaultValue={business?.businessName}
            />
          </div>
          <div>
            <p className="mb-1">Business Start Year</p>
            <input
              type="number"
              name="businessStartYear"
              defaultValue={business?.businessStartYear}
            />
          </div>

          <div>
            <p className="mb-1">Business Type</p>
            <input
              type="text"
              name="businessType"
              defaultValue={business?.businessType}
            />
          </div>

          <div className="sm:col-span-2">
            <p className="mb-1">Business Tagline</p>
            <textarea
              name="tagline"
              defaultValue={business?.tagline}
            ></textarea>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex gap-2">
            <button
              disabled={addIsLoading || (updateIsLoading && "disabled")}
              className="primary_btn"
            >
              {addIsLoading || updateIsLoading
                ? "Loading..."
                : id
                ? "Update"
                : "Add"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
