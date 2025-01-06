import { useEffect, useRef, useState } from "react";
import ReactImageUploading from "react-images-uploading";
import { AiFillDelete } from "react-icons/ai";
import JoditEditor from "jodit-react";
import {
  useAddProductMutation,
  useEditProductMutation,
  useGetSingleProductQuery,
} from "../../../../Redux/portfolio/productApi";
import toast from "react-hot-toast";
import { useGetAllPortfolioQuery } from "../../../../Redux/portfolio/portfolioApi";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllClsCategoryQuery } from "../../../../Redux/portfolio/categoryApi";
import { useGetAllClassQuery } from "../../../../Redux/portfolio/classApi";

export default function EditProduct() {
  const { id } = useParams();
  const editor = useRef(null);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");

  const { data } = useGetSingleProductQuery(id);
  const product = data?.data;

  const [selectedPortfolioId, setSelectedPortfolioId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");

  useEffect(() => {
    if (product) {
      setSelectedPortfolioId(product?.portfolio?._id);
      setSelectedCategoryId(product?.classCategory?._id);
      setSelectedClassId(product?.class?._id);
      setDescription(product?.description);
    }
  }, [product]);

  const { data: portfolio } = useGetAllPortfolioQuery();
  const { data: category } = useGetAllClsCategoryQuery({
    portfolio: selectedPortfolioId,
  });
  const categories = category?.data;

  const { data: cls } = useGetAllClassQuery({
    category: selectedCategoryId,
  });
  const classes = cls?.data;

  useEffect(() => {
    if (categories?.length > 0) setSelectedCategoryId(categories[0]?._id);
    if (classes?.length > 0) setSelectedClassId(classes[0]?._id);
  }, [selectedPortfolioId, categories]);

  const [editProduct, { isLoading }] = useEditProductMutation();

  const handleEditProduct = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const mothercompanyName = e.target.mothercompanyName.value;
    const mothercompanyLink = e.target.mothercompanyLink.value;

    const data = {
      title,
      description,
      mothercompany: { name: mothercompanyName, link: mothercompanyLink },
      portfolio: selectedPortfolioId,
      classCategory: selectedCategoryId,
      class: selectedClassId,
    };

    const formData = new FormData();
    if (images?.length > 0) formData.append("image", images[0].file);
    formData.append("data", JSON.stringify(data));

    const res = await editProduct({ id, formData });

    if (res?.data?.success) {
      toast.success("Product added successfully");
      e.target.reset();
      setImages([]);
      navigate("/admin/portfolio/product/all");
    } else {
      toast.error(res?.data?.message || "Something went wrong!");
      console.log(res);
    }
  };

  return (
    <section className="text-neutral">
      <div className="bg-base-100 rounded p-3 flex justify-between items-center">
        <h1 className="font-medium">Edit Product</h1>
      </div>

      <div className="bg-base-100 rounded p-3 mt-2">
        <form
          onSubmit={handleEditProduct}
          className="flex flex-col gap-3 text-sm"
        >
          <div>
            <p className="mb-1">Image</p>
            <ReactImageUploading
              defaultValue={images}
              onChange={(icn) => setImages(icn)}
              dataURLKey="data_url"
            >
              {({ onImageUpload, onImageRemove, dragProps }) => (
                <div
                  className="border rounded border-dashed p-4 md:flex items-center gap-10"
                  {...dragProps}
                >
                  <div className="flex items-center gap-2">
                    <span
                      onClick={onImageUpload}
                      className="w-max px-4 py-1.5 rounded-2xl text-base-100 bg-primary cursor-pointer text-sm"
                    >
                      Choose Image
                    </span>

                    <p className="text-neutral-content">or Drop here</p>
                  </div>

                  <div className={`${images?.length > 0 && "mt-4"} `}>
                    {images?.map((img, index) => (
                      <div key={index} className="image-item relative">
                        <img
                          src={img["data_url"]}
                          alt="product"
                          className="w-32 h-20"
                          loading="lazy"
                        />
                        <div
                          onClick={() => onImageRemove(index)}
                          className="w-7 h-7 bg-primary rounded-full flex justify-center items-center text-base-100 absolute top-0 right-0 cursor-pointer"
                        >
                          <AiFillDelete />
                        </div>
                      </div>
                    ))}
                  </div>

                  {!images?.length && (
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${
                        product?.image
                      }`}
                      alt={product?.title}
                      className="w-32 h-20"
                      loading="lazy"
                    />
                  )}
                </div>
              )}
            </ReactImageUploading>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <p className="mb-1">Title</p>
              <input
                type="text"
                name="title"
                required
                defaultValue={product?.title}
              />
            </div>

            <div>
              <p className="mb-1">Portfolio</p>
              <select
                value={selectedPortfolioId}
                onChange={(e) => setSelectedPortfolioId(e.target.value)}
                required
              >
                {portfolio?.data?.map((item) => (
                  <option key={item?._id} value={item?._id}>
                    {item?.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Class Category</p>
              <select
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                required
                value={selectedCategoryId}
              >
                {categories?.map((item) => (
                  <option key={item?._id} value={item?._id}>
                    {item?.title} - {item?.portfolio?.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Class</p>
              <select
                onChange={(e) => setSelectedClassId(e.target.value)}
                required
                value={selectedClassId}
              >
                {classes?.map((item) => (
                  <option key={item?._id} value={item?._id}>
                    {item?.title} - {item?.category?.title} -{" "}
                    {item?.category?.portfolio?.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1">Mother Company Name</p>
              <input
                type="text"
                name="mothercompanyName"
                required
                defaultValue={product?.mothercompany?.name}
              />
            </div>

            <div>
              <p className="mb-1">Mother Company Link</p>
              <input
                type="text"
                name="mothercompanyLink"
                required
                defaultValue={product?.mothercompany?.link}
              />
            </div>
          </div>

          <div className="h400">
            <p className="mb-1">Description</p>
            <JoditEditor
              ref={editor}
              value={description}
              onBlur={(text) => setDescription(text)}
            />
          </div>

          <div>
            <button disabled={isLoading} className="primary_btn">
              {isLoading ? "Loading..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
