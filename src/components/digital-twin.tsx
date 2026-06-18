"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { getReply, GREETING, type Message } from "./digital-twin-brain"

// ─── Chibi SVG ────────────────────────────────────────────────────────────────

function ChibiSVG({
  eyeOffset,
  isWaving,
  isChatOpen,
}: {
  eyeOffset: { x: number; y: number }
  isWaving: boolean
  isChatOpen: boolean
}) {
  // Skin: warm fair  #f2d5b8
  // Hair: dark brown/black  #1a1008
  // Jacket: near-black  #1a1a1a  with lapels showing white inner tee
  // Eyes: dark brown  #2a1a0a  iris  with bright highlight
  return (
    <svg
      viewBox="0 0 70 90"
      width="70"
      height="90"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <defs>
        <radialGradient id="skinGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#fce8d0" />
          <stop offset="100%" stopColor="#efc9a0" />
        </radialGradient>
        <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <style>{`
        @keyframes twin-bob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-3px); }
        }
        @keyframes twin-blink {
          0%, 88%, 100% { transform: scaleY(1); }
          93%           { transform: scaleY(0.06); }
        }
        @keyframes twin-wave {
          0%   { transform: rotate(0deg); }
          20%  { transform: rotate(-50deg); }
          40%  { transform: rotate(12deg); }
          60%  { transform: rotate(-50deg); }
          80%  { transform: rotate(12deg); }
          100% { transform: rotate(0deg); }
        }
        .twin-body      { animation: twin-bob 2.4s ease-in-out infinite; }
        .twin-eye-group { transform-origin: center; animation: twin-blink 5s ease-in-out infinite; }
        .twin-arm-r     { transform-origin: 52px 51px; animation: ${isWaving ? "twin-wave 1.8s ease-in-out 1" : "none"}; }
      `}</style>

      <g className="twin-body">

        {/* ── Ground shadow ── */}
        <ellipse cx="35" cy="88" rx="16" ry="3.5" fill="url(#shadowGrad)" />

        {/* ── Legs – slim dark jeans ── */}
        <rect x="23" y="71" width="9"  height="14" rx="4" fill="#1c1c2e" />
        <rect x="37" y="71" width="9"  height="14" rx="4" fill="#1c1c2e" />
        {/* Shoes – dark, slightly wider */}
        <ellipse cx="27.5" cy="85" rx="6.5" ry="3" fill="#0d0d0d" />
        <ellipse cx="41.5" cy="85" rx="6.5" ry="3" fill="#0d0d0d" />

        {/* ── Body – black open jacket ── */}
        {/* Main jacket body */}
        <rect x="18" y="50" width="34" height="24" rx="6" fill="#1a1a1a" />

        {/* White inner tee – visible as a vertical strip */}
        <rect x="30" y="51" width="10" height="23" rx="2" fill="#e8e8e8" />
        {/* Tee collar V shape */}
        <polygon points="30,51 40,51 35,59" fill="#d0d0d0" />

        {/* Left jacket lapel */}
        <polygon points="18,50 30,50 28,62 18,58" fill="#232323" />
        {/* Right jacket lapel */}
        <polygon points="52,50 40,50 42,62 52,58" fill="#232323" />

        {/* Jacket edge shadows for depth */}
        <rect x="18" y="50" width="3" height="24" rx="1" fill="#111" opacity="0.5" />
        <rect x="49" y="50" width="3" height="24" rx="1" fill="#111" opacity="0.5" />

        {/* ── Left arm ── */}
        <rect x="9"  y="51" width="10" height="16" rx="5" fill="#1a1a1a" />
        {/* Left hand */}
        <ellipse cx="14" cy="68" rx="5" ry="4" fill="#f2d5b8" />

        {/* ── Right arm – waveable ── */}
        <g className="twin-arm-r">
          <rect x="51" y="51" width="10" height="16" rx="5" fill="#1a1a1a" />
          {/* Right hand */}
          <ellipse cx="56" cy="68" rx="5" ry="4" fill="#f2d5b8" />
          {isWaving && (
            <>
              <line x1="54" y1="65" x2="51" y2="61" stroke="#f2d5b8" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="56" y1="64" x2="56" y2="60" stroke="#f2d5b8" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="58" y1="65" x2="61" y2="61" stroke="#f2d5b8" strokeWidth="2.5" strokeLinecap="round" />
            </>
          )}
        </g>

        {/* ── Neck ── */}
        <rect x="29" y="44" width="12" height="9" rx="3" fill="#f0cba0" />
        {/* Neck shadow under chin */}
        <rect x="29" y="44" width="12" height="3" rx="2" fill="#d9a87a" opacity="0.5" />

        {/* ── Head – slightly wide chibi ── */}
        <ellipse cx="35" cy="28" rx="20" ry="22" fill="url(#skinGrad)" />

        {/* ── Ear ── */}
        <ellipse cx="15.5" cy="30" rx="3" ry="4" fill="#efc9a0" />
        <ellipse cx="54.5" cy="30" rx="3" ry="4" fill="#efc9a0" />

        {/* ── Hair base – dark messy style ── */}
        {/* Main cap */}
        <ellipse cx="35" cy="14" rx="20" ry="12" fill="#1a1008" />
        {/* Side coverage left */}
        <rect x="15" y="14" width="7"  height="20" rx="3" fill="#1a1008" />
        {/* Side coverage right */}
        <rect x="48" y="14" width="7"  height="18" rx="3" fill="#1a1008" />
        {/* Forehead dip */}
        <ellipse cx="35" cy="22" rx="16" ry="5" fill="#1a1008" />

        {/* ── Messy hair strands – spiky, swept ── */}
        {/* Left spikes going outward */}
        <path d="M15 16 Q8 8 14 4 Q16 12 20 14 Z"  fill="#1a1008" />
        <path d="M18 13 Q13 4 20 2 Q20 10 24 12 Z"  fill="#211408" />
        {/* Center spikes */}
        <path d="M28 10 Q26 1 32 0 Q31 8 35 10 Z"   fill="#1a1008" />
        <path d="M33 9  Q33 0 38 1 Q36 8 39 11 Z"   fill="#211408" />
        {/* Right spikes */}
        <path d="M40 12 Q44 3 49 6 Q44 11 42 14 Z"  fill="#1a1008" />
        <path d="M44 15 Q50 7 54 12 Q49 14 47 17 Z" fill="#211408" />
        {/* Forelock strand sweeping right */}
        <path d="M28 22 Q32 16 40 18 Q36 23 30 24 Z" fill="#2a1a0a" />

        {/* ── Eyebrows – sharp, slightly arched ── */}
        <path d="M20 24 Q24 21 28 23" stroke="#1a1008" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M42 23 Q46 21 50 24" stroke="#1a1008" strokeWidth="2.2" fill="none" strokeLinecap="round" />

        {/* ── Eyes – anime style, large dark iris ── */}
        <g className="twin-eye-group" style={{ transformOrigin: `${35 + eyeOffset.x}px ${31 + eyeOffset.y}px` }}>
          {/* Left eye white */}
          <ellipse cx={24 + eyeOffset.x * 0.5} cy={31 + eyeOffset.y * 0.4} rx="5.5" ry="5.5" fill="white" />
          {/* Right eye white */}
          <ellipse cx={46 + eyeOffset.x * 0.5} cy={31 + eyeOffset.y * 0.4} rx="5.5" ry="5.5" fill="white" />

          {/* Left iris – dark warm brown */}
          <circle cx={24 + eyeOffset.x} cy={31 + eyeOffset.y} r="4" fill="#2a1a0a" />
          {/* Left iris sheen */}
          <circle cx={24 + eyeOffset.x} cy={31 + eyeOffset.y} r="3.2" fill="#3d2510" />
          {/* Left pupil */}
          <circle cx={24 + eyeOffset.x} cy={31.5 + eyeOffset.y} r="1.8" fill="#0d0806" />
          {/* Left highlight */}
          <circle cx={25.2 + eyeOffset.x} cy={29.5 + eyeOffset.y} r="1.1" fill="white" opacity="0.9" />
          <circle cx={23 + eyeOffset.x} cy={32.5 + eyeOffset.y} r="0.5" fill="white" opacity="0.4" />

          {/* Right iris */}
          <circle cx={46 + eyeOffset.x} cy={31 + eyeOffset.y} r="4" fill="#2a1a0a" />
          <circle cx={46 + eyeOffset.x} cy={31 + eyeOffset.y} r="3.2" fill="#3d2510" />
          <circle cx={46 + eyeOffset.x} cy={31.5 + eyeOffset.y} r="1.8" fill="#0d0806" />
          {/* Right highlight */}
          <circle cx={47.2 + eyeOffset.x} cy={29.5 + eyeOffset.y} r="1.1" fill="white" opacity="0.9" />
          <circle cx={45 + eyeOffset.x} cy={32.5 + eyeOffset.y} r="0.5" fill="white" opacity="0.4" />

          {/* Upper eyelid line – gives anime sharpness */}
          <path
            d={`M${18.5 + eyeOffset.x * 0.3} ${28 + eyeOffset.y * 0.3} Q${24 + eyeOffset.x * 0.3} ${25.5 + eyeOffset.y * 0.3} ${29.5 + eyeOffset.x * 0.3} ${28 + eyeOffset.y * 0.3}`}
            stroke="#1a1008" strokeWidth="1.8" fill="none" strokeLinecap="round"
          />
          <path
            d={`M${40.5 + eyeOffset.x * 0.3} ${28 + eyeOffset.y * 0.3} Q${46 + eyeOffset.x * 0.3} ${25.5 + eyeOffset.y * 0.3} ${51.5 + eyeOffset.x * 0.3} ${28 + eyeOffset.y * 0.3}`}
            stroke="#1a1008" strokeWidth="1.8" fill="none" strokeLinecap="round"
          />
        </g>

        {/* ── Nose – minimal dot/bump ── */}
        <ellipse cx="35" cy="37" rx="1.2" ry="0.8" fill="#d4956a" opacity="0.7" />

        {/* ── Mouth ── */}
        {isChatOpen ? (
          // Talking – small open mouth
          <ellipse cx="35" cy="42" rx="3.5" ry="2.5" fill="#c0624a" />
        ) : (
          // Relaxed slight smirk
          <path d="M 30 42 Q 35 45 40 42" stroke="#c07050" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        )}

        {/* ── Subtle chin shadow ── */}
        <ellipse cx="35" cy="48" rx="10" ry="3" fill="#d9a060" opacity="0.25" />

      </g>
    </svg>
  )
}

