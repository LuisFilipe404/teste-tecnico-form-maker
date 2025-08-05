import FloatField from './fields/float-field'
import MultiplesChoices from './fields/multiples-choices'
import NumberField from './fields/number-field'
import TextField from './fields/text-field'
import UniqueChoices from './fields/unique-choices'
import YesNoField from './fields/yes-no-field'

interface FieldProps {
  type:
    | 'yes_no'
    | 'multiple_choice'
    | 'text'
    | 'unique_choice'
    | 'number'
    | 'float'
  id: string
  dragHandleProps?: React.HTMLAttributes<HTMLElement>
}

export default function Field({ type, id, dragHandleProps }: FieldProps) {
  const renderField = () => {
    switch (type) {
      case 'text':
        return <TextField id={id} dragHandleProps={dragHandleProps} />
      case 'yes_no':
        return <YesNoField id={id} dragHandleProps={dragHandleProps} />
      case 'multiple_choice':
        return <MultiplesChoices id={id} dragHandleProps={dragHandleProps} />
      case 'unique_choice':
        return <UniqueChoices id={id} dragHandleProps={dragHandleProps} />
      case 'number':
        return <NumberField id={id} dragHandleProps={dragHandleProps} />
      case 'float':
        return <FloatField id={id} dragHandleProps={dragHandleProps} />
      default:
        return null
    }
  }

  return renderField()
}
