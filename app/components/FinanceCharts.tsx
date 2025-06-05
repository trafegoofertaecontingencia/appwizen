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
import { Bar, Doughnut } from "react-chartjs-2";
import Loading from "./Loading";

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
  if (loading) return <Loading />;

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

  const barData = {
    labels: ["Mercado", "Delivery", "Lazer", "Outros"],
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
    maintainAspectRatio: false,
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

  const pieOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-blue-50">
      <div className="bg-white p-4 rounded-2xl shadow min-h-[300px]">
        <div className="relative h-[300px] md:h-[350px]">
          <Doughnut data={pieData} options={pieOptions} />
        </div>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow min-h-[300px]">
        <div className="relative h-[300px] md:h-[350px]">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}
