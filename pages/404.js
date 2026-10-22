import Link from 'next/link'
import { motion } from 'framer-motion'
import Seo from '@/components/Seo'
import { VinylBadge } from '@/components/Decor'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" />
      <section className="container-x flex min-h-[90vh] flex-col items-center justify-center pt-24 text-center">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.5 }}>
          <VinylBadge text="Track not found • Selector, rewind • " className="w-44" />
        </motion.div>
        <h1 className="h-display mt-10 text-6xl sm:text-8xl">
          Pull up, <span className="italic text-sun">selector!</span>
        </h1>
        <p className="mt-4 max-w-md text-cream/65">This page skipped. Let&apos;s rewind and get you back to the good stuff.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Back home</Link>
          <Link href="/menu" className="btn-ghost">See the menu</Link>
        </div>
      </section>
    </>
  )
}
