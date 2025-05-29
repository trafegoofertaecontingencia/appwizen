import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId obrigatório" }, { status: 400 });
  }

  try {
    await connectDB();
    const transacoes = await Transaction.find({ userId });

    const categorias: Record<string, number> = {};

    transacoes.forEach((t) => {
      if (t.tipo === "gasto") {
        categorias[t.categoria] = (categorias[t.categoria] || 0) + t.valor;
      }
    });

    return NextResponse.json({ categorias });
  } catch (error) {
    console.error("Erro ao calcular categorias:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}