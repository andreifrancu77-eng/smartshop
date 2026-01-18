"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const trustBadges = [
    { icon: Shield, label: "Garantie 2 Ani" },
    { icon: Truck, label: "Livrare Express" },
    { icon: Zap, label: "Preturi Competitive" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[#fafafa]">
        {/* Primary gradient mesh */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[70%] h-[70%] bg-gradient-to-br from-sky-100/80 via-cyan-50/50 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-gradient-to-tl from-orange-100/60 via-amber-50/30 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-r from-blue-50/40 to-cyan-50/40 rounded-full blur-3xl" />
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 grid-pattern-light opacity-50" />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <motion.div style={{ y, opacity, scale }} className="w-full relative z-10">
        <div className="container mx-auto px-4 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content - Typography Focus */}
            <div className="relative">
              {/* Eyebrow badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-slate-500">
                  Colectia 2024 Disponibila
                </span>
              </motion.div>

              {/* Main Headline - Stacked Typography */}
              <div className="relative mb-8">
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="headline-hero text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-slate-900"
                >
                  Tehnologie
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="headline-hero text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] gradient-text-blue"
                >
                  Premium
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="headline-hero text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-slate-900"
                >
                  La Indemana
                </motion.h1>
              </div>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg mb-10"
              >
                Descopera cele mai noi smartphone-uri de la brandurile de top.
                Preturi competitive, livrare rapida si garantie extinsa.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Link href="/magazin">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-semibold text-base overflow-hidden btn-shine"
                  >
                    <span className="relative z-10">Exploreaza Magazinul</span>
                    <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </Link>
                <Link href="/despre">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-slate-700 font-medium text-base hover:text-slate-900 transition-colors"
                  >
                    Afla mai multe
                    <span className="text-slate-400">→</span>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-wrap gap-6"
              >
                {trustBadges.map((badge, i) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2.5"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white shadow-soft flex items-center justify-center">
                      <badge.icon className="w-4 h-4 text-sky-500" />
                    </div>
                    <span className="text-sm font-medium text-slate-600">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Side - Phone Composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={mounted ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg">
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-sky-200/50 via-cyan-200/30 to-orange-200/20 rounded-full blur-3xl" />

                {/* Main Phone */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-20 mx-auto"
                >
                  <div className="relative">
                    {/* Phone Frame */}
                    <div className="w-[280px] h-[560px] mx-auto bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 rounded-[3rem] p-2 shadow-2xl">
                      {/* Screen */}
                      <div className="w-full h-full bg-gradient-to-br from-sky-400 via-cyan-500 to-blue-600 rounded-[2.5rem] overflow-hidden relative">
                        {/* Dynamic Island */}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full" />

                        {/* Screen Content - Abstract UI */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white/90">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <Zap className="w-8 h-8" />
                            </div>
                            <div className="text-sm font-medium tracking-wide uppercase">SmartShop</div>
                          </div>
                        </div>

                        {/* Screen shine */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20" />
                      </div>
                    </div>

                    {/* Phone reflection */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[200px] h-[40px] bg-slate-900/10 rounded-full blur-2xl" />
                  </div>
                </motion.div>

                {/* Floating Card - Left */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={mounted ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -left-4 top-24 z-30"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="bg-white rounded-2xl p-4 shadow-elevated border border-slate-100/80"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">100% Original</p>
                        <p className="text-xs text-slate-500">Produse sigilate</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating Card - Right */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={mounted ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="absolute -right-4 bottom-32 z-30"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="bg-white rounded-2xl p-4 shadow-elevated border border-slate-100/80"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center">
                        <Truck className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Livrare Rapida</p>
                        <p className="text-xs text-slate-500">24-48h in toata tara</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Stats Badge - Bottom */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-30"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="bg-slate-900 text-white rounded-full px-6 py-3 shadow-xl flex items-center gap-4"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg font-bold">50+</span>
                      <span className="text-xs text-slate-400">Modele</span>
                    </div>
                    <div className="w-px h-6 bg-slate-700" />
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg font-bold">5★</span>
                      <span className="text-xs text-slate-400">Rating</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-slate-300 flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-slate-400"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
