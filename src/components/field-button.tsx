interface FieldButtonProps {
  text: string
  icon: React.ReactNode
  onClick: () => void
}

export default function FieldButton({ icon, onClick, text }: FieldButtonProps) {
  return (
    <button
      onClick={onClick}
      className="border-gray-border hover:bg-primary-400/10 hover:border-primary-400 flex h-[100px] cursor-pointer flex-col items-center justify-center gap-3 rounded-[12px] border py-5 transition-colors"
    >
      {icon}
      <span className="text-black-text text-base">{text}</span>
    </button>
  )
}
