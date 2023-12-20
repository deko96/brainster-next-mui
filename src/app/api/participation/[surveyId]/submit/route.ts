import prismaClient from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const id = req.url.split('surveys/')[1];

    const unansweredQuestions = await prismaClient.question.findMany({
      where: {
        surveyId: id,
        required: false,
      },
    });

    if (unansweredQuestions) {
      return NextResponse.json(
        `The following required questions are not answered: ${unansweredQuestions}`,
        { status: 400 }
      );
    }
    return NextResponse.json('Successfully submitted survey');
  } catch (error) {}
}
