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

  if (!session || !session.user) return { error: "Não autorizado" };

  const text = formData.get("piu-text") as string;

  if (!text || text.length > 144) return { error: "Texto inválido" };

  try {
    await prisma.piu.create({
      data: {
        text: text,
        userId: session.user.id,
      },
    });

    // ISSO AQUI É O QUE FAZ O POST APARECER NA HORA:
    revalidatePath("/"); 
    revalidatePath("/perfil");

    return { success: true };
  } catch (error) {
    console.error("Erro ao criar piu:", error);
    return { error: "Falha no banco de dados" };
  }
}

export async function getPiusAction() {
  try {
    return await prisma.piu.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    return [];
  }
}