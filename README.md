<div align="center">

<img src="public/logo-icon.png" alt="BazarDor logo" width="80" />

# বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে — daily market prices at a glance.**

A Bangla price-tracking web app for everyday goods in Bangladesh.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Better Auth](https://img.shields.io/badge/Auth-Better_Auth-111111)

[Live Demo](#) · [Report a Bug](https://github.com/HasibOp/BazarDor-Live_Market_Price/issues) · [Setup Guide](SETUP.md)

</div>

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Routes](#-routes)
- [Data Source](#-data-source)
- [Deployment](#-deployment)

---

## 📖 About the Project

**BazarDor** (বাজার দর, "market price") helps shoppers in Bangladesh keep track of what everyday essentials cost today. It covers rice, lentils, oil, vegetables, fish, meat, eggs and dairy, and spices, showing today's price, how it changed since yesterday, and how prices differ across 12 markets.

The whole interface is in Bangla — numbers, units, dates and messages included — so it reads naturally for its audience. Basic price browsing is public; detailed price analysis is available to signed-in users.

---

## ✨ Features

### 📈 Prices
- **Live price ticker** — a continuously scrolling strip on every page showing each product's emoji, name, price and ▲/▼ change.
- **Bangla date** — today's date and weekday rendered in Bangla.
- **Today's movers** — "আজ দাম বেড়েছে" (top 6 price risers) and "আজ দাম কমেছে" (top 6 price fallers), ranked by percentage change.
- **Product search** — instantly filter all products by their Bangla name.
- **Category pages** — browse by category and sort by default order, price low → high, or price high → low. Sorting uses real numeric values, so Bengali digits never break the order.

### 🔍 Product Details (login required)
- Lowest, highest and average price, with the market where each was found.
- Price history: yesterday, last week and last month.
- A market-by-market price table across all 12 markets.

### 🔐 Authentication
- Email/password sign-up and sign-in (minimum 8-character password).
- One-click **Google** and **GitHub** login (each is enabled only when its keys are configured).
- Protected routes: opening `/product/*` or `/profile/*` without a session redirects to sign-in, then back to the original page afterwards.
- Safe redirect handling that blocks open-redirect attempts.
- Toast notifications for every auth action.

### 👤 Profile
- View your profile information.
- Update your display name.

### 🎨 Experience
- Fully responsive layout for mobile, tablet and desktop.
- Skeleton loaders while data loads.
- Friendly empty states, a custom 404 page and an error page with a retry button.
- Bangla typography with Noto Sans Bengali.
- Resilient data fetching: falls back to mirror API hosts if the primary one fails, and caches responses for 5 minutes.

---

## 🧰 Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Server Components) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| UI Library | [React 19](https://react.dev) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) + [DaisyUI 5](https://daisyui.com) |
| Authentication | [Better Auth](https://better-auth.com) (email/password, Google, GitHub) |
| Database | [MongoDB Atlas](https://www.mongodb.com/atlas) (users and sessions) |
| Notifications | [react-hot-toast](https://react-hot-toast.com) |
| Icons | [lucide-react](https://lucide.dev) |
| Font | [Noto Sans Bengali](https://fonts.google.com/noto/specimen/Noto+Sans+Bengali) |
| Linting | ESLint |
| Hosting | [Vercel](https://vercel.com) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 20 or later
- A [MongoDB Atlas](https://cloud.mongodb.com) cluster (the free tier works)
- *(Optional)* Google and GitHub OAuth apps for social login

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/HasibOp/BazarDor-Live_Market_Price.git
cd BazarDor-Live_Market_Price

# 2. Install dependencies
npm install

# 3. Create your environment file and fill in the values
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> 📘 Step-by-step instructions for MongoDB Atlas, Google/GitHub OAuth and Vercel are in **[SETUP.md](SETUP.md)**.

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root:

| Variable | Required | Description |
|---|:---:|---|
| `BETTER_AUTH_SECRET` | ✅ | Secret for signing sessions. Generate one with `npx @better-auth/cli secret`. |
| `BETTER_AUTH_URL` | ✅ | The site's base URL, e.g. `http://localhost:3000` (no trailing slash). |
| `MONGODB_URL` | ✅ | MongoDB Atlas connection string. |
| `GOOGLE_CLIENT_ID` | ➖ | Google OAuth client ID. |
| `GOOGLE_CLIENT_SECRET` | ➖ | Google OAuth client secret. |
| `GITHUB_CLIENT_ID` | ➖ | GitHub OAuth client ID. |
| `GITHUB_CLIENT_SECRET` | ➖ | GitHub OAuth client secret. |

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the codebase with ESLint |

---

## 📁 Project Structure

```
bazar-dor/
├── app/
│   ├── (home)/               # Home page: hero, movers, all products
│   ├── category/[slug]/      # Category listing with sorting
│   ├── product/[slug]/       # Product details (protected)
│   ├── profile/              # Profile page and update form (protected)
│   ├── signin/               # Sign-in page
│   ├── signup/               # Sign-up page
│   ├── api/auth/[...all]/    # Better Auth API handler
│   ├── error.tsx             # Error boundary
│   ├── not-found.tsx         # Custom 404 page
│   └── layout.tsx            # Root layout (navbar, ticker, footer)
├── components/               # Reusable UI (Navbar, PriceTicker, ProductCard, MarketTable, forms…)
├── lib/
│   ├── api.ts                # Data fetching with fallback hosts and caching
│   ├── auth.ts               # Better Auth server config
│   ├── auth-client.ts        # Better Auth client
│   ├── bn.ts                 # Bangla digits, dates, units and currency helpers
│   ├── mongodb.ts            # MongoDB connection
│   ├── session.ts            # Session and safe-redirect helpers
│   ├── stats.ts              # Risers/fallers, sorting and price summaries
│   └── types.ts              # Shared TypeScript types
├── public/                   # Logo and hero image
└── proxy.ts                  # Redirects unauthenticated users away from protected routes
```

---

## 🗺️ Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home page with ticker, movers and searchable product list |
| `/category/[slug]` | Public | Products in one category, sortable by price |
| `/product/[slug]` | 🔒 Login | Price summary, history and market comparison |
| `/profile` | 🔒 Login | User profile |
| `/profile/update` | 🔒 Login | Update display name |
| `/signin` | Public | Sign in with email, Google or GitHub |
| `/signup` | Public | Create a new account |

---

## 🌐 Data Source

Price data comes from the Programming Hero BazarDor API:

```
https://openapi.programming-hero.com/api/bazardor
```

| Endpoint | Returns |
|---|---|
| `/products` | All products with today's, yesterday's and historical prices, plus per-market prices |
| `/categories` | All product categories |

---

## ☁️ Deployment

The app is designed for [Vercel](https://vercel.com):

1. Push the repository to GitHub and import it on Vercel.
2. Add all environment variables, setting `BETTER_AUTH_URL` to your production URL.
3. Add the production callback URLs to your Google and GitHub OAuth apps.
4. Allow Vercel to reach MongoDB Atlas (Network Access → `0.0.0.0/0`).

See [SETUP.md](SETUP.md#6-deploy-to-vercel) for details.

---

<div align="center">

Made with ❤️ for shoppers in Bangladesh

</div>
