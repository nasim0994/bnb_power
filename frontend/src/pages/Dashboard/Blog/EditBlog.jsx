import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import ReactImageUploading from "react-images-uploading";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEditBlogMutation, useGetBlogQuery } from "../../../Redux/blogsApi";
import toast from "react-hot-toast";

export default function EditBlog() {
  const { id } = useParams();
  const editor = useRef(null);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");

  const { data, isLoading } = useGetBlogQuery(id);
  const service = data?.data;

  const [editBlog, { isLoading: editLoading }] = useEditBlogMutation();

  const handleEdit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;

    const formData = new FormData();
    formData.append("title", title);

    if (description.length > 0) {
      formData.append("description", description);
    } else {
      formData.append("description", service?.description);
    }
    if (images?.length > 0) {
      formData.append("image", images[0].file);
    }

    const res = await editBlog({ id, formData });
    if (res?.data?.success) {
      toast.success("Blog edited successfully");
      e.target.reset();
      setImages([]);
      setDescription("");
      navigate("/admin/blogs");
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
        <h3>Edit Blog</h3>
      </div>

      <form onSubmit={handleEdit} className="p-4">
        <div className="flex flex-col gap-2">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="mb-1">Title</p>
              <input type="text" name="title" defaultValue={service?.title} />
            </div>

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
                              alt="blog"
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

              <div className="mt-2">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${service?.image}`}
                  alt="blog"
                  className="w-40 h-14"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded">
          <p className="border-b p-3">Description</p>

          <div className="p-4 about_details">
            <JoditEditor
              ref={editor}
              value={service?.description ? service?.description : description}
              onBlur={(text) => setDescription(text)}
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="flex gap-2 items-center">
            <Link
              to="/admin/blogs"
              className="border bg-gray-600 px-6 py-2 rounded text-base-100"
            >
              Cancel
            </Link>
            <button
              disabled={editLoading && "disabled"}
              className="primary_btn"
            >
              {editLoading ? "Loading..." : "Edit Blog"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
