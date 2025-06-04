"use client"

import { useEffect, useState } from "react";
import FinanceCharts from "../components/FinanceCharts";
import { useAuth } from "../context/auth-context";
import { useSession } from "next-auth/react";
import Wellcome from "../components/Wellcome";
import Loading from "../components/Loading";
import DateFilter from "../components/DateFilter";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [mostrarFiltro, setMostrarFiltro] = useState(false);

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

  const buscarDados = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        userId: user?.userId || session?.user?.userId,
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
  }, [user, session]);

  if (loading) return <Loading />;
  if (!user && !session) return <Wellcome />;

  return (
    <div>
      <DateFilter
        dataInicio={dataInicio}
        dataFim={dataFim}
        setDataInicio={setDataInicio}
        setDataFim={setDataFim}
        onFiltrar={buscarDados}
        mostrarFiltro={mostrarFiltro}
        toggleFiltro={() => setMostrarFiltro((prev) => !prev)}
      />

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
