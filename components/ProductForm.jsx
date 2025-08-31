"use client";
import { useEffect, useState } from "react";

export default function ProductForm({ form, setForm, handleSubmit, isEditing }) {
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories"); // ganti sesuai endpoint API kategori kamu
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="border p-2 rounded w-full"
        required
      />
      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        type="number"
        placeholder="Price"
        className="border p-2 rounded w-full"
        required
      />
      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="border p-2 rounded w-full"
        required
      />

      {/* Category select */}
      <select
        name="categoryName"
        value={form.categoryName || ""}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      >
        <option value="" disabled>
          Select Category
        </option>
        {categories.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {isEditing ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
