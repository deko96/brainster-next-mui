import { Question } from '@prisma/client';
import prismaClient from './prisma';

export const moveQuestion = (
  questions: any,
  questionId: any,
  newPosition: any
) => {
  const questionToMove = questions.find((q: any) => q.id === questionId);

  if (!questionToMove) {
    console.error(`Question with ID ${questionId} not found.`);
    return questions;
  }

  const currentPos = questionToMove.position;

  return questions.map((q: any) => {
    if (q.id === questionId) {
      return { ...q, position: newPosition };
    }

    if (
      newPosition < currentPos &&
      q.position >= newPosition &&
      q.position < currentPos
    ) {
      return { ...q, position: q.position + 1 };
    }

    if (
      newPosition > currentPos &&
      q.position <= newPosition &&
      q.position > currentPos
    ) {
      return { ...q, position: q.position - 1 };
    }

    return q;
  });
};

const questionMover = async (
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
