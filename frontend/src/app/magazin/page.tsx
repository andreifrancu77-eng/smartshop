"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown, Smartphone, ShoppingCart, X } from "lucide-react";
import { api, ProductDTO, Category, Brand, getProductImageUrl } from "@/lib/api";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";

function MagazinPageContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const brandParam = searchParams.get("brand");

  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "");
  const [selectedBrand, setSelectedBrand] = useState<string>(brandParam || "");
  const [showFilters, setShowFilters] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData, brandsData] = await Promise.all([
          api.products.getAll(),
          api.categories.getAll(),
          api.brands.getAll(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.categoryId?.toString() === selectedCategory;
    const matchesBrand = !selectedBrand || product.brandId?.toString() === selectedBrand;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  const handleAddToCart = (product: ProductDTO) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedCategory || selectedBrand || searchQuery;

  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-800 mb-4"
          >
            Magazin
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600"
          >
            Descopera gama noastra completa de smartphone-uri si accesorii
          </motion.p>
        </div>

        {/* Search and Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 shadow-soft mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="search"
                placeholder="Cauta produse..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-12 pl-4 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all appearance-none cursor-pointer min-w-[160px]"
              >
                <option value="">Toate Categoriile</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id.toString()}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>

            {/* Brand Filter */}
            <div className="relative">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="h-12 pl-4 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all appearance-none cursor-pointer min-w-[160px]"
              >
                <option value="">Toate Brandurile</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id.toString()}>
                    {brand.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="h-12 px-4 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Sterge filtrele
              </button>
            )}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 flex items-center justify-between"
        >
          <p className="text-slate-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? "produs" : "produse"} gasite
          </p>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                <div className="aspect-square bg-slate-200 rounded-xl mb-4" />
                <div className="h-4 bg-slate-200 rounded mb-2" />
                <div className="h-4 bg-slate-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Smartphone className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Niciun produs gasit</h3>
            <p className="text-slate-500 mb-6">Incearca sa modifici filtrele sau sa cauti altceva</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
            >
              Sterge filtrele
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      {product.stock && product.stock < 10 && (
                        <span className="absolute top-4 left-4 px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-lg">
                          Ultimele bucati
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                        {product.brandName}
                      </span>
                      <span className="text-xs text-slate-400">
                        {product.categoryName}
                      </span>
                    </div>
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
                        onClick={() => handleAddToCart(product)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function MagazinPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-slate-50 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="h-10 bg-slate-200 rounded w-48 mb-4 animate-pulse"></div>
            <div className="h-5 bg-slate-200 rounded w-96 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                <div className="aspect-square bg-slate-200 rounded-xl mb-4" />
                <div className="h-4 bg-slate-200 rounded mb-2" />
                <div className="h-4 bg-slate-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </main>
    }>
      <MagazinPageContent />
    </Suspense>
  );
}
