import Field from '@/components/field'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface SortableFieldProps {
  id: string
  type: string
  isDragging: boolean
}

export default function SortableField({
  id,
  type,
  isDragging,
}: SortableFieldProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  }

  return (
    <div ref={setNodeRef} style={style} suppressHydrationWarning>
      <Field
        id={id}
        type={type as any}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  )
}
