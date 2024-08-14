import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Notification from "@/components/Notification/Notification";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <AuthProvider>
          <QueryProvider>
            <Notification/>
            <Navbar/>
            {children}
            <Footer/>
            <ToastContainer position="bottom-right" theme="dark" autoClose={3000}/>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
