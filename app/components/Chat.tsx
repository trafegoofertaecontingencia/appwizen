"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import { useAuth } from "../context/auth-context";

import { useSession } from "next-auth/react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [prompt, setPrompt] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);
  const [historico, setHistorico] = useState<Message[]>([]);
  const [showChat, setShowChat] = useState(false);

  const userId = "6835cd92635cddf8b201fec1"; // substitua se necessário

  useEffect(() => {
    fetch(`/api/messages?userId=${userId}`)
      .then((res) => res.json())
      .then((data: Message[]) => setHistorico(data))
      .catch(() => setHistorico([]));
  }, [showChat]); // recarrega histórico ao abrir o chat

  const enviarMensagem = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, message: prompt }),
      });

      const data = await res.json();

      const novaMensagem: Message[] = [
        { role: "user", content: prompt },
        { role: "assistant", content: data.resposta || "Sem resposta" },
      ];

      setHistorico((prev) => [...prev, ...novaMensagem]);
    } catch (err) {
      setResposta("Erro ao consultar a IA");
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  const { user } = useAuth();

  const { data: session, status } = useSession();

  return (
    <div>
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 w-96 bg-white border rounded-xl shadow-lg p-4 z-50"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold">Consultor Financeiro</h2>
              <button onClick={() => setShowChat(false)}>
                <IoClose className="text-xl" />
              </button>
            </div>

            <div className="h-64 overflow-y-auto space-y-2 mb-4">
              {historico.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg text-sm whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-blue-100 text-right"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            <textarea
              className="w-full p-2 border rounded mb-2"
              rows={2}
              placeholder="Digite sua dúvida financeira..."
              value={(!session && !user) ? "Você precisa estar logado..." : prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <button
              onClick={enviarMensagem}
              disabled={loading || (!session && !user)}
              className={`w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700`}
            >
              {loading ? "Consultando..." : "Enviar"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setShowChat((prev) => !prev)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-40"
      >
        <FiMessageSquare className="text-2xl" />
      </button>
    </div>
  );
}
