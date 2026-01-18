"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Smartphone,
  Users,
  Award,
  Truck,
  Shield,
  Heart,
  Target,
  Zap,
  Globe,
  ArrowRight,
} from "lucide-react";

export default function DesprePage() {
  const stats = [
    { value: "10+", label: "Ani de experienta" },
    { value: "50K+", label: "Clienti multumiti" },
    { value: "100K+", label: "Produse vandute" },
    { value: "24/7", label: "Suport clienti" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Calitate Garantata",
      description: "Toate produsele noastre sunt 100% originale si vin cu garantie completa de la producator.",
    },
    {
      icon: Truck,
      title: "Livrare Rapida",
      description: "Livrare in 24-48 de ore in toata Romania, cu optiune de ridicare din showroom.",
    },
    {
      icon: Heart,
      title: "Suport Dedicat",
      description: "Echipa noastra este mereu disponibila pentru a te ajuta cu orice intrebare sau problema.",
    },
    {
      icon: Award,
      title: "Preturi Competitive",
      description: "Garantam cele mai bune preturi de pe piata, cu optiuni de finantare flexibile.",
    },
  ];

  const team = [
    { name: "Alexandru Popescu", role: "CEO & Fondator", image: "AP" },
    { name: "Maria Ionescu", role: "Director Vanzari", image: "MI" },
    { name: "Andrei Dumitrescu", role: "Director Tehnic", image: "AD" },
    { name: "Elena Stanescu", role: "Customer Success", image: "ES" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Despre SmartShop
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Suntem pasionati de tehnologie si ne dedicam sa aducem cele mai noi si inovative smartphone-uri
              direct la usa ta, cu servicii de exceptie si preturi competitive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-center shadow-xl border border-slate-100"
              >
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-slate-600">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Povestea Noastra
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  SmartShop a fost fondat in 2014 cu o viziune clara: sa facem tehnologia accesibila tuturor.
                  Am inceput ca un mic magazin local in Bucuresti si am crescut constant datorita increderii
                  pe care clientii ne-au acordat-o.
                </p>
                <p>
                  Astazi, suntem unul dintre cei mai mari retaileri de smartphone-uri din Romania,
                  cu o echipa dedicata de peste 50 de specialisti si un portofoliu care include
                  toate brandurile majore din industrie.
                </p>
                <p>
                  Ne mandrim cu relatiile pe termen lung pe care le-am construit cu clientii nostri,
                  oferind nu doar produse de calitate, ci si suport tehnic si consultanta personalizata.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center">
                <div className="w-48 h-48 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                  <Smartphone className="w-24 h-24 text-blue-500" />
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Globe className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-10 h-10 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="bg-gradient-to-br from-slate-100 to-blue-50 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Misiunea Noastra</h3>
                    <p className="text-slate-600">Ce ne motiveaza in fiecare zi</p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Sa oferim fiecarui client experienta perfecta in achizitionarea unui smartphone -
                  de la alegerea produsului potrivit, pana la suport post-vanzare de exceptie.
                  Credem ca tehnologia trebuie sa fie accesibila, iar cumparaturile online trebuie
                  sa fie simple, sigure si placute.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                De Ce Sa Alegi SmartShop?
              </h2>
              <p className="text-slate-600 mb-8">
                Ne diferentiem prin atentia la detalii si grija pentru fiecare client.
                Nu suntem doar un magazin - suntem parteneri in calatoria ta tehnologica.
              </p>
              <Link href="/magazin">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-blue-700 transition-all"
                >
                  Exploreaza Produsele
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Valorile Noastre
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Principiile care ne ghideaza in tot ceea ce facem
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Echipa Noastra
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Oamenii pasionati din spatele SmartShop
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {member.image}
                </div>
                <h3 className="font-bold text-slate-800">{member.name}</h3>
                <p className="text-sm text-slate-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Hai sa Discutam!
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Ai intrebari sau vrei sa afli mai multe despre noi? Suntem aici sa te ajutam.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all"
              >
                Contacteaza-ne
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
