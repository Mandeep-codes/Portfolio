"use client"

import { useEffect, useState } from "react"

const POKEMON_IDS = [
  25, 1, 4, 7, 39, 52, 133, 143, 147, 152, 155, 158, 175, 196, 197,
  202, 226, 249, 250, 252, 255, 258, 280, 384, 385, 393, 399, 403,
  425, 427, 431, 440, 443, 447, 495, 498, 501, 509, 517, 519, 527,
  531, 570, 572, 577, 590, 595, 613, 636, 643, 644,
]

function getSpriteUrl(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`
}

function getRandomId() {
  return POKEMON_IDS[Math.floor(Math.random() * POKEMON_IDS.length)]
}

export function PokemonFollower() {
  const [pokemonId, setPokemonId] = useState<number | null>(null)

  useEffect(() => {
    setPokemonId(getRandomId())
  }, [])

  return (
    <>
      <style>{`
        @keyframes pkm-bounce {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        .pkm-sprite { animation: pkm-bounce 1.6s ease-in-out infinite; }
      `}</style>
      <div aria-hidden style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 56 }}>
        <div className="pkm-sprite">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pokemonId ? getSpriteUrl(pokemonId) : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
            alt=""
            width={56}
            height={56}
            style={{
              width: 56,
              height: 56,
              imageRendering: "pixelated",
              filter: "grayscale(100%) drop-shadow(0 3px 6px rgba(0,0,0,0.5))",
            }}
            draggable={false}
          />
        </div>
        <div style={{
          width: 32, height: 5,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.3)",
          filter: "blur(2px)",
          marginTop: -1,
        }} />
      </div>
    </>
  )
}
