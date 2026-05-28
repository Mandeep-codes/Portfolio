"use client"

import { useEffect, useRef, useState } from "react"
import { Panel, PanelContent, PanelHeader } from "./panel"
import { PanelTitleShimmer } from "./panel-title-shimmer"

// Mercator projection: lat/lng → SVG x/y (for a 800x400 viewBox)
function latLngToXY(lat: number, lng: number): [number, number] {
  const x = ((lng + 180) / 360) * 800
  const latRad = (lat * Math.PI) / 180
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2))
  const y = (400 / 2) - (400 * mercN) / (2 * Math.PI)
  return [x, y]
}

// Major countries with their approximate capital lat/lng
const COUNTRY_COORDS: Record<string, [number, number]> = {
  IN: [20.5937, 78.9629],   // India
  US: [37.0902, -95.7129],  // USA
  GB: [55.3781, -3.4360],   // UK
  DE: [51.1657, 10.4515],   // Germany
  FR: [46.2276, 2.2137],    // France
  JP: [36.2048, 138.2529],  // Japan
  AU: [-25.2744, 133.7751], // Australia
  BR: [-14.2350, -51.9253], // Brazil
  CA: [56.1304, -106.3468], // Canada
  CN: [35.8617, 104.1954],  // China
  SG: [1.3521, 103.8198],   // Singapore
  NL: [52.1326, 5.2913],    // Netherlands
  PK: [30.3753, 69.3451],   // Pakistan
  BD: [23.6850, 90.3563],   // Bangladesh
  NG: [9.0820, 8.6753],     // Nigeria
  ZA: [-30.5595, 22.9375],  // South Africa
  MX: [23.6345, -102.5528], // Mexico
  RU: [61.5240, 105.3188],  // Russia
  IT: [41.8719, 12.5674],   // Italy
  ES: [40.4637, -3.7492],   // Spain
  KR: [35.9078, 127.7669],  // South Korea
  ID: [-0.7893, 113.9213],  // Indonesia
  PH: [12.8797, 121.7740],  // Philippines
  NP: [28.3949, 84.1240],   // Nepal
  SE: [60.1282, 18.6435],   // Sweden
}

type VisitorData = {
  count: number
  countries: string[]
}

function WorldMapSVG({ visitedCountries }: { visitedCountries: string[] }) {
  const visitedSet = new Set(visitedCountries)

  return (
    <svg
      viewBox="0 0 800 400"
      className="w-full opacity-90"
      aria-hidden
      style={{ maxHeight: 220 }}
    >
      {/* subtle grid */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-border/40" />
        </pattern>
        <radialGradient id="blipGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-info)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--color-info)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="400" fill="url(#grid)" />

      {/* Continent outlines — simplified dot clusters */}
      {LANDMASS_DOTS.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={1.4}
          className="fill-muted-foreground/25"
        />
      ))}

      {/* Visitor blips */}
      {Object.entries(COUNTRY_COORDS).map(([code, [lat, lng]]) => {
        const [x, y] = latLngToXY(lat, lng)
        const isVisited = visitedSet.has(code)
        if (!isVisited) return null
        return (
          <g key={code}>
            {/* ping ring */}
            <circle cx={x} cy={y} r={8} fill="var(--color-info)" opacity={0.15}>
              <animate attributeName="r" values="4;14;4" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
            </circle>
            {/* core dot */}
            <circle cx={x} cy={y} r={3.5} fill="var(--color-info)" opacity={0.9} />
            <circle cx={x} cy={y} r={1.5} fill="white" opacity={0.8} />
          </g>
        )
      })}

      {/* Unvisited known country dots (dimmer) */}
      {Object.entries(COUNTRY_COORDS).map(([code, [lat, lng]]) => {
        const [x, y] = latLngToXY(lat, lng)
        const isVisited = visitedSet.has(code)
        if (isVisited) return null
        return (
          <circle
            key={`dim-${code}`}
            cx={x}
            cy={y}
            r={2}
            className="fill-muted-foreground/30"
          />
        )
      })}
    </svg>
  )
}

