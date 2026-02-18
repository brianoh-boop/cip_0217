import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Changed from Geist to Inter
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" }); // Configure Inter

export const metadata: Metadata = {
  title: "Cancer Analysis Platform",
  description: "Advanced Genomic Analysis Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans text-slate-900 bg-white`}>
        {children}
      </body>
    </html>
  );
}
