'use client'

import FieldButton from '@/components/field-button'
import NumberIcon from '@/components/icons/number-icon'
import ToolContainer from '@/components/tool-container'
import ToolTitle from '@/components/tool-title'
import {
  CircleCheckBig,
  DecimalsArrowRight,
  ListTodo,
  Type,
  UserCheck,
} from 'lucide-react'
import { useFormStore } from '../store/form-store'

export default function ToolBar() {
  const addQuestion = useFormStore((state) => state.addQuestion)

  return (
    <div className="sticky top-[100px]">
      <ToolContainer>
        <ToolTitle text="Campos" />
        <div className="mt-6 grid grid-cols-2 grid-rows-3 gap-3">
          <FieldButton
            text="Texto Livre"
            icon={<Type />}
            onClick={() =>
              addQuestion({
                type: 'text',
              })
            }
          />
          <FieldButton
            text="Sim ou Não"
            icon={<UserCheck />}
            onClick={() =>
              addQuestion({
                type: 'yes_no',
              })
            }
          />
          <FieldButton
            text="Múltipla Escolha"
            icon={<ListTodo />}
            onClick={() =>
              addQuestion({
                type: 'multiple_choice',
              })
            }
          />
          <FieldButton
            text="Escolha Única"
            icon={<CircleCheckBig />}
            onClick={() =>
              addQuestion({
                type: 'unique_choice',
              })
            }
          />
          <FieldButton
            text="Número Inteiro"
            icon={<NumberIcon />}
            onClick={() =>
              addQuestion({
                type: 'number',
              })
            }
          />
          <FieldButton
            text="Número com Decimal"
            icon={<DecimalsArrowRight />}
            onClick={() =>
              addQuestion({
                type: 'float',
              })
            }
          />
        </div>
      </ToolContainer>
    </div>
  )
}
