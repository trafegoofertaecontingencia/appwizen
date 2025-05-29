import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import Message from "@/models/Message";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { userId, message } = await req.json();
  await connectDB();

  const user = await User.findById(userId);
  if (!user) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

const transacoes = await Transaction.find({ userId })
  .sort({ createdAt: -1 })
  .limit(10);
  const historico = await Message.find({ userId }).sort({ createdAt: 1 });


const contextoFinanceiro = transacoes.map(t => {
  const tipo = t.tipo === 'gasto' ? 'Gasto' : 'Receita';
  const dataFormatada = new Date(t.data).toLocaleDateString('pt-BR');
  return `${tipo} - ${t.categoria} - R$ ${t.valor.toFixed(2)} em ${dataFormatada}`;
}).join('\n');

  const mensagens = [
    { role: "system", content: `Você é um consultor financeiro virtual, especialista em finanças pessoais.

Sua função é analisar os dados financeiros recentes do usuário e:
- Fornecer um resumo direto e claro com o total de receitas, despesas e o saldo atual
- Apontar se o usuário está gastando mais do que ganha
- Dar sugestões práticas de economia ou organização
- Manter um tom profissional, confiável e objetivo — sem mencionar transações individuais

Sempre que possível, oriente o usuário com boas práticas, metas ou hábitos financeiros saudáveis.

Use as informações abaixo:\n${contextoFinanceiro}` },
    ...historico.map(m => ({ role: m.role, content: m.content })),
    { role: "user", content: message }
  ];


  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: mensagens,
    temperature: 0.7,
  });

  console.log(mensagens)


  const resposta = response.choices[0].message?.content;

  // Envio da mensagem para o banco de dados
  await Message.create({ userId, role: "user", content: message });
  await Message.create({ userId, role: "assistant", content: resposta });


  return NextResponse.json({ resposta });

}

