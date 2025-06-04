// components/DateFilter.tsx
"use client";

import { FiFilter } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

interface DateFilterProps {
  dataInicio: string;
  dataFim: string;
  setDataInicio: (value: string) => void;
  setDataFim: (value: string) => void;
  onFiltrar: () => void;
  mostrarFiltro: boolean;
  toggleFiltro: () => void;
}

export default function DateFilter({
  dataInicio,
  dataFim,
  setDataInicio,
  setDataFim,
  onFiltrar,
  mostrarFiltro,
  toggleFiltro,
}: DateFilterProps) {
  return (
    <div>
      <div className="flex justify-end bg-blue-400 p-1">
        <button
          onClick={toggleFiltro}
          className="text-white transition p-2 rounded-lg flex items-center gap-2"
        >
          <FiFilter size={24} />
          <span className="text-sm hidden md:inline">Filtrar por data</span>
        </button>
      </div>

      <AnimatePresence>
        {mostrarFiltro && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white p-4 rounded-xl shadow mb-4 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div>
              <label className="text-sm text-gray-600">Data Início</label>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Data Fim</label>
              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={onFiltrar}
                className="w-full bg-blue-400 text-white py-2 rounded transition"
              >
                Aplicar Filtro
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
