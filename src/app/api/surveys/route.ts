import { sendEmail } from '@/lib/email-sender';
import prismaClient from '@/lib/prisma';
import { Survey, SurveyStatus } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const surveys: Survey[] = await prismaClient.survey.findMany();
    return NextResponse.json(surveys);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req: Request) {
  try {
    const { surveyName, introductionMessage, surveyManager } = await req.json();

    const createdSurvey: Survey = await prismaClient.survey.create({
      data: {
        surveyName,
        introductionMessage,
        surveyManager,
        status: SurveyStatus.DRAFT,
      },
    });

    const mailData = {
      to: `${createdSurvey.surveyManager}`,
      subject: `New Survey from ${createdSurvey.surveyName}`,
      html: `<p>${createdSurvey.introductionMessage} + URL:/${createdSurvey.id}</p>`,
    };

    await sendEmail(mailData);
    return NextResponse.json('Successfully sent mail', { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
export async function PUT(req: Request) {
  try {
    const { id, surveyName, introductionMessage, surveyManager } =
      await req.json();

    const updatedSurvey: Survey = await prismaClient.survey.update({
      where: {
        id,
      },
      data: {
        surveyName,
        introductionMessage,
        surveyManager,
      },
    });
    return NextResponse.json(updatedSurvey, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
