"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", receita: 5000, despesa: 3000, saldo: 2000 },
  { month: "Feb", receita: 4500, despesa: 2500, saldo: 2000 },
  { month: "Mar", receita: 6000, despesa: 4000, saldo: 2000 },
  { month: "Apr", receita: 7000, despesa: 3500, saldo: 3500 },
  { month: "May", receita: 6500, despesa: 3000, saldo: 3500 },
  { month: "Jun", receita: 8000, despesa: 4000, saldo: 4000 },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Financeiro</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500">Receita total</p>
            <p className="text-2xl font-bold">R$ 37.000</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500">Despesa total</p>
            <p className="text-2xl font-bold">R$ 20.000</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500">Saldo final</p>
            <p className="text-2xl font-bold">R$ 17.000</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Fluxo Financeiro Mensal</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
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
        </CardContent>
      </Card>
    </div>
  );
}
