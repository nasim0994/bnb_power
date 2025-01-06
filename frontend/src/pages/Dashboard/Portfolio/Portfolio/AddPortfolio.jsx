import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  useAddPortfolioMutation,
  useGetAllPortfolioQuery,
} from "../../../../Redux/portfolio/portfolioApi";
import { toast } from "react-hot-toast";

export default function AddPortfolio() {
  const navigate = useNavigate();
  const { data } = useGetAllPortfolioQuery();
  const portfolios = data?.data;

  const [addPortfolio, { isLoading }] = useAddPortfolioMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      order: formData.get("order"),
    };

    const res = await addPortfolio(data);
    if (res?.data?.success) {
      toast.success("Portfolio added successfully");
      navigate("/admin/portfolio/all");
      formData.set("title", "");
      formData.set("order", "");
    } else {
      toast.error(res?.data?.message || "Failed to add portfolio");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 rounded">
      <div className="flex justify-between items-center border-b p-3">
        <h4 className="font-medium">Add Portfolio</h4>
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
              <input type="text" name="title" />
            </div>

            <div className="mt-4">
              <p className="mb-1">Order</p>
              <input
                type="number"
                name="order"
                defaultValue={portfolios?.length ? portfolios.length + 1 : 1}
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="primary_btn"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Portfolio"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
