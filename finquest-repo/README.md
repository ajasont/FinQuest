# 🐉 FinQuest

**Play your way to financial freedom.** FinQuest is a financial literacy adventure game that turns money skills into a quest: learn the terms, ace the quizzes, survive real-life money decisions, slay the Debt Dragon, and unlock a real-world checklist for building a better financial life.

## ✨ Features

- **7 quest zones** — Budget Basics, Debt Payoff, Credit Score Climb, Grow Your Money, Insurance Armor, Retirement Ready, and Tax Smarts
- **70 terms & 70 quiz questions** — every wrong answer teaches you the right one
- **Life decisions** — choose-your-own-adventure money scenarios with consequences for your coins and simulated credit score
- **XP, levels & badges** — climb from Penny Rookie to Financial Legend
- **Boss battle** — the Debt Dragon guards the Freedom Vault with 14 randomized questions, 3 hearts, and zero mercy
- **The Freedom Vault** — beat the game to unlock a 22-item real-life checklist (with progress saved) for building actual financial freedom
- **Persistent saves** — progress is stored locally in the browser

## 🚀 Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To create a production build: `npm run build` (output lands in `dist/`, deployable to any static host like Vercel, Netlify, or GitHub Pages).

## 🕹️ How to play

1. Work through each zone: **Learn** the terms → pass the **Quiz** → make a **Life Decision**
2. Earn XP, coins, badges, and credit score points along the way
3. Beat all 7 zones to face **the Debt Dragon** — land 12 correct answers before losing 3 hearts
4. Slay it to open **the Freedom Vault**: a real-life checklist to complete outside the game

## 🛠️ Tech

- [React 18](https://react.dev) + [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com) utility classes (via CDN script for simplicity — swap in the full Tailwind build setup if you take this to production)
- [lucide-react](https://lucide.dev) icons
- Typefaces: Lilita One & Nunito (Google Fonts)

## 📦 Project structure

```
finquest/
├── index.html          # Entry page (Tailwind CDN + root div)
├── src/
│   ├── FinQuest.jsx    # The entire game: data, components, app
│   └── main.jsx        # Mounts the game + storage shim
├── vite.config.js
└── package.json
```

## 📝 Origin story

FinQuest started life as a [Claude](https://claude.ai) artifact. In that environment, save data persists through a special `window.storage` API — `src/main.jsx` includes a small shim that recreates that API on top of `localStorage`, so the same game code runs both standalone and as an artifact.

## ⚠️ Disclaimer

FinQuest teaches general money concepts for fun and education. It is not personalized financial, tax, or investment advice.

## 💡 Roadmap ideas

- Sound effects & music
- Daily streaks and review mode
- Shareable score cards
- More zones: income & side hustles, home buying, insurance deep-dives
