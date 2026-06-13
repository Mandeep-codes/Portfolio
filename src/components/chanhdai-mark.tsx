export function ChanhDaiMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 520 256"
      aria-hidden
      {...props}
    >
      {/* M */}
      <path
        fill="currentColor"
        d="M0 0h64l56 120L176 0h64v256h-64V112l-40 88H96l-40-88v144H0V0Z"
      />
      {/* N */}
      <path
        fill="currentColor"
        d="M280 0h64l96 152V0h64v256h-64L344 104v152h-64V0Z"
      />
    </svg>
  )
}

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 520 256"><path fill="currentColor" d="M0 0h64l56 120L176 0h64v256h-64V112l-40 88H96l-40-88v144H0V0Z"/><path fill="currentColor" d="M280 0h64l96 152V0h64v256h-64L344 104v152h-64V0Z"/></svg>`
}
