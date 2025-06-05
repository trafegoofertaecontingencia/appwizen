"use client";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useAuth } from "../context/auth-context";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Chat from "./Chat";

type FormInputs = {
  tipo: string;
  categoria: string;
  valor: string;
  data: string;
};

export default function Form() {

  const router = useRouter();

  const { register, handleSubmit, watch, reset } = useForm<FormInputs>({
    defaultValues: {
      tipo: "receita",
    },
  });

  console.log(watch("categoria"))

  const tipoSelecionado = watch("tipo");
  const [status, setStatus] = useState("");

  const { user } = useAuth();
  const { data: session } = useSession();

  const onSubmit = async (data: FormInputs) => {
    setStatus("Salvando...");

    try {
      const userId = user?.userId || session?.user?.userId;

      const res = await fetch(`/api/transactions/create?userId=${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("Transação salva com sucesso!");
        reset({ ...data, valor: "", data: "" });
        router.push('/dashboard');
      } else {
        setStatus(`Erro: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto bg-white p-6 rounded-xl shadow space-y-4"
      >
        <h2 className="text-xl font-bold">Cadastro Financeiro</h2>
        <div>
          <label className="block mb-1 font-medium">Tipo</label>
          <select
            {...register("tipo")}
            className="w-full border p-2 rounded"
          >
            <option value="receita">Receita</option>
            <option value="gasto">Despesa</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Categoria</label>
          {tipoSelecionado === "gasto" ? (
            <select
              {...register("categoria")}
              className="w-full border p-2 rounded"
            >
              <option value="mercado">Mercado</option>
              <option value="delivery">Delivery</option>
              <option value="transporte">Transporte</option>
              <option value="investimento">Investimento</option>
              <option value="lazer">Lazer</option>
              <option value="outros">Outros</option>
            </select>
          ) : (
            <input
              type="text"
              placeholder="Digite o tipo de receita"
              className="border w-full p-2 rounded"
              {...register("categoria")}
            />
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Valor (R$)</label>
          <input
            type="number"
            step="0.01"
            placeholder="Ex: 150.00"
            className="w-full border p-2 rounded"
            {...register("valor", { required: true })}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Data</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            {...register("data", { required: true })}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Salvar
        </button>
        {status && <p className="text-sm text-center mt-2">{status}</p>}
      </form>
        <Chat />
    </div>
  );
}
