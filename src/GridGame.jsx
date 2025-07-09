import { useState, useEffect } from "react";

export default function GridGame() {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
      try {
        const stored = localStorage.getItem("index");
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSelected(parsed);
        }
      } catch {
        setSelected([]);
      }
    }, [])

  function setValue(index) {
    const isSelected = selected.includes(index);
    const updated = isSelected ? selected.filter((i) => i !== index) : [...selected, index];
    setSelected(updated);
  }

  function saveGrid() {
    localStorage.setItem("index", JSON.stringify(selected));
    alert('Saved!')
  }

  function resetGrid() {
    setSelected([]);
    localStorage.removeItem("index");
  }

  return (
    <div className="mt-10 mx-auto place-items-center">
      <div className="grid grid-cols-4 gap-1">
        {Array.from({ length: 16 }).map((_, index) => (
          <div key={index} onClick={() => setValue(index)} className={`w-20 h-20 cursor-pointer rounded ${ selected.includes(index) ? "bg-cyan-500" : "bg-gray-500" }`} ></div> 
          ))}
      </div>

      <div className="mt-4 flex gap-4">
        <button onClick={saveGrid} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded cursor-pointer"> Save </button>
        <button onClick={resetGrid} className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"> Reset </button>
      </div>
    </div>
  );
}