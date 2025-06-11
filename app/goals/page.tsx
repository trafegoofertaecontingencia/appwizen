'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/app/context/auth-context';

import Loading from '@/app/components/Loading';

interface FinanceGoal {
  _id?: string;
  titulo: string;
  valor: number;
  progresso: number;
}

export default function GoalsPage() {
  const { user } = useAuth();
  const { data: session } = useSession();
  const userId = user?.userId || session?.user?.userId;

  const [metas, setMetas] = useState<FinanceGoal[]>([]);
  const [titulo, setTitulo] = useState('');
  const [valor, setValor] = useState(0);
  const [progresso, setProgresso] = useState(0);
  const [editando, setEditando] = useState<string | null>(null);

  const [erroBackend, setErroBackend] = useState(''); // Novo estado de erro do backend

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!userId) return;

    setCarregando(true);

    fetch(`/api/metas?userId=${userId}`)
      .then((res) => res.json())
      .then(setMetas)
      .finally(() => setCarregando(false));
  }, [userId]);

  const salvarMeta = async () => {
    setErroBackend(''); // limpar erro anterior

    const payload = {
      userId,
      titulo,
      valor,
      progresso,
    };

    try {
      const res = await fetch('/api/metas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErroBackend(data.error || 'Erro ao salvar meta.');
        return;
      }

      setMetas((prev) => [...prev, data]);
      limparFormulario();
    } catch (err) {
      setErroBackend('Erro de conexão com o servidor.');
    }
  };

  const limparFormulario = () => {
    setTitulo('');
    setValor(0);
    setProgresso(0);
    setEditando(null);
    setErroBackend('');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Metas Financeiras</h1>
      </div>

      {/* Formulário de criação */}
      <div className="bg-white p-4 border border-gray-200 rounded-xl shadow">
        <h2 className="text-lg font-medium mb-2">
          {editando ? 'Editar Meta' : 'Nova Meta'}
        </h2>

        <input
          type="text"
          placeholder="Nome da meta"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full mb-2 px-4 py-2 border rounded"
        />

        <input
          type="number"
          placeholder="Valor da meta"
          value={valor === 0 ? '' : valor}
          onChange={(e) => setValor(Number(e.target.value))}
          className="w-full mb-2 px-4 py-2 border rounded"
        />

        <input
          type="number"
          placeholder="Progresso (%)"
          value={progresso === 0 ? '' : progresso}
          onChange={(e) => setProgresso(Number(e.target.value))}
          className="w-full mb-3 px-4 py-2 border rounded"
        />

        <Button onClick={salvarMeta} className="bg-[#c8fe04] text-zinc-700">
          {editando ? 'Salvar Edição' : 'Adicionar Meta'}
        </Button>

        {erroBackend && (
          <p className="text-sm text-red-500 mt-3">{erroBackend}</p> // Exibição do erro
        )}
      </div>

      {true ? <Loading margin='4' /> : metas.map((meta, idx) => (  
        <div
          key={meta._id || idx}
          className="bg-card border border-border rounded-xl p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-foreground">{meta.titulo}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-700">{meta.progresso}%</span>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-zinc-700"
                onClick={() => {
                  setTitulo(meta.titulo);
                  setValor(meta.valor);
                  setProgresso(meta.progresso);
                  setEditando(meta._id!);
                }}
              >
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
