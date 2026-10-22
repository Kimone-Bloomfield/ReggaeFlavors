import { motion, useScroll, useTransform } from 'framer-motion'

// A spinning 45 with circular type around it, a nod to the sound-system culture.
export function VinylBadge({ text = 'Jamaican Kitchen • Rum Bar • Live Riddims • ', className = '' }) {
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text fontSize="12.5" letterSpacing="2.6" fill="#F5EEDF" style={{ textTransform: 'uppercase', fontWeight: 600 }}>
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-[22%] animate-spin-slow rounded-full shadow-2xl" style={{ animationDuration: '4s' }}>
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="50" fill="#0C0E0A" />
          {[44, 39, 34, 29].map((r) => (
            <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#F5EEDF" strokeOpacity="0.08" />
          ))}
          <path d="M50 6 A44 44 0 0 1 94 50" fill="none" stroke="#F5EEDF" strokeOpacity="0.18" strokeWidth="6" />
          <circle cx="50" cy="50" r="18" fill="#F6B91A" />
          <path d="M32 50 a18 18 0 0 1 36 0" fill="#1F8A4C" />
          <circle cx="50" cy="50" r="2.5" fill="#0C0E0A" />
        </svg>
      </div>
    </div>
  )
}

// Bouncing bars like a sound system's level meter.
export function Equalizer({ bars = 5, className = 'h-6' }) {
  return (
    <span className={`inline-flex items-end gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="w-[3px] origin-bottom animate-eq rounded-full bg-sun"
          style={{ height: '100%', animationDelay: `${(i * 0.17) % 0.9}s`, animationDuration: `${0.9 + (i % 3) * 0.25}s` }}
        />
      ))}
    </span>
  )
}

// Hand-drawn style palm frond, parallaxed for depth.
export function Frond({ className = '', flip = false, speed = 80 }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1500], [0, -speed])
  const rotate = useTransform(scrollY, [0, 1500], [0, flip ? -8 : 8])
  return (
    <motion.svg
      viewBox="0 0 200 300"
      className={`pointer-events-none absolute ${className}`}
      style={{ y, rotate, scaleX: flip ? -1 : 1 }}
      aria-hidden="true"
    >
      <path d="M100 300 C100 200 95 120 70 20" stroke="currentColor" strokeWidth="3" fill="none" />
      {Array.from({ length: 14 }).map((_, i) => {
        const t = i / 14
        const y0 = 280 - t * 250
        const x0 = 100 - t * 28
        const len = 70 - t * 30
        return (
          <g key={i}>
            <path d={`M${x0} ${y0} q ${-len * 0.6} ${-10} ${-len} ${20 + t * 10}`} stroke="currentColor" strokeWidth="2" fill="none" />
            <path d={`M${x0} ${y0} q ${len * 0.6} ${-14} ${len} ${12 + t * 10}`} stroke="currentColor" strokeWidth="2" fill="none" />
          </g>
        )
      })}
    </motion.svg>
  )
}
