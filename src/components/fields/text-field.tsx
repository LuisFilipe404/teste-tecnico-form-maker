import { GripVertical, Type } from 'lucide-react'
import FieldContainer from './field-container'
import FieldIcon from './field-icon'
import AutoResizeTextarea from '../auto-resize-text-area'
import { useFormStore } from '@/app/(public)/create/store/form-store'
import ToolTip from '../tooltip'
import { Switch } from '../ui/switch'
import { DropdownOptions } from './dropdown-options'

type TextFieldProps = {
  id: string
  dragHandleProps?: React.HTMLAttributes<HTMLElement>
}

export default function TextField({ id, dragHandleProps }: TextFieldProps) {
  const updateQuestionSentence = useFormStore(
    (state) => state.updateQuestionSentence,
  )

  const toggleRequired = useFormStore((state) => state.turnRequiredField)
  const fieldIsRequired = useFormStore((state) => state.fieldIsRequired)

  return (
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
            <FieldIcon icon={<Type size={20} />} />
            <span className="hidden font-semibold lg:block">
              Campo de Texto
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
        autoFocus={true}
        placeholder="Digite Aqui Sua Pergunta..."
        onChange={(e) => updateQuestionSentence(id, e.target.value)}
      />
    </FieldContainer>
  )
}
