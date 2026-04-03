import { getPiusAction } from "../(landing-pages)/_actions/piu";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function PerfilPage() {
  // 1. Procura a sessão do utilizador (Requisito de Login funcional)
  const session = await auth.api.getSession({
    headers: await headers()
  });

  // Se não houver sessão, manda para o login
  if (!session || !session.user) {
    redirect("/login");
  }

  // 2. Procura todos os posts do banco de dados
  const allPius = await getPiusAction();

  // 3. Filtra apenas os posts que pertencem ao ID do utilizador logado (Requisito de Lista de Posts do Utilizador)
  const meusPius = allPius.filter((piu: any) => piu.userId === session.user.id);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 lg:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER DO PERFIL NEON */}
        <div className="bg-[#111] border border-[#222] p-8 rounded-[40px] mb-10 flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-green-900/10">
          <div className="w-32 h-32 rounded-full bg-[#0a0a0a] border-4 border-[#00ff88] flex items-center justify-center text-5xl shadow-[0_0_20px_rgba(0,255,136,0.3)]">
            👤
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-[#00ff88] tracking-tighter uppercase">
              {session.user.name}
            </h1>
            <p className="text-gray-500 font-mono text-lg">@{session.user.username || "utilizador"}</p>
            <p className="mt-4 text-gray-400 max-w-md leading-relaxed">
              Bem-vindo ao teu perfil oficial no PiuPiwer. Aqui podes ver as tuas estatísticas e publicações.
            </p>
          </div>
        </div>

        {/* ESTATÍSTICAS BÁSICAS (Requisito da Entrega Final) */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-[#111] border border-[#222] p-6 rounded-3xl text-center hover:border-[#00ff88]/50 transition-colors">
            <p className="text-[#00ff88] text-3xl font-black">{meusPius.length}</p>
            <p className="text-gray-600 text-xs font-black uppercase tracking-widest mt-1">Meus Pius</p>
          </div>
          <div className="bg-[#111] border border-[#222] p-6 rounded-3xl text-center hover:border-[#00ff88]/50 transition-colors">
            <p className="text-[#00ff88] text-3xl font-black">0</p>
            <p className="text-gray-600 text-xs font-black uppercase tracking-widest mt-1">Seguidores</p>
          </div>
          <div className="bg-[#111] border border-[#222] p-6 rounded-3xl text-center hover:border-[#00ff88]/50 transition-colors">
            <p className="text-[#00ff88] text-3xl font-black">0</p>
            <p className="text-gray-600 text-xs font-black uppercase tracking-widest mt-1">Seguindo</p>
          </div>
        </div>

        {/* LISTA DE POSTS DO UTILIZADOR (Requisito da Entrega Final) */}
        <div className="space-y-6">
          <h3 className="text-[#00ff88] font-black text-sm tracking-[0.3em] uppercase mb-8 border-b border-[#222] pb-4">
            O Teu Histórico
          </h3>
          
          {meusPius.length > 0 ? (
            meusPius.map((piu: any) => (
              <div key={piu.id} className="bg-[#111] border border-[#222] p-6 rounded-3xl hover:bg-[#161616] transition-all">
                <div className="flex justify-between items-start mb-4">
                   <span className="text-[#00ff88] font-bold text-sm">@{session.user.username}</span>
                   <span className="text-gray-700 text-[10px] font-mono">
                     {new Date(piu.createdAt).toLocaleDateString()}
                   </span>
                </div>
                <p className="text-gray-200 text-lg leading-relaxed">{piu.text}</p>
                <div className="mt-6 flex gap-8 text-gray-600 font-bold text-xs uppercase">
                   <span>❤️ {piu.likes || 0} Likes</span>
                   <span>💬 0 Respostas</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-[#111] rounded-3xl border border-dashed border-[#333]">
              <p className="text-gray-600 font-bold uppercase tracking-widest">Ainda não publicaste nada</p>
              <p className="text-gray-700 text-sm mt-2">Vai à Home e faz o teu primeiro Piu!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}