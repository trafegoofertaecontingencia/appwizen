import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function POST(req: Request) {
  await connectDB();

  const { userId, tipo, categoria, valor, data } = await req.json();

  if (!userId || !tipo || !categoria || !valor || !data) {
    return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
  }

  const novaTransacao = await Transaction.create({
    userId,
    tipo,
    categoria,
    valor,
    data,
  });

  return NextResponse.json({ transaction: novaTransacao });
}
