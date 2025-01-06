import { useState } from "react";
import ReactImageUploading from "react-images-uploading";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useEditServiceMutation,
  useGetSingleServiceQuery,
} from "../../../Redux/serviceApi";
import toast from "react-hot-toast";

export default function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const { data, isLoading } = useGetSingleServiceQuery(id);
  const service = data?.data;

  const [editService, { isLoading: editLoading }] = useEditServiceMutation();

  const handleEditService = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;

    const formData = new FormData();
    formData.append("title", title);

    if (images?.length > 0) {
      formData.append("image", images[0].file);
    }

    const res = await editService({ id, formData });
    if (res?.data?.success) {
      toast.success("Service edited successfully");
      e.target.reset();
      setImages([]);
      navigate("/admin/services");
    } else {
      toast.error(
        res?.data?.message ? res?.data?.message : "Something went wrong!"
      );
      console.log(res);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Edit Service</h3>
      </div>

      <form onSubmit={handleEditService} className="p-4">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2 w-full flex flex-col gap-2">
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
                              alt="service"
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
                  src={`${import.meta.env.VITE_BACKEND_URL}/${service?.image}`}
                  alt={service?.title}
                  className="w-40 h-20"
                  loading="lazy"
                />
              </div>
            </div>

            <div>
              <p className="mb-1">Title</p>
              <input type="text" name="title" defaultValue={service?.title} />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex gap-2 items-center">
            <Link
              to="/admin/services"
              className="border bg-gray-600 px-6 py-2 rounded text-base-100"
            >
              Cancel
            </Link>
            <button
              disabled={editLoading && "disabled"}
              className="primary_btn"
            >
              {editLoading ? "Loading..." : "Edit Service"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
