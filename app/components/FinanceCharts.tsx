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

  console.log(categorias)

  const categoriaNomes = {
    mercado: "Mercado",
    delivery: "Delivery",
    transporte: "Transporte",
    investimentos: "Investimentos",
    lazer: "Lazer",
    outros: "Outros",
  };

  const despesasLabels = Object.keys(categorias).map(
    (key) => categoriaNomes[key as keyof typeof categoriaNomes]
  );

  const despesasValues = Object.values(categorias);

const barData = {
  labels: despesasLabels,
  datasets: [
    {
      label: "Despesas",
      data: despesasValues,
      backgroundColor: "#f87171",
      borderRadius: 8,
      maxBarThickness: 40, // <- controla a espessura máxima
      minBarLength: 2,     // <- impede que barras muito pequenas sumam
    },
  ],
};

  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `R$ ${ctx.parsed.y}`,
        },
      },
      title: {
        display: true,
        text: "Despesas por Categoria",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `R$ ${value}`,
        },
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
