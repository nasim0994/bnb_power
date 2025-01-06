import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {
  useDeletePortfolioMutation,
  useGetAllPortfolioQuery,
} from "../../../../Redux/portfolio/portfolioApi";

export default function AllPortfolio() {
  const { data } = useGetAllPortfolioQuery();
  const portfolios = data?.data;

  const [deletePortfolio] = useDeletePortfolioMutation();
  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure you want to delete?");
    if (!isConfirm) return;

    const res = await deletePortfolio(id);

    if (res?.data?.success) {
      toast.success("Portfolio deleted successfully");
    } else {
      toast.error(res?.data?.message || "Failed to delete portfolio");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 rounded">
      <div className="flex justify-between items-center border-b p-3">
        <h4 className="font-medium">Portfolio</h4>
        <Link to="/admin/portfolio/add" className="primary_btn ">
          Add New
        </Link>
      </div>

      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Sl</th>
                <th>Title</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {portfolios?.map((portfolio, i) => (
                <tr key={portfolio?._id}>
                  <td>{i + 1}</td>
                  <td>{portfolio?.title}</td>
                  <td>{portfolio?.order}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/admin/portfolio/edit/${portfolio?._id}`}
                        className="hover:text-primary"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        onClick={() => handleDelete(portfolio?._id)}
                        className="hover:text-red-500 text-sm"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
