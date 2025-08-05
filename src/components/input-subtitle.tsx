interface InputSubTitleProps {
  value: string
  onChange: (value: string) => void
}

export default function InputSubTitle({ value, onChange }: InputSubTitleProps) {
  return (
    <input
      type="text"
      className="text-gray-text/90 w-full text-center text-xl outline-0 focus:ring-0"
      placeholder="Adicione uma descrição ao formulário"
      value={value}
      onChange={(e) => {
        const trimValue = e.target.value.trim()

        if (trimValue.length > 100) return

        onChange(trimValue)
      }}
    />
  )
}
