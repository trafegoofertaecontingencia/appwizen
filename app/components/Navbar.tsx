"use client";

import Link from "next/link";
import { FaHome, FaBullseye, FaUser, FaChartPie } from "react-icons/fa";
import { VscRobot } from "react-icons/vsc";
import { GoGoal } from "react-icons/go";

export default function NavbarInferior() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md px-6 py-2 flex justify-between items-center z-50">
      {/* Página Inicial */}
      <Link href="/">
        <div className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition">
          <FaHome size={20} />
        </div>
      </Link>

      {/* Dashboard */}
      <Link href="/dashboard">
        <div className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition">
          <FaChartPie size={20} />
        </div>
      </Link>

      {/* Chat */}
      <Link href="/chat">
        <div className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition">
          <VscRobot size={20} />
        </div>
      </Link>

      {/* Metas */}
      <Link href="/goals">
        <div className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition">
          <GoGoal size={20} />
        </div>
      </Link>

      {/* Perfil */}
      <Link href="/profile">
        <div className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition">
          <FaUser size={20} />
        </div>
      </Link>
    </nav>
  );
}
