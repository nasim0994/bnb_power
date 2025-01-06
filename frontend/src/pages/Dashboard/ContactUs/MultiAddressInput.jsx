import { FaTrash, FaPlus } from "react-icons/fa";

export default function MultiAddressInput({ address, setAddress }) {
  const handleInputChange = (index, event) => {
    const values = [...address];
    values[index][event.target.name] = event.target.value;
    setAddress(values);
  };

  const handleAddFields = () => {
    if (isFormValid()) {
      setAddress([...address, { title: "", number: "" }]);
    } else {
      alert("Please fill all fields before adding a new one.");
    }
  };

  const handleRemoveFields = (index) => {
    const values = [...address];
    values.splice(index, 1);
    setAddress(values);
  };

  const isFormValid = () => {
    return address.every((entry) => entry.title !== "" && entry.number !== "");
  };

  return (
    <div className="mt-3 flex flex-col gap-3 border rounded p-3">
      {address?.map((number, index) => (
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
          disabled={address?.length > 0 && !isFormValid()}
          className="bg-gray-500 px-4 py-2 text-base-100 rounded text-sm flex items-center gap-2"
        >
          <FaPlus className="text-xs" /> Add More Address
        </button>
      </div>
    </div>
  );
}
