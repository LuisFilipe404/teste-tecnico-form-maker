import * as React from 'react'

const NumberIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke={props.color || '#1C1C1E'}
      fill="none"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="24px"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M13 20v-16l-5 5"></path>
    </svg>
  )
}

export default NumberIcon
