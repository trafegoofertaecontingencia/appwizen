"use client";

import { useState } from "react";

export default function Form() {

  
  const [formData, setFormData] = useState({
    userId: "6835cd92635cddf8b201fec1", // Defina o userId real aqui
    tipo: "receita",
    categoria: "",
    valor: "",
    data: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("salvando...");

    try {
      const res = await fetch("/api/transactions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Transação salva com sucesso!");
        setFormData({ ...formData, valor: "", data: "" });
      } else {
        setStatus(`Erro: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("Erro ao conectar com o servidor");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl font-bold">Cadastro Financeiro</h2>

      <div>
        <label className="block mb-1 font-medium">Tipo</label>
        <select
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="receita">Receita</option>
          <option value="gasto">Despesa</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Categoria</label>
        {formData.tipo === "gasto" ? (
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
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
            className="border w-[100%] p-2 rounded"
            value={formData.categoria}
            onChange={handleChange}
            name="categoria"
            type="text"
            placeholder="Digite o tipo de despesa"
          />
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Valor (R$)</label>
        <input
          type="number"
          name="valor"
          value={formData.valor}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Ex: 150.00"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Data</label>
        <input
          type="date"
          name="data"
          value={formData.data}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Salvar
      </button>

      {status && <p className="text-sm text-center mt-2">{status}</p>}
    </form>
  );
}
