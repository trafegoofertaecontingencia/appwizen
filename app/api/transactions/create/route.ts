import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function POST(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId")

  const body = await req.json();
  const { tipo, categoria, valor, data } = body;

  if (!userId || !tipo || !categoria || !valor || !data) {
    return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 });
  }

  try {
    const transaction = new Transaction({
      userId,
      tipo,
      categoria,
      valor: Number(valor),
      data: new Date(data),
    });

    await transaction.save();

    return NextResponse.json({ success: true, transaction });
  } catch (error) {
    console.error("Erro ao salvar transação:", error);
    return NextResponse.json({ error: "Erro ao salvar transação" }, { status: 500 });
  }
}
