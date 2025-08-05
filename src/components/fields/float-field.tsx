import { DecimalsArrowRight, GripVertical } from 'lucide-react'
import FieldContainer from './field-container'
import FieldIcon from './field-icon'
import AutoResizeTextarea from '../auto-resize-text-area'
import { useFormStore } from '@/app/(public)/create/store/form-store'
import ToolTip from '../tooltip'
import { DropdownOptions } from './dropdown-options'
import { Switch } from '../ui/switch'

interface FloatFieldProps {
  id: string
  dragHandleProps?: React.HTMLAttributes<HTMLElement>
}

export default function FloatField({ id, dragHandleProps }: FloatFieldProps) {
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
            <FieldIcon icon={<DecimalsArrowRight size={20} />} />
            <span className="hidden font-semibold lg:block">
              Campo de Número Decimal
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
    </FieldContainer>
  )
}
