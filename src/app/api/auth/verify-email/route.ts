import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { message: 'Token não fornecido' },
        { status: 400 }
      );
    }

    // Buscar usuário com o token de verificação
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        emailVerified: null
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Token inválido ou já utilizado' },
        { status: 400 }
      );
    }

    // Atualizar o usuário como verificado
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationToken: null
      }
    });

    return NextResponse.json(
      { message: 'Email verificado com sucesso' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro ao verificar email:', error);
    return NextResponse.json(
      { message: 'Erro ao verificar email' },
      { status: 500 }
    );
  }
} 