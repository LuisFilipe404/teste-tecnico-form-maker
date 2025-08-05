'use server'

import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export default async function getForms() {
  return await prisma.form.findMany({
    include: {
      questions: {
        orderBy: { order: 'asc' },
        include: {
          choices: {
            orderBy: { order: 'asc' },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
