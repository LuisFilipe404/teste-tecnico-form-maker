import { useEffect, useRef, TextareaHTMLAttributes } from 'react'

type AutoResizeTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export default function AutoResizeTextarea(props: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleInput = () => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    }
  }

  useEffect(() => {
    handleInput()
  }, [])

  return (
    <textarea
      {...props}
      ref={textareaRef}
      rows={1}
      onInput={(e) => {
        handleInput()
        props.onInput?.(e)
      }}
      className={`w-full resize-none overflow-hidden text-xl outline-none ${props.className ?? ''}`}
    />
  )
}
