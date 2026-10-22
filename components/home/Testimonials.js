import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from '../Icons'
import { Reveal, ease } from '../motion'

const reviews = [
  { quote: 'Absolutely delicious! The jerk chicken is a must-try. Smoky, fiery and so juicy.', name: 'John D.', meta: 'Kingston' },
  { quote: 'Reggae Flavors takes me back to Jamaica with every bite. Amazing food, even better vibes.', name: 'Jane S.', meta: 'Visiting from Toronto' },
  { quote: 'That oxtail could make a grown man cry. Friday night with the live band is unbeatable.', name: 'Andre M.', meta: 'Regular since day one' },
  { quote: 'The rum punch is dangerous in the best way. Staff treated us like family.', name: 'Simone R.', meta: 'Birthday dinner' },
]

export default function Testimonials() {
  const [[index, dir], setIndex] = useState([0, 1])
  const [paused, setPaused] = useState(false)

  const go = (step) => setIndex(([i]) => [(i + step + reviews.length) % reviews.length, step])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => go(1), 6000)
    return () => clearInterval(t)
  }, [paused])

  const r = reviews[index]

  return (
    <section
      className="relative overflow-hidden bg-sun py-28 text-ink sm:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <svg
        viewBox="0 0 64 48"
        className="pointer-events-none absolute right-6 top-10 w-48 text-ink/10 sm:right-16 sm:w-72"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0 48V28C0 12 8 2 24 0l2 7c-8 2-12 7-12 15h12v26H0Zm36 0V28c0-16 8-26 24-28l2 7c-8 2-12 7-12 15h12v26H36Z" />
      </svg>

      <div className="container-x relative grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow !text-ink">Word on the street</p>
            <div className="mt-6 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} width={22} height={22} />
              ))}
            </div>
            <p className="mt-3 text-sm font-semibold">4.9 average from our guests</p>
          </Reveal>
        </div>

        <div className="lg:col-span-8" aria-live="polite">
          <div className="relative min-h-[260px] sm:min-h-[220px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: dir * -60, filter: 'blur(8px)' }}
                transition={{ duration: 0.6, ease }}
              >
                <blockquote className="font-display text-2xl font-medium leading-snug sm:text-4xl">{r.quote}</blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink font-display text-lg text-sun">
                    {r.name[0]}
                  </span>
                  <span>
                    <span className="block font-semibold">{r.name}</span>
                    <span className="text-sm text-ink/75">{r.meta}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-sun">
                <ChevronLeft />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next review" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-sun">
                <ChevronRight />
              </button>
            </div>
            <div className="flex flex-1 gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex([i, i > index ? 1 : -1])}
                  aria-label={`Show review ${i + 1}`}
                  className="relative h-1 flex-1 overflow-hidden rounded-full bg-ink/15"
                >
                  {i === index && (
                    <motion.span
                      key={`${index}-${paused}`}
                      className="absolute inset-y-0 left-0 bg-ink"
                      initial={{ width: paused ? '100%' : '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: paused ? 0 : 6, ease: 'linear' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
