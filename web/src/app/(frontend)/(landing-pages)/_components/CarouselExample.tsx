"use client"

import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// LISTA DE NOTÍCIAS GENÉRICAS E PROFISSIONAIS
const news = [
  {
    title: "Inovações na Tecnologia",
    description: "Confira as principais tendências de Inteligência Artificial que prometem transformar o mercado de trabalho em 2026.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Dicas de Produtividade",
    description: "Aprenda métodos comprovados para organizar sua rotina de estudos e aumentar seu foco em projetos complexos.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Expansão do Mercado Digital",
    description: "Novas plataformas de conexão global estão facilitando o trabalho remoto para desenvolvedores e criadores de conteúdo.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
  }
]

export default function CarouselExample() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-4 py-6 px-4">
      <h2 className="text-[#00ff88] text-sm font-black mb-4 uppercase tracking-[0.3em] pl-2">
        Destaques do Dia
      </h2>
      <Carousel 
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative group"
      >
        <CarouselContent className="-ml-4">
          {news.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <div className="overflow-hidden rounded-3xl border border-[#222] bg-[#111] shadow-sm hover:border-[#00ff88]/50 transition-all h-full flex flex-col group/card">
                
                {/* Imagem */}
                <div className="relative h-48 w-full overflow-hidden bg-[#0a0a0a]">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill
                    unoptimized // Adicionado para aceitar imagens externas sem erro de domínio
                    className="object-cover transition-transform duration-500 group-hover/card:scale-110 opacity-80 group-hover/card:opacity-100"
                  />
                </div>

                {/* Texto */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-[#00ff88] text-lg font-black mb-2 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Botões ajustados para o tema Neon */}
        <CarouselPrevious className="hidden group-hover:flex -left-4 bg-[#00ff88] text-black border-none hover:bg-[#00cc77]" />
        <CarouselNext className="hidden group-hover:flex -right-4 bg-[#00ff88] text-black border-none hover:bg-[#00cc77]" />
      </Carousel>
    </div>
  )
}