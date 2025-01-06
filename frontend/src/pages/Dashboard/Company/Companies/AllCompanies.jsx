import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import {
  useDeleteCompanyMutation,
  useGetAllCompanyQuery,
} from "../../../../Redux/companyApi";

export default function AllCompanies() {
  const { data, isLoading } = useGetAllCompanyQuery();
  const companies = data?.data;

  const [deleteCompany] = useDeleteCompanyMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this Company?");
    if (isConfirm) {
      try {
        const res = await deleteCompany(id);
        if (res?.data?.success) {
          toast.success("Company deleted successfully");
        } else {
          toast.error(res?.data?.message || "Something went wrong!");
          console.log(res);
        }
      } catch (error) {
        toast.error(error?.message);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section>
      <div className="p-4 border-b bg-base-100 rounded shadow">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-neutral">All Company</h3>
          <Link to="/admin/company/add" className="primary_btn text-sm">
            Add Company
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-2 bg-base-100 rounded shadow">
        <table>
          <thead>
            <tr>
              <th>Sl</th>
              <th>Image</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {companies?.map((company, i) => (
              <tr key={company?._id}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${
                      company?.image
                    }`}
                    alt="company"
                    className="w-20 h-10"
                    loading="lazy"
                  />
                </td>
                <td>{company?.name}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/company/edit/${company?._id}`}>
                      <FaRegEdit className="text-base hover:text-green-500 duration-200" />
                    </Link>
                    <button onClick={() => handleDelete(company?._id)}>
                      <AiOutlineDelete className="text-lg hover:text-red-500 duration-200" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
