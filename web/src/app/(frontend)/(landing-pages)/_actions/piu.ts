"use server"

import { PrismaClient } from "@/generated/prisma";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createPiuAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) return;

  const text = formData.get("piu-text") as string;

  if (!text || text.length > 140) return;

  await prisma.piu.create({
    data: {
      text: text,
      userId: session.user.id,
    },
  });

  // Isso limpa o cache e faz o carrossel atualizar na hora que você posta
  revalidatePath("/");
}

// NOVA FUNÇÃO: Busca os últimos 6 pius para o carrossel
export async function getPiusAction() {
  try {
    const pius = await prisma.piu.findMany({
      include: {
        user: true, 
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    });
    return pius;
  } catch (error) {
    console.error("Erro ao buscar pius:", error);
    return [];
  }
}