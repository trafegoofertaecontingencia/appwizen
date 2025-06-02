// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";

import { signIn } from "next-auth/react";

type FormData = {
  email: string;
  senha: string;
};

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({ email: "", senha: "" });
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setMensagem(data?.error || "Erro ao fazer login.");
      return;
    }

    // Salva o token no localStorage
    localStorage.setItem("token", data.token);

    // Redireciona para o dashboard
    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-xl mt-10 space-y-6">
      <h2 className="text-xl font-bold text-center">Entrar</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </form>

      <button
        onClick={() => signIn("google", {callbackUrl: "/"})}
        className="w-full bg-white border border-gray-300 py-2 rounded flex items-center justify-center gap-2 hover:shadow-md transition"
      >
        <FcGoogle size={24} />
        <span>Entrar com Google</span>
      </button>

      {mensagem && (
        <p className="text-center text-red-500 text-sm">{mensagem}</p>
      )}
    </div>
  );
}
