import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import Seo from '@/components/Seo'
import { SplitText, ease } from '@/components/motion'
import { revealDelay } from '@/components/PageTransition'
import { ArrowRight, Calendar, Clock, MapPin, Phone, Users } from '@/components/Icons'
import supabase from '@/utils/supabase'
import { site } from '@/data/site'
import { toKey } from '@/data/events'

const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8]

// Half-hour seatings from open until 30 minutes before close.
const SLOTS = (() => {
  const out = []
  for (let h = site.openHour; h < site.closeHour; h++) {
    out.push(`${String(h).padStart(2, '0')}:00`, `${String(h).padStart(2, '0')}:30`)
  }
  return out
})()

const to12h = (t) => {
  const [h, m] = t.split(':').map(Number)
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
}

const prettyDate = (key) => {
  if (!key) return ''
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

function quickDates() {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const friday = new Date(today)
  friday.setDate(today.getDate() + ((5 - today.getDay() + 7) % 7 || 7))
  return [
    { label: 'Today', key: toKey(today) },
    { label: 'Tomorrow', key: toKey(tomorrow) },
    { label: 'Riddim Friday', key: toKey(friday) },
  ]
}

function Step({ n, title, children }) {
  return (
    <fieldset className="border-t border-cream/10 py-8">
      <legend className="sr-only">{title}</legend>
      <div className="mb-5 flex items-center gap-4" aria-hidden="true">
        <span className="font-display text-sm italic text-sun">0{n}</span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">{title}</span>
      </div>
      {children}
    </fieldset>
  )
}

function Success({ booking, onReset }) {
  return (
    <motion.div
      className="flex flex-col items-center py-16 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
    >
      <svg viewBox="0 0 80 80" className="h-24 w-24">
        <motion.circle cx="40" cy="40" r="36" fill="none" stroke="#F6B91A" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease }} />
        <motion.path d="M24 41 l11 11 l21 -23" fill="none" stroke="#F6B91A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.7, ease }} />
      </svg>
      <h2 className="mt-8 font-display text-5xl">
        Yuh <span className="italic text-sun">booked!</span>
      </h2>
      <p className="mt-4 max-w-sm text-cream/70">
        Thanks, {booking.name.split(' ')[0]}. We&apos;ve saved a table and will email {booking.email} if anything changes.
      </p>
      <dl className="mt-10 grid w-full max-w-md grid-cols-3 divide-x divide-cream/10 rounded-2xl border border-cream/10 bg-ink-800 py-5 text-sm">
        <div>
          <dt className="text-cream/50">Guests</dt>
          <dd className="mt-1 font-display text-2xl">{booking.guests}</dd>
        </div>
        <div>
          <dt className="text-cream/50">Date</dt>
          <dd className="mt-1 font-display text-2xl">{booking.date.slice(5).replace('-', '/')}</dd>
        </div>
        <div>
          <dt className="text-cream/50">Time</dt>
          <dd className="mt-1 font-display text-2xl">{to12h(booking.time)}</dd>
        </div>
      </dl>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/menu" className="btn-primary">Preview the menu</Link>
        <button type="button" onClick={onReset} className="btn-ghost">Make another booking</button>
      </div>
    </motion.div>
  )
}

