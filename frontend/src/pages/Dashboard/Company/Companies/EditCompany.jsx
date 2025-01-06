import { useEffect, useRef, useState } from "react";
import ReactImageUploading from "react-images-uploading";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useEditCompanyMutation,
  useGetSingleCompanyQuery,
} from "../../../../Redux/companyApi";
import JoditEditor from "jodit-react";

export default function EditCompany() {
  const { id } = useParams();
  const editor = useRef(null);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");

  const { data, isLoading } = useGetSingleCompanyQuery(id);
  const company = data?.data;

  useEffect(() => {
    if (company) {
      setDescription(company?.description);
    }
  }, [company]);

  const [editCompany, { isLoading: editLoading }] = useEditCompanyMutation();

  const handleEdit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const profile = e.target.profile.files[0];

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    if (images?.length > 0) formData.append("image", images[0].file);
    if (profile) formData.append("profile", profile);

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

          <div>
            <p className="mb-1">
              Profile Doc <small>(pdf Only)</small> -{" "}
              <small>{company?.profile}</small>
            </p>
            <input type="file" name="profile" />
          </div>
        </div>

        <div>
          <p className="mb-1">Description</p>
          <JoditEditor
            ref={editor}
            value={description}
            onBlur={(text) => setDescription(text)}
          />
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
