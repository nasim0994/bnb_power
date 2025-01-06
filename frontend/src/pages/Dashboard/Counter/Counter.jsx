import { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import {
  useAddCounterMutation,
  useDeleteCounterCountMutation,
  useGetCounterQuery,
  useUpdateCounterMutation,
} from "../../../Redux/counterApi";
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import AddCount from "./AddCount";
import EditCount from "./EditCount";

export default function Counter() {
  const [images, setImages] = useState([]);
  const [addCount, setAddCount] = useState(false);
  const [editCount, setEditCount] = useState(false);
  const [count, setCount] = useState([]);
  const [selectedCount, setSelectedCount] = useState(null);

  const { data } = useGetCounterQuery();
  const counter = data?.data;
  const id = counter?._id;

  useEffect(() => {
    if (counter) {
      setCount(counter?.count);
    }
  }, [counter]);

  const [addCounter, { isLoading: addIsLoading }] = useAddCounterMutation();
  const [updateCounter, { isLoading: updateIsLoading }] =
    useUpdateCounterMutation();

  const hanldeAddUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("bgImage", images[0]?.file);
    formData.append("title", e.target.title.value);

    if (id) {
      const res = await updateCounter({ id, formData });
      if (res?.data?.success) {
        toast.success("Counter Update Success");
        setImages([]);
      } else {
        toast.error("something went wrong!");
      }
    } else {
      const res = await addCounter(formData);
      if (res?.data?.success) {
        toast.success("Counter Add Success");
        setImages([]);
      } else {
        toast.error("something went wrong!");
      }
    }
  };

  const [deleteCounterCount] = useDeleteCounterCountMutation();

  const handleDeleteCount = async (item) => {
    const isConfirm = window.confirm("Are you sure you want to delete?");

    if (isConfirm) {
      const data = {
        id,
        title: item?.title,
        number: item?.number,
      };

      const res = await deleteCounterCount(data);

      if (res?.data?.success) {
        toast.success("Count Delete Success");
      } else {
        toast.error(
          res?.data?.message ? res?.data?.message : "Something went wrong"
        );
        console.log(res);
      }
    }
  };

  return (
    <section className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium text-neutral">Counter</h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <form className="p-4 " onSubmit={hanldeAddUpdate}>
          <div>
            <div>
              <p className="mb-1">Title</p>
              <input
                type="text"
                name="title"
                required
                defaultValue={counter?.title}
              />
            </div>

            <div className="mt-4">
              <p className="mb-1">Background Image</p>
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
                            alt="counter"
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

              {counter?.bgImage && (
                <div className="mt-4">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${
                      counter?.bgImage
                    }`}
                    alt="counter"
                    className="w-40 h-20"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-5">
            <div className="flex gap-2">
              <button
                disabled={addIsLoading || (updateIsLoading && "disabled")}
                className="primary_btn"
              >
                {addIsLoading || updateIsLoading
                  ? "Loading..."
                  : id
                  ? "Update"
                  : "Add"}
              </button>
            </div>
          </div>
        </form>

        <div className="p-4">
          <div className="flex justify-between items-center">
            <p className="mb-2">Count</p>
            <button
              onClick={() => setAddCount(!addCount)}
              className="primary_btn text-sm"
            >
              Add
            </button>

            <AddCount id={id} addCount={addCount} setAddCount={setAddCount} />
          </div>

          <div className="relative overflow-x-auto mt-2">
            <table>
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Title</th>
                  <th>Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {count?.length > 0 &&
                  count?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.title}</td>
                      <td>{item?.number}</td>
                      <td>
                        <div className="flex gap-2">
                          <div>
                            <button
                              onClick={() => {
                                setSelectedCount(item);
                                setEditCount(!editCount);
                              }}
                            >
                              <MdEdit />
                            </button>

                            <EditCount
                              id={id}
                              editCount={editCount}
                              setEditCount={setEditCount}
                              item={selectedCount}
                            />
                          </div>
                          <button onClick={() => handleDeleteCount(item)}>
                            <AiOutlineDelete className="text-lg hover:text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
