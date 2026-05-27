"use client"

export function ProjectScreenshot({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-full aspect-video object-cover bg-muted"
      onError={(e) => {
        const el = e.currentTarget as HTMLImageElement
        el.style.display = "none"
        el.parentElement!.style.display = "none"
      }}
    />
  )
}
