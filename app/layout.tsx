"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "@/app/context/auth-context";
import { SessionProvider } from "next-auth/react";

import { cn } from "@/lib/utils";
import Sidebar from "@/components/sidebar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={cn("bg-background antialiased font-sans")}>
        <AuthProvider>
          <SessionProvider>
            {children}
            <Sidebar />
          </SessionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
