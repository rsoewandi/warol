"use client";
import { useState } from "react";

export default function ProductList({ products, cart, addToCart, removeFromCart }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      {/* Grid Produk */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {products.map((product) => {
          const cartItem = cart?.find((item) => item?.id === product?.id) ?? null;

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-28 h-28 object-cover mb-3 rounded-xl cursor-pointer"
                onClick={() => setSelectedImage(product.image)}
              />
              <h3 className="font-semibold text-center text-gray-800 text-lg">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {product.price?.toLocaleString()}
              </p>

              {cartItem ? (
                <div className="mt-3 flex items-center text-green-700 text-xs font-medium">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="px-2 py-1 bg-red-200 rounded hover:bg-red-300"
                  >
                    -
                  </button>
                  <span className="min-w-[20px] text-center mx-4">
                    {cartItem.qty}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="mt-auto w-full py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-medium shadow-md hover:from-green-600 hover:to-green-700 transition"
                >
                  {cart ? "Add to Cart" : "Click Product"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal Fullscreen Image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Selected Product"
            className="max-w-[90%] max-h-[90%] rounded-2xl shadow-2xl animate-zoomIn"
          />
        </div>
      )}

      {/* Animasi Tailwind (custom keyframes) */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-zoomIn {
          animation: zoomIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
