import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useGetAllPortfolioQuery } from "../../../../Redux/portfolio/portfolioApi";
import { toast } from "react-hot-toast";
import {
  useAddClsCategoryMutation,
  useGetAllClsCategoryQuery,
} from "../../../../Redux/portfolio/categoryApi";

export default function AddCategory() {
  const navigate = useNavigate();
  const { data } = useGetAllClsCategoryQuery();
  const categories = data?.data;

  const { data: portfolio } = useGetAllPortfolioQuery();
  const portfolios = portfolio?.data;

  const [addClsCategory, { isLoading }] = useAddClsCategoryMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      order: formData.get("order"),
      portfolio: formData.get("portfolio"),
    };

    const res = await addClsCategory(data);
    if (res?.data?.success) {
      toast.success("Category added successfully");
      navigate("/admin/portfolio/category/all");
      formData.set("title", "");
      formData.set("order", "");
    } else {
      toast.error(res?.data?.message || "Failed to add category");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 rounded">
      <div className="flex justify-between items-center border-b p-3">
        <h4 className="font-medium">Add Category</h4>
        <Link
          to="/admin/portfolio/category/all"
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
                defaultValue={categories?.length ? categories.length + 1 : 1}
              />
            </div>

            <div className="mt-4">
              <p className="mb-1">Portfolio</p>
              <select name="portfolio">
                {portfolios?.map((portfolio) => (
                  <option key={portfolio?._id} value={portfolio?._id}>
                    {portfolio?.title}
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
                {isLoading ? "Adding..." : "Add Category"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
