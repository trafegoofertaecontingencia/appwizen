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
  const { user } = useAuth();
  const { data: session } = useSession();
  const userId = user?.id || session?.user?.userId;

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [historico, setHistorico] = useState<Message[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [showFloatingUI, setShowFloatingUI] = useState(false);

  // Exibir animação de sugestão a cada 10s, visível por 5s
  useEffect(() => {
    if (showChat) {
      setShowFloatingUI(false); // oculta imediatamente se o chat abrir
      return; // interrompe o ciclo de animação
    }

    const interval = setInterval(() => {
      setShowFloatingUI(true);
      const timeout = setTimeout(() => setShowFloatingUI(false), 5000);

      return () => clearTimeout(timeout);
    }, 10000);

    return () => clearInterval(interval);
  }, [showChat]);

  useEffect(() => {
    if (showChat && userId) {
      fetch(`/api/messages?userId=${userId}`)
        .then((res) => res.json())
        .then((data: Message[]) => setHistorico(Array.isArray(data) ? data : []))
        .catch(() => setHistorico([]));
    }
  }, [showChat, userId]);

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
    } catch {
      // erro silencioso
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  return (
    <div>
      {/* Chat aberto */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-28 right-6 w-96 bg-white border rounded-xl shadow-lg p-4 z-50"
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
              value={
                !session && !user ? "Você precisa estar logado..." : prompt
              }
              onChange={(e) => setPrompt(e.target.value)}
            />

            <button
              onClick={enviarMensagem}
              disabled={loading || (!session && !user)}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              {loading ? "Consultando..." : "Enviar"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão + dica animada (quando o chat está fechado) */}
      <AnimatePresence>
        {showFloatingUI && !showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-12 right-6 flex items-center space-x-2 z-40"
          >
            <div className="bg-blue-100 text-gray-700 shadow px-4 py-2 rounded-lg text-sm">
              Fale com seu consultor financeiro
            </div>
            <motion.button
              onClick={() => setShowChat(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white p-4 rounded-full shadow-lg"
            >
              <FiMessageSquare className="text-2xl" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
