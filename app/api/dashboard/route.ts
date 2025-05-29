import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Usuário não informado" }, { status: 400 });
  }

  try {
    const transacoes = await Transaction.find({ userId: userId });

    const receitaTotal = transacoes
      .filter((t) => t.tipo === "receita")
      .reduce((acc, t) => acc + t.valor, 0);

    const despesaTotal = transacoes
      .filter((t) => t.tipo === "gasto")
      .reduce((acc, t) => acc + t.valor, 0);

    // const saldoFinal = receitaTotal - despesaTotal;
        const saldoFinal = receitaTotal - despesaTotal;

    console.log(despesaTotal)

    return NextResponse.json({ receitaTotal, despesaTotal, saldoFinal });
  } catch (error) {
    console.error("Erro ao calcular totais:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
