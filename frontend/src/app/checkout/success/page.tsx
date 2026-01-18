"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Package,
  Mail,
  ArrowRight,
  Truck,
  Home,
  ShoppingBag,
} from "lucide-react";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");
  const [orderCode, setOrderCode] = useState<string | null>(null);

  useEffect(() => {
    // Generate a random order code for display purposes
    const code = `SM${Date.now().toString(36).toUpperCase()}`;
    setOrderCode(code);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-14 h-14 text-green-600" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
          >
            Comanda Plasata cu Succes!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 text-lg mb-8"
          >
            Multumim pentru comanda ta! Vei primi un email de confirmare in curand.
          </motion.p>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-8 border border-slate-100 shadow-soft mb-8"
          >
            {orderCode && (
              <div className="mb-6">
                <p className="text-sm text-slate-500 mb-1">Codul comenzii</p>
                <p className="text-2xl font-bold text-slate-800">{orderCode}</p>
              </div>
            )}

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-slate-800 text-center">
                  Email Confirmare
                </p>
                <p className="text-sm text-slate-500 text-center">
                  Trimis instant
                </p>
              </div>

              <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-slate-800 text-center">
                  Procesare Comanda
                </p>
                <p className="text-sm text-slate-500 text-center">
                  In urmatoarele ore
                </p>
              </div>

              <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-slate-800 text-center">
                  Livrare
                </p>
                <p className="text-sm text-slate-500 text-center">
                  24-48 ore
                </p>
              </div>
            </div>
          </motion.div>

          {/* Info Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-50 rounded-xl p-6 mb-8 text-left"
          >
            <h3 className="font-semibold text-blue-800 mb-2">Ce urmeaza?</h3>
            <ul className="space-y-2 text-blue-700 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Vei primi un email cu confirmarea comenzii si detaliile produselor
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Echipa noastra va pregati comanda pentru expediere
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Vei primi un SMS cand coletul va fi predat curierului
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Poti urmari statusul comenzii accesand contul tau
              </li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <Home className="w-5 h-5" />
                Inapoi Acasa
              </motion.button>
            </Link>
            <Link href="/magazin">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-blue-700 transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                Continua Cumparaturile
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-slate-50 pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="w-24 h-24 mx-auto mb-8 bg-slate-200 rounded-full"></div>
              <div className="h-8 bg-slate-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </main>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
