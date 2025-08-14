"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, TrendingDown, Calendar, BarChart3 } from "lucide-react"

interface TimeSeriesAnalysisProps {
  period: string
  region: string
}

export function TimeSeriesAnalysis({ period, region }: TimeSeriesAnalysisProps) {
  const [selectedMetric, setSelectedMetric] = useState("ridership")
  const [viewType, setViewType] = useState("daily")

  const dailyData = [
    { date: "2024-01", ridership: 1240, satisfaction: 3.2, cost: 3800, efficiency: 65 },
    { date: "2024-02", ridership: 1320, satisfaction: 3.4, cost: 3650, efficiency: 68 },
    { date: "2024-03", ridership: 1450, satisfaction: 3.8, cost: 3500, efficiency: 72 },
    { date: "2024-04", ridership: 1520, satisfaction: 4.0, cost: 3350, efficiency: 75 },
    { date: "2024-05", ridership: 1580, satisfaction: 4.2, cost: 3200, efficiency: 77 },
    { date: "2024-06", ridership: 1650, satisfaction: 4.3, cost: 3100, efficiency: 78 },
    { date: "2024-07", ridership: 1680, satisfaction: 4.4, cost: 3100, efficiency: 78 },
  ]

  const weeklyData = [
    { week: "1주차", ridership: 1580, satisfaction: 4.1, cost: 3150, efficiency: 76 },
    { week: "2주차", ridership: 1620, satisfaction: 4.2, cost: 3120, efficiency: 77 },
    { week: "3주차", ridership: 1650, satisfaction: 4.3, cost: 3100, efficiency: 78 },
    { week: "4주차", ridership: 1680, satisfaction: 4.4, cost: 3100, efficiency: 78 },
  ]

  const hourlyData = [
    { hour: "06:00", ridership: 45, satisfaction: 4.2 },
    { hour: "07:00", ridership: 120, satisfaction: 4.1 },
    { hour: "08:00", ridership: 180, satisfaction: 4.0 },
    { hour: "09:00", ridership: 95, satisfaction: 4.3 },
    { hour: "10:00", ridership: 65, satisfaction: 4.4 },
    { hour: "11:00", ridership: 70, satisfaction: 4.4 },
    { hour: "12:00", ridership: 85, satisfaction: 4.3 },
    { hour: "13:00", ridership: 75, satisfaction: 4.4 },
    { hour: "14:00", ridership: 80, satisfaction: 4.3 },
    { hour: "15:00", ridership: 90, satisfaction: 4.2 },
    { hour: "16:00", ridership: 110, satisfaction: 4.1 },
    { hour: "17:00", ridership: 150, satisfaction: 4.0 },
    { hour: "18:00", ridership: 140, satisfaction: 4.1 },
    { hour: "19:00", ridership: 95, satisfaction: 4.3 },
    { hour: "20:00", ridership: 70, satisfaction: 4.4 },
    { hour: "21:00", ridership: 50, satisfaction: 4.4 },
  ]

  const getCurrentData = () => {
    switch (viewType) {
      case "hourly":
        return hourlyData
      case "weekly":
        return weeklyData
      default:
        return dailyData
    }
  }

  const getMetricInfo = (metric: string) => {
    switch (metric) {
      case "ridership":
        return { name: "이용객 수", unit: "명", color: "#3b82f6" }
      case "satisfaction":
        return { name: "만족도", unit: "점", color: "#f59e0b" }
      case "cost":
        return { name: "운영비용", unit: "만원", color: "#ef4444" }
      case "efficiency":
        return { name: "효율성", unit: "%", color: "#10b981" }
      default:
        return { name: "이용객 수", unit: "명", color: "#3b82f6" }
    }
  }

  const metricInfo = getMetricInfo(selectedMetric)
  const currentData = getCurrentData()

  const calculateTrend = () => {
    if (currentData.length < 2) return 0
    const first = currentData[0][selectedMetric as keyof (typeof currentData)[0]] as number
    const last = currentData[currentData.length - 1][selectedMetric as keyof (typeof currentData)[0]] as number
    return ((last - first) / first) * 100
  }

  const trend = calculateTrend()

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <Select value={viewType} onValueChange={setViewType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">월별</SelectItem>
              <SelectItem value="weekly">주별</SelectItem>
              <SelectItem value="hourly">시간별</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ridership">이용객 수</SelectItem>
              <SelectItem value="satisfaction">만족도</SelectItem>
              <SelectItem value="cost">운영비용</SelectItem>
              <SelectItem value="efficiency">효율성</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          {trend > 0 ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
          )}
          <Badge variant={trend > 0 ? "default" : "destructive"}>
            {trend > 0 ? "+" : ""}
            {trend.toFixed(1)}%
          </Badge>
        </div>
      </div>

      {/* Main Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{metricInfo.name} 시계열 분석</CardTitle>
          <CardDescription>
            {viewType === "daily" && "월별 추이"}
            {viewType === "weekly" && "주별 추이"}
            {viewType === "hourly" && "시간대별 패턴"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {viewType === "hourly" ? (
                <AreaChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={viewType === "hourly" ? "hour" : viewType === "weekly" ? "week" : "date"} />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey={selectedMetric}
                    stroke={metricInfo.color}
                    fill={metricInfo.color}
                    fillOpacity={0.3}
                    name={`${metricInfo.name} (${metricInfo.unit})`}
                  />
                </AreaChart>
              ) : (
                <LineChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={viewType === "weekly" ? "week" : "date"} />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey={selectedMetric}
                    stroke={metricInfo.color}
                    strokeWidth={3}
                    name={`${metricInfo.name} (${metricInfo.unit})`}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>패턴 분석</CardTitle>
            <CardDescription>주요 트렌드 및 특이사항</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-800 mb-1">성장 추세</div>
                <div className="text-sm text-blue-700">
                  {viewType === "daily" && "지속적인 월별 이용객 증가 (35.5% 성장)"}
                  {viewType === "weekly" && "주별 안정적 성장세 유지"}
                  {viewType === "hourly" && "출퇴근 시간대 집중 이용 패턴"}
                </div>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-green-800 mb-1">만족도 개선</div>
                <div className="text-sm text-green-700">서비스 품질 향상으로 이용자 만족도 지속 상승</div>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="font-medium text-purple-800 mb-1">비용 효율성</div>
                <div className="text-sm text-purple-700">이용객 증가 대비 운영비용 안정화 달성</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>예측 및 권고</CardTitle>
            <CardDescription>향후 전망 및 개선 방안</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="font-medium text-yellow-800 mb-1">단기 전망 (1개월)</div>
                <div className="text-sm text-yellow-700">현재 성장세 유지 시 월 1,750명 이용객 예상</div>
              </div>

              <div className="p-3 bg-indigo-50 rounded-lg">
                <div className="font-medium text-indigo-800 mb-1">중기 전망 (6개월)</div>
                <div className="text-sm text-indigo-700">서비스 확대로 월 2,000명 이용객 달성 가능</div>
              </div>

              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="font-medium text-orange-800 mb-1">개선 권고</div>
                <div className="text-sm text-orange-700">피크 시간대 차량 증편 및 비피크 시간 서비스 다양화 필요</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
