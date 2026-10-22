import Link from 'next/link'

// RF monogram inside a record groove, drawn in SVG so it scales and animates crisply.
export function Monogram({ className = 'h-10 w-10' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="23" fill="#0C0E0A" stroke="#F6B91A" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="18" fill="none" stroke="#F5EEDF" strokeOpacity="0.15" />
      <circle cx="24" cy="24" r="14" fill="none" stroke="#F5EEDF" strokeOpacity="0.1" />
      <path d="M6 24 A18 18 0 0 1 24 6" fill="none" stroke="#1F8A4C" strokeWidth="2" strokeLinecap="round" />
      <text
        x="24"
        y="30"
        textAnchor="middle"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontWeight="700"
        fontSize="17"
        fill="#F6B91A"
      >
        RF
      </text>
    </svg>
  )
}

export default function Logo({ onClick }) {
  return (
    <Link href="/" onClick={onClick} className="group flex items-center gap-3" aria-label="Reggae Flavors home">
      <span className="transition-transform duration-700 group-hover:rotate-[360deg]">
        <Monogram />
      </span>
      <span className="font-display text-xl leading-none tracking-tight">
        Reggae<span className="text-sun"> Flavors</span>
      </span>
    </Link>
  )
}
