import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const dataInicio = searchParams.get("dataInicio");
  const dataFim = searchParams.get("dataFim");

  if (!userId) {
    return NextResponse.json({ error: "Usuário não informado" }, { status: 400 });
  }

  try {
    const filtro: any = { userId };

    if (dataInicio || dataFim) {
      filtro.data = {};

      if (dataInicio) {
        filtro.data.$gte = new Date(dataInicio);
      }

      if (dataFim) {
        // inclui o final do dia para não perder dados do último dia selecionado
        const fim = new Date(dataFim);
        fim.setHours(23, 59, 59, 999);
        filtro.data.$lte = fim;
      }
    }

    const transacoes = await Transaction.find(filtro);

    const receitaTotal = transacoes
      .filter((t) => t.tipo === "receita")
      .reduce((acc, t) => acc + t.valor, 0);

    const despesaTotal = transacoes
      .filter((t) => t.tipo === "gasto")
      .reduce((acc, t) => acc + t.valor, 0);

    const categorias: Record<string, number> = {};

    transacoes.forEach((t) => {
      if (t.tipo === "gasto") {
        categorias[t.categoria] = (categorias[t.categoria] || 0) + t.valor;
      }
    });

    const saldoFinal = receitaTotal - despesaTotal;

    return NextResponse.json({ receitaTotal, despesaTotal, saldoFinal, categorias });
  } catch (error) {
    console.error("Erro ao calcular totais:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
