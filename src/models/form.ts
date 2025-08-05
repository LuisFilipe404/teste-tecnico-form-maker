import type { IQuestion } from './question'

export interface IForm {
  title: string
  subtitle: string
  questions: IQuestion[]
  cover: File | null
}
