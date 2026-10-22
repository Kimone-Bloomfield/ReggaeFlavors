export const site = {
  name: 'Reggae Flavors',
  tagline: 'Feel the groove, taste the spice.',
  description:
    'Authentic Jamaican kitchen and rum bar at Manor Park Plaza, Kingston. Pimento-smoked jerk, slow-braised oxtail, live riddims every weekend.',
  address: 'Manor Park Plaza, Constant Spring Rd, Kingston 8, Jamaica',
  addressShort: 'Manor Park Plaza, Kingston',
  phone: '876-990-1111',
  phoneHref: 'tel:+18769901111',
  email: 'hello@reggaeflavors.com',
  mapQuery: 'Manor Park Plaza, Kingston, Jamaica',
  socials: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    x: 'https://x.com/',
  },
  hours: [
    { days: 'Monday – Thursday', time: '11:00 AM – 9:00 PM' },
    { days: 'Friday – Saturday', time: '11:00 AM – 9:00 PM' },
    { days: 'Sunday', time: '11:00 AM – 9:00 PM' },
  ],
  // Reservation window, 24h clock. Last seating is 30 min before close.
  openHour: 11,
  closeHour: 21,
  slotCapacity: 10,
}

export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'Events', href: '/events' },
  { name: 'Contact', href: '/contact' },
]
