'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Plus } from 'lucide-react';

interface FinanceGoal {
  titulo: string;
  valor: number;
  progresso: number; // em %
}

const metasMock: FinanceGoal[] = [
  { titulo: 'Reserva de Emergência', valor: 15000, progresso: 45 },
  { titulo: 'Carro Novo', valor: 9000, progresso: 60 },
  { titulo: 'Férias', valor: 12000, progresso: 60 },
];

export default function GoalsPage() {
  const [metas] = useState<FinanceGoal[]>(metasMock);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Metas Financeiras</h1>
        <Button className="bg-[#c8fe04] text-zinc-700">
          <Plus className="w-4 h-4 mr-2" />
          Criar Meta
        </Button>
      </div>

      {metas.map((meta, idx) => (
        <div
          key={idx}
          className="bg-card border border-border rounded-xl p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-foreground">{meta.titulo}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-700">{meta.progresso}%</span>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-700">
                <Pencil className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div
              className="bg-[#c8fe04] h-2 rounded-full transition-all"
              style={{ width: `${meta.progresso}%` }}
            />
          </div>
          <span className="text-sm text-muted-foreground">
            Meta: R$ {meta.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      ))}
    </div>
  );
}
