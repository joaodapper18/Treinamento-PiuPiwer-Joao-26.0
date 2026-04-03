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

interface CarouselData {
  title: string
  description: string
  image: string
}

export default function CarouselExample({ data }: { data: CarouselData[] }) {
  
  if (!data || data.length === 0) {
    return (
      <div className="w-full text-center py-10 border-2 border-dashed rounded-xl text-gray-400">
        Nenhum Piu encontrado para o destaque.
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-4 py-6 px-4">
      <Carousel 
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative group"
      >
        <CarouselContent className="-ml-4">
          {data.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-blue-600 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="hidden group-hover:flex -left-4 bg-white text-blue-600 border-gray-200 shadow-lg" />
        <CarouselNext className="hidden group-hover:flex -right-4 bg-white text-blue-600 border-gray-200 shadow-lg" />
      </Carousel>
    </div>
  )
}