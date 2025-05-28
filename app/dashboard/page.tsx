"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

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
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Financeiro</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border bg-white shadow p-4">
          <p className="text-gray-500">Receita total</p>
          <p className="text-2xl font-bold">R$ {receitaTotal.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border bg-white shadow p-4">
          <p className="text-gray-500">Despesa total</p>
          <p className="text-2xl font-bold">R$ {despesaTotal.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border bg-white shadow p-4">
          <p className="text-gray-500">Saldo final</p>
          <p className="text-2xl font-bold">R$ {saldoFinal.toLocaleString()}</p>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="rounded-xl border bg-white shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Fluxo Financeiro Mensal</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="receita" stroke="#4ade80" strokeWidth={3} />
              <Line type="monotone" dataKey="despesa" stroke="#f87171" strokeWidth={3} />
              <Line type="monotone" dataKey="saldo" stroke="#60a5fa" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
