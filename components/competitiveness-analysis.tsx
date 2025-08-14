"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Car, Clock, DollarSign, Star } from "lucide-react"

const competitivenessData = [
  { category: "통행시간", drt: 85, car: 100, taxi: 90, bus: 65 },
  { category: "비용", drt: 90, car: 60, taxi: 40, bus: 95 },
  { category: "편의성", drt: 80, car: 95, taxi: 85, bus: 70 },
  { category: "접근성", drt: 95, car: 85, taxi: 90, bus: 75 },
  { category: "환경성", drt: 85, car: 30, taxi: 35, bus: 90 },
]

const radarData = [
  { subject: "통행시간", A: 85, fullMark: 100 },
  { subject: "비용효율성", A: 90, fullMark: 100 },
  { subject: "편의성", A: 80, fullMark: 100 },
  { subject: "접근성", A: 95, fullMark: 100 },
  { subject: "환경친화성", A: 85, fullMark: 100 },
]

const competitivenessMetrics = [
  {
    name: "종합 경쟁력 지수",
    value: "78.5%",
    icon: Star,
    description: "승용차 대비 종합 경쟁력",
    trend: "+5.2%",
  },
  {
    name: "통행시간 경쟁력",
    value: "85%",
    icon: Clock,
    description: "평균 통행시간 비교",
    trend: "+2.1%",
  },
  {
    name: "비용 경쟁력",
    value: "90%",
    icon: DollarSign,
    description: "km당 비용 효율성",
    trend: "+8.3%",
  },
  {
    name: "사용자 만족도",
    value: "4.2/5.0",
    icon: Car,
    description: "실제 이용자 평가",
    trend: "+0.3",
  },
]

export function CompetitivenessAnalysis() {
  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {competitivenessMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
              <div className="flex items-center mt-2">
                <Badge variant="secondary" className="text-xs">
                  {metric.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>교통수단별 경쟁력 비교</CardTitle>
            <CardDescription>각 평가 항목별 DRT와 기존 교통수단 비교</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={competitivenessData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="drt" fill="#3b82f6" name="DRT" />
                <Bar dataKey="car" fill="#ef4444" name="승용차" />
                <Bar dataKey="taxi" fill="#f59e0b" name="택시" />
                <Bar dataKey="bus" fill="#10b981" name="버스" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>DRT 종합 경쟁력 프로필</CardTitle>
            <CardDescription>5개 핵심 지표별 DRT 성능 분석</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="DRT" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>경쟁력 분석 상세</CardTitle>
          <CardDescription>각 평가 항목별 상세 분석 및 개선 방안</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {competitivenessData.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{item.category}</h4>
                  <span className="text-sm text-gray-600">{item.drt}%</span>
                </div>
                <Progress value={item.drt} className="h-2" />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>DRT: {item.drt}%</span>
                  <span>승용차: {item.car}%</span>
                  <span>택시: {item.taxi}%</span>
                  <span>버스: {item.bus}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
