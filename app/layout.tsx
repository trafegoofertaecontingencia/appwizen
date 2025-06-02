"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import { AuthProvider } from "@/app/context/auth-context";
import Header from "./components/Header";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <SessionProvider>
            {children}
            <Chat />
          <Navbar />
          </SessionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
