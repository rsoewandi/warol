"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartModal({ cart, addToCart, removeFromCart }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  function goToCheckout() {
    router.push("/checkout");
  }
  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
      >
        🛒 <span className="font-medium">{totalItems}</span>
      </button>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <div className="bg-white w-80 h-full shadow-xl p-6 rounded-l-2xl flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Shopping Cart</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-sm">Your cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center bg-gray-50 rounded-xl p-3 shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg mr-3"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-700">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {item.price.toLocaleString()} IDR
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Qty: {item.qty}</p>
                    </div>
                    <button
                onClick={() => removeFromCart(item.id)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="min-w-[20px] text-center">{item.qty}</span>
              <button
                onClick={() => addToCart(item)}
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                +
              </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between text-gray-700 text-sm mb-2">
                  <span>Total Items</span>
                  <span className="font-medium">{totalItems}</span>
                </div>
                <div className="flex justify-between text-gray-800 text-base font-semibold">
                  <span>Total Price</span>
                  <span>{totalPrice.toLocaleString()} IDR</span>
                </div>
                <button className="mt-5 w-full py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-medium shadow-md hover:from-green-600 hover:to-green-700 transition"
                  onClick={() => goToCheckout()} >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
