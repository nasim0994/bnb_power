import { Link } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "../../../../Redux/portfolio/productApi";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";

export default function AllProducts() {
  const { data } = useGetAllProductQuery();
  const products = data?.data;

  const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this Product?");
    if (isConfirm) {
      try {
        const res = await deleteProduct(id);
        if (res?.data?.success) {
          toast.success("Product deleted successfully");
        } else {
          toast.error(res?.data?.message || "Something went wrong!");
          console.log(res);
        }
      } catch (error) {
        toast.error(error?.message);
        console.log(error);
      }
    }
  };

  return (
    <section>
      <div className="bg-base-100 p-3 rounded flex justify-between items-center">
        <h1 className="font-medium text-neutral">All Products</h1>
        <Link to="/admin/portfolio/product/add" className="primary_btn text-sm">
          Add Product
        </Link>
      </div>

      <div className="relative overflow-x-auto mt-2 bg-base-100 rounded shadow">
        <table>
          <thead>
            <tr>
              <th>Sl</th>
              <th>Product</th>
              <th>Portfolio</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, i) => (
              <tr key={product?._id}>
                <td>{i + 1}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${
                        product?.image
                      }`}
                      alt={product?.title}
                      className="w-10 h-10 rounded-full"
                      loading="lazy"
                    />

                    <p>{product?.title}</p>
                  </div>
                </td>
                <td>
                  {product?.portfolio?.title}-{product?.classCategory?.title}-
                  {product?.class?.title}
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/portfolio/product/edit/${product?._id}`}>
                      <FaRegEdit className="text-base hover:text-green-500 duration-200" />
                    </Link>
                    <button onClick={() => handleDeleteProduct(product?._id)}>
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
