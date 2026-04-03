import { getPiusAction } from "./_actions/piu";
import CarouselExample from "./_components/CarouselExample";

// Como é uma página dentro da pasta (landing-pages), ela é um Server Component por padrão
export default async function LandingPage() {
  // 1. Busca os dados reais do seu MongoDB
  const piusDoBanco = await getPiusAction();

  // 2. Transforma o formato do banco para o formato que o carrossel pede
  const dadosParaOShow = piusDoBanco.map((piu) => ({
    title: piu.user.name || "Usuário do PiuPiwer",
    description: piu.text,
    // Se o usuário não tiver foto, usamos a da Soso ou uma padrão
    image: piu.user.image || "/noticias/soso.jpeg", 
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* Cabeçalho da Seção */}
      <div className="text-center pt-10">
        <h1 className="text-4xl font-extrabold text-blue-900">PiuPiwer News</h1>
        <p className="text-gray-500 mt-2">Confira os últimos destaques da nossa rede</p>
      </div>

      {/* O Carrossel com os dados reais */}
      <CarouselExample data={dadosParaOShow} />

      {/* Aqui abaixo você pode manter o seu formulário de postar 
          e a lista comum (feed) conforme o PDF do treinamento 
      */}
      
      <section className="max-w-2xl mx-auto px-4 mt-10">
         <h2 className="text-xl font-bold mb-6 border-b pb-2">Feed Recente</h2>
         {piusDoBanco.map((piu) => (
           <div key={piu.id} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <span className="font-bold text-blue-600">{piu.user.name}</span>
              <p className="text-gray-700 mt-1">{piu.text}</p>
           </div>
         ))}
      </section>
    </div>
  );
}