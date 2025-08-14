"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Clock, DollarSign, Target, TrendingUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

interface KpiDashboardProps {
  period: string
  region: string
}

export function KpiDashboard({ period, region }: KpiDashboardProps) {
  const kpiData = [
    {
      id: "ridership",
      name: "일평균 이용객",
      current: 1680,
      target: 1500,
      unit: "명",
      trend: 12.5,
      status: "good",
      icon: Users,
      color: "blue",
    },
    {
      id: "ontime",
      name: "정시 운행률",
      current: 94.2,
      target: 90,
      unit: "%",
      trend: 8.3,
      status: "good",
      icon: Clock,
      color: "green",
    },
    {
      id: "cost",
      name: "km당 운영비",
      current: 2850,
      target: 3200,
      unit: "원",
      trend: -15.2,
      status: "good",
      icon: DollarSign,
      color: "purple",
    },
    {
      id: "satisfaction",
      name: "이용자 만족도",
      current: 4.4,
      target: 4.0,
      unit: "/5.0",
      trend: 18.9,
      status: "good",
      icon: Target,
      color: "orange",
    },
    {
      id: "coverage",
      name: "서비스 커버리지",
      current: 92.1,
      target: 85,
      unit: "%",
      trend: 24.3,
      status: "good",
      icon: Target,
      color: "indigo",
    },
    {
      id: "utilization",
      name: "차량 활용률",
      current: 78.5,
      target: 75,
      unit: "%",
      trend: 6.8,
      status: "warning",
      icon: TrendingUp,
      color: "yellow",
    },
  ]

  const weeklyTrendData = [
    { week: "1주", ridership: 1420, satisfaction: 4.1, ontime: 91.2 },
    { week: "2주", ridership: 1520, satisfaction: 4.2, ontime: 92.8 },
    { week: "3주", ridership: 1580, satisfaction: 4.3, ontime: 93.5 },
    { week: "4주", ridership: 1650, satisfaction: 4.4, ontime: 94.2 },
    { week: "5주", ridership: 1680, satisfaction: 4.4, ontime: 94.2 },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "danger":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "danger":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiData.map((kpi) => {
          const IconComponent = kpi.icon
          const achievementRate = (kpi.current / kpi.target) * 100

          return (
            <Card key={kpi.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <IconComponent className={`h-5 w-5 text-${kpi.color}-600`} />
                    <h4 className="font-medium text-sm">{kpi.name}</h4>
                  </div>
                  {getStatusIcon(kpi.status)}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-bold">{kpi.current.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">{kpi.unit}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">
                      목표: {kpi.target.toLocaleString()}
                      {kpi.unit}
                    </span>
                    <span className={`font-medium ${getStatusColor(kpi.status)}`}>
                      {kpi.trend > 0 ? "+" : ""}
                      {kpi.trend.toFixed(1)}%
                    </span>
                  </div>

                  <Progress value={Math.min(achievementRate, 100)} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">달성률</span>
                    <Badge variant={achievementRate >= 100 ? "default" : "secondary"}>
                      {achievementRate.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>주간 이용객 추이</CardTitle>
            <CardDescription>최근 5주간 일평균 이용객 변화</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="ridership"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                    name="일평균 이용객"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>서비스 품질 지표</CardTitle>
            <CardDescription>만족도 및 정시 운행률 추이</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="satisfaction"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="만족도"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="ontime"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="정시 운행률"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>성과 요약</CardTitle>
          <CardDescription>주요 KPI 달성 현황 및 개선 필요 영역</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-green-600">목표 달성 지표</h4>
              {kpiData
                .filter((kpi) => kpi.status === "good")
                .map((kpi) => (
                  <div key={kpi.id} className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span className="text-sm">{kpi.name}</span>
                    <Badge variant="default" className="bg-green-600">
                      달성
                    </Badge>
                  </div>
                ))}
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-yellow-600">주의 필요 지표</h4>
              {kpiData
                .filter((kpi) => kpi.status === "warning")
                .map((kpi) => (
                  <div key={kpi.id} className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                    <span className="text-sm">{kpi.name}</span>
                    <Badge variant="secondary" className="bg-yellow-100">
                      주의
                    </Badge>
                  </div>
                ))}
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-red-600">개선 필요 지표</h4>
              {kpiData.filter((kpi) => kpi.status === "danger").length === 0 ? (
                <div className="p-2 bg-gray-50 rounded text-center">
                  <span className="text-sm text-gray-500">해당 없음</span>
                </div>
              ) : (
                kpiData
                  .filter((kpi) => kpi.status === "danger")
                  .map((kpi) => (
                    <div key={kpi.id} className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <span className="text-sm">{kpi.name}</span>
                      <Badge variant="destructive">개선 필요</Badge>
                    </div>
                  ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
