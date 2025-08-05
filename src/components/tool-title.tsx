interface ToolTitleProps {
  text: string
}

export default function ToolTitle({ text }: ToolTitleProps) {
  return <h1 className="text-black-text text-xl font-semibold">{text}</h1>
}
