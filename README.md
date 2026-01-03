# GlobeRate 🌍💱

A modern, real-time currency converter application built with Next.js, featuring live exchange rates and an elegant user interface.

## ✨ Features

- **Real-time Exchange Rates** - Get live currency conversion rates from multiple global currencies
- **15+ Popular Currencies** - Support for USD, EUR, GBP, JPY, CHF, CAD, AUD, NZD, INR, MXN, SGD, HKD, CNY, SEK, NOK, and more
- **Interactive Charts** - Visualize exchange rate trends over time
- **Dark/Light Mode** - Toggle between themes for comfortable viewing
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Quick Swap** - Instantly swap between currencies with one click
- **Live Updates** - Exchange rates update automatically

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Austinhere7/GlobeRate.git
cd GlobeRate
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Charts:** Recharts
- **Theme:** next-themes
- **Icons:** Lucide React
- **Analytics:** Vercel Analytics

## 📦 Project Structure

```
GlobeRate/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── currency-converter.tsx  # Main converter component
│   ├── theme-provider.tsx      # Theme context provider
│   ├── theme-toggle.tsx        # Dark/light mode toggle
│   └── ui/                     # Reusable UI components
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
└── public/               # Static assets
```

## 🎨 Features in Detail

### Currency Conversion
- Enter any amount and instantly see the converted value
- Choose from 15+ popular global currencies
- Real-time exchange rates powered by exchangerate.host API

### Exchange Rate Charts
- Visual representation of historical exchange rate trends
- Interactive tooltips showing exact values
- Responsive charts that adapt to screen size

### Theme Support
- System theme detection
- Manual dark/light mode toggle
- Smooth theme transitions
- Persistent theme preference

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Austin**
- GitHub: [@Austinhere7](https://github.com/Austinhere7)

## 🙏 Acknowledgments

- Exchange rate data provided by [exchangerate.host](https://exchangerate.host)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Built with [v0.dev](https://v0.dev)

---

Made with ❤️ using Next.js and TypeScript
