"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CartProvider } from './_component/context/CartContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </CartProvider>
      </body>
    </html>
  );
}
