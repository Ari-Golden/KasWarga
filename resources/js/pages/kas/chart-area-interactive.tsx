"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

interface KasType {
  tanggal_kas: string // e.g. "2024-06-10"
  uang_masuk: number
  uang_keluar: number
}

interface ChartAreaInteractiveProps {
  kas: KasType[]
}

const chartConfig = {
  pemasukan: {
    label: "Pemasukan",
    color: "#4ade80", // hijau
  },
  pengeluaran: {
    label: "Pengeluaran",
    color: "#f87171", // merah
  },
  saldo: {
    label: "Saldo",
    color: "#60a5fa", // biru
  },
} satisfies ChartConfig

export function ChartAreaInteractive({ kas }: ChartAreaInteractiveProps) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) setTimeRange("7d")
  }, [isMobile])

  // Ubah data kas menjadi chartData
  const chartData = kas
    .sort((a, b) => new Date(a.tanggal_kas).getTime() - new Date(b.tanggal_kas).getTime())
    .map(item => ({
      date: item.tanggal_kas,
      pemasukan: item.uang_masuk,
      pengeluaran: item.uang_keluar,
    }))

  // Tambahkan field saldo berjalan
  const dataWithSaldo = chartData.reduce((acc, curr, index) => {
    const previousSaldo = index > 0 ? acc[index - 1].saldo : 0
    const saldo = previousSaldo + (curr.pemasukan - curr.pengeluaran)
    acc.push({ ...curr, saldo })
    return acc
  }, [] as { date: string; pemasukan: number; pengeluaran: number; saldo: number }[])

  // Ambil tanggal terakhir dari data
  const lastDate = chartData.at(-1)?.date ?? new Date().toISOString().slice(0, 10)
  const today = new Date(lastDate)
  const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - days)

  const filteredData = dataWithSaldo.filter(item => {
    const d = new Date(item.date)
    return d >= startDate && d <= today
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Grafik Keuangan RT</CardTitle>
        <CardDescription>Data pemasukan, pengeluaran, dan saldo</CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">90 Hari</ToggleGroupItem>
            <ToggleGroupItem value="30d">30 Hari</ToggleGroupItem>
            <ToggleGroupItem value="7d">7 Hari</ToggleGroupItem>
          </ToggleGroup>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 @[767px]/card:hidden">
              <SelectValue placeholder="Pilih Periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90d">90 Hari</SelectItem>
              <SelectItem value="30d">30 Hari</SelectItem>
              <SelectItem value="7d">7 Hari</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="pemasukanGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#4ade80" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="pengeluaranGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f87171" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#f87171" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("id-ID", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 2}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("id-ID", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="pemasukan"
              type="monotone"
              fill="url(#pemasukanGradient)"
              stroke="#4ade80"
              strokeWidth={2}
            />
            <Area
              dataKey="pengeluaran"
              type="monotone"
              fill="url(#pengeluaranGradient)"
              stroke="#f87171"
              strokeWidth={2}
            />
            <Area
              dataKey="saldo"
              type="monotone"
              fill="none"
              stroke="#60a5fa"
              strokeWidth={3}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
