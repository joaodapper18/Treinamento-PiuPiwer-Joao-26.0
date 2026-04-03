"use client"
import React, { useState } from 'react';
import { createAuthClient } from "better-auth/react"; 
import { useRouter } from "next/navigation";

const authClient = createAuthClient(); 

export default function CadastroPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
        username,
        callbackURL: "/login" 
      });

      if (error) {
        alert("Erro: " + error.message);
      } else {
        alert("Conta criada com sucesso! Agora faça login.");
        router.push("/login");
      }
    } catch (err) {
      alert("Erro na conexão.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white font-sans">
      <div className="w-full max-w-md bg-[#111] border border-[#222] p-8 rounded-[40px] shadow-2xl">
        <h2 className="text-[#00ff88] text-3xl font-black mb-8 text-center uppercase tracking-tighter">Criar Conta</h2>
        <form onSubmit={handleCadastro} className="space-y-4">
          <input type="text" placeholder="Nome Completo" className="w-full bg-[#0a0a0a] border border-[#333] p-4 rounded-2xl outline-none focus:border-[#00ff88]" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="text" placeholder="Username" className="w-full bg-[#0a0a0a] border border-[#333] p-4 rounded-2xl outline-none focus:border-[#00ff88]" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="email" placeholder="E-mail" className="w-full bg-[#0a0a0a] border border-[#333] p-4 rounded-2xl outline-none focus:border-[#00ff88]" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Senha" className="w-full bg-[#0a0a0a] border border-[#333] p-4 rounded-2xl outline-none focus:border-[#00ff88]" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" disabled={isPending} className="w-full bg-[#00ff88] text-black font-black py-4 rounded-2xl uppercase hover:bg-[#00cc77]">
            {isPending ? 'CRIANDO...' : 'CADASTRAR'}
          </button>
        </form>
      </div>
    </div>
  );
}