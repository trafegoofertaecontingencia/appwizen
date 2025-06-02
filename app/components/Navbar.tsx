"use client";

import Link from "next/link";
import { useState } from "react";
import { FaHome, FaChartPie } from "react-icons/fa";
import { VscRobot } from "react-icons/vsc";
import { GoGoal } from "react-icons/go";
import { FaGear } from "react-icons/fa6";
import { motion } from "framer-motion";

import { signOut } from "next-auth/react";

import { useAuth } from "../context/auth-context";

import { useSession } from "next-auth/react";

export default function NavbarInferior() {
  const { user } = useAuth();
  const { data: session } = useSession();

  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>
      {/* Menu Lateral */}
      {menuAberto && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween" }}
          className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 p-6 border-l"
        >
          <button
            className="text-gray-500 text-sm mb-6"
            onClick={() => setMenuAberto(false)}
          >
            Fechar ✖
          </button>
          <ul className="space-y-4 text-blue-600 font-medium">
            <li>
              <Link href="/profile" onClick={() => setMenuAberto(false)}>
                Meu Perfil
              </Link>
            </li>
            <li>
              {!session && !user ? (
                <Link href="/login" onClick={() => setMenuAberto(false)}>
                  Entrar
                </Link>
              ) : (
                <Link
                  href="/"
                  onClick={() => {
                    setMenuAberto(false);
                    localStorage.removeItem("token");
                    signOut();
                  }}
                >
                  Sair
                </Link>
              )}
            </li>
          </ul>
        </motion.div>
      )}

      {/* Navbar Inferior */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md px-6 py-2 flex justify-between items-center z-40">
        <Link href="/">
          <div className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition">
            <FaHome size={20} />
          </div>
        </Link>

        <Link href="/dashboard">
          <div className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition">
            <FaChartPie size={20} />
          </div>
        </Link>

        <Link href="/chat">
          <div className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition">
            <VscRobot size={20} />
          </div>
        </Link>

        <Link href="/goals">
          <div className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition">
            <GoGoal size={20} />
          </div>
        </Link>

        <div
          onClick={() => setMenuAberto(true)}
          className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition cursor-pointer"
        >
          <FaGear size={20} />
        </div>
      </nav>
    </>
  );
}
