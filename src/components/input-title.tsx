interface InputTitleProps {
  value: string
  onChange: (value: string) => void
}

export default function InputTitle({ value, onChange }: InputTitleProps) {
  return (
    <input
      type="text"
      className="text-gray-text w-full text-center text-3xl font-medium outline-0 focus:ring-0"
      placeholder="Título do Formulário"
      value={value}
      onChange={(e) => {
        const trimValue = e.target.value.trim()

        if (trimValue.length > 30) return

        onChange(trimValue)
      }}
    />
  )
}
