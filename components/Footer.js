import Link from 'next/link'
import { navLinks, site } from '@/data/site'
import { Monogram } from './Logo'
import { Facebook, Instagram, XLogo, ArrowUpRight } from './Icons'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-ink-800">
      <div className="tricolor h-1 w-full" />

      <div className="container-x grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Monogram className="h-14 w-14" />
          <p className="mt-6 max-w-sm font-display text-3xl leading-tight">
            Feel the groove, <span className="text-sun">taste the spice.</span>
          </p>
          <div className="mt-8 flex gap-3">
            {[
              { href: site.socials.instagram, label: 'Instagram', Icon: Instagram },
              { href: site.socials.facebook, label: 'Facebook', Icon: Facebook },
              { href: site.socials.x, label: 'X', Icon: XLogo },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream/80 transition-colors hover:border-sun hover:bg-sun hover:text-ink"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="label">Explore</h3>
          <ul className="space-y-2">
            {[...navLinks, { name: 'Reservations', href: '/reservation' }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-cream/80 transition-colors hover:text-sun">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="label">Hours</h3>
          <ul className="space-y-2 text-cream/80">
            <li>Open daily</li>
            <li className="font-display text-2xl text-cream">11 AM – 9 PM</li>
            <li className="text-sm text-cream/80">Kitchen closes at 8:30 PM</li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="label">Visit</h3>
          <address className="space-y-2 not-italic text-cream/80">
            <p>{site.addressShort}</p>
            <a href={site.phoneHref} className="block hover:text-sun">
              {site.phone}
            </a>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(site.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sun"
            >
              Directions <ArrowUpRight width={14} height={14} />
            </a>
          </address>
        </div>
      </div>

      <div className="container-x flex flex-col justify-between gap-2 border-t border-cream/10 py-6 text-sm text-cream/80 sm:flex-row">
        <p>© {new Date().getFullYear()} Reggae Flavors. Made with love in Kingston.</p>
        <p>Out of many, one people.</p>
      </div>
    </footer>
  )
}
