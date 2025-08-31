"use client";
import { useState, useEffect } from "react";
import ProductList from "@/components/ProductList";
import ProductForm from "@/components/ProductForm";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", price: "", image: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Load products
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Submit form (Add / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: form.id,
          name: form.name,
          price: parseInt(form.price),
          image: form.image,
          categoryName : form.categoryName,
        }),
      });
      const updated = await res.json();
      setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
      setIsEditing(false);
    } else {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          price: parseInt(form.price),
          image: form.image,
          categoryName : form.categoryName,
        }),
      });
      const newProduct = await res.json();
      setProducts([...products, newProduct]);
    }

    setForm({ id: null, name: "", price: "", image: "", categoryName: "" });
  };

  const handleEditClick = (product) => {
    setForm(product);
    setIsEditing(true);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Product List</h1>

      <ProductForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
      />

      <ProductList
        products={products}
        addToCart={handleEditClick} // klik produk untuk edit
      />
    </main>
  );
}
