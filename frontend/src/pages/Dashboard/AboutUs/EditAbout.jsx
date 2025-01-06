import JoditEditor from "jodit-react";
import { useEffect, useState } from "react";
import {
  useGetSingleAboutQuery,
  useUpdateAboutMutation,
} from "../../../Redux/aboutApi";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditAbout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");

  const { data } = useGetSingleAboutQuery(id);
  const about = data?.data;

  useEffect(() => {
    if (about) {
      setDescription(about?.description);
    }
  }, [about]);

  const [updateAbout, { isLoading }] = useUpdateAboutMutation();

  const handleEdit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;

    if (!title || !description) {
      return toast.error("Please fill all the fields");
    }

    const data = {
      title,
      description,
    };

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
          <p className="mb-1">Title</p>
          <input type="text" name="title" defaultValue={about?.title} />
        </div>

        <div>
          <p className="mb-1">Description</p>

          <JoditEditor
            tabIndex={1}
            value={description}
            onBlur={(text) => setDescription(text)}
          />
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
