import { NextRequest, NextResponse } from 'next/server'
import { getMateriaBySlug } from '@/app/(backend)/services/materias'
import { zodErrorHandler } from '@/utils/api/errorHandlers';
import { toErrorMessage } from '@/utils/api/toErrorMessage';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    if (!slug) {
      return NextResponse.json(
        toErrorMessage('Slug não fornecido'),
        { status: 400 }
      )
    }

    const materia = await getMateriaBySlug(slug)

    if (!materia) {
      return NextResponse.json(
        toErrorMessage('Matéria não encontrada'),
        { status: 404 }
      )
    }

    return NextResponse.json(materia, { status: 200 })
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }

    return zodErrorHandler(error);
  }
}