import '../styles/index.css'
import { useRouter } from 'next/router'
import { Fraunces, Manrope } from 'next/font/google'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Layout from '@/components/Layout'
import PageTransition from '@/components/PageTransition'
import SmoothScroll, { useLenis } from '@/components/SmoothScroll'

const display = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-display',
  display: 'swap',
})

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

function Pages({ Component, pageProps }) {
  const router = useRouter()
  const lenis = useLenis()

  const resetScroll = () => {
    lenis?.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
  }

  return (
    <Layout>
      <AnimatePresence mode="wait" onExitComplete={resetScroll}>
        <PageTransition key={router.pathname} route={router.pathname}>
          <Component {...pageProps} />
        </PageTransition>
      </AnimatePresence>
    </Layout>
  )
}

export default function App(props) {
  return (
    <div className={`${display.variable} ${sans.variable} font-sans`}>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <Pages {...props} />
        </SmoothScroll>
      </MotionConfig>
    </div>
  )
}
