import { useState } from "react";
import {
  useGetSingleAboutQuery,
  useUpdateAboutMutation,
} from "../../../Redux/aboutApi";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import ReactImageUploading from "react-images-uploading";

export default function EditAbout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const { data } = useGetSingleAboutQuery(id);
  const about = data?.data;

  const [updateAbout, { isLoading }] = useUpdateAboutMutation();

  const handleEdit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;

    if (!title || !description) {
      return toast.error("Please fill all the fields");
    }

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    if (images.length > 0) data.append("image", images[0].file);

    const res = await updateAbout({ id, data });
    if (res.data?.success) {
      toast.success(res.data.message);
      navigate("/admin/about-us");
    } else {
      toast.error(res.data.message || "Something went wrong");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 rounded p-3">
      <form onSubmit={handleEdit} className="flex flex-col gap-4">
        <div>
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
                          alt="director"
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
            </ReactImageUploading>
          </div>
          <div className="mt-4">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${about?.image}`}
              alt={about?.name}
              className="w-40 h-20"
              loading="lazy"
            />
          </div>
        </div>

        <div>
          <p className="mb-1">Title</p>
          <input type="text" name="title" defaultValue={about?.title} />
        </div>

        <div>
          <p className="mb-1">Description</p>
          <textarea
            name="description"
            defaultValue={about?.description}
            rows={10}
          ></textarea>
        </div>

        <div className="flex gap-3">
          <Link to="/admin/about-us" className="secondary_btn">
            Cancel
          </Link>

          <button type="submit" className="primary_btn" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
}
