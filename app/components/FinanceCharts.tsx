"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartOptions,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

type Props = {
  receitaTotal: number;
  despesaTotal: number;
  saldoFinal: number;
  categorias: {
    delivery: number;
    transporte: number;
    moradia: number;
    lazer: number;
    investimentos: number;
    educacao: number;
  };
  loading: boolean;
};

export default function FinanceCharts({
  receitaTotal,
  despesaTotal,
  saldoFinal,
  categorias,
  loading,
}: Props) {


  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500" />
      </div>
    );
  }

  const pieData = {
    labels: ["Receita", "Despesa", "Saldo"],
    datasets: [
      {
        label: "Distribuição Financeira",
        data: [receitaTotal, despesaTotal, saldoFinal],
        backgroundColor: ["#4ade80", "#f87171", "#60a5fa"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  console.log(Object.keys(categorias));

  const barData = {
    labels: ["Mercado", "Delivery", "Lazer", "outros"],
    datasets: [
      {
        label: "Gastos por Categoria",
        data: Object.values(categorias),
        backgroundColor: "#60a5fa",
        borderRadius: 8,
      },
    ],
  };

  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Gastos por Categoria",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `R$ ${value}`,
        },
      },
    },
  };

  const pieOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#374151",
          font: { size: 14 },
          generateLabels: (chart) => {
            const dataset = chart.data.datasets[0];
            return chart.data.labels!.map((label, i) => ({
              text: `${label}: R$ ${dataset.data[i]}`,
              fillStyle: Array.isArray(dataset.backgroundColor)
                ? (dataset.backgroundColor as string[])[i]
                : typeof dataset.backgroundColor === "string"
                ? dataset.backgroundColor
                : "#ccc",
              strokeStyle: "#fff",
              lineWidth: 1,
              hidden: false,
              index: i,
            }));
          },
        },
      },
      title: {
        display: true,
        text: "Distribuição de Receita, Despesa e Saldo",
        font: { size: 18 },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="bg-white p-4 rounded-2xl shadow">
        <Pie data={pieData} options={pieOptions} />
      </div>
      <div className="bg-white p-4 rounded-2xl shadow">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
}
