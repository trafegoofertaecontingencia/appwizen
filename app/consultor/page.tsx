"use client";

import { useAuth } from "@/app/context/auth-context";
import { useSession } from "next-auth/react";
import { SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Consultor() {
  const { user } = useAuth();
  const { data: session } = useSession();
  const userId = user?.userId || session?.user?.userId;


  const [message, setMessage] = useState("");
  const [historico, setHistorico] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement | null>(null);

  // Carrega histórico ao iniciar
  useEffect(() => {
    if (userId) {
      fetch(`/api/messages?userId=${userId}`)
        .then((res) => res.json())
        .then((data: Message[]) => {
          if (Array.isArray(data)) setHistorico(data);
        });
    }
  }, [userId]);

  // Scroll automático para a última mensagem
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [historico]);

  const enviarMensagem = async () => {
    if (!message.trim()) return;

    const novaMensagem: Message = { role: "user", content: message };
    setHistorico((prev) => [...prev, novaMensagem]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, message }),
      });

      const data = await res.json();

      if (data?.resposta) {
        setHistorico((prev) => [
          ...prev,
          { role: "assistant", content: data.resposta },
        ]);
      }
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center px-4">
      <div className="w-full max-w-3xl h-[90vh] bg-[#c8fe04] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Título */}
        <header className="bg-[#c8fe04] px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">Consultor</h1>
        </header>

        {/* Mensagens */}
        <section
          ref={chatRef}
          className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-gray-50"
        >
          {historico.map((msg, idx) => (
            <div
              key={idx}
              className={`text-sm rounded-xl px-4 py-3 max-w-[70%] ${
                msg.role === "user"
                  ? "ml-auto text-right bg-blue-100"
                  : "bg-gray-200"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </section>

        {/* Input + botão */}
        <footer className="border-t bg-white px-4 py-3">
          <div className="relative">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
              type="text"
              placeholder="Digite sua mensagem..."
              className="w-full border border-[#c8fe04] rounded-full py-3 px-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#c8fe04]"
            />
            <button
              onClick={enviarMensagem}
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c8fe04] hover:scale-110 transition"
            >
              <SendHorizontal className="w-5 h-5" />
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
