"use client";
import { useUserContext } from "@/context/userContext";
import React, { useState } from "react";

function ForgotPasswordForm() {
  const { forgotPasswordEmail } = useUserContext();

  // State
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Reset message

    try {
      await forgotPasswordEmail(email); // Assume forgotPasswordEmail é uma função assíncrona
      setMessage("E-mail de recuperação enviado com sucesso!");
    } catch (error) {
      setMessage("Erro ao enviar e-mail de recuperação. Tente novamente.");
      console.error("Erro ao enviar o e-mail:", error);
    } finally {
      setLoading(false);
      setEmail(""); // Limpa o campo de entrada
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative m-[2rem] px-10 py-14 rounded-lg bg-white max-w-[520px] w-full"
    >
      <div className="relative z-10">
        <h1 className="mb-2 text-center text-[1.35rem] font-medium">
          Resete email ou senha
        </h1>
        <div className="mt-[1rem] flex flex-col">
          <label htmlFor="email" className="mb-1 text-[#999]">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            name="email"
            placeholder="meuemaile@gmail.com"
            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
            required
          />
        </div>
        <div className="flex">
          <button
            type="submit"
            className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:bg-[#1abc9c] transition-colors"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Resete sua senha"}
          </button>
        </div>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
      <img src="/flurry.png" alt="" />
    </form>
  );
}

export default ForgotPasswordForm;
