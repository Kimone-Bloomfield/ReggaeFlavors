import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Music } from '../Icons'
import { Reveal, SplitText } from '../motion'
import { Equalizer } from '../Decor'

export default function BookingCta() {
  return (
    <section className="py-28 sm:py-36">
      <div className="container-x grid gap-6 lg:grid-cols-5">
        {/* Events teaser */}
        <Reveal className="lg:col-span-2">
          <Link href="/events" className="group relative block h-full min-h-[420px] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/event2.jpg"
              alt="The rum bar lit up at night"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover transition-transform duration-[1.4s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-leaf px-3 py-1 text-[13px] font-semibold uppercase tracking-wider">
                <Music width={14} height={14} /> Every Friday
              </span>
              <h3 className="mt-4 font-display text-4xl leading-tight">
                Riddim Fridays, <span className="text-sun">live.</span>
              </h3>
              <p className="mt-2 text-cream/80">See what&apos;s on this month</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sun">
                View events <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Reservation CTA */}
        <Reveal delay={0.1} className="lg:col-span-3">
          <div className="relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-[2rem] bg-leaf-deep p-8 sm:p-12">
            <motion.div
              className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sun/30 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-leaf/50 blur-3xl"
              animate={{ scale: [1.2, 1, 1.2] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative flex items-center gap-3 text-sm text-cream/80">
              <Equalizer className="h-4" />
              Tables fill fast on weekends
            </div>

            <div className="relative">
              <h2 className="h-display text-4xl sm:text-6xl">
                <SplitText text="Come hungry." /> <SplitText text="Leave family." className="text-sun" delay={0.15} />
              </h2>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="/reservation" className="btn-primary group">
                  <Calendar width={18} height={18} /> Reserve your table
                  <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <span className="text-sm text-cream/75">Groups up to 8 online · larger parties call us</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
