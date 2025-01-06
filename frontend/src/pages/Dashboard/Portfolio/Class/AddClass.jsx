import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useGetAllClsCategoryQuery } from "../../../../Redux/portfolio/categoryApi";
import {
  useAddClassMutation,
  useGetAllClassQuery,
} from "../../../../Redux/portfolio/classApi";

export default function AddClass() {
  const navigate = useNavigate();
  const { data } = useGetAllClassQuery();
  const classes = data?.data;

  const { data: category } = useGetAllClsCategoryQuery();
  const categories = category?.data;

  const [addClass, { isLoading }] = useAddClassMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      order: formData.get("order"),
      mcl: formData.get("mcl"),
      category: formData.get("category"),
    };

    const res = await addClass(data);
    if (res?.data?.success) {
      toast.success("Class added successfully");
      navigate("/admin/portfolio/class/all");
      formData.set("title", "");
      formData.set("order", "");
      formData.set("mcl", "");
    } else {
      toast.error(res?.data?.message || "Failed to add class");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 rounded">
      <div className="flex justify-between items-center border-b p-3">
        <h4 className="font-medium">Add Class</h4>
        <Link
          to="/admin/portfolio/class/all"
          className="secondary_btn flex items-center gap-2"
        >
          <IoMdArrowRoundBack /> Back
        </Link>
      </div>

      <form onSubmit={handleAdd} className="p-3">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div>
              <p className="mb-1">Title</p>
              <input type="text" name="title" />
            </div>

            <div className="mt-4">
              <p className="mb-1">Order</p>
              <input
                type="number"
                name="order"
                defaultValue={classes?.length ? classes.length + 1 : 1}
              />
            </div>

            <div className="mt-4">
              <p className="mb-1">Mother Company Link</p>
              <input type="text" name="mcl" />
            </div>

            <div className="mt-4">
              <p className="mb-1">Category</p>
              <select name="category">
                {categories?.map((category) => (
                  <option key={category?._id} value={category?._id}>
                    {category?.title} - {category?.portfolio?.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="primary_btn"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Class"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
