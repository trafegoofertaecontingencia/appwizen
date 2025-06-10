// app/consultor/page.tsx
"use client";

import { SendHorizontal } from "lucide-react";

export default function Consultor() {
  return (
    <main className="min-h-screen bg-[#c8fe04] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#c8fe04] text-gray-900 font-bold text-lg px-6 py-4">
          Consultor
        </div>

        {/* Mensagens simuladas */}
        <div className="flex-1 px-6 py-4 space-y-2 overflow-y-auto h-96 bg-gray-50">
          <div className="bg-gray-200 p-3 rounded-lg text-sm max-w-[75%]">
            Olá! Como posso ajudar?
          </div>
          <div className="bg-blue-100 p-3 rounded-lg text-sm self-end text-right ml-auto max-w-[75%]">
            Quero entender como funciona o orçamento mensal.
          </div>
        </div>

        {/* Input com botão embutido */}
        <div className="relative p-4 border-t bg-white">
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            className="w-full border border-[#c8fe04] rounded-full py-2 px-4 pr-12 focus:outline-none"
          />
          <button className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#c8fe04] hover:scale-110 transition">
            <SendHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  );
}
