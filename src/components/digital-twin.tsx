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
  return (
    <svg
      viewBox="0 0 60 80"
      width="60"
      height="80"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <style>{`
        @keyframes twin-bob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes twin-blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.08); }
        }
        @keyframes twin-wave {
          0%   { transform: rotate(0deg); }
          20%  { transform: rotate(-45deg); }
          40%  { transform: rotate(10deg); }
          60%  { transform: rotate(-45deg); }
          80%  { transform: rotate(10deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes twin-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-2px); }
        }
        .twin-body { animation: twin-bob 2.2s ease-in-out infinite; }
        .twin-eye  {
          transform-origin: center;
          animation: twin-blink 4.5s ease-in-out infinite;
        }
        .twin-arm-right {
          transform-origin: 44px 46px;
          animation: ${isWaving ? "twin-wave 1.6s ease-in-out 1" : "none"};
        }
        .twin-shadow { animation: twin-float 2.2s ease-in-out infinite; }
      `}</style>

      <g className="twin-body">
        {/* Shadow */}
        <ellipse className="twin-shadow" cx="30" cy="78" rx="14" ry="3" fill="#3b82f6" opacity="0.18" />

        {/* Legs */}
        <rect x="21" y="65" width="7" height="10" rx="3" fill="#1e293b" />
        <rect x="32" y="65" width="7" height="10" rx="3" fill="#1e293b" />
        {/* Shoes */}
        <ellipse cx="24.5" cy="75" rx="5" ry="3" fill="#0f172a" />
        <ellipse cx="35.5" cy="75" rx="5" ry="3" fill="#0f172a" />

        {/* Body */}
        <rect x="18" y="45" width="24" height="22" rx="5" fill="#1e3a5f" />
        {/* Shirt accent line */}
        <rect x="28" y="46" width="4" height="21" rx="2" fill="#2563eb" opacity="0.5" />

        {/* Left arm */}
        <rect x="10" y="46" width="8" height="14" rx="4" fill="#1e3a5f" />
        {/* Left hand */}
        <circle cx="14" cy="61" r="3.5" fill="#c9a882" />

        {/* Right arm — waveable */}
        <g className="twin-arm-right">
          <rect x="42" y="46" width="8" height="14" rx="4" fill="#1e3a5f" />
          {/* Right hand */}
          <circle cx="46" cy="61" r="3.5" fill="#c9a882" />
          {/* Wave hand fingers hint */}
          {isWaving && (
            <>
              <line x1="44" y1="58" x2="42" y2="55" stroke="#c9a882" strokeWidth="2" strokeLinecap="round" />
              <line x1="46" y1="57" x2="46" y2="54" stroke="#c9a882" strokeWidth="2" strokeLinecap="round" />
              <line x1="48" y1="58" x2="50" y2="55" stroke="#c9a882" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
        </g>

        {/* Neck */}
        <rect x="26" y="40" width="8" height="7" rx="2" fill="#c9a882" />

        {/* Head */}
        <rect x="13" y="14" width="34" height="30" rx="10" fill="#c9a882" />

        {/* Hair — chunky pixel-art style */}
        <rect x="13" y="14" width="34" height="10" rx="8" fill="#1a0a00" />
        <rect x="13" y="18" width="6" height="12" rx="3" fill="#1a0a00" />
        <rect x="41" y="18" width="6" height="12" rx="3" fill="#1a0a00" />
        {/* Hair spike */}
        <rect x="24" y="10" width="6" height="8" rx="2" fill="#1a0a00" />
        <rect x="30" y="8" width="5" height="10" rx="2" fill="#1a0a00" />

        {/* Eyes */}
        <g className="twin-eye" style={{ transformOrigin: `${30 + eyeOffset.x}px ${27 + eyeOffset.y}px` }}>
          {/* Left eye white */}
          <ellipse cx={22 + eyeOffset.x * 0.6} cy={27 + eyeOffset.y * 0.5} rx="4" ry="4.5" fill="white" />
          {/* Right eye white */}
          <ellipse cx={38 + eyeOffset.x * 0.6} cy={27 + eyeOffset.y * 0.5} rx="4" ry="4.5" fill="white" />
          {/* Left pupil */}
          <circle cx={22 + eyeOffset.x} cy={27 + eyeOffset.y} r="2.2" fill="#0f172a" />
          <circle cx={23 + eyeOffset.x} cy={26 + eyeOffset.y} r="0.8" fill="white" opacity="0.8" />
          {/* Right pupil */}
          <circle cx={38 + eyeOffset.x} cy={27 + eyeOffset.y} r="2.2" fill="#0f172a" />
          <circle cx={39 + eyeOffset.x} cy={26 + eyeOffset.y} r="0.8" fill="white" opacity="0.8" />
        </g>

        {/* Eyebrows */}
        <rect x="18" y="21" width="8" height="2" rx="1" fill="#1a0a00" opacity="0.8" />
        <rect x="34" y="21" width="8" height="2" rx="1" fill="#1a0a00" opacity="0.8" />

        {/* Mouth */}
        {isChatOpen ? (
          // Talking / excited mouth
          <ellipse cx="30" cy="36" rx="4" ry="2.5" fill="#e11d48" />
        ) : (
          // Smile
          <path d="M 25 36 Q 30 40 35 36" stroke="#7c3f1e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        )}

        {/* Blush marks */}
        <ellipse cx="19" cy="32" rx="3" ry="1.5" fill="#f9a8d4" opacity="0.5" />
        <ellipse cx="41" cy="32" rx="3" ry="1.5" fill="#f9a8d4" opacity="0.5" />

        {/* Blue accent on collar */}
        <rect x="24" y="44" width="12" height="4" rx="2" fill="#3b82f6" opacity="0.8" />
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
          background: isUser ? "#3b82f6" : "#1e293b",
          color: "#f8fafc",
          borderRadius: isUser ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
          padding: "8px 12px",
          fontSize: 12,
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          border: isUser ? "none" : "1px solid #334155",
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
            background: "#0a0f1a",
            border: "1px solid #1e3a5f",
            borderRadius: "16px 16px 16px 4px",
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.15)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "10px 14px",
              background: "#0f172a",
              borderBottom: "1px solid #1e3a5f",
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
                  color: "#f8fafc",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                }}
              >
                Chat with Deep
              </span>
              <span
                style={{
                  color: "#64748b",
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
                color: "#64748b",
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
              scrollbarColor: "#1e3a5f transparent",
            }}
          >
            {messages.map((msg, i) => (
              <ChatMessage key={i} msg={msg} />
            ))}
            {isTyping && (
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }}>
                <div
                  style={{
                    background: "#1e293b",
                    borderRadius: "14px 14px 14px 4px",
                    border: "1px solid #334155",
                  }}
                >
                  <TypingDots />
                </div>
              </div>
            )}
            {isMaxed && !isTyping && (
              <div style={{ textAlign: "center", color: "#64748b", fontSize: 11, marginTop: 8, fontFamily: "monospace" }}>
                That's all I've got! DM Deep at @NehraWorkss on X 🐦
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "8px 10px",
              borderTop: "1px solid #1e3a5f",
              display: "flex",
              gap: 8,
              background: "#0a0f1a",
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
                background: "#0f172a",
                border: "1px solid #1e3a5f",
                borderRadius: 10,
                padding: "7px 12px",
                color: "#f8fafc",
                fontSize: 12,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isMaxed || isTyping}
              style={{
                background: input.trim() && !isMaxed ? "#3b82f6" : "#1e3a5f",
                border: "none",
                borderRadius: 10,
                width: 36,
                height: 36,
                cursor: input.trim() && !isMaxed ? "pointer" : "default",
                color: "white",
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
              background: "#0f172a",
              border: "1px solid #1e3a5f",
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: 11,
              color: "#94a3b8",
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
              border: "1.5px solid #0a0a0a",
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
