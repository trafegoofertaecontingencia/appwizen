// components/DateFilter.tsx
"use client";

import { FiFilter } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={toggleFiltro}
          variant="outline"
          className="flex items-center gap-2"
        >
          <FiFilter size={18} />
          <span className="text-sm hidden md:inline">Filtrar por data</span>
        </Button>
      </div>

      <AnimatePresence>
        {mostrarFiltro && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-muted/40 border border-muted rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="space-y-2">
              <Label className="text-muted-foreground">Data Início</Label>
              <Input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Data Fim</Label>
              <Input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={onFiltrar}
                className="w-full"
              >
                Aplicar Filtro
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
