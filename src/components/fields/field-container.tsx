import { tv, type VariantProps } from 'tailwind-variants'

const container = tv({
  base: 'w-full rounded-[16px] p-6 transition-colors duration-200',
  variants: {
    theme: {
      default: 'bg-white border-gray-border border hover:border-primary-400',
      conditionalQuestion: 'bg-primary-400/10 border border-primary-400',
    },
  },
  defaultVariants: {
    theme: 'default',
  },
})

interface FieldContainerProps extends VariantProps<typeof container> {
  children: React.ReactNode
}

export default function FieldContainer({
  children,
  ...props
}: FieldContainerProps) {
  return <div className={container(props)}>{children}</div>
}
