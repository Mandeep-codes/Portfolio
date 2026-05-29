import { USER } from "@/features/portfolio/data/user"

export function ProfileHeaderName() {
  return (
    <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-foreground">
      {USER.displayName}
    </h1>
  )
}
