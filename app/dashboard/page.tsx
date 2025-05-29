"use client";

import { useEffect, useState } from "react";
import FinanceCharts from "../components/FinanceCharts";

export default function Dashboard() {
  const [receitaTotal, setReceitaTotal] = useState(0);
  const [despesaTotal, setDespesaTotal] = useState(0);
  const [saldoFinal, setSaldoFinal] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("/api/dashboard?userId=6835cd92635cddf8b201fec1")
      .then((res) => res.json())
      .then((data) => {
        setReceitaTotal(data.receitaTotal || 0);
        setDespesaTotal(data.despesaTotal || 0);
        setSaldoFinal(data.saldoFinal || 0);
      });

    fetch("/api/dashboard/chart?userId=6835cd92635cddf8b201fec1")
      .then((res) => res.json())
      .then((data) => setChartData(data));
  }, []);

  return (
    <FinanceCharts
      receitaTotal={receitaTotal}
      despesaTotal={despesaTotal}
      saldoFinal={saldoFinal}
      categorias={{
        delivery: 800,
        transporte: 1200,
        moradia: 1800,
        lazer: 600,
        investimentos: 900,
        educacao: 700,
      }}
    />
  );
}
