"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [trails, setTrails] = useState<{ x: number; y: number; opacity: number }[]>([])
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    if (isMobile) return

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Update trails with delay
      setTrails((prev) => {
        const newTrails = [...prev]
        newTrails.unshift({ x: e.clientX, y: e.clientY, opacity: 0.6 })
        return newTrails.slice(0, 5) // Keep only 5 trail elements
      })
    }

    const handleMouseDown = () => setClicking(true)
    const handleMouseUp = () => setClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest(".video-card")) {
        setHovering(true)
      }
    }

    const handleMouseOut = () => {
      setHovering(false)
    }

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [isMobile])

  // Fade out trails
  useEffect(() => {
    if (isMobile || trails.length === 0) return

    const interval = setInterval(() => {
      setTrails((prev) =>
        prev
          .map((trail, i) => ({
            ...trail,
            opacity: trail.opacity - 0.1 * (i + 1),
          }))
          .filter((trail) => trail.opacity > 0),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [trails, isMobile])

  if (isMobile) return null

  return (
    <>
      {trails.map((trail, i) => (
        <div
          key={i}
          className="cursor-trail"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            opacity: trail.opacity,
            transform: `scale(${0.8 - i * 0.15})`,
            transition: "transform 0.2s ease-out",
          }}
        />
      ))}

      <div
        className="custom-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className={`cursor-dot ${hovering ? "bg-primary" : ""}`} />
        <div className={`cursor-outline ${clicking ? "clicking" : ""} ${hovering ? "border-primary w-12 h-12" : ""}`} />
      </div>
    </>
  )
}

