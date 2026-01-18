"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Smartphone, Heart } from "lucide-react";
import { ProductDTO, getProductImageUrl } from "@/lib/api";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";

interface ProductCardProps {
  product: ProductDTO;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-200 hover:shadow-xl transition-all duration-300">
        <Link href={`/magazin/${product.id}`}>
          {/* Image */}
          <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden relative">
            <Image
              src={getProductImageUrl(product)}
              alt={product.name}
              fill
              quality={90}
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Stock Badge */}
            {product.stock !== undefined && product.stock > 0 && product.stock < 10 && (
              <span className="absolute top-4 left-4 px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-lg">
                Ultimele bucati
              </span>
            )}

            {/* Out of Stock */}
            {product.stock === 0 && (
              <span className="absolute top-4 left-4 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-lg">
                Stoc epuizat
              </span>
            )}

            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
            >
              <Heart className="w-4 h-4 text-slate-400 hover:text-red-500 transition-colors" />
            </button>
          </div>
        </Link>

        {/* Content */}
        <div className="p-5">
          {/* Brand & Category */}
          <div className="flex items-center gap-2 mb-2">
            {product.brandName && (
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                {product.brandName}
              </span>
            )}
            {product.categoryName && (
              <span className="text-xs text-slate-400">
                {product.categoryName}
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={`/magazin/${product.id}`}>
            <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Specs Preview */}
          {product.specification && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.specification.ram && (
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                  {product.specification.ram} RAM
                </span>
              )}
              {product.specification.storage && (
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                  {product.specification.storage}
                </span>
              )}
            </div>
          )}

          {/* Price & Cart */}
          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-xl font-bold text-slate-800">
                {product.price.toLocaleString()}
              </span>
              <span className="text-sm text-slate-500 ml-1">RON</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
