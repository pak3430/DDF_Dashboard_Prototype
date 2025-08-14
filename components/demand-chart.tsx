"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"

interface DemandChartProps {
  station: string
  timeRange: string
  type: string
}

// Mock data for 24-hour demand forecast
const generateDemandData = (station: string, timeRange: string) => {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  return hours.map((hour) => {
    const basePattern = hour < 6 ? 0.1 : hour < 9 ? 0.8 : hour < 17 ? 0.4 : hour < 20 ? 0.9 : hour < 22 ? 0.6 : 0.2
    const randomVariation = Math.random() * 0.3 - 0.15
    const demand = Math.max(0, (basePattern + randomVariation) * 100)

    return {
      hour: `${hour.toString().padStart(2, "0")}:00`,
      predicted: Math.round(demand),
      actual: hour < new Date().getHours() ? Math.round(demand * (0.9 + Math.random() * 0.2)) : null,
      confidence: Math.round((0.85 + Math.random() * 0.1) * 100),
    }
  })
}

export function DemandChart({ station, timeRange, type }: DemandChartProps) {
  const data = generateDemandData(station, timeRange)
  const stationName = station === "gangnam" ? "강남역 거점" : station === "jamsil" ? "잠실역 거점" : "선택된 거점"

  return (
    <Card>
      <CardHeader>
        <CardTitle>24시간 수요 예측 - {stationName}</CardTitle>
        <CardDescription>MST-GCN 모델 기반 시간대별 수요 예측 (신뢰도: 94.2%)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" tick={{ fontSize: 12 }} interval={2} />
              <YAxis
                tick={{ fontSize: 12 }}
                label={{ value: "예상 승객 수 (명)", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                formatter={(value, name) => [
                  `${value}명`,
                  name === "predicted" ? "예측값" : name === "actual" ? "실제값" : name,
                ]}
                labelFormatter={(label) => `시간: ${label}`}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                name="예측 수요"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="실제 수요"
                connectNulls={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="font-medium text-blue-900">예상 최대 수요</div>
            <div className="text-xl font-bold text-blue-600">89명</div>
            <div className="text-blue-600">18:00 시간대</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="font-medium text-green-900">일 평균 수요</div>
            <div className="text-xl font-bold text-green-600">42명</div>
            <div className="text-green-600">시간당 평균</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="font-medium text-orange-900">예측 신뢰도</div>
            <div className="text-xl font-bold text-orange-600">94.2%</div>
            <div className="text-orange-600">평균 정확도</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
