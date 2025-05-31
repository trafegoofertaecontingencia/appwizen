import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  const {
    nome,
    email,
    senha,
    telefone,
    plano,
    idioma,
    dataNascimento,
  } = body;

  if (!senha || senha.length < 6) {
    return NextResponse.json(
      { error: "A senha deve ter no mínimo 6 caracteres." },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { error: "E-mail já está registrado" },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);

    const novoUsuario = await User.create({
      nome,
      email,
      senha: hashedPassword,
      telefone,
      plano: plano || "gratuito",
      idioma: idioma || "pt-BR",
      dataNascimento: dataNascimento ? new Date(dataNascimento) : undefined,
      ultimaAtividade: new Date(),
    });

    return NextResponse.json({
      message: "Usuário cadastrado com sucesso",
      user: {
        id: novoUsuario._id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
      },
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return NextResponse.json({ error: "Erro ao cadastrar" }, { status: 500 });
  }
}
