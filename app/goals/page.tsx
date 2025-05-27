'use client';

import { useState } from 'react';

interface FinanceGoal {
  titulo: string;
  valor: number;
  progresso: number; // em %
}

const metasMock: FinanceGoal[] = [
  { titulo: 'Reserva de Emergência', valor: 15000, progresso: 45 },
  { titulo: 'Carro Novo', valor: 9000, progresso: 60 },
  { titulo: 'Férias', valor: 12000, progresso: 60 }
];

export default function GoalsPage() {
  const [metas] = useState<FinanceGoal[]>(metasMock);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Metas Financeiras</h1>

      {metas.map((meta, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow-sm mb-4 p-4 border border-gray-100"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">{meta.titulo}</span>
            <span className="text-sm text-gray-500">{meta.progresso}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${meta.progresso}%` }}
            />
          </div>
          <span className="text-sm text-gray-600">
            Meta: R$ {meta.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      ))}
    </div>
  );
}
