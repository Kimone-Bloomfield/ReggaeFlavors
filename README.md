# 🍲 Reggae Flavors – Jamaican Kitchen & Rum Bar

**Live Demo:** 🌐 [https://reggaeflavors.vercel.app/](https://reggaeflavors.vercel.app/)

A restaurant website for an authentic Jamaican kitchen in Kingston: pimento-smoked jerk, slow-braised oxtail, live riddims and online table booking. Built with **Next.js**, **Tailwind CSS**, **Framer Motion** and **Supabase**.

---

## ✨ Features

- 🎬 **Cinematic motion**: branded intro, curtain page transitions, Ken Burns hero with rising embers, masked headline reveals, parallax imagery and smooth scrolling (Lenis)
- 🥘 **Interactive menu**: sticky category tabs with scrollspy, live search, dietary filters (vegetarian, gluten-free, spicy) and animated dish detail cards with a scotch-bonnet heat meter
- 🍗 **Pinned horizontal showcase** of house signature dishes
- 📅 **Events**: upcoming events, a custom animated calendar and a lightbox photo gallery (falls back to the recurring weekly line-up if the database is unavailable)
- 📝 **Reservations**: party size, quick date picks and half-hour time slots with live availability; full or past slots are disabled automatically
- ✉️ **Contact** form, map and opening hours
- ♿ Respects `prefers-reduced-motion`, keyboard focus states, skip link and semantic markup
- 📱 Fully responsive with a full-screen animated mobile menu

---

## 🔧 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (pages router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with Plus Jakarta Sans + Inter via `next/font`
- **Animation:** [Framer Motion](https://www.framer.com/motion/), [Lenis](https://lenis.darkroom.engineering/), Canvas
- **Database:** [Supabase](https://supabase.com/) (`reservations`, `contact`, `events` tables)
- **Deployment:** Vercel

---

## 📁 Structure

```
components/     Shared UI (Navbar, Footer, PageTransition, Embers, Decor…)
components/home Home page sections
data/           Menu, events and site info (edit content here)
pages/          Routes: /, /menu, /events, /reservation, /contact
public/images/  Photography
utils/          Supabase client
```

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Supabase

The client reads `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (falling back to the original project). Expected tables:

| Table          | Columns                                              |
| -------------- | ---------------------------------------------------- |
| `reservations` | `name`, `email`, `date`, `time`, `number_of_guest`   |
| `contact`      | `name`, `email`, `message`                           |
| `events`       | `date`, `time`, `description`, optional `title`      |
