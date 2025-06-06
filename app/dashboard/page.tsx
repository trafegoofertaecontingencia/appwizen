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

  if (loading) return <Loading />;
  if (!user && !session) return <Wellcome />;

  return (
    <div className="p-6 md:p-10 bg-background text-foreground space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Painel Financeiro</h1>
        <Badge variant="outline" className="text-sm">
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

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Receita Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-green-400">
              R$ {receitaTotal.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Despesa Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-red-400">
              R$ {despesaTotal.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saldo Final</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={calcularPorcentagem(saldoFinal, receitaTotal)} />
            <p
              className={`mt-2 text-lg font-semibold ${
                saldoFinal >= 0 ? "text-green-300" : "text-red-400"
              }`}
            >
              R$ {saldoFinal.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="visao" className="w-full mt-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="visao">Visão Geral</TabsTrigger>
          <TabsTrigger value="categorias">Categorias</TabsTrigger>
        </TabsList>

        <TabsContent value="visao">
          <FinanceCharts
            receitaTotal={receitaTotal}
            despesaTotal={despesaTotal}
            saldoFinal={saldoFinal}
            categorias={categorias}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="categorias">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {Object.entries(categorias).map(([categoria, valor]) => (
              <Card key={categoria}>
                <CardHeader>
                  <CardTitle className="capitalize">{categoria}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-muted-foreground">
                    R$ {valor.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Chat />
    </div>
  );
}

function calcularPorcentagem(valor: number, total: number) {
  if (!total) return 0;
  const porcentagem = (valor / total) * 100;
  return Math.min(Math.max(porcentagem, 0), 100);
}

