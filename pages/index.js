import Seo from '@/components/Seo'
import Marquee from '@/components/Marquee'
import Hero from '@/components/home/Hero'
import Story from '@/components/home/Story'
import Signatures from '@/components/home/Signatures'
import { Pillars, DiningRoom } from '@/components/home/Experience'
import Testimonials from '@/components/home/Testimonials'
import BookingCta from '@/components/home/BookingCta'

const tickerItems = ['Jerk Chicken', 'Oxtail', 'Curry Goat', 'Rum Punch', 'Ackee & Saltfish', 'Festival', 'Escovitch Fish', 'Sorrel', 'Fried Plantain', 'Patties']

function Ticker() {
  return (
    <div className="relative z-10 -my-6 -rotate-2 py-6">
      <div className="bg-sun py-4 text-ink shadow-[0_20px_60px_-20px_rgba(246,185,26,0.5)]">
        <Marquee speed="normal">
          {tickerItems.map((item) => (
            <span key={item} className="flex items-center font-display text-3xl italic sm:text-4xl">
              <span className="px-6">{item}</span>
              <span className="text-leaf-deep" aria-hidden="true">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <Ticker />
      <Story />
      <Signatures />
      <Pillars />
      <DiningRoom />
      <Testimonials />
      <BookingCta />
    </>
  )
}
