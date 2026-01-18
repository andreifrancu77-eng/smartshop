import Header from "@/components/header/header";
import "./globals.css";
import { Inter, Syne, Space_Mono } from "next/font/google";
import Footer from "@/components/footer/footer";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

export const metadata = {
  title: "SmartShop - Magazin de Smartphone-uri Premium",
  description: "Descoperă cele mai noi smartphone-uri de la Apple, Samsung, Xiaomi, Google și OnePlus. Livrare rapidă și prețuri competitive.",
  keywords: "smartphone, telefoane mobile, iPhone, Samsung, Xiaomi, Google Pixel, OnePlus",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "SmartShop - Magazin de Smartphone-uri Premium",
    description: "Cele mai noi smartphone-uri la cele mai bune prețuri",
    url: "https://smartshop.ro",
    siteName: "SmartShop",
    locale: "ro_RO",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className={`${inter.variable} ${syne.variable} ${spaceMono.variable} antialiased`}>
        <CartProvider>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
