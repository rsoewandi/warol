"use client";

export default function CategoryTabs({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="mb-6 flex gap-2 overflow-x-auto scrollbar-hide">
      <button
        onClick={() => setSelectedCategory("")}
        className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition 
          ${selectedCategory === "" ? "bg-green-600 text-white shadow" : "bg-green-200 text-gray-700 hover:bg-gray-300"}`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setSelectedCategory(cat.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition 
            ${selectedCategory === cat.id ? "bg-green-600 text-white shadow" : "bg-green-200 text-gray-700 hover:bg-gray-300"}`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
