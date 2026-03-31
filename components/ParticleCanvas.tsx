"use client"
import { useEffect, useRef } from "react"

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let rafId: number
    let W = 0, H = 0

    function resize() {
      W = canvas!.offsetWidth
      H = canvas!.offsetHeight
      canvas!.width = W
      canvas!.height = H
    }
    resize()

    const RGB = [61, 90, 42]
    const rgba = (a: number) => `rgba(${RGB[0]},${RGB[1]},${RGB[2]},${a})`
    const COUNT = 80
    const CONN_DIST = 110

    const pts = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      r:  1 + Math.random() * 1.5,
      a:  0.22 + Math.random() * 0.45,
    }))

    function loop() {
      rafId = requestAnimationFrame(loop)
      ctx!.clearRect(0, 0, W, H)

      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
      }

      // Connection lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < CONN_DIST) {
            ctx!.beginPath()
            ctx!.moveTo(pts[i].x, pts[i].y)
            ctx!.lineTo(pts[j].x, pts[j].y)
            ctx!.strokeStyle = rgba((1 - d / CONN_DIST) * 0.3)
            ctx!.lineWidth = 0.75
            ctx!.stroke()
          }
        }
      }

      // Dots
      for (const p of pts) {
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = rgba(p.a)
        ctx!.fill()
      }
    }

    loop()

    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "none" }}
    />
  )
}
