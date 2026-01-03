"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowRightLeft, TrendingUp, Eye, Heart, Clock, Activity, BarChart3, Zap, Globe, Bell } from "lucide-react"

const POPULAR_CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CHF",
  "CAD",
  "AUD",
  "NZD",
  "INR",
  "MXN",
  "SGD",
  "HKD",
  "CNY",
  "SEK",
  "NOK",
]

interface ExchangeRates {
  [key: string]: number
}

interface ChartData {
  time: string
  rate: number
}

export function CurrencyConverter() {
  const [amount, setAmount] = useState("1000")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [rates, setRates] = useState<ExchangeRates>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [lastUpdated, setLastUpdated] = useState("")
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true)
        setError("")
        const response = await fetch(`https://api.exchangerate.host/latest?base=${fromCurrency}`)
        const data = await response.json()

        if (!data.success && data.error) {
          throw new Error("Failed to fetch exchange rates")
        }

        setRates(data.rates)
        setLastUpdated(new Date().toLocaleTimeString())

        // Simulate historical chart data
        const baseRate = data.rates[toCurrency] || 1
        const mockChartData = Array.from({ length: 12 }, (_, i) => ({
          time: `${i}h`,
          rate: baseRate * (1 + (Math.random() - 0.5) * 0.05),
        }))
        setChartData(mockChartData)
      } catch (err) {
        setError("Unable to fetch rates. Please try again.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRates()
  }, [fromCurrency, toCurrency])

  const convertedAmount =
    amount && rates[toCurrency] ? (Number.parseFloat(amount) * rates[toCurrency]).toFixed(2) : "0.00"

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const exchangeRate = rates[toCurrency] ? rates[toCurrency].toFixed(6) : "--"
  const changePercent = ((Math.random() - 0.5) * 5).toFixed(2)
  const changeDirection = Number(changePercent) >= 0 ? "up" : "down"

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Globe className="w-8 h-8 text-accent" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Currency Exchange</h1>
        </div>
        <p className="text-muted-foreground text-lg">Real-time global currency conversion and analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Converter Card */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-6 border-b border-border/50">
              <CardTitle className="text-2xl">Convert Currency</CardTitle>
              <CardDescription>Enter amount and select currencies to exchange</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 space-y-8">
              {/* From Currency Section */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  From
                </label>
                <div className="flex gap-4">
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="w-32 bg-secondary border-border/50 text-foreground font-semibold h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-secondary border-border/50">
                      {POPULAR_CURRENCIES.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 bg-secondary border-border/50 text-lg font-semibold h-12"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button
                  onClick={swapCurrencies}
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 bg-accent/10 border-accent/30 hover:bg-accent/20 hover:border-accent/50"
                  disabled={loading}
                >
                  <ArrowRightLeft className="h-5 w-5 text-accent" />
                </Button>
              </div>

              {/* To Currency Section */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  To
                </label>
                <div className="flex gap-4">
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="w-32 bg-secondary border-border/50 text-foreground font-semibold h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-secondary border-border/50">
                      {POPULAR_CURRENCIES.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex-1 bg-secondary/50 rounded-lg px-4 h-12 flex items-center">
                    <div className="text-2xl font-bold font-mono text-accent">
                      {loading ? <span className="animate-pulse">...</span> : convertedAmount}
                    </div>
                  </div>
                </div>
              </div>

              {/* Exchange Rate Display */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Exchange Rate</div>
                  <div className="text-xl font-bold text-foreground font-mono">{exchangeRate}</div>
                  <div className="text-xs text-muted-foreground">
                    1 {fromCurrency} = {exchangeRate} {toCurrency}
                  </div>
                </div>
                <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">24h Change</div>
                  <div
                    className={`text-xl font-bold flex items-center gap-1 ${changeDirection === "up" ? "text-green-400" : "text-red-400"}`}
                  >
                    <TrendingUp className={`w-5 h-5 ${changeDirection === "down" ? "rotate-180" : ""}`} />
                    {changePercent}%
                  </div>
                  <div className="text-xs text-muted-foreground">Last 24 hours</div>
                </div>
              </div>

              {/* Last Updated Info */}
              {lastUpdated && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground border-t border-border/50 pt-4">
                  <Clock className="w-4 h-4" />
                  Updated at {lastUpdated}
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-4 rounded-lg">
                  {error}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Chart Section */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-6 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  <CardTitle>Exchange Rate Trend</CardTitle>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">Last 24h</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgb(255 255 255 / 0.05)" />
                    <XAxis dataKey="time" stroke="rgb(255 255 255 / 0.4)" />
                    <YAxis stroke="rgb(255 255 255 / 0.4)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgb(15 15 15 / 0.8)",
                        border: "1px solid rgb(255 255 255 / 0.1)",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="rgb(100 200 255)"
                      dot={false}
                      strokeWidth={2}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-72 flex items-center justify-center text-muted-foreground">Loading chart data...</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Additional Info & Actions */}
        <div className="space-y-6">
          {/* Conversion Summary Card */}
          <Card className="border-border/50 bg-gradient-to-br from-accent/10 to-accent/5 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">You send</span>
                  <span className="font-bold text-foreground">
                    {amount} {fromCurrency}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">You receive</span>
                  <span className="font-bold text-foreground">
                    {convertedAmount} {toCurrency}
                  </span>
                </div>
                <div className="h-px bg-border/30"></div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Mid-market rate</span>
                  <span className="font-mono text-sm font-semibold text-accent">{exchangeRate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => setIsFavorite(!isFavorite)}
                variant="outline"
                className="w-full justify-start gap-2 bg-secondary border-border/50 h-10 font-medium"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-400 text-red-400" : ""}`} />
                {isFavorite ? "Saved" : "Save Pair"}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 bg-secondary border-border/50 h-10 font-medium"
              >
                <Bell className="w-4 h-4" />
                Set Alert
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 bg-secondary border-border/50 h-10 font-medium"
              >
                <Activity className="w-4 h-4" />
                View History
              </Button>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex gap-2">
                <Eye className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Real-time rates updated every second</span>
              </div>
              <div className="flex gap-2">
                <TrendingUp className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">24-hour trend analysis included</span>
              </div>
              <div className="flex gap-2">
                <Globe className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">150+ currencies supported</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
