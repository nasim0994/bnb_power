import { FaTrash, FaPlus } from "react-icons/fa";

export default function MultiNumberInput({ numbers, setNumbers }) {
  const handleInputChange = (index, event) => {
    const values = [...numbers];
    values[index][event.target.name] = event.target.value;
    setNumbers(values);
  };

  const handleAddFields = () => {
    if (isFormValid()) {
      setNumbers([...numbers, { title: "", number: "" }]);
    } else {
      alert("Please fill all fields before adding a new one.");
    }
  };

  const handleRemoveFields = (index) => {
    const values = [...numbers];
    values.splice(index, 1);
    setNumbers(values);
  };

  const isFormValid = () => {
    return numbers.every((entry) => entry.title !== "" && entry.number !== "");
  };

  return (
    <div className="mt-3 flex flex-col gap-3 border rounded p-3">
      {numbers?.map((number, index) => (
        <div key={index} className="flex gap-2 text-sm">
          <input
            type="text"
            name="title"
            placeholder="Title (e.g., Home, Work)"
            value={number.title}
            onChange={(event) => handleInputChange(index, event)}
          />
          <input
            type="text"
            name="number"
            placeholder="Phone Number"
            value={number.number}
            onChange={(event) => handleInputChange(index, event)}
          />
          <button
            type="button"
            onClick={() => handleRemoveFields(index)}
            className="w-20 bg-red-500 text-white rounded-md flex items-center justify-center"
          >
            <FaTrash />
          </button>
        </div>
      ))}

      <div>
        <button
          type="button"
          onClick={handleAddFields}
          disabled={numbers.length > 0 && !isFormValid()}
          className="bg-gray-500 px-4 py-2 text-base-100 rounded text-sm flex items-center gap-2"
        >
          <FaPlus className="text-xs" /> Add More Number
        </button>
      </div>
    </div>
  );
}
