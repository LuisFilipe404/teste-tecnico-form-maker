interface FieldIconProps {
  icon: React.ReactNode
}

export default function FieldIcon({ icon }: FieldIconProps) {
  return (
    <div
      className="bg-primary-400/10 text-primary-400 flex size-8 items-center justify-center rounded-[8px]"
      aria-label="Ícone do Campo de Texto"
    >
      {icon}
    </div>
  )
}
