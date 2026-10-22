import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Flame, Glass, Music } from '../Icons'
import { Reveal, SplitText, fadeUp, staggerParent } from '../motion'
import { Equalizer } from '../Decor'

const pillars = [
  {
    Icon: Flame,
    title: 'The Pimento Pit',
    body: 'Jerk is a method, not a sauce. Our chicken smokes low and slow over pimento wood for that deep, sweet, fiery bark.',
    color: 'text-ember',
  },
  {
    Icon: Glass,
    title: 'The Rum Bar',
    body: 'Overproof punches, spiked sorrel and an aged-rum flight that tours the island, one sip at a time.',
    color: 'text-sun',
  },
  {
    Icon: Music,
    title: 'Live Riddims',
    body: 'Live bands on Friday, a sound system for Sunday soup, and a curated selection of roots, rocksteady and lovers rock all week.',
    color: 'text-leaf',
  },
]

export function Pillars() {
  return (
    <section className="py-28 sm:py-36">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow">The experience</p>
          </Reveal>
          <h2 className="h-display mt-5 text-5xl sm:text-6xl">
            <SplitText text="More than dinner." /> <SplitText text="It's a whole mood." className="italic text-sun" delay={0.15} />
          </h2>
        </div>

        <motion.div
          className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-cream/10 bg-cream/10 md:grid-cols-3"
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {pillars.map(({ Icon, title, body, color }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group relative overflow-hidden bg-ink p-10 transition-colors duration-500 hover:bg-ink-700"
            >
              <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-current ${color} opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-20`} />
              <span className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-cream/10 ${color}`}>
                <Icon width={26} height={26} />
              </span>
              <h3 className="mt-8 font-display text-3xl">{title}</h3>
              <p className="mt-4 leading-relaxed text-cream/65">{body}</p>
              {title === 'Live Riddims' && <Equalizer className="mt-6 h-5" bars={7} />}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Full-bleed dining room with the "Live, Laugh, Love" sign from our wall.
export function DiningRoom() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.1])

  const lines = [
    { a: 'Live', b: 'every moment.' },
    { a: 'Laugh', b: 'every day.' },
    { a: 'Love', b: 'beyond words.' },
  ]

  return (
    <section ref={ref} className="relative flex min-h-[110vh] items-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image src="/images/reservation.jpg" alt="Our colourful dining room with painted tables and lanterns" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-ink/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0C0E0A_85%)]" />

      <div className="container-x relative text-center">
        <Reveal>
          <p className="eyebrow justify-center">Written on our wall</p>
        </Reveal>
        <div className="mt-10 space-y-2">
          {lines.map((l, i) => (
            <p key={l.a} className="h-display text-5xl sm:text-7xl lg:text-8xl">
              <SplitText text={l.a} className="italic text-sun" delay={i * 0.25} />{' '}
              <SplitText text={l.b} delay={i * 0.25 + 0.1} />
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
