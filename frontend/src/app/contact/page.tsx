"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  MessageSquare,
  Headphones,
  Building,
} from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setSubmitted(true);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefon",
      value: "+40 721 234 567",
      description: "Luni - Vineri, 9:00 - 18:00",
      href: "tel:+40721234567",
    },
    {
      icon: Mail,
      title: "Email",
      value: "contact@smartshop.ro",
      description: "Raspundem in 24 de ore",
      href: "mailto:contact@smartshop.ro",
    },
    {
      icon: MapPin,
      title: "Adresa",
      value: "Str. Technologiei Nr. 10",
      description: "Bucuresti, Romania",
      href: "#",
    },
    {
      icon: Clock,
      title: "Program",
      value: "Luni - Vineri: 9-18",
      description: "Sambata: 10-14",
      href: "#",
    },
  ];

  const supportOptions = [
    {
      icon: MessageSquare,
      title: "Chat Live",
      description: "Vorbeste cu un consultant in timp real",
    },
    {
      icon: Headphones,
      title: "Suport Telefonic",
      description: "Apeleaza pentru asistenta imediata",
    },
    {
      icon: Building,
      title: "Viziteaza Showroom-ul",
      description: "Vezi si testeaza produsele",
    },
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
              Contacteaza-ne
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Suntem aici sa te ajutam! Alege metoda preferata de contact si echipa noastra
              iti va raspunde cat mai curand posibil.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 hover:shadow-2xl hover:border-blue-200 transition-all group"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                  <info.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-slate-800 mb-1">{info.title}</h3>
                <p className="text-blue-600 font-medium mb-1">{info.value}</p>
                <p className="text-sm text-slate-500">{info.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Trimite-ne un Mesaj
                </h2>
                <p className="text-slate-600 mb-8">
                  Completeaza formularul si te vom contacta in cel mai scurt timp.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      Mesaj Trimis!
                    </h3>
                    <p className="text-slate-600 mb-6">
                      Multumim pentru mesaj! Te vom contacta in cel mai scurt timp.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                      }}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Trimite alt mesaj
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Nume Complet *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={formData.phone}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            setFormData({ ...formData, phone: value });
                          }}
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
                              e.preventDefault();
                            }
                          }}
                          className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Subiect *
                        </label>
                        <select
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                        >
                          <option value="">Selecteaza...</option>
                          <option value="general">Intrebare generala</option>
                          <option value="order">Despre o comanda</option>
                          <option value="product">Informatii produs</option>
                          <option value="return">Retur/Garantie</option>
                          <option value="partnership">Parteneriat</option>
                          <option value="other">Altele</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Mesaj *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Scrie mesajul tau aici..."
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
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Se trimite...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Trimite Mesajul
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Support Options & Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Support Options */}
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  Alte Modalitati de Contact
                </h2>
                <div className="space-y-4">
                  {supportOptions.map((option, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <option.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">{option.title}</h3>
                        <p className="text-sm text-slate-500">{option.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft">
                <h3 className="font-bold text-slate-800 mb-4">Locatia Noastra</h3>
                <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-500">Str. Technologiei Nr. 10</p>
                    <p className="text-slate-500">Bucuresti, Romania</p>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-bold text-slate-800 mb-4">Intrebari Frecvente</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-blue-600 hover:underline text-sm">
                      Cum pot urmari comanda mea?
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline text-sm">
                      Care este politica de retur?
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline text-sm">
                      Cum beneficiez de garantie?
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline text-sm">
                      Care sunt metodele de plata acceptate?
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
