import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();
  const { nome, email, telefone } = await req.json();

  // Verificar se o e-mail já existe
  const existe = await User.findOne({ email });
  if (existe) {
    return NextResponse.json({ error: "Usuário já existe com esse e-mail." }, { status: 400 });
  }

  const novoUsuario = await User.create({
    nome,
    email,
    telefone,
  });

  return NextResponse.json({ user: novoUsuario });
}
