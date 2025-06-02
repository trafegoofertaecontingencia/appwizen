"use client";

import { useEffect, useState } from "react";
import FinanceCharts from "../components/FinanceCharts";
import { useAuth } from "../context/auth-context";

import { useSession } from "next-auth/react";
import Wellcome from "../components/Wellcome";

export default function Dashboard() {
  const { user } = useAuth();

  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const [receitaTotal, setReceitaTotal] = useState(0);
  const [despesaTotal, setDespesaTotal] = useState(0);
  const [saldoFinal, setSaldoFinal] = useState(0);
  const [categorias, setCategorias] = useState({
    delivery: 0,
    transporte: 0,
    moradia: 0,
    lazer: 0,
    investimentos: 0,
    educacao: 0,
  });

  console.log(user);

  const buscarDados = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        userId: user?.userId,
        ...(dataInicio && { dataInicio }),
        ...(dataFim && { dataFim }),
      }).toString();

      const res = await fetch(`/api/dashboard?${query}`);
      const data = await res.json();

      setReceitaTotal(data.receitaTotal || 0);
      setDespesaTotal(data.despesaTotal || 0);
      setSaldoFinal(data.saldoFinal || 0);
      setCategorias(data.categorias || {});
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarDados();
  }, []);

  if (!user && !session) return <Wellcome />;

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600">Data Início</label>
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600">Data Fim</label>
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <button
          onClick={buscarDados}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-6 md:mt-auto hover:bg-blue-700"
        >
          Filtrar
        </button>
      </div>

      <FinanceCharts
        receitaTotal={receitaTotal}
        despesaTotal={despesaTotal}
        saldoFinal={saldoFinal}
        categorias={categorias}
        loading={loading}
      />
    </div>
  );
}
