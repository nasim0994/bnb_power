import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  useGetAllPortfolioQuery,
  useGetSinglePortfolioQuery,
  useUpdatePortfolioMutation,
} from "../../../../Redux/portfolio/portfolioApi";
import { toast } from "react-hot-toast";

export default function EditPortfolio() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetSinglePortfolioQuery(id);
  const portfolio = data?.data;

  const [updatePortfolio, { isLoading }] = useUpdatePortfolioMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      order: formData.get("order"),
    };

    const res = await updatePortfolio({ id, data });
    if (res?.data?.success) {
      toast.success("Portfolio edit successfully");
      navigate("/admin/portfolio/all");
      formData.set("title", "");
      formData.set("order", "");
    } else {
      toast.error(res?.data?.message || "Failed to edit portfolio");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 rounded">
      <div className="flex justify-between items-center border-b p-3">
        <h4 className="font-medium">Edit Portfolio</h4>
        <Link
          to="/admin/portfolio/all"
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
              <input type="text" name="title" defaultValue={portfolio?.title} />
            </div>

            <div className="mt-4">
              <p className="mb-1">Order</p>
              <input
                type="number"
                name="order"
                defaultValue={portfolio?.order}
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="primary_btn"
                disabled={isLoading}
              >
                {isLoading ? "Editing..." : "Edit Portfolio"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
