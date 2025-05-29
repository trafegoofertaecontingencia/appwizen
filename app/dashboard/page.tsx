"use client";

import { useEffect, useState } from "react";
import FinanceCharts from "../components/FinanceCharts";

export default function Dashboard() {
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
        const res1 = await fetch(
          "/api/dashboard?userId=6835cd92635cddf8b201fec1"
        );
        const data1 = await res1.json();

        setReceitaTotal(data1.receitaTotal || 0);
        setDespesaTotal(data1.despesaTotal || 0);
        setSaldoFinal(data1.saldoFinal || 0);

        const res2 = await fetch(
          "/api/dashboard/categorias?userId=6835cd92635cddf8b201fec1"
        );
        const data2 = await res2.json();
        setCategorias(data2 || {});
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false); // ✅ Agora o loading é encerrado corretamente
      }
    };


    fetchData();
  }, []);


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