// ─── Chat Bubble ─────────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "10px 14px" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#3b82f6",
            display: "inline-block",
            animation: `twin-dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes twin-dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function ChatMessage({ msg }: { msg: Message }) {
  const isUser = msg.role === "user"

  // Render **bold** markdown
  const renderContent = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        <span key={i}>{part}</span>
      )
    )
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 10,
      }}
    >
      <div
        style={{
          maxWidth: "82%",
          background: isUser ? "var(--primary)" : "var(--muted, #f1f5f9)",
          color: isUser ? "var(--primary-foreground)" : "var(--foreground)",
          borderRadius: isUser ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
          padding: "8px 12px",
          fontSize: 12,
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          fontFamily: "inherit",
          border: isUser ? "none" : "1px solid var(--border)",
        }}
      >
        {renderContent(msg.content)}
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

const MAX_MESSAGES = 20

export function DigitalTwin() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isWaving, setIsWaving] = useState(false)
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const [messages, setMessages] = useState<Message[]>([
    { role: "twin", content: GREETING },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const twinRef = useRef<HTMLDivElement>(null)

  // Mount guard
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Wave on first visit
  useEffect(() => {
    if (!isMounted) return
    const visited = localStorage.getItem("mnp_twin_waved")
    if (!visited) {
      const t = setTimeout(() => {
        setIsWaving(true)
        setTimeout(() => setIsWaving(false), 2000)
        localStorage.setItem("mnp_twin_waved", "1")
      }, 800)
      return () => clearTimeout(t)
    }
  }, [isMounted])

  // Eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!twinRef.current) return
      const rect = twinRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = 300
      const factor = Math.min(dist / maxDist, 1) * 2.5
      setEyeOffset({
        x: Math.round((dx / dist || 0) * factor * 10) / 10,
        y: Math.round((dy / dist || 0) * factor * 10) / 10,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isChatOpen])

  const sendMessage = useCallback(() => {
    const text = input.trim()
    if (!text || isTyping) return
    if (messages.length >= MAX_MESSAGES) return

    const userMsg: Message = { role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Simulate thinking delay (150-400ms)
    const delay = 150 + Math.random() * 250
    setTimeout(() => {
      const reply = getReply(text)
      setMessages((prev) => [...prev, { role: "twin", content: reply }])
      setIsTyping(false)
    }, delay)
  }, [input, isTyping, messages.length])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isMounted) return null

  const isMaxed = messages.length >= MAX_MESSAGES

  return (
    <div
      ref={twinRef}
      style={{
        position: "fixed",
        bottom: 0,
        left: 16,
        zIndex: 45,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 0,
        // Hide on very small screens to not block mobile nav
      }}
      className="hidden sm:flex"
    >
      {/* Chat popup */}
      {isChatOpen && (
        <div
          style={{
            width: 296,
            height: 400,
            background: "var(--background)",
            border: "1px solid var(--border)",
            borderRadius: "16px 16px 16px 4px",
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(59,130,246,0.1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "10px 14px",
              background: "var(--surface, var(--background))",
              borderBottom: "1px solid var(--line, var(--border))",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 6px #22c55e",
                }}
              />
              <span
                style={{
                  color: "var(--foreground)",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "inherit",
                }}
              >
                Chat with Deep
              </span>
              <span
                style={{
                  color: "var(--muted-foreground, #64748b)",
                  fontSize: 10,
                  fontFamily: "monospace",
                }}
              >
                digital twin
              </span>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--muted-foreground, #64748b)",
                cursor: "pointer",
                fontSize: 16,
                lineHeight: 1,
                padding: "2px 4px",
                borderRadius: 4,
              }}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px 12px 4px",
              scrollbarWidth: "thin",
              scrollbarColor: "var(--border) transparent",
            }}
          >
            {messages.map((msg, i) => (
              <ChatMessage key={i} msg={msg} />
            ))}
            {isTyping && (
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }}>
                <div
                  style={{
                    background: "var(--muted, #1e293b)",
                    borderRadius: "14px 14px 14px 4px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <TypingDots />
                </div>
              </div>
            )}
            {isMaxed && !isTyping && (
              <div style={{ textAlign: "center", color: "var(--muted-foreground, #64748b)", fontSize: 11, marginTop: 8, fontFamily: "monospace" }}>
                That's all I've got! DM Deep at @NehraWorkss on X 🐦
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "8px 10px",
              borderTop: "1px solid var(--line, var(--border))",
              display: "flex",
              gap: 8,
              background: "var(--background)",
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isMaxed ? "Max messages reached" : "Ask me anything..."}
              disabled={isMaxed || isTyping}
              style={{
                flex: 1,
                background: "var(--muted, #f1f5f9)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "7px 12px",
                color: "var(--foreground)",
                fontSize: 12,
                fontFamily: "inherit",
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isMaxed || isTyping}
              style={{
                background: input.trim() && !isMaxed ? "var(--primary)" : "var(--muted, #e2e8f0)",
                border: "none",
                borderRadius: 10,
                width: 36,
                height: 36,
                cursor: input.trim() && !isMaxed ? "pointer" : "default",
                color: input.trim() && !isMaxed ? "var(--primary-foreground)" : "var(--muted-foreground)",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.15s",
                flexShrink: 0,
              }}
              aria-label="Send"
            >
              ↑
            </button>
          </div>
        </div>
      )}

      {/* Chibi character */}
      <div
        onClick={() => setIsChatOpen((v) => !v)}
        style={{
          cursor: "pointer",
          position: "relative",
          userSelect: "none",
          transition: "filter 0.15s",
          filter: isChatOpen ? "drop-shadow(0 0 8px rgba(59,130,246,0.6))" : "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
        }}
        title="Click to chat with Deep's digital twin"
        role="button"
        aria-label="Chat with Deep's digital twin"
      >
        {/* Tooltip on hover when chat is closed */}
        {!isChatOpen && (
          <div
            style={{
              position: "absolute",
              bottom: "calc(100% + 6px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--background)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: 11,
              color: "var(--muted-foreground, #94a3b8)",
              whiteSpace: "nowrap",
              fontFamily: "monospace",
              pointerEvents: "none",
              opacity: 0,
              transition: "opacity 0.2s",
            }}
            className="twin-tooltip"
          >
            chat with me!
          </div>
        )}

        <ChibiSVG
          eyeOffset={eyeOffset}
          isWaving={isWaving}
          isChatOpen={isChatOpen}
        />

        {/* Notification dot when chat is closed */}
        {!isChatOpen && (
          <div
            style={{
              position: "absolute",
              top: 4,
              right: 0,
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "#3b82f6",
              border: "1.5px solid var(--background)",
              boxShadow: "0 0 6px rgba(59,130,246,0.8)",
              animation: "twin-pulse 2s ease-in-out infinite",
            }}
          />
        )}
      </div>

      <style>{`
        @keyframes twin-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        .twin-tooltip { opacity: 0; }
        [role="button"]:hover .twin-tooltip { opacity: 1 !important; }
      `}</style>
    </div>
  )
}
