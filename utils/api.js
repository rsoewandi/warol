import { storage } from "./storage";

export async function fetchCategories() {
  const cached = storage.get("categories");
  if (cached) return cached;

  try {
    const res = await fetch("/api/categories", { cache: "no-store" });
    const data = await res.json();
    storage.set("categories", data);
    return data;
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    return [];
  }
}

export async function fetchProducts(query = "", categoryId = "") {
  const cacheKey = `products-${query}-${categoryId}`;
  const cached = storage.get(cacheKey);
  if (cached) return cached;

  const params = new URLSearchParams();
  if (query) params.append("name", query);
  if (categoryId) params.append("categoryId", categoryId);

  try {
    const res = await fetch(`/api/products?${params.toString()}`, {
      cache: "no-store",
    });
    const data = await res.json();
    storage.set(cacheKey, data);
    return data;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
}

export async function putProducts(form) {
  try {
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
      return updated;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
}

export async function postProducts(form) {
  try {
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
      return newProduct;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
}