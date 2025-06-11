import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Meta from "@/models/Meta";

// 📌 GET - Listar metas por usuário
export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "ID do usuário ausente" }, { status: 400 });
  }

  const metas = await Meta.find({ userId });
  return NextResponse.json(metas);
}

// POST - Criar nova meta
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();


  if (!body.userId || !body.titulo || !body.valor) {
    return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
  }

  const novaMeta = await Meta.create({
    userId: body.userId,
    titulo: body.titulo,
    valor: body.valor,
    progresso: body.progresso || 0,
  });

  return NextResponse.json(novaMeta);
}
