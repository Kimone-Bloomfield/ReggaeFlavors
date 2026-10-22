// Shown when the Supabase `events` table is empty or unreachable.
// Dates are generated relative to today so the calendar never looks stale.
const RECURRING = [
  { weekday: 5, title: 'Riddim Fridays', time: '7:00 PM', description: 'Live reggae & rocksteady band, rum punch specials all night.' },
  { weekday: 0, title: 'Sunday Soup & Sound System', time: '1:00 PM', description: 'Selector on the decks, family-style soups and Sunday dinner.' },
]

export function fallbackEvents(monthsAhead = 2) {
  const out = []
  const start = new Date()
  start.setDate(1)
  const end = new Date(start.getFullYear(), start.getMonth() + monthsAhead, 0)
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const match = RECURRING.find((r) => r.weekday === d.getDay())
    if (match) out.push({ ...match, date: toKey(d) })
  }
  return out
}

export const pastEvents = [
  { src: '/images/event1.jpg', caption: 'Jamaica Night, live with the house band' },
  { src: '/images/event2.jpg', caption: 'The rum bar after hours' },
  { src: '/images/reservation.jpg', caption: 'Our dining room' },
  { src: '/images/dish.jpeg', caption: 'Independence Day family platter' },
]

// Local-time YYYY-MM-DD (toISOString shifts to UTC and can land on the wrong day).
export function toKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
