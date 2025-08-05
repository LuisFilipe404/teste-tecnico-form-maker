import { ListTodo, Plus, Trash, GripVertical, Workflow } from 'lucide-react'
import FieldContainer from './field-container'
import FieldIcon from './field-icon'
import AutoResizeTextarea from '../auto-resize-text-area'
import { useFormStore } from '@/app/(public)/create/store/form-store'
import ToolTip from '../tooltip'
import { Switch } from '../ui/switch'
import { DropdownOptions } from './dropdown-options'
import { Badge } from '../ui/badge'
import { useState } from 'react'

type MultiplesChoicesProps = {
  id: string
  dragHandleProps?: React.HTMLAttributes<HTMLElement>
}

export default function MultiplesChoices({
  id,
  dragHandleProps,
}: MultiplesChoicesProps) {
  const [conditionalHover, setConditionalHover] = useState(-1)

  const updateQuestionSentence = useFormStore(
    (state) => state.updateQuestionSentence,
  )

  const getChoices = useFormStore((state) => state.getChoices)
  const addChoice = useFormStore((state) => state.addChoice)
  const removeChoice = useFormStore((state) => state.removeChoice)
  const updateChoiceValue = useFormStore((state) => state.updateChoiceValue)
  const toggleRequired = useFormStore((state) => state.turnRequiredField)
  const fieldIsRequired = useFormStore((state) => state.fieldIsRequired)
  const updateConditionalQuestion = useFormStore(
    (state) => state.updateConditionalQuestion,
  )
  const addConditionalQuestion = useFormStore(
    (state) => state.addConditionalQuestion,
  )

  const choices = getChoices(id)

  if (!choices) {
    return null
  }

  const handleAddChoice = () => {
    if (choices.length >= 10) return
    addChoice(id, '')
  }

  const handleRemoveChoice = (order: number) => {
    if (choices.length <= 2) return

    removeChoice(id, order)
  }

  const handleUpdateChoiceValue = (order: number, value: string) => {
    updateChoiceValue(id, order, value)
  }

  const handleAddConditionalQuestion = (order: number) => {
    addConditionalQuestion(id, order)
  }

  const handleUpdateConditionalQuestion = (order: number, value: string) => {
    updateConditionalQuestion(id, order, value)
  }

  const choicesWithAdditionalQuestions = choices.filter(
    (choice) => choice.additionalQuestion !== undefined,
  )

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <FieldContainer>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              {...dragHandleProps}
              style={{ cursor: 'grab' }}
              aria-label="Arrastar Para Trocar de Ordem"
              role="button"
              tabIndex={0}
              className="text-gray-3"
            >
              <GripVertical />
            </span>
            <div className="flex items-center gap-3">
              <FieldIcon icon={<ListTodo size={20} />} />
              <span className="hidden font-semibold lg:block">
                Campo de Múltipla Escolha
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ToolTip
              content={
                fieldIsRequired(id)
                  ? 'Tornar Campo Opcional'
                  : 'Tornar Campo Obrigatório'
              }
            >
              <div className="flex items-center gap-2">
                <Switch
                  id="required"
                  onCheckedChange={(value) => toggleRequired(id, value)}
                />
              </div>
            </ToolTip>
            <DropdownOptions id={id} />
          </div>
        </div>
        <AutoResizeTextarea
          placeholder="Digite Aqui Sua Pergunta..."
          onChange={(e) => updateQuestionSentence(id, e.target.value)}
        />
        <div className="mt-4 flex flex-col gap-2">
          {choices.map((choice) => (
            <div
              key={choice.order}
              className="group flex items-center gap-3 overflow-hidden"
            >
              <input
                type="text"
                value={choice.value}
                data-hover={conditionalHover === choice.order}
                onChange={(e) => {
                  handleUpdateChoiceValue(choice.order, e.target.value)
                }}
                className="border-gray-border w-full rounded-[16px] border px-4 py-2 text-lg transition-colors data-[hover=true]:border-blue-400 data-[hover=true]:bg-linear-90 data-[hover=true]:from-blue-400/5 data-[hover=true]:to-blue-400/30"
                placeholder={`Opção ${choice.order + 1}`}
              />
              <div className="flex items-center gap-2">
                {choices.length > 2 && (
                  <ToolTip content="Remover Opção">
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => handleRemoveChoice(choice.order)}
                    >
                      <Trash className="text-gray-3 hover:text-red-700" />
                    </button>
                  </ToolTip>
                )}

                <ToolTip content="Pergunta Condicional a Essa Opção">
                  <button
                    type="button"
                    data-active={choice.additionalQuestion !== undefined}
                    onClick={() => handleAddConditionalQuestion(choice.order)}
                    className="text-gray-3 hover:text-gray-text data-[active=true]:text-primary-400 cursor-pointer transition-colors"
                  >
                    <Workflow />
                  </button>
                </ToolTip>
              </div>
            </div>
          ))}
        </div>
        {choices.length <= 10 && (
          <button
            type="button"
            onClick={handleAddChoice}
            className="text-primary-400 hover:text-primary-600 focus:text-primary-600 mt-4 flex cursor-pointer items-center gap-2 outline-0 transition-colors"
          >
            <Plus size={20} />
            <span className="text-lg">Adicionar Opção</span>
          </button>
        )}
      </FieldContainer>
      {choicesWithAdditionalQuestions.map((choice) => (
        <div
          key={choice.order}
          className="w-full"
          onMouseEnter={() => setConditionalHover(choice.order)}
          onMouseLeave={() => setConditionalHover(-1)}
        >
          <FieldContainer theme="conditionalQuestion">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex items-center gap-3">
                <FieldIcon icon={<Workflow size={20} />} />
                <span className="hidden font-semibold lg:block">
                  Pergunta Condicional
                </span>
              </div>
              <Badge className="bg-primary-400 font-semibold">
                <Workflow />
                Condicional à Opção {choice.order + 1}
              </Badge>
            </div>
            <AutoResizeTextarea
              placeholder="Digite Aqui Sua Pergunta Condicional..."
              onChange={(e) =>
                handleUpdateConditionalQuestion(choice.order, e.target.value)
              }
            />
          </FieldContainer>
        </div>
      ))}
    </div>
  )
}
