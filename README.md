# 🥊 Swap Battle

**Swap Battle** is a decentralized token swap interface built on the **Solana blockchain**, designed to make DeFi more engaging, rewarding, and fun. By combining the power of the [Jupiter Aggregator API](https://docs.jup.ag/) with gamified mechanics like XP, streaks, and badges, it transforms traditional token swaps into an interactive Web3 experience.

This project was built as part of a hackathon challenge and showcases how gamification can increase user retention and behavior in a DEX environment.

---

## 🌟 Key Features

- 🔁 **Real-time Token Swapping** using Jupiter Aggregator API
- 🕹️ **Gamified Experience**
  - Earn **XP** for every successful swap
  - Unlock **badges** as you hit milestones
  - Maintain **streaks** for daily activity bonuses
  - Leaderboard-ready architecture for future expansion
- 🧩 **Component-driven UI** using Radix, shadcn, TailwindCSS
- 🎨 **Dark mode & responsive design**
- 🔒 **Validated forms** powered by Zod + React Hook Form
- ⚡ **Built with Vite + TypeScript** for fast builds and DX

---

## 🛠️ Tech Stack

| Layer             | Technology                             |
|------------------|-----------------------------------------|
| Framework         | React 18, Vite                         |
| Blockchain        | Solana (via Jupiter Aggregator API)    |
| Gamification Logic| Custom XP/Badge System in React        |
| Styling           | Tailwind CSS, tailwindcss-animate      |
| UI Components     | shadcn/ui, Radix UI, Lucide Icons      |
| Form Handling     | React Hook Form, Zod                   |
| State Management  | TanStack React Query                   |
| Routing           | React Router DOM                       |
| Language          | TypeScript                             |

---

## 📁 Project Structure
swap-battle/
├── public/
├── src/
│ ├── components/ # Shared UI and gamified widgets
│ ├── pages/ # Main route pages
│ ├── hooks/ # Custom hooks (e.g., useXP, useStreak)
│ ├── lib/ # Jupiter API logic and helpers
│ └── App.tsx # App entry point
├── tailwind.config.ts
├── postcss.config.js
├── vite.config.ts
└── package.json

## 🎮 Gamification Logic
The project includes lightweight, extensible gamification features:
- useXP() Hook: Tracks experience gained per swap
- useStreak() Hook: Tracks consecutive daily swaps
- BadgeSystem: Assigns visual badges based on XP or streak thresholds
- Data can be connected to wallets or profiles in future expansions
- This system is entirely modular and can be disabled or expanded (e.g. leaderboard, quests, level-ups).

## 🧠 How It Works
- User selects input/output tokens and amount.
- Jupiter API fetches best swap route in real-time.
- UI displays output amounts, fees, and slippage.
- Swap confirmed (and logged for XP/streaks).
- (Coming Soon) Wallet integration to execute real transactions.

## 🚀 Future Roadmap
🔗 Wallet Integration (Phantom, Backpack)
🧾 Swap History + User Profile Dashboard
🥇 Public Leaderboards
🧩 NFT-based Badge System
🌍 Multi-language Support

## 🤝 Contributing
Pull requests and forks are welcome! To contribute:
- Fork the repo
- Create your feature branch: git checkout -b feature/xyz
- Commit your changes
- Push to your branch
- Open a PR


