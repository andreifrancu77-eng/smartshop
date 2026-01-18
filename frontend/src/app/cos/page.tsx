"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Smartphone,
  Truck,
  Shield,
  Tag,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { getProductImageUrl, ProductDTO } from "@/lib/api";

export default function CosPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const shippingCost = totalPrice >= 500 ? 0 : 25;
  const discount = promoApplied ? totalPrice * 0.1 : 0;
  const finalTotal = totalPrice + shippingCost - discount;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "smart10") {
      setPromoApplied(true);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 pt-24">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-slate-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
              Cosul tau este gol
            </h1>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Nu ai adaugat niciun produs in cos. Exploreaza magazinul nostru pentru a gasi smartphone-ul perfect.
            </p>
            <Link href="/magazin">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-blue-700 transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                Exploreaza Magazinul
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Cosul Tau</h1>
          <p className="text-slate-600">
            {items.length} {items.length === 1 ? "produs" : "produse"} in cos
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <Link href={`/magazin/${item.id}`} className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl overflow-hidden relative">
                        {item.imageUrl ? (
                          <Image
                            src={getProductImageUrl({
                              id: item.id,
                              name: item.name,
                              imageUrl: item.imageUrl,
                            } as ProductDTO)}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                            quality={85}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Smartphone className="w-10 h-10 text-slate-400" />
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/magazin/${item.id}`}>
                        <h3 className="font-semibold text-slate-800 hover:text-blue-600 transition-colors mb-1 truncate">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-lg font-bold text-slate-800">
                        {item.price.toLocaleString()} RON
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-blue-600 transition-all"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-blue-600 transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total & Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <p className="text-lg font-bold text-slate-800">
                        {(item.price * item.quantity).toLocaleString()} RON
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Clear Cart */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={clearCart}
              className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Goleste cosul
            </motion.button>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft sticky top-32">
              <h2 className="text-xl font-bold text-slate-800 mb-6">
                Sumar Comanda
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cod promotional
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Introdu codul"
                      disabled={promoApplied}
                      className="w-full h-12 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all disabled:opacity-50"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    disabled={promoApplied || !promoCode}
                    className="px-4 h-12 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {promoApplied ? "Aplicat" : "Aplica"}
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-green-600 text-sm mt-2">
                    Reducere de 10% aplicata!
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{totalPrice.toLocaleString()} RON</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Livrare</span>
                  <span className={shippingCost === 0 ? "text-green-600" : ""}>
                    {shippingCost === 0 ? "Gratuita" : `${shippingCost} RON`}
                  </span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Reducere (10%)</span>
                    <span>-{discount.toLocaleString()} RON</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-slate-800">
                    <span>Total</span>
                    <span>{finalTotal.toLocaleString()} RON</span>
                  </div>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {totalPrice < 500 && (
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-blue-700">
                    Mai adauga produse de{" "}
                    <span className="font-semibold">
                      {(500 - totalPrice).toLocaleString()} RON
                    </span>{" "}
                    pentru livrare gratuita!
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <Link href="/checkout">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-14 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-blue-700 transition-all"
                >
                  Finalizeaza Comanda
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              {/* Benefits */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Truck className="w-5 h-5 text-blue-500" />
                  <span>Livrare gratuita pentru comenzi peste 500 RON</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span>Plata securizata cu Stripe</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
