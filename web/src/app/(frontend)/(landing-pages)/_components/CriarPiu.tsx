"use client"
import React, { useState } from 'react';
import { createPiuAction } from "../_actions/piu"; // Verifique se o nome da action é esse mesmo

export default function CriarPiu() {
  const [text, setText] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handlePost() {
    if (text.length === 0 || text.length > 144) return;

    setIsPending(true);
    try {
      // Aqui chamamos a função que você copiou da Sophia
      await createPiuAction(text); 
      setText(""); // Limpa o campo após postar
      alert("Piu enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao postar:", error);
      alert("Erro ao enviar o Piu. Tente novamente.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div>
      <textarea 
        className="textarea-new"
        placeholder="O que está acontecendo?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        disabled={isPending}
      />
      <div className="flex justify-between items-center border-t border-[#222] pt-4">
        <span className={`font-mono text-sm ${text.length > 144 ? 'text-red-500' : 'text-gray-600'}`}>
          {text.length}/144
        </span>
        <button 
          className="btn-piu-new"
          onClick={handlePost} // AQUI ESTÁ A LÓGICA QUE FALTAVA
          disabled={text.length === 0 || text.length > 144 || isPending}
        >
          {isPending ? "ENVIANDO..." : "PIAR"}
        </button>
      </div>
    </div>
  );
}