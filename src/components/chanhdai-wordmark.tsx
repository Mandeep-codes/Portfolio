export function ChanhDaiWordmark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 48"
      fill="currentColor"
      aria-label="deepnehra"
      {...props}
    >
      <text
        x="0"
        y="38"
        fontFamily="monospace, monospace"
        fontWeight="700"
        fontSize="42"
        letterSpacing="-1"
      >
        deepnehra
      </text>
    </svg>
  )
}

export function getWordmarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 48" fill="currentColor"><text x="0" y="38" font-family="monospace" font-weight="700" font-size="42" letter-spacing="-1">deepnehra</text></svg>`
}
