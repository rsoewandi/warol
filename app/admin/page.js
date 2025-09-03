"use client";
import { useState, useEffect } from "react";
import ProductList from "@/components/ProductList";
import ProductForm from "@/components/ProductForm";
import { fetchCategories, fetchProducts,putProducts,postProducts } from "@/utils/api";
import { initSocket } from "@/utils/socketClient"; 

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", price: "", image: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts(null, null).then(setProducts);
    
    const socket = initSocket();

    // const audio = new Audio("/notif.wav");
    socket.on("newProduct", (data) => {
      // setProducts((prev) => [data, ...prev]);
      console.log("data",data);
      // audio.play().catch(err => {
      //     console.error("Playback failed:", err);
      // });
    });

    return () => socket.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      putProducts(form).then((updated) => {
        setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
        setIsEditing(false);
      });

    } else {
      postProducts(form).then((newProduct) => {
        setProducts([...products, newProduct.spec.args.data]);
      });
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

      <ProductList products={products} cart={null} addToCart={handleEditClick} removeFromCart={null} />
    </main>
  );
}
