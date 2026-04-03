"use client"
import React, { useState } from 'react';
import { createPiuAction } from "../_actions/piu";

export default function CriarPiu() {
  const [text, setText] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    if (text.length === 0 || text.length > 144) return;

    setIsPending(true);
    const formData = new FormData();
    formData.append("piu-text", text);

    try {
      const result = await createPiuAction(formData);
      if (result?.success) {
        setText("");
        // Força a página a recarregar para buscar a lista nova do banco
        window.location.reload(); 
      } else {
        alert("Erro: " + (result?.error || "Desconhecido"));
      }
    } catch (error) {
      alert("Erro ao enviar.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="w-full">
      <textarea 
        className="textarea-new w-full bg-transparent text-white text-xl outline-none resize-none"
        placeholder="O que está acontecendo?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        disabled={isPending}
      />
      <div className="flex justify-between items-center border-t border-[#222] pt-4 mt-2">
        <span className={`font-mono text-sm ${text.length > 144 ? 'text-red-500' : 'text-gray-600'}`}>
          {text.length}/144
        </span>
        <button 
          className="btn-piu-new"
          onClick={handlePost}
          disabled={text.length === 0 || text.length > 144 || isPending}
        >
          {isPending ? "ENVIANDO..." : "PIAR"}
        </button>
      </div>
    </div>
  );
}