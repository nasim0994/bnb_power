import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useGetAllPortfolioQuery } from "../../../../Redux/portfolio/portfolioApi";
import { toast } from "react-hot-toast";
import {
  useGetSingleClsCategoryQuery,
  useUpdateClsCategoryMutation,
} from "../../../../Redux/portfolio/categoryApi";
import { useEffect, useState } from "react";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);

  const { data } = useGetSingleClsCategoryQuery(id);
  const category = data?.data;

  useEffect(() => {
    if (category) {
      setPortfolio(category?.portfolio?._id);
    }
  }, [category]);

  const { data: portfolioData } = useGetAllPortfolioQuery();
  const portfolios = portfolioData?.data;

  const [updateClsCategory, { isLoading }] = useUpdateClsCategoryMutation();

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      order: formData.get("order"),
      portfolio: formData.get("portfolio"),
    };

    const res = await updateClsCategory({ id, data });
    if (res?.data?.success) {
      toast.success("Category edit successfully");
      navigate("/admin/portfolio/category/all");
    } else {
      toast.error(res?.data?.message || "Failed to edit category");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 rounded">
      <div className="flex justify-between items-center border-b p-3">
        <h4 className="font-medium">Edit Category</h4>
        <Link
          to="/admin/portfolio/category/all"
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
              <input type="text" name="title" defaultValue={category?.title} />
            </div>

            <div className="mt-4">
              <p className="mb-1">Order</p>
              <input
                type="number"
                name="order"
                defaultValue={category?.order}
              />
            </div>

            <div className="mt-4">
              <p className="mb-1">Portfolio</p>
              <select
                name="portfolio"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
              >
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
                {isLoading ? "Editing.." : "Edit Category"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
