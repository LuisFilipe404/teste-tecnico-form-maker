'use client'

import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical, Trash } from 'lucide-react'
import ToolTip from '../tooltip'
import { useFormStore } from '@/app/(public)/create/store/form-store'

interface DropdownOptionsProps {
  id: string
}

export function DropdownOptions({ id }: DropdownOptionsProps) {
  const deleteQuestion = useFormStore((state) => state.deleteQuestion)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ToolTip content="Mais Opções">
          <div
            aria-label="Opções"
            className="text-gray-3 hover:text-gray-text cursor-pointer rounded-full px-2 outline-0 transition-colors"
          >
            <EllipsisVertical />
          </div>
        </ToolTip>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Configurações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => deleteQuestion(id)}>
          <Trash />
          Deletar Campo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
