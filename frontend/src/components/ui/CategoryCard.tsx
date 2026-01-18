"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Smartphone,
  Tablet,
  Headphones,
  Watch,
  Speaker,
  LucideIcon,
} from "lucide-react";
import { Category } from "@/lib/api";

interface CategoryCardProps {
  category: Category;
  index?: number;
  productCount?: number;
}

const categoryIcons: Record<string, LucideIcon> = {
  smartphones: Smartphone,
  tablets: Tablet,
  tablete: Tablet,
  accessories: Headphones,
  accesorii: Headphones,
  wearables: Watch,
  audio: Speaker,
};

export default function CategoryCard({ category, index = 0, productCount }: CategoryCardProps) {
  const IconComponent = categoryIcons[category.name.toLowerCase()] || Smartphone;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/magazin?category=${category.id}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-200 hover:shadow-xl transition-all cursor-pointer overflow-hidden"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
              <IconComponent className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
            </div>

            {/* Title */}
            <h3 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-blue-600 transition-colors">
              {category.name}
            </h3>

            {/* Description */}
            {category.description && (
              <p className="text-sm text-slate-500 line-clamp-2 mb-2">
                {category.description}
              </p>
            )}

            {/* Product Count */}
            {productCount !== undefined && (
              <p className="text-xs text-slate-400">
                {productCount} {productCount === 1 ? "produs" : "produse"}
              </p>
            )}
          </div>

          {/* Arrow */}
          <div className="absolute bottom-4 right-4 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg
              className="w-4 h-4 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
