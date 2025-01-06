import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-hot-toast";
import {
  useGetSingleClassQuery,
  useUpdateClassMutation,
} from "../../../../Redux/portfolio/classApi";
import { useGetAllClsCategoryQuery } from "../../../../Redux/portfolio/categoryApi";

export default function EditClass() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);

  const { data } = useGetSingleClassQuery(id);
  const cls = data?.data;

  useEffect(() => {
    if (cls) {
      setCategory(cls?.category?._id);
    }
  }, [cls]);

  const { data: categoryData } = useGetAllClsCategoryQuery();
  const categories = categoryData?.data;

  const [updateClass, { isLoading }] = useUpdateClassMutation();

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      order: formData.get("order"),
      category: formData.get("category"),
    };

    const res = await updateClass({ id, data });
    if (res?.data?.success) {
      toast.success("Class edit successfully");
      navigate("/admin/portfolio/class/all");
    } else {
      toast.error(res?.data?.message || "Failed to edit class");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 rounded">
      <div className="flex justify-between items-center border-b p-3">
        <h4 className="font-medium">Edit Class</h4>
        <Link
          to="/admin/portfolio/class/all"
          className="secondary_btn flex items-center gap-2"
        >
          <IoMdArrowRoundBack /> Back
        </Link>
      </div>

      <form onSubmit={handleEdit} className="p-3">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div>
              <p className="mb-1">Title</p>
              <input type="text" name="title" defaultValue={cls?.title} />
            </div>

            <div className="mt-4">
              <p className="mb-1">Order</p>
              <input type="number" name="order" defaultValue={cls?.order} />
            </div>

            <div>
              <p className="mb-1">Mother Company Link</p>
              <input type="text" name="mcl" defaultValue={cls?.mcl} />
            </div>

            <div className="mt-4">
              <p className="mb-1">Portfolio</p>
              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
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
                {isLoading ? "Editing.." : "Edit Class"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
