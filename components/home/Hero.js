import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import Embers from '../Embers'
import { VinylBadge } from '../Decor'
import { SplitText, ease } from '../motion'
import { revealDelay } from '../PageTransition'
import { ArrowRight } from '../Icons'
import { site } from '@/data/site'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const d = revealDelay()

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-32 sm:pb-20">
      {/* Ken Burns photo with scroll parallax */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.25 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1], delay: d - 0.6 }}
        >
          <Image
            src="/images/jerk-table.webp"
            alt="Jerk chicken, fried plantain, rice and peas and rum punch on a bright blue table"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(228,87,46,0.25),transparent_70%)]" />
      <Embers />

      <motion.div className="container-x relative z-10" style={{ y: textY, opacity: fade }}>
        <motion.div
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-cream/15 bg-ink/40 px-4 py-2 text-xs backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: d }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
          </span>
          Open today · 11 AM – 9 PM · {site.addressShort}
        </motion.div>

        <h1 className="h-display text-[12.5vw] sm:text-[11vw] lg:text-[9.5rem]">
          <span className="block">
            <SplitText text="Taste the island." animateOnMount delay={d + 0.1} />
          </span>
          <span className="block italic text-sun">
            <SplitText text="Feel the riddim." animateOnMount delay={d + 0.35} />
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            className="max-w-md"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: d + 0.7 }}
          >
            <p className="text-lg leading-relaxed text-cream/75">
              Pimento-smoked jerk, slow-braised oxtail and ice-cold rum punch, served with the warmth of a Kingston
              yard.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/reservation" className="btn-primary group">
                Reserve a table
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/menu" className="btn-ghost">
                Explore the menu
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hidden sm:block"
            initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease, delay: d + 0.9 }}
          >
            <VinylBadge className="w-40 lg:w-48" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-eyebrow text-cream/50 md:flex"
        style={{ opacity: fade }}
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-cream/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-sun"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  )
}
