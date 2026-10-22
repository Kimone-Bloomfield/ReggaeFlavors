import { useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { menu, signatureDishes, formatPrice } from '@/data/menu'
import { Pepper, ArrowRight } from '../Icons'
import { Reveal, SplitText } from '../motion'

const totalDishes = menu.reduce((n, c) => n + c.dishes.length, 0)
const useIsoLayoutEffect = typeof window === 'undefined' ? () => {} : useLayoutEffect

function DishCard({ dish, index }) {
  return (
    <article className="group relative h-[62vh] min-h-[420px] w-[78vw] shrink-0 snap-center overflow-hidden rounded-[2rem] sm:w-[46vw] lg:w-[30vw]">
      <Image
        src={dish.image}
        alt={dish.name}
        fill
        sizes="(min-width: 1024px) 30vw, 80vw"
        className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <span className="absolute left-6 top-6 font-display text-7xl font-light italic text-cream/25">
        0{index + 1}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-7">
        {dish.spice > 0 && (
          <div className="mb-3 flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Pepper key={i} filled={i < dish.spice} />
            ))}
          </div>
        )}
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-display text-4xl leading-none">{dish.name}</h3>
          <span className="shrink-0 rounded-full bg-sun px-3 py-1 text-sm font-semibold text-ink">
            {formatPrice(dish.price)}
          </span>
        </div>
        <p className="mt-3 max-h-0 overflow-hidden text-sm text-cream/75 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
          {dish.description}
        </p>
      </div>
    </article>
  )
}

export default function Signatures() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)

  useIsoLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      const isDesktop = window.matchMedia('(min-width: 768px)').matches
      setDistance(isDesktop ? Math.max(0, track.scrollWidth - window.innerWidth) : 0)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const x = useTransform(smooth, [0, 1], [0, -distance])
  const progressWidth = useTransform(smooth, [0, 1], ['0%', '100%'])

  const pinned = distance > 0

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink-800"
      style={{ height: pinned ? `calc(100vh + ${distance}px)` : 'auto' }}
    >
      <div className={pinned ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden' : 'py-24'}>
        <div className="container-x mb-10 flex items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow">House signatures</p>
            </Reveal>
            <h2 className="h-display mt-5 text-5xl sm:text-7xl">
              <SplitText text="The plates" /> <SplitText text="they talk about." className="italic text-sun" delay={0.15} />
            </h2>
          </div>
          <Link href="/menu" className="btn-ghost group hidden shrink-0 md:inline-flex">
            Full menu <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className={`flex gap-6 px-5 sm:px-8 ${pinned ? 'w-max' : 'no-scrollbar snap-x snap-mandatory overflow-x-auto pb-4'}`}
        >
          {signatureDishes.map((dish, i) => (
            <DishCard key={dish.name} dish={dish} index={i} />
          ))}
          <Link
            href="/menu"
            className="group flex h-[62vh] min-h-[420px] w-[60vw] shrink-0 snap-center flex-col items-center justify-center gap-6 rounded-[2rem] border border-dashed border-cream/20 text-center transition-colors hover:border-sun sm:w-[30vw] lg:w-[22vw]"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sun text-ink transition-transform duration-500 group-hover:rotate-[-45deg] group-hover:scale-110">
              <ArrowRight width={28} height={28} />
            </span>
            <span className="font-display text-3xl">
              See all <span className="italic text-sun">{totalDishes} dishes</span>
            </span>
          </Link>
        </motion.div>

        {pinned && (
          <div className="container-x mt-10">
            <div className="h-px w-full bg-cream/10">
              <motion.div className="tricolor h-px" style={{ width: progressWidth }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
