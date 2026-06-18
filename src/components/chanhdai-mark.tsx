export function ChanhDaiMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 320 96"
      aria-hidden
      {...props}
    >
      <text
        x="0"
        y="80"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="800"
        fontSize="88"
        fill="currentColor"
        letterSpacing="-4"
      >
        Deep
      </text>
    </svg>
  )
}

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 320 96"><text x="0" y="80" font-family="'Inter', 'Helvetica Neue', Arial, sans-serif" font-weight="800" font-size="88" fill="currentColor" letter-spacing="-4">Deep</text></svg>`
}
