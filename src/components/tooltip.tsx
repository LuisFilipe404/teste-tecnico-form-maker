import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

interface ToolTipProps {
  children: React.ReactNode
  content: string
}

export default function ToolTip({ children, content }: ToolTipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <span>{content}</span>
      </TooltipContent>
    </Tooltip>
  )
}
