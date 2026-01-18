"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Share2,
  ChevronLeft,
  Smartphone,
  Check,
  Truck,
  Shield,
  RotateCcw,
  Cpu,
  HardDrive,
  Battery,
  Camera,
  Monitor,
  Wifi,
} from "lucide-react";
import { api, ProductDTO, getProductImageUrl } from "@/lib/api";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.products.getById(params.id as string);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-32 mb-8" />
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-slate-200 rounded-3xl" />
              <div className="space-y-4">
                <div className="h-8 bg-slate-200 rounded w-3/4" />
                <div className="h-6 bg-slate-200 rounded w-1/2" />
                <div className="h-32 bg-slate-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50 pt-24">
        <div className="container mx-auto px-4 py-20 text-center">
          <Smartphone className="w-20 h-20 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-700 mb-2">Produsul nu a fost gasit</h2>
          <Link href="/magazin" className="text-blue-600 hover:underline">
            Inapoi la magazin
          </Link>
        </div>
      </main>
    );
  }

  const specIcons = {
    processor: Cpu,
    ram: HardDrive,
    storage: HardDrive,
    battery: Battery,
    camera: Camera,
    screen: Monitor,
    connectivity: Wifi,
  };

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
            href="/magazin"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Inapoi la Magazin
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="sticky top-32">
              <div className="aspect-square bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden relative">
                {product && (
                  <Image
                    src={getProductImageUrl(product)}
                    alt={product.name}
                    fill
                    quality={95}
                    priority
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex gap-4 mt-6">
                <button className="flex-1 h-12 flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-600 transition-all">
                  <Heart className="w-5 h-5" />
                  Adauga la favorite
                </button>
                <button className="flex-1 h-12 flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-600 transition-all">
                  <Share2 className="w-5 h-5" />
                  Distribuie
                </button>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Brand & Category */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                {product.brandName}
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-500 text-sm">{product.categoryName}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-slate-800">
                {product.price.toLocaleString()} RON
              </span>
              {product.stock && product.stock > 0 ? (
                <span className="text-green-600 flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  In stoc
                </span>
              ) : (
                <span className="text-red-600">Stoc epuizat</span>
              )}
            </div>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-blue-600"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-blue-600"
                >
                  +
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!product.stock || product.stock === 0}
                className={`flex-1 h-14 flex items-center justify-center gap-3 rounded-xl font-semibold text-lg transition-all ${
                  addedToCart
                    ? "bg-green-500 text-white"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/25"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Adaugat in cos!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Adauga in cos
                  </>
                )}
              </motion.button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: Truck, label: "Livrare gratuita" },
                { icon: Shield, label: "Garantie 2 ani" },
                { icon: RotateCcw, label: "Retur 30 zile" },
              ].map((benefit, i) => (
                <div key={i} className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-slate-100">
                  <benefit.icon className="w-6 h-6 text-blue-500 mb-2" />
                  <span className="text-sm text-slate-600">{benefit.label}</span>
                </div>
              ))}
            </div>

            {/* Specifications */}
            {product.specification && (
              <div className="bg-white rounded-2xl p-6 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Specificatii Tehnice</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specification.screenSize && (
                    <SpecItem icon={Monitor} label="Ecran" value={`${product.specification.screenSize} ${product.specification.screenType}`} />
                  )}
                  {product.specification.resolution && (
                    <SpecItem icon={Monitor} label="Rezolutie" value={product.specification.resolution} />
                  )}
                  {product.specification.processor && (
                    <SpecItem icon={Cpu} label="Procesor" value={product.specification.processor} />
                  )}
                  {product.specification.ram && (
                    <SpecItem icon={HardDrive} label="RAM" value={product.specification.ram} />
                  )}
                  {product.specification.storage && (
                    <SpecItem icon={HardDrive} label="Stocare" value={product.specification.storage} />
                  )}
                  {product.specification.batteryCapacity && (
                    <SpecItem icon={Battery} label="Baterie" value={product.specification.batteryCapacity} />
                  )}
                  {product.specification.cameraMain && (
                    <SpecItem icon={Camera} label="Camera principala" value={product.specification.cameraMain} />
                  )}
                  {product.specification.cameraFront && (
                    <SpecItem icon={Camera} label="Camera frontala" value={product.specification.cameraFront} />
                  )}
                  {product.specification.osVersion && (
                    <SpecItem icon={Smartphone} label="Sistem de operare" value={product.specification.osVersion} />
                  )}
                  {product.specification.connectivity && (
                    <SpecItem icon={Wifi} label="Conectivitate" value={product.specification.connectivity} />
                  )}
                  {product.specification.weight && (
                    <SpecItem icon={Monitor} label="Greutate" value={product.specification.weight} />
                  )}
                  {product.specification.color && (
                    <SpecItem icon={Monitor} label="Culoare" value={product.specification.color} />
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}

function SpecItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="font-medium text-slate-800">{value}</p>
      </div>
    </div>
  );
}
