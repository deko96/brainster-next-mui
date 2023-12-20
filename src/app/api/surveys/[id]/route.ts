import prismaClient from '@/lib/prisma';
import { Question } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const id = req.url.split('surveys/')[1];

    const questions: Question[] = await prismaClient.question.findMany({
      where: {
        surveyId: id,
      },
    });

    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
