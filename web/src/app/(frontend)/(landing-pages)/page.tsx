import { getPiusAction } from "./_actions/piu";
import CriarPiu from "./_components/CriarPiu";

export default async function HomePage() {
  const pius = await getPiusAction();

  return (
    <div className="min-h-screen bg-[#050505] text-white flex justify-center font-sans">
      <div className="w-full flex">
        
        {/* 1. SIDEBAR (Mantida exatamente como estava) */}
        <aside className="w-20 xl:w-72 border-r border-[#222] p-8 sticky top-0 h-screen flex flex-col items-center xl:items-start flex-shrink-0">
          <div className="text-[#00ff88] text-5xl font-black mb-14 tracking-tighter">P.</div>
          <nav className="space-y-12">
            <div className="text-[#00ff88] text-2xl font-extrabold cursor-pointer tracking-tight flex items-center gap-4">
               <span>🏠</span><span className="hidden xl:inline">HOME</span>
            </div>
            <div className="text-gray-500 text-2xl font-extrabold cursor-pointer hover:text-white transition-colors tracking-tight flex items-center gap-4">
               <span>👤</span><span className="hidden xl:inline">PERFIL</span>
            </div>
            <div className="text-gray-500 text-2xl font-extrabold cursor-pointer hover:text-white transition-colors tracking-tight flex items-center gap-4">
               <span>🔔</span><span className="hidden xl:inline">NOTIFICAÇÕES</span>
            </div>
          </nav>
        </aside>

        {/* 2. FEED CENTRAL (Agora expandido para ocupar o resto da tela) */}
        <main className="flex-1 flex justify-center p-6 lg:p-12 overflow-y-auto">
          {/* Container limitado para o texto não ficar gigante e difícil de ler */}
          <div className="w-full max-w-3xl">
            <div className="mb-12">
              <h1 className="text-4xl font-black mb-8 tracking-tighter">FEED</h1>
              <div className="input-area-new shadow-2xl shadow-green-950/20">
                <CriarPiu />
              </div>
            </div>

            <div className="space-y-6">
              {pius.map((piu: any) => (
                <div key={piu.id} className="card-piu-new">
                  <div className="flex gap-5">
                    <div className="w-14 h-14 rounded-full bg-[#1a1a1a] border-2 border-[#00ff88]/30 flex-shrink-0 flex items-center justify-center text-2xl">
                      👤
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-extrabold text-[#00ff88] text-xl">@{piu.user.username}</span>
                        <span className="text-gray-600 text-xs font-mono">AGORA</span>
                      </div>
                      <p className="text-gray-200 leading-relaxed text-lg">{piu.text}</p>
                      <div className="mt-8 pt-4 border-t border-[#222] flex gap-10 text-gray-500 text-sm font-bold">
                        <button className="hover:text-red-500 transition-colors flex items-center gap-2">❤️ {piu.likes}</button>
                        <button className="hover:text-white transition-colors flex items-center gap-2">💬 REPLY</button>
                        <button className="hover:text-[#00ff88] transition-colors flex items-center gap-2">🔄 SHARE</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* 3. A COLUNA DIREITA COM O CARROSSEL FOI REMOVIDA DAQUI */}

      </div>
    </div>
  );
}