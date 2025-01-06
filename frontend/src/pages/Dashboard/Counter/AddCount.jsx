import toast from "react-hot-toast";
import { useAddCounterCountMutation } from "../../../Redux/counterApi";

export default function AddCount({ id, addCount, setAddCount }) {
  const [addCounterCount, { isLoading }] = useAddCounterCountMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const number = e.target.number.value;

    const data = {
      id,
      title,
      number,
    };

    const res = await addCounterCount(data);

    if (res?.data?.success) {
      toast.success("Count Add Success");
      setAddCount(false);
      e.target.reset();
    } else {
      toast.error(res?.data?.message);
    }
  };

  return (
    <>
      <button
        className={`modal_overlay ${addCount && "modal_overlay_show"}`}
        onClick={() => setAddCount(false)}
      ></button>

      <div className={`modal w-[90%] sm:w-[500px] ${addCount && "modal_show"}`}>
        <div className="modal_content">
          <h2 className="text-xl mb-3 text-center">Add Count</h2>
          <form onSubmit={handleAdd} className="flex flex-col gap-4">
            <div className="form_group">
              <label>Count Title</label>
              <input type="text" name="title" />
            </div>

            <div className="form_group">
              <label>Count Number</label>
              <input type="number" name="number" />
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
