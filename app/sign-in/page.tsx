"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

type FormData = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [mensagem, setMensagem] = useState("");

  const onSubmit = async (data: FormData) => {
    if (data.senha !== data.confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: data.nome,
        email: data.email,
        senha: data.senha,
      }),
    });

    const resultado = await res.json();
    setMensagem(resultado.message || "Conta criada com sucesso!");

    if (res.ok) reset();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-xl mt-10 space-y-6">
      <h2 className="text-xl font-bold text-center">Criar Conta</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Nome completo"
          {...register("nome", { required: "Nome é obrigatório" })}
          className="w-full border rounded px-4 py-2"
        />
        {errors.nome && (
          <p className="text-red-500 text-sm">{errors.nome.message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email é obrigatório",
            pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
          })}
          className="w-full border rounded px-4 py-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Senha"
          {...register("senha", {
            required: "Senha é obrigatória",
            minLength: { value: 6, message: "Mínimo de 6 caracteres" },
          })}
          className="w-full border rounded px-4 py-2"
        />
        {errors.senha && (
          <p className="text-red-500 text-sm">{errors.senha.message}</p>
        )}

        <input
          type="password"
          placeholder="Confirmar senha"
          {...register("confirmarSenha", {
            required: "Confirmação obrigatória",
            validate: (value) =>
              value === watch("senha") || "As senhas não coincidem",
          })}
          className="w-full border rounded px-4 py-2"
        />
        {errors.confirmarSenha && (
          <p className="text-red-500 text-sm">
            {errors.confirmarSenha.message}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Cadastrar
        </button>
      </form>

      {mensagem && (
        <p className="text-center text-sm text-green-600">{mensagem}</p>
      )}

      <div className="flex items-center gap-2 my-4">
        <div className="flex-grow border-t" />
        <span className="text-gray-500 text-sm">ou</span>
        <div className="flex-grow border-t" />
      </div>

      <button
        onClick={() => signIn("google")}
        className="w-full bg-white border border-gray-300 py-2 rounded flex items-center justify-center gap-2 hover:shadow-md transition"
      >
        <FcGoogle size={24} />
        <span>Entrar com Google</span>
      </button>
    </div>
  );
}
