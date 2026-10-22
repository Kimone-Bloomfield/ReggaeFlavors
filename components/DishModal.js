import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { formatPrice } from '@/data/menu'
import { Close, Pepper } from './Icons'
import { useLenis } from './SmoothScroll'
import { ease } from './motion'

export const TAG_LABELS = { signature: 'House favourite', veg: 'Vegetarian', gf: 'Gluten-free', rum: 'Contains rum' }
const SPICE_LABELS = ['No heat', 'Gentle warmth', 'Proper kick', 'Scotch bonnet fire']

export default function DishModal({ dish, onClose }) {
  const lenis = useLenis()

  useEffect(() => {
    if (!dish) return
    lenis?.stop()
    document.body.style.overflow = 'hidden'
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
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-md" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dish-title"
            className="relative grid max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] border border-cream/10 bg-ink-800 sm:grid-cols-2 sm:rounded-[2rem]"
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease }}
          >
            <motion.div layoutId={`dish-img-${dish.name}`} className="relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-[460px]">
              <Image src={dish.image} alt={dish.name} fill sizes="(min-width: 640px) 450px, 100vw" className="object-cover" />
            </motion.div>

            <div className="flex flex-col p-8 sm:p-10">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-ink/70 backdrop-blur transition-colors hover:bg-sun hover:text-ink"
                aria-label="Close"
              >
                <Close />
              </button>

              <div className="flex flex-wrap gap-2">
                {dish.tags?.map((t) => (
                  <span key={t} className="rounded-full border border-sun/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-sun">
                    {TAG_LABELS[t]}
                  </span>
                ))}
              </div>
              <h2 id="dish-title" className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                {dish.name}
              </h2>
              <p className="mt-2 font-display text-2xl text-sun">{formatPrice(dish.price)}</p>
              <p className="mt-6 leading-relaxed text-cream/75">{dish.description}</p>

              <div className="mt-8 space-y-6 border-t border-cream/10 pt-6">
                <div>
                  <p className="label">Heat</p>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ scale: 0, rotate: -40 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 400, damping: 15 }}
                        >
                          <Pepper filled={i < dish.spice} width={20} height={20} />
                        </motion.span>
                      ))}
                    </div>
                    <span className="text-sm text-cream/60">{SPICE_LABELS[dish.spice]}</span>
                  </div>
                </div>
                {dish.ingredients && (
                  <div>
                    <p className="label">Key ingredients</p>
                    <p className="text-cream/80">{dish.ingredients.join(' · ')}</p>
                  </div>
                )}
              </div>

              <Link href="/reservation" className="btn-primary mt-auto w-full !mt-10">
                Book a table to try it
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
