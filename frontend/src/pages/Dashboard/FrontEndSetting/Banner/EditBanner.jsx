import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditBannerMutation,
  useGetBannerByIdQuery,
} from "../../../../Redux/bannerApi";
import toast from "react-hot-toast";

export default function EditBanner() {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const { data } = useGetBannerByIdQuery(id);
  const banner = data?.data;

  const [editBanner, { isLoading: addLoading }] = useEditBannerMutation();

  const handleEditBanner = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (images?.length > 0) formData.append("image", images[0]?.file);

    const res = await editBanner({ id, formData });

    if (res?.data?.success) {
      setImages([]);
      toast.success("Banner update successfully");
      navigate("/admin/frontend/banners");
    } else {
      toast.error(res?.data?.message || "Something went wrong !");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Edit Banner</h3>
      </div>

      <form onSubmit={handleEditBanner} className="p-4">
        <div className="md:w-1/2 w-full">
          <p className="mb-1">Background Image</p>
          <div>
            <ImageUploading
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
                          alt="banner"
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
                </div>
              )}
            </ImageUploading>

            {/* show image */}
            {banner && (
              <div className="mt-4">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${banner?.bgImage}`}
                  alt={banner.title}
                  className="w-40 h-20"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          <div className="mt-3">
            <p className="mb-1">Title</p>
            <input
              type="text"
              name="title"
              required
              defaultValue={banner?.title}
            />
          </div>

          <div className="mt-3">
            <p className="mb-1">Description</p>
            <input
              type="text"
              name="description"
              required
              defaultValue={banner?.description}
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="flex gap-2">
            <button disabled={addLoading && "disabled"} className="primary_btn">
              {addLoading ? "Loading..." : "Edit Banner"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