export default function Reservation() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', date: '', time: '', guests: 2 })
  const [taken, setTaken] = useState({})
  const [checking, setChecking] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [booked, setBooked] = useState(null)
  const [now, setNow] = useState(null)
  const quick = useMemo(() => (now ? quickDates() : []), [now])
  const d = revealDelay()

  // Date-dependent values are computed on the client only to avoid hydration mismatches.
  useEffect(() => setNow(new Date()), [])

  useEffect(() => {
    const q = router.query.date
    if (typeof q === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(q)) setForm((f) => ({ ...f, date: q }))
  }, [router.query.date])

  // Load how many bookings each slot already has for the chosen date.
  useEffect(() => {
    if (!form.date) return
    let cancelled = false
    setChecking(true)
    supabase
      .from('reservations')
      .select('time')
      .eq('date', form.date)
      .then(({ data, error: err }) => {
        if (cancelled) return
        if (err) {
          console.error('Error loading availability:', err)
          setTaken({})
        } else {
          const counts = {}
          data.forEach((r) => {
            const t = String(r.time).slice(0, 5)
            counts[t] = (counts[t] || 0) + 1
          })
          setTaken(counts)
        }
        setChecking(false)
      })
    return () => {
      cancelled = true
    }
  }, [form.date])

  const todayKey = now ? toKey(now) : ''
  const isPast = (slot) => {
    if (!now || form.date !== todayKey) return false
    const [h, m] = slot.split(':').map(Number)
    return h * 60 + m <= now.getHours() * 60 + now.getMinutes()
  }
  const isFull = (slot) => (taken[slot] || 0) >= site.slotCapacity

  const set = (key, value) => {
    setError('')
    setForm((f) => ({ ...f, [key]: value, ...(key === 'date' ? { time: '' } : {}) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.date || !form.time) {
      setError('Pick a date and a time to continue.')
      return
    }
    setSubmitting(true)
    try {
      // Re-check capacity right before inserting in case the slot filled up meanwhile.
      const { count, error: countErr } = await supabase
        .from('reservations')
        .select('*', { count: 'exact', head: true })
        .eq('date', form.date)
        .eq('time', form.time)
      if (countErr) throw countErr
      if ((count ?? 0) >= site.slotCapacity) {
        setTaken((t) => ({ ...t, [form.time]: site.slotCapacity }))
        setError('That time just filled up. Please choose another slot.')
        return
      }

      const { error: insertErr } = await supabase.from('reservations').insert([
        {
          name: form.name,
          email: form.email,
          date: form.date,
          time: form.time,
          number_of_guest: form.guests,
        },
      ])
      if (insertErr) throw insertErr

      setBooked(form)
      setForm({ name: '', email: '', date: '', time: '', guests: 2 })
    } catch (err) {
      console.error('Error saving reservation:', err)
      setError(`We couldn't reach our booking system. Please try again or call us on ${site.phone}.`)
    } finally {
      setSubmitting(false)
    }
  }

  const ready = form.name && form.email && form.date && form.time

  return (
    <>
      <Seo title="Reservations" description="Book a table at Reggae Flavors, Manor Park Plaza, Kingston. Open daily 11 AM – 9 PM." />

      <section className="relative min-h-screen lg:grid lg:grid-cols-12">
        {/* Visual panel */}
        <div className="relative h-[55vh] overflow-hidden lg:sticky lg:top-0 lg:col-span-5 lg:h-screen">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: d - 0.4 }}
          >
            <Image src="/images/jerk.webp" alt="Jerk chicken with fresh lime" fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10 lg:bg-gradient-to-r lg:from-transparent lg:via-ink/20 lg:to-ink" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/80 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <p className="eyebrow">Reservations</p>
            <h1 className="h-display mt-5 text-5xl sm:text-7xl">
              <SplitText text="Save us" animateOnMount delay={d} />{' '}
              <SplitText text="a seat." animateOnMount delay={d + 0.15} className="italic text-sun" />
            </h1>
            <motion.ul
              className="mt-8 grid gap-3 text-sm text-cream/80 sm:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: d + 0.4, ease }}
            >
              <li className="flex items-center gap-2"><Clock width={16} height={16} className="text-sun" /> Daily 11 AM – 9 PM</li>
              <li className="flex items-center gap-2"><MapPin width={16} height={16} className="text-sun" /> {site.addressShort}</li>
              <li className="flex items-center gap-2"><Phone width={16} height={16} className="text-sun" /> <a href={site.phoneHref} className="hover:text-sun">{site.phone}</a></li>
              <li className="flex items-center gap-2"><Users width={16} height={16} className="text-sun" /> 9+ guests? Give us a call</li>
            </motion.ul>
          </div>
        </div>

        {/* Form panel */}
        <div className="px-5 pb-24 pt-10 sm:px-10 lg:col-span-7 lg:px-16 lg:pt-32">
          <AnimatePresence mode="wait">
            {booked ? (
              <Success key="success" booking={booked} onReset={() => setBooked(null)} />
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="mx-auto max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.7, ease, delay: booked === null ? 0 : 0.2 }}
              >
                <p className="mb-2 text-cream/60">Book in under a minute. We hold tables for 15 minutes past your time.</p>

                <Step n={1} title="How many guests?">
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Number of guests">
                    {PARTY_SIZES.map((n) => (
                      <button
                        key={n}
                        type="button"
                        role="radio"
                        aria-checked={form.guests === n}
                        onClick={() => set('guests', n)}
                        className="chip h-12 min-w-12 text-base"
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </Step>

                <Step n={2} title="Which day?">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {quick.map((q) => (
                      <button key={q.label} type="button" aria-pressed={form.date === q.key} onClick={() => set('date', q.key)} className="chip">
                        {q.label}
                      </button>
                    ))}
                  </div>
                  <label className="relative block max-w-xs">
                    <span className="sr-only">Date</span>
                    <Calendar className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" width={18} height={18} />
                    <input
                      type="date"
                      required
                      min={todayKey}
                      value={form.date}
                      onChange={(e) => set('date', e.target.value)}
                      className="field pl-12"
                    />
                  </label>
                  {form.date && <p className="mt-3 text-sm text-sun">{prettyDate(form.date)}</p>}
                </Step>

                <Step n={3} title="What time?">
                  {!form.date ? (
                    <p className="text-sm text-cream/50">Choose a date to see available times.</p>
                  ) : (
                    <motion.div
                      key={form.date}
                      className="grid grid-cols-3 gap-2 sm:grid-cols-5"
                      role="radiogroup"
                      aria-label="Time"
                      aria-busy={checking}
                      initial="hidden"
                      animate="show"
                      variants={{ show: { transition: { staggerChildren: 0.02 } } }}
                    >
                      {SLOTS.map((slot) => {
                        const disabled = isPast(slot) || isFull(slot)
                        return (
                          <motion.button
                            key={slot}
                            type="button"
                            role="radio"
                            aria-checked={form.time === slot}
                            disabled={disabled}
                            onClick={() => set('time', slot)}
                            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                            className="chip text-center disabled:cursor-not-allowed disabled:line-through disabled:opacity-30"
                          >
                            {to12h(slot)}
                          </motion.button>
                        )
                      })}
                    </motion.div>
                  )}
                </Step>

                <Step n={4} title="Your details">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="label">Full name</label>
                      <input id="name" required autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} className="field" placeholder="Bob Marley" />
                    </div>
                    <div>
                      <label htmlFor="email" className="label">Email</label>
                      <input id="email" type="email" required autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} className="field" placeholder="you@example.com" />
                    </div>
                  </div>
                </Step>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      role="alert"
                      className="mb-6 rounded-xl border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-ember"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <div className="sticky bottom-4 z-10 flex flex-col gap-4 rounded-2xl border border-cream/10 bg-ink-700/90 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-cream/70">
                    <span className="font-semibold text-cream">{form.guests} {form.guests === 1 ? 'guest' : 'guests'}</span>
                    {form.date && <> · {prettyDate(form.date)}</>}
                    {form.time && <> · {to12h(form.time)}</>}
                  </p>
                  <button type="submit" disabled={submitting || !ready} className="btn-primary group shrink-0">
                    {submitting ? 'Booking…' : 'Confirm booking'}
                    {!submitting && <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