export function VisitorMap() {
  const [data, setData] = useState<VisitorData | null>(null)
  const [loading, setLoading] = useState(true)
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const STORAGE_KEY = "mnp_visitor_countries"

    // Load existing countries from localStorage
    let storedCountries: string[] = []
    try {
      storedCountries = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    } catch { /* ignore */ }

    // Detect current visitor country
    const detectAndStore = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(4000) })
        if (res.ok) {
          const json = await res.json()
          const code: string = json.country_code
          if (code && !storedCountries.includes(code)) {
            storedCountries = [...storedCountries, code]
            localStorage.setItem(STORAGE_KEY, JSON.stringify(storedCountries))
          }
        }
      } catch { /* silent fail */ }
    }

    // Increment + read counter
    const fetchCount = async () => {
      try {
        const res = await fetch("https://api.countapi.xyz/hit/mandeep-portfolio-v2/visits", { signal: AbortSignal.timeout(5000) })
        if (res.ok) {
          const json = await res.json()
          return json.value as number
        }
      } catch { /* silent */ }
      return null
    }

    Promise.all([detectAndStore(), fetchCount()]).then(([, count]) => {
      setData({
        count: count ?? 0,
        countries: storedCountries,
      })
      setLoading(false)
    })
  }, [])

  return (
    <Panel id="visitors" className="before:content-none">
      <PanelHeader>
        <PanelTitleShimmer>Visitor Map</PanelTitleShimmer>
      </PanelHeader>

      <PanelContent className="pb-2">
        {!loading && data && (
          <p className="mb-3 font-mono text-sm text-muted-foreground">
            {data.count > 0 ? (
              <>
                <span className="text-foreground font-semibold">{data.count.toLocaleString()}</span> visits tracked
                {data.countries.length > 0 && (
                  <> · from <span className="text-foreground font-semibold">{data.countries.length}</span> {data.countries.length === 1 ? "country" : "countries"} (your browser)</>
                )}
              </>
            ) : (
              <span>Tracking visitors around the world</span>
            )}
          </p>
        )}
        {loading && (
          <p className="mb-3 font-mono text-sm text-muted-foreground animate-pulse">
            Tracking visitors…
          </p>
        )}

        <div className="rounded-lg overflow-hidden border border-border/50 bg-muted/20">
          <WorldMapSVG visitedCountries={data?.countries ?? []} />
        </div>

        <p className="mt-2 font-mono text-xs text-muted-foreground/60">
          Countries stored locally in your browser · no personal data collected
        </p>
      </PanelContent>

      <div className="flex h-px" />
    </Panel>
  )
}

// Pre-computed land mass dot positions (mercator 800x400)
// Simplified clusters representing major landmasses
const LANDMASS_DOTS: [number, number][] = [
  // North America
  [120,80],[130,85],[140,90],[150,95],[160,100],[145,105],[155,108],[165,115],
  [135,110],[125,105],[115,100],[125,115],[135,120],[145,125],[155,130],
  [140,115],[150,120],[160,125],[170,130],[130,125],[120,120],
  // South America
  [175,160],[180,170],[185,175],[190,180],[195,185],[200,195],[195,205],
  [185,210],[180,215],[175,200],[170,190],[175,180],[180,185],[185,190],
  [190,195],[170,175],[165,180],[175,195],
  // Europe
  [380,70],[385,75],[390,80],[395,75],[400,80],[405,75],[410,80],[415,85],
  [395,85],[400,90],[405,85],[410,90],[385,90],[390,95],[400,95],[395,100],
  [405,95],[380,85],[375,90],[385,95],[420,80],[425,85],[430,90],
  // Africa
  [390,130],[395,135],[400,140],[405,145],[410,150],[415,155],[410,160],
  [405,165],[400,170],[395,175],[400,180],[405,185],[400,190],[395,185],
  [390,180],[385,175],[385,160],[390,155],[395,150],[385,145],[380,140],
  [390,165],[395,160],[400,155],[405,160],[410,165],[415,170],
  // Asia  
  [500,70],[510,75],[520,80],[530,75],[540,80],[550,85],[560,80],[570,85],
  [540,90],[550,95],[560,90],[570,95],[580,90],[520,90],[530,85],[545,100],
  [555,105],[560,100],[570,105],[580,100],[590,95],[600,100],[610,105],
  [540,110],[550,115],[560,110],[570,115],[580,110],[590,115],[600,110],
  [520,100],[510,105],[500,110],[490,105],[480,100],[485,110],[495,115],
  [505,120],[515,125],[525,120],[535,125],[545,120],[555,125],[565,120],
  [475,115],[480,120],[485,125],[490,120],[495,125],[500,130],
  // Southeast Asia
  [580,130],[590,135],[600,130],[610,135],[620,130],[615,140],[620,145],
  [610,145],[600,140],[590,140],[580,140],[585,145],[595,145],[605,145],
  [600,150],[610,155],[615,150],[620,155],[625,150],
  // Australia
  [620,210],[625,215],[630,220],[635,215],[640,220],[645,225],[640,230],
  [635,230],[630,235],[625,230],[620,230],[625,225],[630,225],[635,225],
  [640,215],[645,215],[650,220],[650,215],[645,210],[640,210],
  [620,215],[615,220],[620,225],[615,225],
]
