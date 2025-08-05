interface TitleProps {
  text: string
}

export default function Title({ text }: TitleProps) {
  return <h1 className="text-black-text text-[30px] font-bold">{text}</h1>
}
