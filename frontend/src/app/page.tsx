"use client";

import HeroSection from "@/components/home/HeroSection";
import Link from "next/link";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  Shield,
  Truck,
  Clock,
  Award,
  Star,
  Smartphone,
  Tablet,
  Headphones,
  Watch,
  ChevronRight,
  Users,
  Package,
  Sparkles,
} from "lucide-react";
import { api, ProductDTO, Brand, getProductImageUrl } from "@/lib/api";
import Image from "next/image";

// ============================================
// SECTION: Brand Marquee
// ============================================
function BrandMarquee() {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    api.brands.getAll().then(setBrands).catch(console.error);
  }, []);

  const brandNames = brands.length > 0
    ? brands.map(b => b.name)
    : ["Apple", "Samsung", "Xiaomi", "Google", "OnePlus"];

  // Double the brands for seamless loop
  const marqueeItems = [...brandNames, ...brandNames];

  return (
    <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Marquee */}
        <div className="flex animate-marquee">
          {marqueeItems.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex-shrink-0 mx-12 group cursor-default"
            >
              <span className="text-3xl md:text-4xl font-bold text-slate-200 group-hover:text-sky-500 transition-colors duration-300 font-display whitespace-nowrap">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION: Featured Products (Bento Grid)
// ============================================
function FeaturedProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [products, setProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    api.products.getAll().then(data => {
      setProducts(data.slice(0, 5));
    }).catch(console.error);
  }, []);

  return (
    <section ref={ref} className="py-24 bg-[#fafafa]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-sky-500 mb-4 block">
              Produse Recomandate
            </span>
            <h2 className="headline-section text-4xl md:text-5xl lg:text-6xl text-slate-900">
              Cele Mai<br />
              <span className="gradient-text-blue">Vandute</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/magazin"
              className="group inline-flex items-center gap-2 text-slate-600 hover:text-sky-500 font-medium transition-colors"
            >
              Vezi toate produsele
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-3">
          {/* Hero Product Card (2x2) */}
          {products[0] && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2 lg:col-span-2 md:row-span-2 flex items-center justify-center"
            >
              <Link href={`/magazin/${products[0].id}`} className="group block w-full max-w-[280px] md:max-w-[450px]">
                <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden card-hover-lift">
                  {/* Product video - full background (9:16 portrait) */}
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/iphone-15-pro-max.mp4" type="video/mp4" />
                  </video>

                  {/* Bottom gradient overlay for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-6 left-6 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                      <Sparkles className="w-3 h-3" />
                      Popular
                    </span>
                  </div>

                  {/* Content at bottom over gradient */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
                    <div className="relative">
                      <p className="text-sky-400 text-sm font-medium mb-2">{products[0].brandName}</p>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-display">
                        {products[0].name}
                      </h3>
                      <p className="text-slate-300 text-sm mb-6 line-clamp-2 max-w-md">
                        {products[0].description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-white">
                          {products[0].price.toLocaleString()}
                          <span className="text-lg font-normal text-slate-300 ml-1">RON</span>
                        </span>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Smaller Product Cards */}
          {products.slice(1, 5).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <Link href={`/magazin/${product.id}`} className="group block h-full">
                <div className="h-full bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:border-sky-200 hover:shadow-xl transition-all duration-300 card-hover-lift">
                  {/* Image area */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
                    <Image
                      src={getProductImageUrl(product)}
                      alt={product.name}
                      fill
                      quality={90}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-xs text-sky-500 font-semibold uppercase tracking-wider mb-1">
                      {product.brandName}
                    </p>
                    <h3 className="font-semibold text-slate-800 group-hover:text-sky-600 transition-colors mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-900">
                        {product.price.toLocaleString()}
                        <span className="text-sm font-normal text-slate-400 ml-1">RON</span>
                      </span>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION: Stats / Why Choose Us
// ============================================
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, target, {
        duration: 2,
        ease: "easeOut",
      });
      return animation.stop;
    }
  }, [isInView, count, target]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return unsubscribe;
  }, [rounded]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
}

function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: 5000, suffix: "+", label: "Clienti Multumiti", icon: Users },
    { value: 50, suffix: "+", label: "Modele Disponibile", icon: Package },
    { value: 2, suffix: " Ani", label: "Garantie Standard", icon: Shield },
    { value: 24, suffix: "h", label: "Timp Livrare", icon: Truck },
  ];

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-sky-500 mb-4 block">
              De ce sa ne alegi
            </span>
            <h2 className="headline-section text-4xl md:text-5xl text-slate-900 mb-6">
              Calitate,<br />
              <span className="gradient-text-orange">Incredere,</span><br />
              Performanta
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
              De peste 5 ani, suntem partenerul de incredere pentru mii de romani
              in alegerea smartphone-ului perfect. Oferim doar produse originale,
              sigilate, cu garantie completa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/magazin">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-medium btn-shine"
                >
                  Exploreaza Produsele
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link href="/despre">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-slate-700 font-medium hover:text-sky-600 transition-colors"
                >
                  Despre Noi
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right - Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="group"
              >
                <div className="relative p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:border-sky-100 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-soft flex items-center justify-center mb-4 group-hover:bg-sky-500 group-hover:shadow-electric transition-all duration-300">
                    <stat.icon className="w-6 h-6 text-sky-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-4xl font-bold text-slate-900 mb-1 font-display">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION: Categories (Dark with Neon Glow)
