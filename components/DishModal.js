import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import { formatPrice } from '@/data/menu'
import { Close, Pepper } from './Icons'
import { useLenis } from './SmoothScroll'
import { ease } from './motion'

export const TAG_LABELS = { signature: 'House favourite', veg: 'Vegetarian', gf: 'Gluten-free', rum: 'Contains rum' }
const SPICE_LABELS = ['No heat', 'Gentle warmth', 'Proper kick', 'Scotch bonnet fire']

// Bottom sheet on phones, centred two-column card from `sm` up.
export default function DishModal({ dish, onClose }) {
  const lenis = useLenis()
  const closeRef = useRef(null)
  const dragControls = useDragControls()

  useEffect(() => {
    if (!dish) return
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [dish, lenis, onClose])

  return (
    <AnimatePresence>
      {dish && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dish-title"
            className="relative flex max-h-[88svh] w-full flex-col overflow-hidden rounded-t-3xl border border-cream/10 bg-ink-800 shadow-2xl sm:grid sm:max-h-[85vh] sm:max-w-4xl sm:grid-cols-2 sm:rounded-3xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.45, ease }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            dragListener={false}
            dragControls={dragControls}
            onDragEnd={(_, info) => info.offset.y > 120 && onClose()}
          >
            {/* Photo: fixed height on phones so it never covers the text */}
            <div
              className="relative h-52 shrink-0 touch-none bg-ink-700 sm:h-auto sm:min-h-[440px] sm:touch-auto"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <Image src={dish.image} alt={dish.name} fill priority sizes="(min-width: 640px) 450px, 100vw" className="object-cover" />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink/60 to-transparent sm:hidden" />
              <span className="absolute left-1/2 top-2.5 h-1.5 w-12 -translate-x-1/2 rounded-full bg-cream/70 sm:hidden" aria-hidden="true" />
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ink/80 text-cream backdrop-blur transition-colors hover:bg-sun hover:text-ink"
              aria-label="Close"
            >
              <Close />
            </button>

            {/* Details: scrolls on its own; the booking button stays visible */}
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-6 pt-6 sm:px-10 sm:pt-10" data-lenis-prevent>
                {dish.tags?.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {dish.tags.map((t) => (
                      <span key={t} className="rounded-full border border-sun/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sun">
                        {TAG_LABELS[t]}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <h2 id="dish-title" className="font-display text-3xl leading-tight sm:text-4xl">
                    {dish.name}
                  </h2>
                  <p className="shrink-0 pt-1 font-display text-2xl text-sun">{formatPrice(dish.price)}</p>
                </div>

                <p className="mt-4 text-base leading-relaxed text-cream/80">{dish.description}</p>

                <div className="mt-6 space-y-5 border-t border-cream/10 pt-5">
                  <div>
                    <p className="label">Heat</p>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Pepper key={i} filled={i < dish.spice} width={20} height={20} />
                        ))}
                      </div>
                      <span className="text-[15px] text-cream/80">{SPICE_LABELS[dish.spice]}</span>
                    </div>
                  </div>
                  {dish.ingredients && (
                    <div>
                      <p className="label">Key ingredients</p>
                      <p className="text-[15px] text-cream/80">{dish.ingredients.join(' · ')}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="shrink-0 border-t border-cream/10 bg-ink-800 px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-10 sm:py-6">
                <Link href="/reservation" className="btn-primary w-full">
                  Book a table to try it
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
