import createForm from '@/actions/create-form'
import type { IForm } from '@/models/form'
import type { IQuestion } from '@/models/question'
import { enableMapSet } from 'immer'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface IFormStore {
  questions: Map<string, IQuestion>
  addQuestion: (params: AddQuestionParams) => void
  updateQuestionSentence: (id: string, sentence: string) => void
  addChoice: (id: string, choice: string) => void
  getChoices: (id: string) => IForm['questions'][number]['choices']
  removeChoice: (id: string, order: number) => void
  updateChoiceValue: (id: string, order: number, value: string) => void
  deleteQuestion: (id: string) => void
  turnRequiredField: (id: string, required: boolean) => void
  fieldIsRequired: (id: string) => boolean
  reorderQuestions: (ids: string[]) => void
  addConditionalQuestion: (id: string, order: number) => void
  updateConditionalQuestion: (id: string, order: number, value: string) => void
  saveForm: (formData: FormData) => void
}

interface AddQuestionParams {
  type: IForm['questions'][number]['type']
}

enableMapSet()

export const useFormStore = create<IFormStore, [['zustand/immer', never]]>(
  immer((set, get) => {
    const addQuestion = ({ type }: AddQuestionParams) => {
      const id = crypto.randomUUID()

      const defaultChoices = [
        { order: 0, value: '' },
        { order: 1, value: '' },
      ]

      set((state) => {
        state.questions.set(id, {
          id,
          title: '',
          type,
          order: state.questions.size,
          required: false,
          choices:
            type === 'multiple_choice' || type === 'unique_choice'
              ? defaultChoices
              : undefined,
        })
      })
    }

    const updateQuestionSentence = (id: string, sentence: string) => {
      set((state) => {
        const question = state.questions.get(id)
        if (question) {
          question.title = sentence
        }
      })
    }

    const addChoice = (id: string, choice: string) => {
      set((state) => {
        const question = state.questions.get(id)
        if (
          question &&
          (question.type === 'multiple_choice' ||
            question.type === 'unique_choice')
        ) {
          const order = question.choices ? question.choices.length : 0
          question.choices?.push({ order, value: choice })
        }
      })
    }

    const getChoices = (id: string) => {
      const question = get().questions.get(id)
      return question?.choices || []
    }

    const removeChoice = (id: string, order: number) => {
      set((state) => {
        const question = state.questions.get(id)
        if (question && question.choices) {
          question.choices = question.choices.filter(
            (choice) => choice.order !== order,
          )
        }
      })

      set((state) => {
        const question = state.questions.get(id)
        if (question && question.choices) {
          question.choices = question.choices.map((choice, index) => ({
            ...choice,
            order: index,
          }))
        }
      })
    }

    const updateChoiceValue = (id: string, order: number, value: string) => {
      set((state) => {
        const question = state.questions.get(id)
        if (question && question.choices) {
          const choice = question.choices.find((c) => c.order === order)
          if (choice) {
            choice.value = value
          }
        }
      })
    }

    const deleteQuestion = (id: string) => {
      set((state) => {
        state.questions.delete(id)

        const newQuestions = new Map<string, IQuestion>()

        Array.from(state.questions.entries()).forEach(
          ([qid, question], index) => {
            question.order = index
            newQuestions.set(qid, question)
          },
        )

        state.questions = newQuestions
      })
    }

    const turnRequiredField = (id: string, required: boolean) => {
      set((state) => {
        const question = state.questions.get(id)
        if (question) {
          question.required = required
        }
      })
    }

    const firstData = (): Pick<IFormStore, 'questions'> => {
      const id = crypto.randomUUID()
      return {
        questions: new Map<string, IQuestion>([
          [
            id,
            {
              id,
              title: '',
              type: 'text',
              required: false,
              order: 0,
              choices: undefined,
            },
          ],
        ]),
      }
    }

    const fieldIsRequired = (id: string) => {
      const question = get().questions.get(id)
      return question?.required || false
    }

    const reorderQuestions = (ids: string[]) => {
      set((state) => {
        const newQuestions = new Map<string, IQuestion>()
        ids.forEach((id, index) => {
          const question = state.questions.get(id)
          if (question) {
            question.order = index
            newQuestions.set(id, question)
          }
        })

        state.questions.forEach((q, id) => {
          if (!newQuestions.has(id)) {
            newQuestions.set(id, q)
          }
        })

        state.questions = newQuestions
      })
    }

    const addConditionalQuestion = (id: string, order: number) => {
      const choice = get()
        .questions.get(id)
        ?.choices?.find((choice) => choice.order === order)

      if (!choice) return

      const hasConditionalQuestion = choice.additionalQuestion !== undefined

      if (hasConditionalQuestion) {
        set((state) => {
          const question = state.questions.get(id)
          if (question && question.choices) {
            question.choices = question.choices.map((choice) => {
              if (choice.order === order) {
                return { ...choice, additionalQuestion: undefined }
              }
              return choice
            })
          }
        })
      } else {
        set((state) => {
          const question = state.questions.get(id)
          if (question && question.choices) {
            const choice = question.choices.find((c) => c.order === order)
            if (choice) {
              choice.additionalQuestion = ''
            }
          }
        })
      }
    }

    const updateConditionalQuestion = (
      id: string,
      order: number,
      value: string,
    ) => {
      set((state) => {
        const question = state.questions.get(id)
        if (question && question.choices) {
          const choice = question.choices.find((c) => c.order === order)
          if (choice) {
            choice.additionalQuestion = value
          }
        }
      })
    }

    const saveForm = async (formData: FormData) => {
      const questions = get().questions

      const filteredQuestions = Array.from(questions.entries()).filter(
        ([, question]) => {
          if (question.title.trim() === '') return false

          if (
            (question.type === 'multiple_choice' ||
              question.type === 'unique_choice') &&
            (!question.choices ||
              question.choices.filter((c) => c.value.trim() !== '').length < 2)
          ) {
            return false
          }

          return true
        },
      )

      const orderedQuestions = filteredQuestions.sort(
        (a, b) => a[1].order - b[1].order,
      )

      set((state) => {
        orderedQuestions.forEach(([id, _], index) => {
          const q = state.questions.get(id)
          if (q) q.order = index
        })
      })

      const newQuestions = new Map<string, IQuestion>(
        orderedQuestions.map(([id, question]) => [id, question]),
      )

      if (newQuestions.size === 0) {
        toast.error(
          'Você precisa adicionar pelo menos uma pergunta ao formulário.',
        )
        return
      }

      formData.append(
        'questions',
        JSON.stringify(Array.from(newQuestions.values())),
      )

      await createForm(formData)

      toast.success('Formulário criado com sucesso!')
    }

    return {
      questions: firstData().questions,
      addQuestion,
      updateQuestionSentence,
      addChoice,
      getChoices,
      removeChoice,
      updateChoiceValue,
      deleteQuestion,
      turnRequiredField,
      fieldIsRequired,
      reorderQuestions,
      addConditionalQuestion,
      updateConditionalQuestion,
      saveForm,
    }
  }),
)
