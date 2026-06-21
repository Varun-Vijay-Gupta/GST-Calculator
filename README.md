# Smart GST Calculator

A modern, responsive **Smart GST Calculator** built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Calculate GST instantly for both **Inclusive** and **Exclusive** tax amounts using standard Indian GST slabs (5%, 12%, 18%, and 28%).

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Features

- **Inclusive & Exclusive modes** — toggle between amount-before-GST and amount-includes-GST
- **Standard GST rates** — 5%, 12%, 18%, and 28% via dropdown
- **Instant results** — taxable amount, GST amount, and final amount update live
- **Input validation** — positive numbers, max 2 decimal places, helpful error messages
- **Reset button** — clear all inputs and restore defaults
- **Copy result** — one-click copy of formatted calculation summary
- **Responsive design** — polished UI that works on mobile, tablet, and desktop
- **100% free stack** — no paid APIs or services; deployable on Vercel Hobby (free)

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Next.js 15](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [Vercel](https://vercel.com/) | Free hosting (Hobby plan) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.18 or later (20+ recommended)
- npm (included with Node.js)

### Installation

1. **Clone or download** this repository:

   ```bash
   git clone <your-repo-url>
   cd "GST Calculator"
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint |

## How GST Is Calculated

### Exclusive GST (amount before tax)

The entered amount is the **taxable (base) amount**:

```
GST Amount    = Taxable Amount × (Rate ÷ 100)
Final Amount  = Taxable Amount + GST Amount
```

**Example:** ₹1,000 at 18% exclusive → GST = ₹180, Final = ₹1,180

### Inclusive GST (amount includes tax)

The entered amount is the **final amount** (GST already included):

```
Taxable Amount = Final Amount ÷ (1 + Rate ÷ 100)
GST Amount     = Final Amount − Taxable Amount
```

**Example:** ₹1,180 at 18% inclusive → Taxable = ₹1,000, GST = ₹180

## Customization

Update your name and email in `src/components/GSTCalculator.tsx`:

```typescript
const AUTHOR_NAME = "Your Full Name";
const AUTHOR_EMAIL = "your@email.com";
```

## Deploy to Vercel (Free)

This project is ready for [Vercel](https://vercel.com/)'s free **Hobby** plan — no environment variables or paid services required.

### Option A: Deploy via GitHub

1. Push this project to a GitHub repository.
2. Sign in to [vercel.com](https://vercel.com/) and click **Add New → Project**.
3. Import your GitHub repository.
4. Vercel auto-detects Next.js — leave default settings and click **Deploy**.

### Option B: Deploy via Vercel CLI

1. Install the CLI globally:

   ```bash
   npm i -g vercel
   ```

2. From the project root, run:

   ```bash
   vercel
   ```

3. Follow the prompts. For production:

   ```bash
   vercel --prod
   ```

Your app will be live at a `*.vercel.app` URL within minutes.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles & Tailwind
│   │   ├── layout.tsx       # Root layout & metadata
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   └── GSTCalculator.tsx # Main calculator UI
│   └── lib/
│       └── gst.ts           # GST logic, validation & formatting
├── public/                  # Static assets
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## License

This project is open source and free to use for personal and portfolio purposes.

---

Built by **Your Full Name** · [your@email.com](mailto:your@email.com)

[Built for Digital Heroes](https://digitalheroesco.com)
