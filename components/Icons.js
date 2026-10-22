const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const ArrowRight = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const ArrowUpRight = (p) => (
  <svg {...base} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
)
export const ChevronLeft = (p) => (
  <svg {...base} {...p}><path d="m15 18-6-6 6-6" /></svg>
)
export const ChevronRight = (p) => (
  <svg {...base} {...p}><path d="m9 18 6-6-6-6" /></svg>
)
export const Close = (p) => (
  <svg {...base} {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>
)
export const Search = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
)
export const MapPin = (p) => (
  <svg {...base} {...p}><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" /><circle cx="12" cy="9" r="2.5" /></svg>
)
export const Phone = (p) => (
  <svg {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
)
export const Mail = (p) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
)
export const Clock = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
)
export const Users = (p) => (
  <svg {...base} {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6" /></svg>
)
export const Calendar = (p) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
)
export const Flame = (p) => (
  <svg {...base} {...p}><path d="M12 22c4 0 7-2.8 7-7 0-4.5-4-7-5-11-2 2-3 4-3 6-1-1-2-1.5-2-3-2 2-4 5-4 8 0 4.2 3 7 7 7Z" /></svg>
)
export const Music = (p) => (
  <svg {...base} {...p}><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></svg>
)
export const Glass = (p) => (
  <svg {...base} {...p}><path d="M6 3h12l-1.5 8a4.5 4.5 0 0 1-9 0L6 3ZM12 15.5V21M8 21h8" /></svg>
)
export const Leaf = (p) => (
  <svg {...base} {...p}><path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15M5 19l7-7" /></svg>
)
export const Check = (p) => (
  <svg {...base} {...p}><path d="m5 12 5 5L20 7" /></svg>
)
export const Star = (p) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}><path d="m12 2.5 2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6L2.5 9.3l6.6-.8L12 2.5Z" /></svg>
)
export const Instagram = (p) => (
  <svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></svg>
)
export const Facebook = (p) => (
  <svg {...base} {...p}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z" /></svg>
)
export const XLogo = (p) => (
  <svg {...base} {...p}><path d="M4 4l16 16M20 4 4 20" /></svg>
)

// Scotch bonnet pepper glyph for the spice meter
export const Pepper = ({ filled = true, ...p }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path
      d="M12 6c-4 0-7 3-7 7.5S8 21 12 21s7-3 7-7.5S16 6 12 6Z"
      fill={filled ? '#E4572E' : 'none'}
      stroke={filled ? '#E4572E' : 'currentColor'}
      strokeWidth="1.5"
      opacity={filled ? 1 : 0.35}
    />
    <path d="M12 6c0-2 1-3 3-3.5" stroke={filled ? '#1F8A4C' : 'currentColor'} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity={filled ? 1 : 0.35} />
  </svg>
)
