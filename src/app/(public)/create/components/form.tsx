'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ImageCover from './image-cover'
import { IForm } from '@/models/form'
import InputTitle from '@/components/input-title'
import InputSubTitle from '@/components/input-subtitle'
import { useFormStore } from '../store/form-store'
import Field from '@/components/field'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import SortableField from './sortable-field'

export default function Form() {
  const questions = useFormStore((state) => state.questions)
  const reorderQuestions = useFormStore((state) => state.reorderQuestions)

  const { watch, setValue } = useForm<IForm>({
    defaultValues: {
      title: 'Formulário sem Título',
      subtitle: '',
      cover: null,
    },
  })

  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <div className="shadow-form overflow-hidden rounded-[16px]">
      <ImageCover setValue={setValue} value={watch('cover')} />
      <div className="flex flex-col items-center bg-white p-8">
        <InputTitle
          onChange={(value) => setValue('title', value)}
          value={watch('title')}
        />
        <div className="mt-2 w-full">
          <InputSubTitle
            onChange={(value) => setValue('subtitle', value)}
            value={watch('subtitle')}
          />
        </div>
        <DndContext
          id={'questions'}
          sensors={useSensors(useSensor(PointerSensor))}
          collisionDetection={closestCenter}
          onDragStart={({ active }) => setActiveId(active.id as string)}
          onDragEnd={({ active, over }) => {
            setActiveId(null)
            if (active.id !== over?.id) {
              const ids = Array.from(questions.keys())
              const oldIndex = ids.indexOf(active.id as string)
              const newIndex = ids.indexOf(over?.id as string)
              const newOrder = arrayMove(ids, oldIndex, newIndex)
              reorderQuestions(newOrder)
            }
          }}
          onDragCancel={() => setActiveId(null)}
        >
          <SortableContext
            items={Array.from(questions.keys())}
            strategy={verticalListSortingStrategy}
          >
            <div className="mt-10 flex w-full flex-col gap-4">
              {Array.from(questions.entries()).map(([id, question]) => (
                <SortableField
                  key={id}
                  id={id}
                  type={question.type}
                  isDragging={activeId === id}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeId ? (
              <Field
                id={activeId}
                type={questions.get(activeId)?.type ?? ('' as any)}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}
