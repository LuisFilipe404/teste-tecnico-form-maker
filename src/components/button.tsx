import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'rounded-[16px] font-semibold cursor-pointer transition-colors',
  variants: {
    hasicon: {
      t: 'gap-2',
      f: '',
    },
    size: {
      md: 'px-6 py-3 text-base',
    },
    color: {
      primary: 'bg-primary-400 text-white hover:bg-primary-600',
    },
  },
  defaultVariants: {
    hasIcon: 'f',
    color: 'primary',
    size: 'md',
  },
})

interface ButtonProps extends VariantProps<typeof button> {
  children: React.ReactNode
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(button(props), 'flex items-center justify-center')}
    >
      {children}
    </button>
  )
}
