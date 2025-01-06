import { BiRightArrowAlt } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { useGetAllProductQuery } from "../Redux/portfolio/productApi";
import Spinner from "../components/Spinner/Spinner";

export default function ProductPage() {
  window.scroll(0, 0);
  const { portfolio, category, cls } = useParams();
  const { data, isLoading } = useGetAllProductQuery({
    portfolio,
    category,
    cls,
  });
  const products = data?.data;

  if (isLoading) return <Spinner />;

  return (
    <section className="py-5">
      <div className="container">
        <p className="flex items-center gap-2 text-neutral/80 text-sm">
          {portfolio} <BiRightArrowAlt /> {category} <BiRightArrowAlt />
          {cls}
        </p>

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products?.length > 0 ? (
            products?.map((product) => (
              <Link
                to={`/product/${product?._id}`}
                key={product?._id}
                className="grid grid-cols-2 gap-3 bg-base-100 shadow rounded p-2"
              >
                <div>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${
                      product?.image
                    }`}
                    alt="product"
                    loading="lazy"
                    className="w-full h-28 object-cover rounded"
                  />
                </div>

                <div>
                  <h1 className="font-medium text-neutral">{product?.title}</h1>
                  <Link
                    to={product?.mothercompany?.link}
                    target="_blank"
                    className="text-primary text-sm"
                  >
                    {product?.mothercompany?.name}
                  </Link>

                  <div className="mt-3 text-sm text-neutral/80">
                    {product?.description.replace(/<[^>]+>/g, "")?.length > 30
                      ? product?.description
                          .replace(/<[^>]+>/g, "")
                          .slice(0, 30) + "..."
                      : product?.description.replace(/<[^>]+>/g, "")}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-red-500">no available product</p>
          )}
        </div>
      </div>
    </section>
  );
}
