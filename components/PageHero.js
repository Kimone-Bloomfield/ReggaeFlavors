import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SplitText, ease } from './motion'
import { revealDelay } from './PageTransition'

// Shared header for inner pages: parallax photo, masked title, eyebrow + intro.
export default function PageHero({ eyebrow, title, accent, intro, image, children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const delay = revealDelay()

  return (
    <section ref={ref} className="relative flex min-h-[78svh] items-end overflow-hidden pb-16 pt-40">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-transparent" />

      <motion.div className="container-x relative" style={{ opacity }}>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease, delay }}
        >
          {eyebrow}
        </motion.p>
        <h1 className="h-display mt-6 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">
          <SplitText text={title} animateOnMount delay={delay + 0.1} />
          {accent && (
            <>
              {' '}
              <SplitText text={accent} animateOnMount delay={delay + 0.3} className="text-sun" />
            </>
          )}
        </h1>
        {intro && (
          <motion.p
            className="mt-6 max-w-xl text-lg text-cream/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: delay + 0.5 }}
          >
            {intro}
          </motion.p>
        )}
        {children}
      </motion.div>
    </section>
  )
}
