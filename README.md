# Mandeep Nehra — Portfolio

Personal developer portfolio built with Next.js 15, Tailwind CSS, and TypeScript.

## Getting Started

**Requirements:** Node.js 22+, pnpm 11+

```bash
# Clone
git clone https://github.com/Mandeep-codes/deep-portfolio-v2.git
cd deep-portfolio-v2

# Install
pnpm install

# Run dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

A working `.env` is included in the repo. No changes needed to run locally.

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Yes | Site URL (`http://localhost:3000` for local) |
| `GITHUB_CONTRIBUTIONS_API_URL` | Yes | GitHub contributions API (default provided) |
| `GITHUB_API_TOKEN` | No | GitHub token — increases API rate limit |
| `OPENPANEL_*` | No | Analytics (leave empty to disable) |

## Stack

- **Framework** — Next.js 15 (App Router)
- **Styling** — Tailwind CSS v4
- **Language** — TypeScript
- **Package Manager** — pnpm

## Deploy

Works out of the box on [Vercel](https://vercel.com). Set `NEXT_PUBLIC_APP_URL` to your production URL.
