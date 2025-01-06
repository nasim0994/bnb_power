import { useState } from "react";
import ReactImageUploading from "react-images-uploading";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useEditCompanyMutation,
  useGetSingleCompanyQuery,
} from "../../../../Redux/companyApi";

export default function EditCompany() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const { data, isLoading } = useGetSingleCompanyQuery(id);
  const company = data?.data;

  const [editCompany, { isLoading: editLoading }] = useEditCompanyMutation();

  const handleEdit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    const formData = new FormData();
    formData.append("name", name);
    if (images?.length > 0) {
      formData.append("image", images[0].file);
    }

    const res = await editCompany({ id, formData });
    if (res?.data?.success) {
      toast.success("Company edited successfully");
      e.target.reset();
      setImages([]);
      navigate("/admin/company/all");
    } else {
      toast.error(res?.data?.message || "Something went wrong!");
      console.log(res);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Edit Company</h3>
      </div>

      <form onSubmit={handleEdit} className="p-4">
        <div className="grid sm:grid-cols-2 gap-4">
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
                src={`${import.meta.env.VITE_BACKEND_URL}/${company?.image}`}
                alt={company?.name}
                className="w-40 h-20"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <div>
            <p className="mb-1">Name</p>
            <input type="text" name="name" defaultValue={company?.name} />
          </div>
        </div>

        <div className="mt-5">
          <div className="flex gap-2 items-center">
            <button disabled={editLoading} className="primary_btn">
              {editLoading ? "Loading..." : "Edit Company"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
