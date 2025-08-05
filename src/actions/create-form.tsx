'use server'

import { PrismaClient } from '@/generated/prisma'
import type { IQuestion } from '@/models/question'

const prisma = new PrismaClient()

export default async function createForm(formData: FormData) {
  const questions = formData.get('questions')
  const parsedQuestions: IQuestion[] = questions
    ? JSON.parse(questions as string)
    : []

  const cover = formData.get('cover') as File

  let buffer: Buffer | undefined

  if (cover && cover.size > 0) {
    buffer = Buffer.from(await cover.arrayBuffer())
    if (buffer.length > 5 * 1024 * 1024) {
      throw new Error('Cover image size exceeds 2MB limit')
    }
  }

  await prisma.form.create({
    data: {
      title: formData.get('title') as string,
      subtitle: formData.get('subtitle') as string,
      cover: buffer?.toString('base64') || null,
      questions: {
        create: parsedQuestions.map((question) => ({
          order: question.order,
          type: question.type,
          title: question.title,
          id: question.id,
          choices: {
            create:
              question.choices?.map((choice) => ({
                order: choice.order,
                value: choice.value,
                additionalQuestion: choice.additionalQuestion,
              })) || [],
          },
        })),
      },
    },
  })
}
