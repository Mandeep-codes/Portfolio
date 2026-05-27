import "server-only"

import { unstable_cache } from "next/cache"

import { GITHUB_USERNAME } from "@/config/site"
import type { Activity } from "@/registry/components/contribution-graph"

type GitHubContributionsResponse = {
  contributions: Activity[]
}

async function fetchContributions(): Promise<Activity[]> {
  // Try primary API first
  try {
    const primaryUrl = process.env.GITHUB_CONTRIBUTIONS_API_URL
    if (primaryUrl) {
      const res = await fetch(
        `${primaryUrl}/v4/${GITHUB_USERNAME}?y=last`,
        { next: { revalidate: 86400 } }
      )
      if (res.ok) {
        const data = (await res.json()) as GitHubContributionsResponse
        return data.contributions
      }
    }
  } catch {}

  // Fallback: use GitHub GraphQL API
  try {
    const token = process.env.GITHUB_API_TOKEN
    if (!token) return []

    const now = new Date()
    const from = new Date(now)
    from.setFullYear(from.getFullYear() - 1)

    const query = `
      query($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          login: GITHUB_USERNAME,
          from: from.toISOString(),
          to: now.toISOString(),
        },
      }),
    })

    if (!res.ok) return []

    const json = await res.json() as {
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: {
              weeks?: {
                contributionDays?: {
                  date: string
                  contributionCount: number
                  contributionLevel: string
                }[]
              }[]
            }
          }
        }
      }
    }

    const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? []
    const activities: Activity[] = []

    for (const week of weeks) {
      for (const day of week.contributionDays ?? []) {
        const levelMap: Record<string, 0 | 1 | 2 | 3 | 4> = {
          NONE: 0,
          FIRST_QUARTILE: 1,
          SECOND_QUARTILE: 2,
          THIRD_QUARTILE: 3,
          FOURTH_QUARTILE: 4,
        }
        activities.push({
          date: day.date,
          count: day.contributionCount,
          level: levelMap[day.contributionLevel] ?? 0,
        })
      }
    }

    return activities
  } catch {
    return []
  }
}

export const getGitHubContributions = unstable_cache(
  fetchContributions,
  ["github-contributions"],
  { revalidate: 86400 }
)
