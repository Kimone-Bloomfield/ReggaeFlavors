import { useEffect, useRef } from 'react'

// Glowing embers drifting up from the jerk pit. Pauses off-screen and for reduced motion.
export default function Embers({ count = 70, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    const colors = ['246,185,26', '228,87,46', '255,214,120']
    let width = 0
    let height = 0
    let raf = 0
    let visible = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawn = (initial = false) => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 10,
      r: Math.random() * 2.2 + 0.4,
      vy: Math.random() * 0.7 + 0.25,
      sway: Math.random() * 1.5 + 0.5,
      phase: Math.random() * Math.PI * 2,
      life: Math.random() * 0.6 + 0.4,
      color: colors[(Math.random() * colors.length) | 0],
    })

    resize()
    const particles = Array.from({ length: count }, () => spawn(true))

    const tick = (t) => {
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'
      for (const p of particles) {
        p.y -= p.vy
        p.x += Math.sin(t / 1000 * p.sway + p.phase) * 0.35
        const fade = Math.max(0, Math.min(1, p.y / height)) * p.life
        const flicker = 0.75 + Math.sin(t / 120 + p.phase) * 0.25
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        g.addColorStop(0, `rgba(${p.color},${fade * flicker})`)
        g.addColorStop(1, `rgba(${p.color},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fill()
        if (p.y < -10) Object.assign(p, spawn())
      }
      if (visible) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(tick)
    })
    io.observe(canvas)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />
}
