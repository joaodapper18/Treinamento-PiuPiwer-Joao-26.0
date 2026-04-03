"use client"
import React, { useState, useEffect } from 'react';
import { getPiusAction } from "./_actions/piu";
import CriarPiu from "./_components/CriarPiu";
import CarouselExample from "./_components/CarouselExample";
import Link from "next/link";

export default function HomePage() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [pius, setPius] = useState<any[]>([]);

  // Função para buscar os posts do banco
  const carregarPosts = async () => {
    const dados = await getPiusAction();
    setPius(dados);
  };

  // Carrega ao abrir a página
  useEffect(() => {
    carregarPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex justify-center font-sans">
      <div className="w-full flex">
        
        {/* SIDEBAR RETRÁTIL */}
        <aside className={`border-r border-[#222] p-6 sticky top-0 h-screen flex flex-col transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'}`}>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mb-8 self-center xl:self-start text-[#00ff88] hover:bg-[#00ff88]/10 p-2 rounded-full transition-all"
          >
            {isExpanded ? '⬅️' : '➡️'}
          </button>

          <div className="text-[#00ff88] text-4xl font-black mb-12 text-center xl:text-left">
            {isExpanded ? 'PIU.' : 'P.'}
          </div>

          <nav className="space-y-8 flex-1">
            <Link href="/">
              <div className="flex items-center gap-4 text-[#00ff88] font-bold cursor-pointer p-2 hover:bg-white/5 rounded-xl transition-all">
                 <span className="text-2xl">🏠</span>
                 {isExpanded && <span className="text-lg">HOME</span>}
              </div>
            </Link>

            <Link href="/perfil">
              <div className="flex items-center gap-4 text-gray-500 font-bold cursor-pointer p-2 hover:text-[#00ff88] hover:bg-white/5 rounded-xl transition-all">
                 <span className="text-2xl">👤</span>
                 {isExpanded && <span className="text-lg">PERFIL</span>}
              </div>
            </Link>
          </nav>
        </aside>

        {/* FEED CENTRAL */}
        <main className="flex-1 flex flex-col items-center p-4 lg:p-8 overflow-y-auto">
          <div className="w-full max-w-2xl">
            
            {/* CARROSSEL */}
            <div className="mb-10 w-full">
              <h2 className="text-[#00ff88] text-xs font-black mb-4 tracking-[0.2em] uppercase">Destaques do Dia</h2>
              <div className="p-1 bg-gradient-to-r from-[#00ff88]/50 to-transparent rounded-3xl">
                <div className="bg-[#0a0a0a] rounded-[22px] p-4 overflow-hidden border border-[#222]">
                   <CarouselExample />
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h1 className="text-4xl font-black mb-6 tracking-tighter">FEED</h1>
              <div className="input-area-new shadow-xl shadow-green-950/10">
                {/* Passamos a função de carregar posts para o componente de criar */}
                <CriarPiu />
              </div>
            </div>

            {/* LISTAGEM DE PIUS (A LISTA QUE VOCÊ PRECISA) */}
            <div className="space-y-6 pb-20">
              {pius.length > 0 ? (
                pius.map((piu: any) => (
                  <div key={piu.id} className="card-piu-new border border-[#222] p-6 rounded-3xl bg-[#111] hover:border-[#00ff88]/30 transition-all group">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#050505] border border-[#333] flex-shrink-0 flex items-center justify-center text-xl group-hover:border-[#00ff88] transition-colors">
                        👤
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-[#00ff88]">@{piu.user?.username || 'usuario'}</span>
                          <span className="text-gray-600 text-[10px] font-mono">
                            {new Date(piu.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                        <p className="text-gray-200 leading-relaxed text-lg">{piu.text}</p>
                        <div className="mt-6 flex gap-8 text-gray-600 text-xs font-bold uppercase tracking-widest">
                          <button className="hover:text-red-500 transition-colors">❤️ {piu.likes || 0}</button>
                          <button className="hover:text-white transition-colors">💬 Reply</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-600 border border-dashed border-[#222] rounded-3xl">
                  Nenhum piu encontrado. Seja o primeiro a piar!
                </div>
              )}
            </div>
          </div>
        </main>

        {/* TRENDING SIDEBAR */}
        <aside className="hidden lg:block w-72 p-8 border-l border-[#222] sticky top-0 h-screen">
            <h3 className="text-gray-400 font-bold mb-6 uppercase text-xs tracking-widest">Trending</h3>
            <div className="space-y-6">
                <div className="border-l-2 border-[#00ff88] pl-4">
                    <p className="text-[#00ff88] text-xs font-mono">#NeonVibe</p>
                    <p className="text-white text-sm font-bold">PiuPiwer 2.0</p>
                </div>
            </div>
        </aside>

      </div>
    </div>
  );
}