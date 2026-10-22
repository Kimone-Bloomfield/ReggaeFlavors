import Seo from '@/components/Seo'
import Hero from '@/components/home/Hero'
import Story from '@/components/home/Story'
import Signatures from '@/components/home/Signatures'
import { Pillars, DiningRoom } from '@/components/home/Experience'
import Testimonials from '@/components/home/Testimonials'
import BookingCta from '@/components/home/BookingCta'

export default function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <Story />
      <Signatures />
      <Pillars />
      <DiningRoom />
      <Testimonials />
      <BookingCta />
    </>
  )
}
