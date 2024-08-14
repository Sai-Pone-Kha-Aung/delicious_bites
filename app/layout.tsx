import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Notification from "@/components/Notification/Notification";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Delicious Bites",
  description: "Order the best food at the best price",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Notification/>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
