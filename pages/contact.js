import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Seo from '@/components/Seo'
import PageHero from '@/components/PageHero'
import { Reveal, ease, fadeUp, staggerParent } from '@/components/motion'
import { ArrowRight, ArrowUpRight, Check, Clock, Mail, MapPin, Phone } from '@/components/Icons'
import supabase from '@/utils/supabase'
import { site } from '@/data/site'

const EMPTY = { name: '', email: '', message: '' }

function ContactForm() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const { error } = await supabase.from('contact').insert([form])
      if (error) throw error
      setStatus('sent')
      setForm(EMPTY)
    } catch (err) {
      console.error('Error saving message:', err)
      setStatus('error')
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.div
            key="sent"
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <motion.span
              className="flex h-20 w-20 items-center justify-center rounded-full bg-sun text-ink"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
            >
              <Check width={36} height={36} strokeWidth={2.5} />
            </motion.span>
            <h3 className="mt-6 font-display text-4xl">
              Message <span className="text-sun">received.</span>
            </h3>
            <p className="mt-3 max-w-xs text-cream/75">Big up! We&apos;ll get back to you within a day.</p>
            <button type="button" onClick={() => setStatus('idle')} className="btn-ghost mt-8">
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="label">Name</label>
                <input id="c-name" name="name" required autoComplete="name" value={form.name} onChange={set} className="field" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="c-email" className="label">Email</label>
                <input id="c-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={set} className="field" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label htmlFor="c-message" className="label">Message</label>
              <textarea
                id="c-message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={set}
                className="field resize-none"
                placeholder="Private events, catering, feedback, or just to say wah gwaan…"
              />
            </div>
            {status === 'error' && (
              <p role="alert" className="rounded-xl border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-ember">
                Something went wrong sending your message. Please try again or email {site.email}.
              </p>
            )}
            <button type="submit" disabled={status === 'sending'} className="btn-primary group w-full sm:w-auto">
              {status === 'sending' ? 'Sending…' : 'Send message'}
              <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  const cards = [
    { Icon: MapPin, label: 'Find us', value: site.addressShort, href: `https://maps.google.com/?q=${encodeURIComponent(site.mapQuery)}`, external: true },
    { Icon: Phone, label: 'Call', value: site.phone, href: site.phoneHref },
    { Icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { Icon: Clock, label: 'Hours', value: 'Daily, 11 AM – 9 PM' },
  ]

  return (
    <>
      <Seo title="Contact" description="Find Reggae Flavors at Manor Park Plaza, Kingston. Call, email or send us a message." />
      <PageHero
        eyebrow="Contact"
        title="Link up"
        accent="with us."
        intro="Questions, private parties, catering for your next big event. We'd love to hear from you."
        image="/images/spread.webp"
      />

      <section className="container-x py-24">
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {cards.map(({ Icon, label, value, href, external }) => {
            const Tag = href ? 'a' : 'div'
            return (
              <motion.div key={label} variants={fadeUp}>
                <Tag
                  {...(href ? { href, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) } : {})}
                  className="group flex h-full flex-col justify-between gap-10 rounded-3xl border border-cream/10 bg-ink-800 p-7 transition-colors hover:border-sun/50"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sun/10 text-sun">
                      <Icon />
                    </span>
                    {href && <ArrowUpRight className="text-cream/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-sun" />}
                  </div>
                  <div>
                    <p className="text-[13px] uppercase tracking-[0.08em] text-cream/80">{label}</p>
                    <p className="mt-2 font-display text-xl">{value}</p>
                  </div>
                </Tag>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Send a message</p>
            <h2 className="mt-5 font-display text-5xl">
              Holla at <span className="text-sun">we.</span>
            </h2>
            <div className="mt-10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative min-h-[460px] overflow-hidden rounded-[2rem] border border-cream/10">
            <iframe
              title="Map to Reggae Flavors"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
              className="absolute inset-0 h-full w-full"
              style={{ filter: 'invert(0.9) hue-rotate(180deg) saturate(0.6) contrast(0.9)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
              <span className="relative flex h-6 w-6">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sun opacity-60" />
                <span className="relative inline-flex h-6 w-6 rounded-full border-4 border-ink bg-sun" />
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
