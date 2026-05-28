import { NextRequest, NextResponse } from "next/server"

const NAMESPACE = "mandeep-portfolio"
const COUNTER = "views"
const BASE = `https://api.counterapi.dev/v1/${NAMESPACE}/${COUNTER}`

export async function GET(req: NextRequest) {
  const increment = req.nextUrl.searchParams.get("increment") === "1"
  const url = increment ? `${BASE}/up` : BASE

  try {
    const res = await fetch(url, {
      next: { revalidate: 0 },
      redirect: "follow",
    })
    const data = await res.json()
    const count = data?.count ?? data?.value ?? null
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count: null })
  }
}
