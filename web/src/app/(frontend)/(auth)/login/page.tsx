"use client"
import React, { useState } from 'react';
import { createAuthClient } from "better-auth/react"; 
import { useRouter } from "next/navigation";
import Link from "next/link"; // Importação necessária para o link funcionar

const authClient = createAuthClient(); 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/" 
      });

      if (error) {
        alert(error.message || "Usuário não encontrado ou senha incorreta.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      alert("Erro de conexão com o servidor.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-[#111] border border-[#222] p-8 rounded-[40px] shadow-2xl">
        <h2 className="text-[#00ff88] text-3xl font-black mb-8 text-center uppercase tracking-tighter">
          BEM-VINDO DE VOLTA
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-gray-500 text-[10px] font-black uppercase ml-2 mb-2 block tracking-widest">E-mail</label>
            <input 
              type="email" 
              placeholder="exemplo@gmail.com" 
              className="w-full bg-[#0a0a0a] border border-[#333] p-4 rounded-2xl text-white outline-none focus:border-[#00ff88] transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-gray-500 text-[10px] font-black uppercase ml-2 mb-2 block tracking-widest">Senha</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-[#0a0a0a] border border-[#333] p-4 rounded-2xl text-white outline-none focus:border-[#00ff88] transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-[#00ff88] text-black font-black py-4 rounded-2xl hover:bg-[#00cc77] transition-all uppercase tracking-tighter text-lg"
          >
            {isPending ? 'AUTENTICANDO...' : 'ENTRAR'}
          </button>
        </form>

        {/* AGORA O LINK FUNCIONA ABAIXO */}
        <p className="text-center mt-8 text-gray-600 text-xs font-bold uppercase tracking-widest">
          Não tem conta?{" "}
          <Link 
            href="/cadastro" 
            className="text-[#00ff88] cursor-pointer hover:underline transition-all"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}