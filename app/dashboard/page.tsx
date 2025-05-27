"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface Transaction {
  type: "Receita" | "Despesa";
  category: string;
  value: number;
  date: string;
}

export default function Dashboard() {
  const [transactions] = useState<Transaction[]>([
    { type: "Receita", category: "Salário", value: 5000, date: "2025-05-01" },
    { type: "Despesa", category: "Mercado", value: 1200, date: "2025-05-02" },
    { type: "Despesa", category: "Transporte", value: 300, date: "2025-05-03" },
    { type: "Receita", category: "Freela", value: 1500, date: "2025-05-04" },
  ]);

  const totalReceita = transactions.filter(t => t.type === "Receita").reduce((acc, t) => acc + t.value, 0);
  const totalDespesa = transactions.filter(t => t.type === "Despesa").reduce((acc, t) => acc + t.value, 0);
  const saldo = totalReceita - totalDespesa;

  const pieData = [
    { name: "Receita", value: totalReceita },
    { name: "Despesa", value: totalDespesa },
    { name: "Saldo", value: saldo },
  ];

  const PIE_COLORS = ["#34D399", "#F87171", "#60A5FA"]; // verde, vermelho, azul
  const BAR_COLOR = "#7C3AED";

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      {/* Resumo */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow border">
          <p className="text-gray-500 text-sm">Receita</p>
          <p className="text-2xl font-medium text-gray-700">R$ {totalReceita}</p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow border">
          <p className="text-gray-500 text-sm">Despesa</p>
          <p className="text-2xl font-medium text-gray-700">R$ {totalDespesa}</p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow border">
          <p className="text-gray-500 text-sm">Saldo</p>
          <p className="text-2xl font-medium text-gray-700">R$ {saldo}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow border">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Resumo Financeiro</h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legenda customizada */}
          <div className="mt-4 space-y-2">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center space-x-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                />
                <span className="text-gray-600 text-sm">{entry.name}:</span>
                <span className="text-gray-800 font-medium">R$ {entry.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow border">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Comparativo</h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pieData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="value" fill={BAR_COLOR} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
