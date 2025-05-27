"use client";

import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    type: "receita",
    category: "mercado",
    amount: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);
    // Aqui você pode fazer a lógica de envio para o backend
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
          name="type" 
          value={formData.type} 
          onChange={handleChange} 
          className="w-full border p-2 rounded"
        >
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Categoria</label>
        <select 
          name="category" 
          value={formData.category} 
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
      </div>

      <div>
        <label className="block mb-1 font-medium">Valor (R$)</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
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
          name="date"
          value={formData.date}
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
    </form>
  );
}
