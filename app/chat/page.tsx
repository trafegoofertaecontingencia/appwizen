'use client';

import { useState } from 'react';

export default function Chat() {
  const [prompt, setPrompt] = useState('');
  const [resposta, setResposta] = useState('');
  const [loading, setLoading] = useState(false);

  const enviarMensagem = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: '6835cd92635cddf8b201fec1', // ID fictício
          message: prompt,
        }),
      });

      const data = await res.json();
      setResposta(data.resposta || 'Sem resposta');
    } catch (err) {
      setResposta('Erro ao consultar a IA');
      console.error(err);
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Consultor Virtual de Finanças</h1>

      <textarea
        className="w-full p-2 border rounded"
        placeholder="Digite sua dúvida financeira..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={enviarMensagem}
        disabled={loading}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded w-full"
      >
        {loading ? 'Consultando...' : 'Enviar'}
      </button>

      {resposta && (
        <div className="mt-4 p-3 bg-gray-100 rounded shadow">
          <strong>Resposta:</strong>
          <p>{resposta}</p>
        </div>
      )}
    </div>
  );
}
