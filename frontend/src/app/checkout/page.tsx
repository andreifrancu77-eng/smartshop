"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  ChevronLeft,
  ShoppingCart,
  User,
  MapPin,
  Phone,
  Mail,
  Smartphone,
  Shield,
  Truck,
  CreditCard,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import CheckoutForm from "@/components/checkout/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

interface DeliveryDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { user, token } = useAuth();
  const [step, setStep] = useState(1);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  const shippingCost = totalPrice >= 500 ? 0 : 25;
  const finalTotal = totalPrice + shippingCost;

  useEffect(() => {
    if (user) {
      setDeliveryDetails((prev) => ({
        ...prev,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  const handleDeliverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.payments.createPaymentIntent({
        amount: finalTotal, // Send in base currency (RON), backend will convert to cents
        currency: "ron",
      }); // No token needed since endpoint is permitAll
      setClientSecret(response.clientSecret);
      setStep(2);
    } catch (error) {
      console.error("Error creating payment intent:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    if (!token) {
      console.error("Error: User not authenticated. Please log in to complete the order.");
      router.push("/login?redirect=/checkout");
      return;
    }

    try {
      await api.orders.create({
        items: items.map((item) => ({
          product: { id: item.id },
          quantity: item.quantity,
          price: item.price,
        })),
        total: finalTotal,
        deliveryName: `${deliveryDetails.firstName} ${deliveryDetails.lastName}`.trim(),
        deliveryEmail: deliveryDetails.email,
        deliveryPhone: deliveryDetails.phone,
        deliveryAddress: deliveryDetails.address,
        deliveryCity: deliveryDetails.city,
        deliveryCounty: "", // Optional, can be empty
        deliveryPostalCode: deliveryDetails.postalCode,
        deliveryCountry: "Romania", // Default to Romania
        deliveryNotes: deliveryDetails.notes,
      }, token);
      clearCart();
      router.push(`/checkout/success?payment_intent=${paymentIntentId}`);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 pt-24">
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingCart className="w-20 h-20 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-700 mb-2">
            Cosul tau este gol
          </h2>
          <Link href="/magazin" className="text-blue-600 hover:underline">
            Inapoi la magazin
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/cos"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Inapoi la Cos
          </Link>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-blue-600" : "text-slate-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-600 text-white" : "bg-slate-200"}`}>
                1
              </div>
              <span className="font-medium hidden sm:inline">Livrare</span>
            </div>
            <div className={`w-16 h-1 rounded ${step >= 2 ? "bg-blue-600" : "bg-slate-200"}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-blue-600" : "text-slate-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-600 text-white" : "bg-slate-200"}`}>
                2
              </div>
              <span className="font-medium hidden sm:inline">Plata</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {step === 1 ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft"
              >
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  Detalii Livrare
                </h2>

                <form onSubmit={handleDeliverySubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Prenume *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={deliveryDetails.firstName}
                          onChange={(e) => setDeliveryDetails({ ...deliveryDetails, firstName: e.target.value })}
                          className="w-full h-12 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Nume *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={deliveryDetails.lastName}
                          onChange={(e) => setDeliveryDetails({ ...deliveryDetails, lastName: e.target.value })}
                          className="w-full h-12 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={deliveryDetails.email}
                          onChange={(e) => setDeliveryDetails({ ...deliveryDetails, email: e.target.value })}
                          className="w-full h-12 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Telefon *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          required
                          value={deliveryDetails.phone}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            setDeliveryDetails({ ...deliveryDetails, phone: value });
                          }}
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
                              e.preventDefault();
                            }
                          }}
                          className="w-full h-12 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Adresa *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={deliveryDetails.address}
                        onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
                        placeholder="Strada, numar, bloc, scara, apartament"
                        className="w-full h-12 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Oras *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryDetails.city}
                        onChange={(e) => setDeliveryDetails({ ...deliveryDetails, city: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Cod Postal *
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        required
                        value={deliveryDetails.postalCode}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          setDeliveryDetails({ ...deliveryDetails, postalCode: value });
                        }}
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
                            e.preventDefault();
                          }
                        }}
                        className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Note (optional)
                    </label>
                    <textarea
                      value={deliveryDetails.notes}
                      onChange={(e) => setDeliveryDetails({ ...deliveryDetails, notes: e.target.value })}
                      placeholder="Informatii suplimentare pentru livrare..."
                      rows={3}
                      className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-14 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50"
                  >
                    {loading ? "Se incarca..." : "Continua la Plata"}
                    <CreditCard className="w-5 h-5" />
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft"
              >
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-500" />
                  Detalii Plata
                </h2>

                {/* Delivery Summary */}
                <div className="mb-6 p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-slate-800">
                        {deliveryDetails.firstName} {deliveryDetails.lastName}
                      </p>
                      <p className="text-sm text-slate-600">{deliveryDetails.address}</p>
                      <p className="text-sm text-slate-600">
                        {deliveryDetails.city}, {deliveryDetails.postalCode}
                      </p>
                      <p className="text-sm text-slate-600">{deliveryDetails.phone}</p>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      Modifica
                    </button>
                  </div>
                </div>

                {clientSecret && (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: "stripe",
                        variables: {
                          colorPrimary: "#3b82f6",
                          borderRadius: "12px",
                        },
                      },
                    }}
                  >
                    <CheckoutForm onSuccess={handlePaymentSuccess} />
                  </Elements>
                )}
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft sticky top-32"
            >
              <h2 className="text-xl font-bold text-slate-800 mb-6">
                Sumar Comanda
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-8 h-8 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        Cantitate: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-slate-800">
                      {(item.price * item.quantity).toLocaleString()} RON
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-slate-200 pt-4 space-y-3">
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
                <div className="border-t border-slate-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-slate-800">
                    <span>Total</span>
                    <span>{finalTotal.toLocaleString()} RON</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span>Plata securizata 100%</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Truck className="w-5 h-5 text-blue-500" />
                  <span>Livrare in 24-48h</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
