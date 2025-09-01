"use client";

import { useEffect, useState } from "react";
import ProductList from "@/components/ProductList";
import Cart from "@/components/Cart";
import CategoryTabs from "@/components/CategoryTabs";
import { storage } from "@/utils/storage";
import { fetchCategories, fetchProducts } from "@/utils/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setCart(storage.get("cart", []));
  }, []);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts(search, selectedCategory).then(setProducts);
    }, 300);
    return () => clearTimeout(delayDebounce);
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
      <ProductList
        products={products}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />

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
