import type { NavItem } from "@/types/nav"
import { USER } from "@/features/portfolio/data/user"

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.NEXT_PUBLIC_APP_URL || "https://deepnehra.dev",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const MAIN_NAV: NavItem[] = []

export const MOBILE_NAV: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Projects",
    href: "/projects",
  },
]

export const X_HANDLE = "@mandeep_nehra"
export const GITHUB_USERNAME = "Mandeep-codes"
export const SOURCE_CODE_GITHUB_REPO = "Mandeep-codes/Portfolio"
export const SOURCE_CODE_GITHUB_URL = "https://github.com/Mandeep-codes/Portfolio"

export const SPONSORSHIP_URL = "https://github.com/Mandeep-codes"

export const UTM_PARAMS = {
  utm_source: "mandeep-portfolio-mu.vercel.app",
}
