import prismaClient from '@/lib/prisma';
import { Question } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, position, required, surveyId } = await req.json();

    const createdQuestion: Question = await prismaClient.question.create({
      data: {
        text,
        position,
        required,
        surveyId,
      },
    });
    return NextResponse.json(createdQuestion, { status: 201 });
  } catch (error) {}
}

export async function PUT(req: Request) {
  try {
    const { questionId, text, position, required } = await req.json();

    const updatedQuestion: Question = await prismaClient.question.update({
      where: {
        id: questionId,
      },
      data: {
        text,
        position,
        required,
      },
    });
    return NextResponse.json(updatedQuestion, { status: 201 });
  } catch (error) {}
}

export async function DELETE(req: Request) {
  try {
    const { questionId } = await req.json();

    const deletedQuestion: Question = await prismaClient.question.delete({
      where: {
        id: questionId,
      },
    });
    return NextResponse.json(deletedQuestion, { status: 200 });
  } catch (error) {}
}

const moveQuestion = async (
  allQuestions: Question[],
  questionId: string,
  newPosition: number
): Promise<void> => {
  try {
    const questionToMove = allQuestions.find(
      (question: Question) => question.id === questionId
    );

    if (!questionToMove) {
      console.error(`Question with ID ${questionId} not found.`);
      return;
    }

    const currentPos = questionToMove.position;

    const updatedQuestions: Question[] = allQuestions.map((question) => {
      if (question.id === questionId) {
        return { ...question, position: newPosition };
      }

      if (
        newPosition < currentPos &&
        question.position >= newPosition &&
        question.position < currentPos
      ) {
        return { ...question, position: question.position + 1 };
      }

      if (
        newPosition > currentPos &&
        question.position <= newPosition &&
        question.position > currentPos
      ) {
        return { ...question, position: question.position - 1 };
      }

      return question;
    });
    await prismaClient.question.updateMany({
      data: updatedQuestions.map((updatedQuestion) => ({
        where: { id: updatedQuestion.id },
        data: { position: updatedQuestion.position },
      })),
    });

    console.log('Questions updated successfully!');
  } catch (error) {
    console.error('Error updating questions:', error);
  } finally {
    await prismaClient.$disconnect();
  }
};
