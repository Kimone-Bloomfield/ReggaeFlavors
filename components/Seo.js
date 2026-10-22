import Head from 'next/head'
import { site } from '@/data/site'

export default function Seo({ title, description = site.description, image = '/images/jerk-table.webp' }) {
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} · Jamaican Kitchen & Rum Bar`
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}