// ============================================
function CategoriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [
    {
      name: "Smartphones",
      description: "Cele mai noi telefoane de la brandurile premium",
      href: "/magazin?category=1",
      icon: Smartphone,
      count: "50+ produse",
    },
    {
      name: "Tablete",
      description: "Tablete pentru productivitate si divertisment",
      href: "/magazin?category=2",
      icon: Tablet,
      count: "20+ produse",
    },
    {
      name: "Accesorii",
      description: "Huse, incarcatoare, cabluri si multe altele",
      href: "/magazin?category=3",
      icon: Headphones,
      count: "100+ produse",
    },
    {
      name: "Wearables",
      description: "Ceasuri si bratari inteligente",
      href: "/magazin?category=4",
      icon: Watch,
      count: "30+ produse",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#0a0f1a] relative overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern-dark" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-sky-400 mb-4 block">
            Exploreaza
          </span>
          <h2 className="headline-section text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Categorii <span className="gradient-text-animated">Principale</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Gaseste exact ce ai nevoie din gama noastra variata de produse tech premium
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={category.href} className="group block h-full">
                <div className="relative h-full p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 neon-border overflow-hidden transition-all duration-300 card-tilt">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 to-cyan-500/0 group-hover:from-sky-500/10 group-hover:to-cyan-500/5 transition-all duration-500" />

                  {/* Icon */}
                  <div className="relative z-10 w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-5 group-hover:border-sky-500/50 group-hover:shadow-electric transition-all duration-300">
                    <category.icon className="w-7 h-7 text-slate-400 group-hover:text-sky-400 transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="relative z-10 text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors font-display">
                    {category.name}
                  </h3>
                  <p className="relative z-10 text-slate-500 text-sm mb-4 group-hover:text-slate-400 transition-colors">
                    {category.description}
                  </p>
                  <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-800">
                    <span className="text-xs font-mono text-slate-600 uppercase tracking-wider">
                      {category.count}
                    </span>
                    <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION: Testimonials (Editorial Style)
// ============================================
function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      name: "Alexandru Ionescu",
      role: "Client verificat",
      content: "Am comandat un iPhone 15 Pro si a ajuns in mai putin de 24 de ore. Servicii impecabile, preturi excelente si suport clienti de nota 10!",
      rating: 5,
      initials: "AI",
    },
    {
      name: "Maria Popescu",
      role: "Client frecvent",
      content: "Cel mai bun magazin online pentru telefoane din Romania. Recomand cu incredere pentru oricine cauta calitate si seriozitate.",
      rating: 5,
      initials: "MP",
    },
    {
      name: "Andrei Dumitrescu",
      role: "Tech enthusiast",
      content: "Am gasit exact ce cautam la un pret competitiv. Produsul a venit sigilat, cu garantie completa. Voi reveni cu siguranta!",
      rating: 5,
      initials: "AD",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#fafafa] overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-sky-500 mb-4 block">
            Testimoniale
          </span>
          <h2 className="headline-section text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-4">
            Ce Spun <span className="gradient-text-blue">Clientii</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Mii de clienti multumiti ne-au ales ca partener de incredere
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="h-full bg-white rounded-2xl p-8 shadow-soft border border-slate-100 hover:shadow-xl hover:border-sky-100 transition-all duration-300 relative">
                {/* Large decorative quote */}
                <div className="absolute top-6 right-6 text-7xl font-serif text-slate-100 select-none">
                  &ldquo;
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-600 leading-relaxed mb-8 relative z-10">
                  {testimonial.content}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION: CTA Banner (Typography Focus)
// ============================================
function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-900/50 via-slate-900 to-cyan-900/30" />
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-sky-500/20 rounded-full blur-[100px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[80px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern-dark opacity-50" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Giant headline */}
          <h2 className="headline-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6">
            Pregatit Sa
            <br />
            <span className="gradient-text-animated">Descoperi?</span>
          </h2>

          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Exploreaza gama completa de smartphone-uri premium.
            Calitate garantata, preturi competitive, livrare rapida in toata tara.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/magazin">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all btn-shine"
              >
                Exploreaza Magazinul
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-transparent text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Contacteaza-ne
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// SECTION: Newsletter (Pre-footer)
// ============================================
function NewsletterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-sky-500 mb-4 block">
            Newsletter
          </span>
          <h2 className="headline-section text-3xl md:text-4xl text-slate-900 mb-4">
            Fii Primul Care Afla
          </h2>
          <p className="text-slate-500 mb-8">
            Aboneaza-te pentru a primi informatii despre oferte speciale, produse noi si reduceri exclusive.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Adresa ta de email"
              className="flex-1 h-14 px-6 rounded-full bg-slate-50 border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-400 transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="h-14 px-8 bg-slate-900 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all btn-shine"
            >
              Aboneaza-te
            </motion.button>
          </form>

          <p className="text-xs text-slate-400 mt-6">
            Prin abonare, esti de acord cu{" "}
            <Link href="/privacy" className="text-sky-500 hover:underline">
              Politica de Confidentialitate
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function Home() {
  return (
    <main>
      <HeroSection />
      <BrandMarquee />
      <FeaturedProductsSection />
      <StatsSection />
      <CategoriesSection />
      <TestimonialsSection />
      <CTASection />
      <NewsletterSection />
    </main>
  );
}
