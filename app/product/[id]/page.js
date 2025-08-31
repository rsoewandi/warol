async function getProduct(id) {
    
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function ProductDetail({ params }) {
  const product = await getProduct(params.id);

  if (!product) return <h1>Product not found</h1>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-lg">Rp {product.price.toLocaleString()}</p>
      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg">
        Add to Cart
      </button>
    </div>
  );
}
