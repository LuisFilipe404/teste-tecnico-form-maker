interface ToolContainerProps {
  children?: React.ReactNode
}

export default function ToolContainer({ children }: ToolContainerProps) {
  return (
    <div className="shadow-form overflow-hidden rounded-[16px] bg-white p-6">
      {children}
    </div>
  )
}
