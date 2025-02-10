"use client";
import Footer from "./_component/footer";
import Header from "./_component/header";
import { useCart } from "./_component/context/CartContext";
import ProductPage from "./_products/productPage";
import { useState } from "react";

export default function Home() {
  const { cartItemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <ProductPage setIsCartOpen={setIsCartOpen} isCartOpen={isCartOpen} />
      </main>
      <Footer />
    </div>
  );
}
