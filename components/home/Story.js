import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Reveal, SplitText, ease } from '../motion'
import { Frond } from '../Decor'

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix
      },
    })
    return () => controls.stop()
  }, [inView, to, suffix])

  return <span ref={ref}>0{suffix}</span>
}

const stats = [
  { value: 24, suffix: 'hr', label: 'Jerk marinade' },
  { value: 30, suffix: '+', label: 'Island spices' },
  { value: 3, suffix: '', label: 'Generations of recipes' },
]

export default function Story() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const cardY = useTransform(scrollYProgress, [0, 1], ['30%', '-30%'])

  return (
    <section ref={ref} className="relative overflow-hidden py-28 sm:py-40">
      <Frond className="-right-10 top-10 w-64 text-leaf/20" flip />

      <div className="container-x grid items-center gap-16 lg:grid-cols-12">
        <div className="relative lg:col-span-5">
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem]"
            initial={{ clipPath: 'inset(100% 0% 0% 0% round 2rem)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 2rem)' }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 1.4, ease }}
          >
            <motion.div className="absolute -inset-[10%]" style={{ y: imgY }}>
              <Image
                src="/images/chef.jpg"
                alt="Our head chef smiling in the kitchen"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute -bottom-8 -right-4 w-48 rounded-2xl border border-cream/10 bg-ink-700/90 p-5 backdrop-blur-xl sm:-right-10 sm:w-56"
            style={{ y: cardY }}
          >
            <p className="font-display text-4xl text-sun">
              <Counter to={24} suffix="hr" />
            </p>
            <p className="mt-1 text-sm text-cream/80">Every bird sits in our jerk marinade before it meets the pimento.</p>
          </motion.div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="eyebrow">Our story</p>
          </Reveal>
          <h2 className="h-display mt-6 text-4xl sm:text-5xl">
            <SplitText text="Where the sun meets the sea," />{' '}
            <SplitText text="and the pot meets the people." className="text-sun" delay={0.2} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-8 text-lg leading-relaxed text-cream/80">
              Reggae Flavors started with a simple idea: bring the cooking of a Jamaican Sunday table to the heart of
              Kingston. Our recipes are handed down, not written down. Fire-roasted, slow-braised and seasoned by feel,
              the way grandma taught us.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-cream/80">
              Pull up a chair, let the bassline settle in, and stay a while. Here, every meal is a vibe.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-cream/10 pt-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i}>
                <p className="font-display text-4xl sm:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-[13px] uppercase tracking-[0.08em] text-cream/80">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
