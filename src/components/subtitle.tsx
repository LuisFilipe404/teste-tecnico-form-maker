interface SubTitleProps {
  text: string
}

export default function SubTitle({ text }: SubTitleProps) {
  return <h2 className="text-gray-text text-lg">{text}</h2>
}
