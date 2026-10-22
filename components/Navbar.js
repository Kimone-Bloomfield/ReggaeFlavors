import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Logo from './Logo'
import { navLinks, site } from '@/data/site'
import { ArrowUpRight } from './Icons'
import { ease } from './motion'
import { useLenis } from './SmoothScroll'

export default function Navbar() {
  const router = useRouter()
  const lenis = useLenis()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > 500 && y > prev && !open)
  })

  useEffect(() => {
    if (open) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [open, lenis])

  useEffect(() => {
    const close = () => setOpen(false)
    router.events.on('routeChangeStart', close)
    return () => router.events.off('routeChangeStart', close)
  }, [router.events])

  const isActive = (href) => (href === '/' ? router.pathname === '/' : router.pathname.startsWith(href))

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.5, ease }}
      >
        <div
          className={`transition-[background-color,backdrop-filter,border-color,padding] duration-500 ${
            scrolled || open
              ? 'border-b border-cream/10 bg-ink/75 py-3 backdrop-blur-xl'
              : 'border-b border-transparent py-5'
          }`}
        >
          <nav className="container-x flex items-center justify-between" aria-label="Main">
            <Logo />

            <ul className="hidden items-center gap-1 rounded-full border border-cream/10 bg-ink/30 p-1 backdrop-blur md:flex">
              {navLinks.map((link) => (
                <li key={link.href} className="relative">
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-cream/10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Link
                    href={link.href}
                    className={`relative block rounded-full px-5 py-2 text-sm transition-colors ${
                      isActive(link.href) ? 'text-cream' : 'text-cream/60 hover:text-cream'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <Link href="/reservation" className="btn-primary hidden !py-2.5 sm:inline-flex">
                Book a table
              </Link>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 md:hidden"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
              >
                <span
                  className={`absolute h-px w-5 bg-cream transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-1'}`}
                />
                <span
                  className={`absolute h-px w-5 bg-cream transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-1'}`}
                />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-ink pt-28 md:hidden"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="tricolor absolute inset-x-0 top-0 h-1" />
            <motion.ul
              className="container-x flex flex-col gap-2"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
            >
              {[...navLinks, { name: 'Reservations', href: '/reservation' }].map((link, i) => (
                <motion.li
                  key={link.href}
                  variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
                >
                  <Link
                    href={link.href}
                    className="flex items-baseline gap-4 border-b border-cream/10 py-4 font-display text-5xl"
                  >
                    <span className="font-sans text-xs text-sun">0{i + 1}</span>
                    <span className={isActive(link.href) ? 'italic text-sun' : ''}>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              className="container-x mt-auto pb-10 text-sm text-cream/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
            >
              <p>{site.addressShort}</p>
              <a href={site.phoneHref} className="mt-1 inline-flex items-center gap-1 text-cream">
                {site.phone} <ArrowUpRight width={14} height={14} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
