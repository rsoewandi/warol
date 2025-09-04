"use client";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";   // <--- Tambahkan ini
import ProductList from "@/components/ProductList";
import ProductForm from "@/components/ProductForm";
import { fetchCategories, fetchProducts, putProducts, postProducts,postStore } from "@/utils/api";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", price: "", image: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts(null, null).then(setProducts);
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
  // === Bulk Import Excel ===
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // postProducts untuk setiap data Excel
      Promise.all(jsonData.map(item => postProducts(item)))
        .then((results) => {
          const newProducts = results.map(r => r.spec.args.data);
          setProducts([...products, ...newProducts]);
        })
        .catch(err => console.error("Bulk import error:", err));
    };
    reader.readAsArrayBuffer(file);
  };

  const handleStoreTypeChange = (e) => {
    const value = e.target.value;
    postStore(value); 
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Product List</h1>

      {/* Form produk satuan */}
      <ProductForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
      />

      {/* Dropdown Toko Online / Offline */}
      <div className="my-4">
        <select
          value={form.storeType}
          onChange={handleStoreTypeChange}
          className="border p-2 rounded w-48"
        >
          <option value="true">Online</option>
          <option value="false">Offline</option>
        </select>
      </div>
      {/* Upload Excel */}
      <div className="my-4">
        <label className="block mb-2 font-medium">Bulk Import (Excel):</label>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="border p-2 rounded"
        />
      </div>

      {/* Daftar produk */}
      <ProductList
        products={products}
        cart={null}
        addToCart={handleEditClick}
        removeFromCart={null}
      />
    </main>
  );
}
