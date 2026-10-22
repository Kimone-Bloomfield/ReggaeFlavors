import { motion } from 'framer-motion'
import { Monogram } from './Logo'
import { ease } from './motion'

let firstLoad = true

const INTRO_HOLD = 1.5
const labels = { '/': 'Home', '/menu': 'Menu', '/events': 'Events', '/contact': 'Contact', '/reservation': 'Reservations' }

// How long page-level entrance animations should wait so they play as the curtain lifts.
export const revealDelay = () => (firstLoad ? INTRO_HOLD + 0.5 : 0.55)

export default function PageTransition({ children, route }) {
  const isIntro = firstLoad
  const label = labels[route] ?? 'Reggae Flavors'

  return (
    <motion.div
      onAnimationComplete={() => {
        firstLoad = false
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1, transition: { duration: 0.6 } }}
    >
      {children}

      {/* Cover: sweeps up over the old page on exit */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] origin-bottom bg-sun"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Reveal: starts covering the new page, then lifts away */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[71] flex origin-top flex-col items-center justify-center bg-ink"
        initial={{ y: '0%' }}
        animate={{ y: '-100%' }}
        exit={{ y: '-100%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: isIntro ? INTRO_HOLD : 0.1 }}
      >
        {isIntro ? (
          <>
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <Monogram className="h-24 w-24" />
            </motion.div>
            <motion.p
              className="mt-6 font-display text-2xl font-light italic text-cream sm:text-3xl"
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
          </>
        ) : (
          <motion.span
            className="font-display text-5xl font-light italic text-sun sm:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 1, 1], y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  )
}
