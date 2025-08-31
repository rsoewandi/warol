"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white px-6 py-3 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Warung Online</h1>
      <div className="flex gap-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/checkout" className="hover:underline">
          Checkout
        </Link>
      </div>
    </nav>
  );
}
