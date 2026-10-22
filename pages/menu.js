import { useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import Seo from '@/components/Seo'
import PageHero from '@/components/PageHero'
import DishModal, { TAG_LABELS } from '@/components/DishModal'
import { Pepper, Search, Close } from '@/components/Icons'
import { Reveal, ease } from '@/components/motion'
import { useLenis } from '@/components/SmoothScroll'
import { menu, formatPrice } from '@/data/menu'

const FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'signature', label: 'House favourites' },
  { id: 'spicy', label: 'Bring the heat' },
  { id: 'veg', label: 'Vegetarian' },
  { id: 'gf', label: 'Gluten-free' },
]

const matchesFilter = (dish, filter) => {
  if (filter === 'all') return true
  if (filter === 'spicy') return dish.spice >= 2
  return dish.tags?.includes(filter)
}

function DishRow({ dish, onOpen }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, ease }}
    >
      <button
        type="button"
        onClick={() => onOpen(dish)}
        className="group flex w-full items-start gap-5 rounded-2xl p-3 text-left transition-colors hover:bg-cream/[0.04] sm:p-4"
      >
        <motion.div
          layoutId={`dish-img-${dish.name}`}
          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24"
        >
          <Image
            src={dish.image}
            alt=""
            fill
            sizes="96px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </motion.div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3">
            <h3 className="font-display text-xl sm:text-2xl">{dish.name}</h3>
            <span className="mb-1 h-px flex-1 border-b border-dotted border-cream/25" aria-hidden="true" />
            <span className="font-display text-xl text-sun">{formatPrice(dish.price)}</span>
          </div>
          <p className="mt-1.5 text-[15px] leading-relaxed text-cream/80">{dish.description}</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-3">
            {dish.spice > 0 && (
              <span className="flex gap-0.5" aria-label={`Spice level ${dish.spice} of 3`}>
                {Array.from({ length: dish.spice }).map((_, i) => (
                  <Pepper key={i} />
                ))}
              </span>
            )}
            {dish.tags?.map((t) => (
              <span key={t} className="text-[13px] font-semibold uppercase tracking-wider text-cream/80">
                {TAG_LABELS[t]}
              </span>
            ))}
          </div>
        </div>
      </button>
    </motion.li>
  )
}

export default function Menu() {
  const lenis = useLenis()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const closeModal = useCallback(() => setSelected(null), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return menu
      .map((cat) => ({
        ...cat,
        dishes: cat.dishes.filter(
          (d) =>
            matchesFilter(d, filter) &&
            (!q || d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q))
        ),
      }))
      .filter((cat) => cat.dishes.length > 0)
  }, [query, filter])

  const jumpTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -110 })
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth' })
  }

  const total = filtered.reduce((n, c) => n + c.dishes.length, 0)

  return (
    <>
      <Seo title="Menu" description="Jerk chicken, oxtail, curry goat, ackee & saltfish, rum punch and more. The full Reggae Flavors menu." />
      <PageHero
        eyebrow="The menu"
        title="Cooked low, slow"
        accent="& with love."
        intro="Everything is made from scratch daily. Mains come with rice & peas, steamed cabbage and sweet plantain."
        image="/images/table.jpg"
      />

      {/* Controls: jump to a section, or search. Stays put at the top of the menu. */}
      <div className="py-3">
        <div className="container-x">
          <div className="flex flex-col gap-3 rounded-3xl border border-cream/10 bg-ink-800 p-2 lg:flex-row lg:items-center">
            <nav className="no-scrollbar flex gap-1 overflow-x-auto" aria-label="Menu sections">
              {filtered.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => jumpTo(c.id)}
                  className="shrink-0 rounded-full px-4 py-2 text-sm text-cream/80 transition-colors hover:bg-sun hover:text-ink"
                >
                  {c.short}
                </button>
              ))}
            </nav>
            <label className="relative lg:ml-auto lg:w-72">
              <span className="sr-only">Search the menu</span>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/80" width={18} height={18} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dishes…"
                className="w-full rounded-full border border-cream/10 bg-ink-700 py-2.5 pl-11 pr-10 text-sm placeholder:text-cream/80 focus:border-sun focus:outline-none"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/80 hover:text-cream" aria-label="Clear search">
                  <Close width={16} height={16} />
                </button>
              )}
            </label>
          </div>
        </div>
      </div>

      <section className="container-x pb-32 pt-10">
        <div className="mb-12 flex flex-wrap items-center gap-2" role="group" aria-label="Dietary filters">
          {FILTERS.map((f) => (
            <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)} className="chip">
              {f.label}
            </button>
          ))}
          <span className="ml-auto text-sm text-cream/80">{total} dishes</span>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border border-dashed border-cream/15 py-24 text-center"
            >
              <p className="font-display text-3xl">Nothing on the stove for that.</p>
              <p className="mt-2 text-cream/75">Try another search, or ask your server. We love a special request.</p>
              <button type="button" onClick={() => { setQuery(''); setFilter('all') }} className="btn-ghost mt-6">
                Reset filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-24">
          {filtered.map((cat) => {
            const index = menu.findIndex((m) => m.id === cat.id)
            return (
              <section key={cat.id} id={cat.id} className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <div>
                    <Reveal>
                      <span className="font-display text-6xl text-cream/15">0{index + 1}</span>
                      <h2 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{cat.category}</h2>
                      <p className="mt-3 text-cream/75">{cat.blurb}</p>
                      <div className="tricolor mt-6 h-0.5 w-16" />
                    </Reveal>
                  </div>
                </div>
                <motion.ul layout className="grid gap-2 lg:col-span-8 xl:grid-cols-2">
                  <AnimatePresence mode="popLayout">
                    {cat.dishes.map((dish) => (
                      <DishRow key={dish.name} dish={dish} onOpen={setSelected} />
                    ))}
                  </AnimatePresence>
                </motion.ul>
              </section>
            )
          })}
        </div>

        <Reveal className="mt-24 rounded-3xl border border-cream/10 p-8 text-sm text-cream/75">
          Allergies or dietary needs? Let your server know. Our kitchen handles nuts, gluten, shellfish and dairy.
          Prices in USD, before tax and service.
        </Reveal>
      </section>

      <DishModal dish={selected} onClose={closeModal} />
    </>
  )
}
