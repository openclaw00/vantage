# Vantage — Exam Prep SaaS

AI-powered exam preparation for IGCSE, A-Level and IB students.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma · PostgreSQL · NextAuth.js · OpenAI · Stripe

---

## Quick Start

### 1. Clone and install

```bash
cd /Users/minhannguyen/vantage
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Fill in `.env`:

| Variable | How to get it |
|---|---|
| `DATABASE_URL` | Supabase → Settings → Database → URI, **or** local PostgreSQL |
| `NEXTAUTH_SECRET` | Run: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `http://localhost:3000` for local dev |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | [console.cloud.google.com](https://console.cloud.google.com) → APIs & Services → Credentials → OAuth 2.0 |
| `OPENAI_API_KEY` | [platform.openai.com](https://platform.openai.com) → API Keys |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | [dashboard.stripe.com](https://dashboard.stripe.com) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe dashboard → API keys |
| `STRIPE_PRO_PRICE_ID` | Stripe → Products → create a £9/month product |

### 3. Set up the database

**Option A: Supabase (recommended for production)**
1. Create a project at [supabase.com](https://supabase.com)
2. Copy the connection string to `DATABASE_URL`

**Option B: Local PostgreSQL**
```bash
createdb vantage
# DATABASE_URL=postgresql://localhost:5432/vantage
```

### 4. Migrate and seed

```bash
npm run db:push    # Push schema to database
npm run db:seed    # Seed with 24 real exam questions
```

### 5. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Demo login:** `demo@vantage.study` / `password123`

---

## Project Structure

```
vantage/
├── app/
│   ├── (auth)/             # Login, register pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/        # Protected dashboard routes
│   │   ├── layout.tsx      # Auth guard + sidebar layout
│   │   ├── dashboard/      # Progress dashboard
│   │   ├── questions/      # Question bank + detail pages
│   │   │   └── [id]/       # Question detail + AI marking
│   │   ├── flashcards/     # Spaced repetition flashcards
│   │   ├── mock/           # Timed mock exams (stub)
│   │   └── billing/        # Stripe billing
│   ├── api/
│   │   ├── auth/           # NextAuth endpoints
│   │   ├── questions/      # Question REST API
│   │   ├── ai/mark/        # AI marking endpoint
│   │   └── dashboard/      # Stats endpoint
│   ├── layout.tsx          # Root layout (fonts, providers)
│   └── page.tsx            # Landing page
│
├── components/
│   ├── ai/                 # AIMarker component
│   ├── dashboard/          # Charts
│   ├── flashcards/         # FlashcardDeck
│   ├── layout/             # Sidebar, TopBar
│   ├── questions/          # QuestionList, MarkSchemePanel
│   ├── ui/                 # DifficultyBadge, LevelBadge
│   └── providers/          # SessionProvider
│
├── lib/
│   ├── ai.ts               # OpenAI utilities (markAnswer, explainText, generatePracticeQuestion)
│   ├── auth.ts             # NextAuth configuration
│   └── db.ts               # Prisma client singleton
│
├── prisma/
│   ├── schema.prisma       # Full database schema
│   └── seed.ts             # 24 real IGCSE/A-Level questions
│
├── types/
│   └── next-auth.d.ts      # NextAuth type augmentation
│
└── middleware.ts            # Route protection
```

---

## Features

### ✅ Built
- **Auth** — email/password + Google OAuth (NextAuth v4)
- **Question bank** — 24 real questions, filterable by subject/topic/difficulty/year
- **Mark scheme viewer** — hidden by default, reveal on demand
- **AI mark my answer** — GPT-4o-mini grades against official mark scheme, gives structured feedback
- **Flashcard deck** — flip cards, rate yourself, session tracking
- **Progress dashboard** — score over time chart, weak topics, recent attempts
- **Tier system** — Free (5 AI marks/day) vs Pro (unlimited)
- **Responsive layout** — sidebar on desktop, hamburger on mobile

### 🚧 Stubs / Coming Soon
- Timed mock exam mode
- Stripe billing (wired up, needs keys)
- AI Explain This (highlight text for explanation)
- AI-generated practice questions
- Weak topic detector with targeted practice queue
- More subjects (Chemistry, Physics, English…)

---

## Database Schema

Key tables:
- `User` — auth, tier, AI usage tracking
- `Subject` — Biology 0610, Maths 9709, etc.
- `Topic` — sub-topics within each subject
- `Question` — content, mark scheme, difficulty
- `QuestionAttempt` — user answers + AI feedback
- `Flashcard` + `FlashcardProgress` — SM-2 spaced repetition state

---

## Design System

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#070F1E` | Page background |
| `--color-surface` | `#0B1830` | Cards, sidebar |
| `--color-amber` | `#D97706` | Primary accent, CTAs |
| `--font-serif` | DM Serif Display | All headings (h1–h3) |
| `--font-mono` | JetBrains Mono | Question numbers, marks, labels |
| `--font-sans` | Plus Jakarta Sans | Body text |

---

## Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

Set all environment variables in Vercel dashboard. Use `DATABASE_URL` pointing to Supabase or a Postgres provider like Neon.

After deploying, run the seed:
```bash
DATABASE_URL=your_production_url npm run db:seed
```

---

## AI Marking

The AI marking uses `gpt-4o-mini` with a structured JSON response. The prompt instructs the model to act as a Cambridge examiner and grade point-by-point against the official mark scheme.

The response schema:
```typescript
{
  score: number,          // marks awarded
  maxScore: number,       // total marks
  percentage: number,     // 0–100
  grade: string,          // Excellent / Good / Satisfactory / Needs work / Incomplete
  whatYouGotRight: string,
  whatsMissing: string,
  examinerTip: string,
  improvedAnswer: string  // model answer for full marks
}
```

To swap to GPT-4o (better accuracy), change the `model` in `lib/ai.ts`.
