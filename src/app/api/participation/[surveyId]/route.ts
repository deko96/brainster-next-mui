import prismaClient from '@/lib/prisma';
import { Question } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const surveyId = req.url.split('participation/')[1];

    const surveyQuestions: Question[] = await prismaClient.question.findMany({
      where: { surveyId },
    });

    return NextResponse.json(surveyQuestions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { questionId, answer } = await req.json();

    const existingAnswer = await prismaClient.questionAnswer.findFirst({
      where: { questionId },
    });

    if (existingAnswer) {
      const updatedAnswer = await prismaClient.questionAnswer.update({
        where: { id: existingAnswer.id, questionId },
        data: { answer },
      });
      return NextResponse.json(updatedAnswer, { status: 201 });
    }
    const newAnswer = await prismaClient.questionAnswer.create({
      data: {
        questionId,
        answer,
      },
    });
    return NextResponse.json(newAnswer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
