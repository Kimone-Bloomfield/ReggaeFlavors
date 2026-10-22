import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import Seo from '@/components/Seo'
import PageHero from '@/components/PageHero'
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Close, Music } from '@/components/Icons'
import { Reveal, SplitText, ease, fadeUp, staggerParent } from '@/components/motion'
import { Equalizer } from '@/components/Decor'
import supabase from '@/utils/supabase'
import { fallbackEvents, pastEvents, toKey } from '@/data/events'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const normalise = (e) => ({
  title: e.title || e.name || 'Live at Reggae Flavors',
  time: e.time || '',
  description: e.description || '',
  date: String(e.date).split('T')[0],
})

const parseKey = (key) => {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function MonthCalendar({ eventsByDate, selected, onSelect }) {
  const [view, setView] = useState(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })
  const [dir, setDir] = useState(1)
  const todayKey = toKey(new Date())

  const days = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1)
    const count = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate()
    const cells = Array.from({ length: first.getDay() }, () => null)
    for (let i = 1; i <= count; i++) cells.push(new Date(view.getFullYear(), view.getMonth(), i))
    return cells
  }, [view])

  const shift = (n) => {
    setDir(n)
    setView((v) => new Date(v.getFullYear(), v.getMonth() + n, 1))
  }

  return (
    <div className="rounded-[2rem] border border-cream/10 bg-ink-800 p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.h3
            key={view.toISOString()}
            className="font-display text-3xl"
            initial={{ opacity: 0, y: dir * 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: dir * -12 }}
            transition={{ duration: 0.3 }}
          >
            {view.toLocaleString('en-US', { month: 'long' })}{' '}
            <span className="italic text-sun">{view.getFullYear()}</span>
          </motion.h3>
        </AnimatePresence>
        <div className="flex gap-2">
          <button type="button" onClick={() => shift(-1)} aria-label="Previous month" className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 hover:border-sun hover:text-sun">
            <ChevronLeft width={18} height={18} />
          </button>
          <button type="button" onClick={() => shift(1)} aria-label="Next month" className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 hover:border-sun hover:text-sun">
            <ChevronRight width={18} height={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wider text-cream/40">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-2">{d}</div>
        ))}
      </div>

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={view.toISOString()}
          className="grid grid-cols-7 gap-1"
          initial={{ opacity: 0, x: dir * 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -30 }}
          transition={{ duration: 0.35, ease }}
        >
          {days.map((date, i) => {
            if (!date) return <div key={`blank-${i}`} />
            const key = toKey(date)
            const has = !!eventsByDate[key]
            const isSel = key === selected
            const isToday = key === todayKey
            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelect(key)}
                aria-pressed={isSel}
                aria-label={`${date.toDateString()}${has ? ', has events' : ''}`}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm transition-colors ${
                  isSel ? 'text-ink' : has ? 'text-cream hover:bg-cream/10' : 'text-cream/45 hover:bg-cream/5'
                }`}
              >
                {isSel && <motion.span layoutId="cal-sel" className="absolute inset-0 rounded-xl bg-sun" transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }} />}
                <span className={`relative ${isToday && !isSel ? 'font-bold text-sun' : ''}`}>{date.getDate()}</span>
                {has && <span className={`relative mt-1 h-1.5 w-1.5 rounded-full ${isSel ? 'bg-ink' : 'bg-leaf'}`} />}
              </button>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function Lightbox({ index, onClose, onStep }) {
  useEffect(() => {
    if (index === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, onClose, onStep])

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <motion.figure
            key={index}
            className="relative h-[75vh] w-full max-w-5xl"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={pastEvents[index].src} alt={pastEvents[index].caption} fill sizes="100vw" className="object-contain" />
            <figcaption className="absolute -bottom-10 inset-x-0 text-center text-sm text-cream/70">{pastEvents[index].caption}</figcaption>
          </motion.figure>
          <button type="button" onClick={onClose} aria-label="Close" className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 hover:bg-sun hover:text-ink">
            <Close />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); onStep(-1) }} aria-label="Previous photo" className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 hover:bg-sun hover:text-ink">
            <ChevronLeft />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); onStep(1) }} aria-label="Next photo" className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 hover:bg-sun hover:text-ink">
            <ChevronRight />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(() => toKey(new Date()))
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    let cancelled = false
    let settled = false
    const useFallback = () => {
      if (cancelled || settled) return
      setEvents(fallbackEvents())
      setLoading(false)
    }
    // The client retries failed requests, so don't leave the page empty while it does.
    const timer = setTimeout(useFallback, 2500)

    ;(async () => {
      try {
        const { data, error } = await supabase.from('events').select('*')
        if (error) throw error
        if (!cancelled && data?.length) {
          settled = true
          setEvents(data.map(normalise))
          setLoading(false)
        } else useFallback()
      } catch (err) {
        console.error('Error fetching events:', err.message)
        useFallback()
      }
    })()
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

  const eventsByDate = useMemo(() => {
    const map = {}
    events.forEach((e) => {
      ;(map[e.date] ||= []).push(e)
    })
    return map
  }, [events])

  const upcoming = useMemo(() => {
    const today = toKey(new Date())
    return events.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 5)
  }, [events])

  const dayEvents = eventsByDate[selected] || []
  const stepPhoto = (n) => setPhoto((i) => (i + n + pastEvents.length) % pastEvents.length)

  return (
    <>
      <Seo title="Events" description="Live reggae on Riddim Fridays, Sunday sound system sessions and special nights at Reggae Flavors." />
      <PageHero
        eyebrow="Events & live music"
        title="Where the bassline"
        accent="meets the table."
        intro="Live bands, sound system Sundays and the occasional Independence Day bashment. Here's what's coming up."
        image="/images/reservation.jpg"
      >
        <div className="mt-8 flex items-center gap-3 text-sm text-cream/70">
          <Equalizer className="h-5" /> Riddim Fridays · 7 PM until late
        </div>
      </PageHero>

      {/* Upcoming list */}
      <section className="container-x py-24">
        <div className="flex items-end justify-between gap-6">
          <h2 className="h-display text-5xl sm:text-6xl">
            <SplitText text="Coming" /> <SplitText text="up next" className="italic text-sun" delay={0.1} />
          </h2>
        </div>

        <motion.ul
          className="mt-12 divide-y divide-cream/10 border-y border-cream/10"
          variants={staggerParent(0.08)}
          initial="hidden"
          animate={loading ? 'hidden' : 'show'}
        >
          {upcoming.map((e) => {
            const d = parseKey(e.date)
            return (
              <motion.li key={`${e.date}-${e.title}`} variants={fadeUp}>
                <div className="group grid items-center gap-6 py-8 transition-colors sm:grid-cols-12">
                  <div className="flex items-baseline gap-3 sm:col-span-2 sm:block">
                    <span className="font-display text-6xl font-light leading-none transition-colors group-hover:text-sun">
                      {String(d.getDate()).padStart(2, '0')}
                    </span>
                    <span className="block text-xs uppercase tracking-eyebrow text-cream/50 sm:mt-2">
                      {d.toLocaleString('en-US', { month: 'short', weekday: 'short' })}
                    </span>
                  </div>
                  <div className="sm:col-span-7">
                    <h3 className="font-display text-3xl">{e.title}</h3>
                    <p className="mt-2 text-cream/60">{e.description}</p>
                    {e.time && (
                      <p className="mt-3 inline-flex items-center gap-2 text-sm text-sun">
                        <Clock width={16} height={16} /> {e.time}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-3 sm:text-right">
                    <Link href={{ pathname: '/reservation', query: { date: e.date } }} className="btn-ghost group/btn">
                      Reserve <ArrowRight width={16} height={16} className="transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.li>
            )
          })}
          {!loading && upcoming.length === 0 && <li className="py-10 text-cream/60">No upcoming events yet. Check back soon.</li>}
        </motion.ul>
      </section>

      {/* Calendar */}
      <section className="bg-ink-800/50 py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <MonthCalendar eventsByDate={eventsByDate} selected={selected} onSelect={setSelected} />
          </div>
          <div className="lg:col-span-5">
            <p className="eyebrow">On the day</p>
            <h3 className="mt-4 font-display text-4xl">
              {parseKey(selected).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
            <div className="mt-8 min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease }}
                  className="space-y-4"
                >
                  {dayEvents.length ? (
                    dayEvents.map((e) => (
                      <div key={e.title} className="rounded-2xl border border-leaf/40 bg-leaf/10 p-6">
                        <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-leaf">
                          <Music width={14} height={14} /> {e.time || 'All day'}
                        </p>
                        <p className="mt-2 font-display text-2xl">{e.title}</p>
                        <p className="mt-2 text-sm text-cream/70">{e.description}</p>
                        <Link href={{ pathname: '/reservation', query: { date: e.date } }} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sun">
                          Book this night <ArrowRight width={14} height={14} />
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-cream/15 p-6 text-cream/60">
                      No special event, just great food and a good selection on the speakers. Kitchen open 11 AM – 9 PM.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container-x py-24">
        <Reveal>
          <p className="eyebrow">From the archive</p>
        </Reveal>
        <h2 className="h-display mt-5 text-5xl sm:text-6xl">
          <SplitText text="Nights to" /> <SplitText text="remember." className="italic text-sun" delay={0.1} />
        </h2>
        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4">
          {pastEvents.map((p, i) => (
            <Reveal
              key={p.src}
              delay={i * 0.08}
              className={i === 0 ? 'col-span-2 row-span-2' : i === 3 ? 'col-span-2' : ''}
            >
              <button
                type="button"
                onClick={() => setPhoto(i)}
                className="group relative block h-full w-full overflow-hidden rounded-3xl"
                aria-label={`Open photo: ${p.caption}`}
              >
                <Image src={p.src} alt={p.caption} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 right-4 translate-y-4 text-left text-sm opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {p.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <Lightbox index={photo} onClose={() => setPhoto(null)} onStep={stepPhoto} />
    </>
  )
}
