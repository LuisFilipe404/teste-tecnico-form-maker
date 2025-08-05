export interface IQuestion {
  id: string
  title: string
  type:
    | 'yes_no'
    | 'multiple_choice'
    | 'text'
    | 'unique_choice'
    | 'number'
    | 'float'
  required: boolean
  choices?: {
    order: number
    value: string
    additionalQuestion?: string
  }[]
}
