"use client";

import { useEffect, useState } from "react";
import FinanceCharts from "../components/FinanceCharts";

import { useAuth } from "../context/auth-context";

export default function Dashboard() {
  
  const { user } = useAuth();

  if (!user) return <p>Você precisa estar logado</p>;

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/dashboard?userId=${user.userId}`
        );
        const data = await res.json();

        setReceitaTotal(data.receitaTotal || 0);
        setDespesaTotal(data.despesaTotal || 0);
        setSaldoFinal(data.saldoFinal || 0);
        setCategorias(data.categorias || null);

      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false); // ✅ Agora o loading é encerrado corretamente
      }
    };

    fetchData();
  }, []);

  console.log(categorias)

  return (
    <FinanceCharts
      receitaTotal={receitaTotal}
      despesaTotal={despesaTotal}
      saldoFinal={saldoFinal}
      categorias={categorias}
      loading={loading} // ✅ Passamos o loading por prop
    />
  );
}
