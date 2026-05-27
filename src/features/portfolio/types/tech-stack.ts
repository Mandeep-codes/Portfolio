export type TechStack = {
  key: string
  title: string
  href: string
  categories: string[]
  /** Icon URL (used for both themes, or light theme when theme=true) */
  icon?: string
  /** Dark-mode icon URL (only used when theme=true) */
  iconDark?: string
  /** If true, render light + dark icon variants */
  theme?: boolean
}
