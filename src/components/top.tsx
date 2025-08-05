import SubTitle from './subtitle'
import Title from './title'

interface TopProps {
  title: string
  subtitle: string
  children?: React.ReactNode
}

export default function Top({ title, subtitle, children }: TopProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between">
      <div className="space-y-1 text-center lg:text-left">
        <Title text={title} />
        <SubTitle text={subtitle} />
      </div>
      {children}
    </div>
  )
}
