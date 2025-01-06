import toast from "react-hot-toast";
import { useUpdateCounterCountMutation } from "../../../Redux/counterApi";

export default function EditCount({ id, editCount, setEditCount, item }) {
  const [updateCounterCount, { isLoading }] = useUpdateCounterCountMutation();

  const handleEdit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const number = e.target.number.value;

    const data = {
      id,
      title: item?.title,
      number: item?.number,
      newTitle: title,
      newNumber: number,
    };

    const res = await updateCounterCount(data);

    if (res?.data?.success) {
      toast.success("Count update Success");
      setEditCount(false);
      e.target.reset();
    } else {
      toast.error(
        res?.data?.message ? res?.data?.message : "something went wrong!"
      );
    }
  };

  return (
    <>
      <button
        className={`modal_overlay ${editCount && "modal_overlay_show"}`}
        onClick={() => setEditCount(false)}
      ></button>

      <div
        className={`modal w-[90%] sm:w-[500px] ${editCount && "modal_show"}`}
      >
        <div className="modal_content">
          <h2 className="text-xl mb-3 text-center">Edit Count</h2>
          <form onSubmit={handleEdit} className="flex flex-col gap-4">
            <div className="form_group">
              <label>Count Title</label>
              <input type="text" name="title" defaultValue={item?.title} />
            </div>

            <div className="form_group">
              <label>Count Number</label>
              <input type="number" name="number" defaultValue={item?.number} />
            </div>

            <button type="submit" className="primary_btn">
              {isLoading ? "Loading..." : "Add"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
