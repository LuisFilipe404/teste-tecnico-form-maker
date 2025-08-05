import SubTitle from './subtitle'
import Title from './title'

interface TopProps {
  title: string
  subtitle: string
  children?: React.ReactNode
}

export default function Top({ title, subtitle, children }: TopProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <Title text={title} />
        <SubTitle text={subtitle} />
      </div>
      {children}
    </div>
  )
}
