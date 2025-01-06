import { Link, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../Redux/portfolio/productApi";
import parser from "html-react-parser";
import Spinner from "../components/Spinner/Spinner";

export default function ProductDetails() {
  window.scroll(0, 0);
  const { id } = useParams();
  const { data, isLoading } = useGetSingleProductQuery(id);
  const product = data?.data;

  if (isLoading) return <Spinner />;

  return (
    <section>
      <div className="py-5 bg-primary/10 text-center">
        <h1 className="font-semibold text-neutral text-xl sm:text-2xl">
          {product?.title}
        </h1>
        <Link
          to={product?.mothercompany?.link}
          target="_blank"
          className="text-primary text-[15px]"
        >
          {product?.mothercompany?.name}
        </Link>

        <p className="flex items-center gap-2 text-neutral/80 text-sm justify-center">
          {product?.portfolio?.title} - {product?.classCategory?.title} -
          {product?.class?.title}
        </p>
      </div>
      <div className="container py-6">
        <div className="grid sm:grid-cols-2 gap-10 items-start">
          <div className="order-2 sm:order-1">
            {product?.description && parser(product?.description)}
          </div>

          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${product?.image}`}
            alt="product"
            loading="lazy"
            className="w-full object-cover rounded order-1 sm:order-2"
          />
        </div>
      </div>
    </section>
  );
}
