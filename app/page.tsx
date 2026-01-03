import { CurrencyConverter } from "@/components/currency-converter"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background/90 p-4 md:p-8">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <CurrencyConverter />
    </main>
  )
}
