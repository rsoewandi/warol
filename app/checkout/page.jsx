"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function handleCheckout(e) {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Cart masih kosong!");
      return;
    }

    const orderData = {
      customerName: name,
      address,
      phone,
      items: cart,
      total,
    };

    console.log("Checkout order:", orderData);
    alert("Order submitted! Check console for details.");

    // reset
    setName("");
    setAddress("");
    setPhone("");
    setCart([]);
    localStorage.removeItem("cart");
  }

  return (
    <main className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Cart masih kosong.</p>
      ) : (
        <>
          <ul className="space-y-2 mb-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>Rp {(item.price * item.qty).toLocaleString()}</span>
              </li>
            ))}
          </ul>

          <div className="mb-4 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span className="text-green-600">Rp {total.toLocaleString()}</span>
          </div>

          <form onSubmit={handleCheckout} className="space-y-3">
            <input
              type="text"
              placeholder="Kavling Berapa"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
            >
              Submit Order
            </button>
          </form>
        </>
      )}
    </main>
  );
}
