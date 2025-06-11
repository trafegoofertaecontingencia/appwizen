"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import { useSession } from "next-auth/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import FinanceCharts from "../components/FinanceCharts";
import Wellcome from "../components/Wellcome";
import Loading from "../components/Loading";
import DateFilter from "../components/DateFilter";
import Chat from "../components/Chat";

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

  if (loading) return <Loading margin="4" />;
  if (!user && !session) return <Wellcome />;

  return (
    <div className="p-6 md:p-10 bg-background text-foreground space-y-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">Painel Financeiro</h1>
        <Badge variant="outline" className="text-sm px-3 py-1 rounded-full">
          {new Date().toLocaleDateString("pt-BR")}
        </Badge>
      </div>

      <DateFilter
        dataInicio={dataInicio}
        dataFim={dataFim}
        setDataInicio={setDataInicio}
        setDataFim={setDataFim}
        onFiltrar={buscarDados}
        mostrarFiltro={mostrarFiltro}
        toggleFiltro={() => setMostrarFiltro((prev) => !prev)}
      />

      <div className="grid gap-6 md:grid-cols-3">
        <DashboardCard title="Receita Total" value={receitaTotal} type="receita" />
        <DashboardCard title="Despesa Total" value={despesaTotal} type="despesa" />
        <DashboardCard title="Saldo Final" value={saldoFinal} type="saldo" progress={calcularPorcentagem(saldoFinal, receitaTotal)} />
      </div>

      <Tabs defaultValue="visao" className="w-full mt-6">
        <TabsList className="bg-muted flex justify-start">
          <TabsTrigger value="visao">📊 Visão Geral</TabsTrigger>
          <TabsTrigger value="categorias">📁 Por Categoria</TabsTrigger>
        </TabsList>

        <TabsContent value="visao" className="mt-6">
          <FinanceCharts
            receitaTotal={receitaTotal}
            despesaTotal={despesaTotal}
            saldoFinal={saldoFinal}
            categorias={categorias}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="categorias" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(categorias).map(([categoria, valor]) => (
              <Card
                key={categoria}
                className="bg-card/90 border border-border shadow-md hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="capitalize text-muted-foreground">{categoria}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-medium text-foreground">
                    R$ {valor.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  type,
  progress,
}: {
  title: string;
  value: number;
  type: "receita" | "despesa" | "saldo";
  progress?: number;
}) {
  const color =
    type === "receita"
      ? "text-green-400"
      : type === "despesa"
      ? "text-red-400"
      : value >= 0
      ? "text-green-300"
      : "text-red-400";

  return (
    <Card className="bg-card/90 border border-border shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {progress !== undefined && (
          <Progress value={progress} className="h-2 bg-muted" />
        )}
        <p className={`text-xl font-semibold ${color}`}>
          R$ {value.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
}

function calcularPorcentagem(valor: number, total: number) {
  if (!total) return 0;
  const porcentagem = (valor / total) * 100;
  return Math.min(Math.max(porcentagem, 0), 100);
}
