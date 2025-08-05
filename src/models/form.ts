import type { IQuestion } from './question'
import { z } from 'zod'

export interface IForm {
  title: string
  subtitle: string
  questions: IQuestion[]
  cover: File | null
}

export const formSchemaZod = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  cover: z.instanceof(File).nullable(),
})

export type IFormCreate = z.infer<typeof formSchemaZod>
