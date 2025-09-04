"use client";

import { useEffect, useState } from "react";
import ProductList from "@/components/ProductList";
import Cart from "@/components/Cart";
import CategoryTabs from "@/components/CategoryTabs";
import { storage } from "@/utils/storage";
import { fetchCategories, fetchProducts,fetchStore } from "@/utils/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [isStore, setIsStore] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCart(storage.get("cart", []));
  }, []);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  useEffect(() => {
    async function checkStore() {
      if(!isStore) setLoading(true);
      const store = await fetchStore(); 
      setIsStore(store?.isstore ?? false);

      if (store?.isstore) {
        // baru ambil kategori & produk
        fetchCategories().then(setCategories);
        fetchProducts(search, selectedCategory).then(setProducts);
      }

      setLoading(false);
    }
    checkStore();
  }, [search, selectedCategory]);

  function addToCart(product) {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      let updatedCart;
      if (exist) {
        updatedCart = prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        updatedCart = [...prev, { ...product, qty: 1 }];
      }
      storage.set("cart", updatedCart);
      return updatedCart;
    });
  }

  // remove item
  function removeFromCart(productId) {
    setCart((prev) => {
      const updatedCart = prev
        .map((item) =>
          item.id === productId ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0);
      storage.set("cart", updatedCart);
      return updatedCart;
    });
  }
  
  if (loading) {
    return (<div className="flex flex-col items-center justify-center h-64">
      <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 font-medium animate-pulse">
      </p>
    </div>
    )
  }
  if (isStore === false) {
    return (
      <main className="flex items-center justify-center h-64">
        <div className="bg-red-50 border border-red-300 rounded-xl p-6 shadow-md animate-pulse text-center">
          <p className="text-red-600 font-bold text-lg">
            🚧 Halo Guys, Toko Sedang Offline 🚧
          </p>
          <p className="text-gray-600 mt-2">Silakan kembali lagi nanti.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 relative">
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-green-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition"
        />
      </div>

      {/* Category tabs */}
      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Product list */}
      {products.length > 0 ? (
        <ProductList
          products={products}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ) : (
        <p className="text-gray-500 mt-4">Data kosong</p>
      )}
      
      {/* Cart */}
      {cart.length > 0 && (
        <Cart
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      )}
    </main>
  );
}
