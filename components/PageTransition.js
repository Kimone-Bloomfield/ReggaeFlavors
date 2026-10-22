import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Monogram } from './Logo'
import { ease } from './motion'

let firstLoad = true

const INTRO_HOLD = 1.5

// How long page-level entrance animations should wait (only the first visit has an intro to clear).
export const revealDelay = () => (firstLoad ? INTRO_HOLD + 0.5 : 0.1)

export default function PageTransition({ children }) {
  const isIntro = firstLoad

  useEffect(() => {
    firstLoad = false
  }, [])

  return (
    <motion.div
      initial={{ opacity: isIntro ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}

      {/* Brand intro, first visit only: lifts away to reveal the page */}
      {isIntro && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[71] flex flex-col items-center justify-center bg-ink"
          initial={{ y: '0%' }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: INTRO_HOLD }}
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            <Monogram className="h-24 w-24" />
          </motion.div>
          <motion.p
            className="mt-6 font-display text-2xl text-cream sm:text-3xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
          >
            Feel the groove, taste the spice.
          </motion.p>
          <div className="mt-8 h-[3px] w-48 overflow-hidden rounded-full bg-cream/10">
            <motion.div
              className="tricolor h-full"
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: INTRO_HOLD - 0.2, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
