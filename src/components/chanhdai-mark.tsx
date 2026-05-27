export function ChanhDaiMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 880 256"
      aria-hidden
      {...props}
    >
      {/* D — same as original */}
      <path
        fill="currentColor"
        d="M0 0h80c70 0 112 45 112 128s-42 128-112 128H0V0Zm64 48v160h16c34 0 48-28 48-80s-14-80-48-80H64Z"
      />
      {/* E */}
      <path
        fill="currentColor"
        d="M240 0h160v48H304v64h96v48H304v48h96v48H240V0Z"
      />
      {/* E */}
      <path
        fill="currentColor"
        d="M440 0h160v48H504v64h96v48H504v48h96v48H440V0Z"
      />
      {/* P */}
      <path
        fill="currentColor"
        d="M640 0h128c53 0 96 35 96 96s-43 96-96 96H704v64h-64V0Zm64 48v96h64c20 0 32-18 32-48s-12-48-32-48H704Z"
      />
    </svg>
  )
}

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 880 256"><path fill="currentColor" d="M0 0h80c70 0 112 45 112 128s-42 128-112 128H0V0Zm64 48v160h16c34 0 48-28 48-80s-14-80-48-80H64Z"/><path fill="currentColor" d="M240 0h160v48H304v64h96v48H304v48h96v48H240V0Z"/><path fill="currentColor" d="M440 0h160v48H504v64h96v48H504v48h96v48H440V0Z"/><path fill="currentColor" d="M640 0h128c53 0 96 35 96 96s-43 96-96 96H704v64h-64V0Zm64 48v96h64c20 0 32-18 32-48s-12-48-32-48H704Z"/></svg>`
}
