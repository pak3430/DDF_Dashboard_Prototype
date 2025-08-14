"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

interface EfficiencyMetricsProps {
  analysisType: string
  timeRange: string
}

const efficiencyData = [
  { zone: "강남역", waitTime: 5.2, utilization: 92, satisfaction: 4.5, cost: 85 },
  { zone: "역삼동", waitTime: 15.8, utilization: 45, satisfaction: 2.1, cost: 35 },
  { zone: "서초구청", waitTime: 8.9, utilization: 72, satisfaction: 3.8, cost: 68 },
  { zone: "방배동", waitTime: 9.5, utilization: 69, satisfaction: 3.6, cost: 65 },
  { zone: "잠실역", waitTime: 6.1, utilization: 89, satisfaction: 4.3, cost: 82 },
  { zone: "송파구청", waitTime: 6.8, utilization: 85, satisfaction: 4.1, cost: 78 },
]

const radarData = [
  { metric: "대기시간", redZone: 15.8, yellowZone: 9.2, greenZone: 5.9 },
  { metric: "차량활용률", redZone: 48, yellowZone: 70, greenZone: 88 },
  { metric: "만족도", redZone: 2.3, yellowZone: 3.7, greenZone: 4.3 },
  { metric: "비용효율성", redZone: 42, yellowZone: 66, greenZone: 82 },
  { metric: "서비스율", redZone: 78, yellowZone: 91, greenZone: 96 },
]

export function EfficiencyMetrics({ analysisType, timeRange }: EfficiencyMetricsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>구역별 효율성 지표</CardTitle>
          <CardDescription>주요 KPI 기반 성과 비교</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="utilization" fill="#3b82f6" name="차량 활용률 (%)" />
                <Bar dataKey="cost" fill="#10b981" name="비용 효율성 (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>존별 성과 비교</CardTitle>
          <CardDescription>레드/옐로우/그린존 평균 지표</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="레드존" dataKey="redZone" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                <Radar name="옐로우존" dataKey="yellowZone" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                <Radar name="그린존" dataKey="greenZone" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>세부 성과 지표</CardTitle>
          <CardDescription>구역별 상세 KPI 분석</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">구역</th>
                  <th className="text-center p-2">등급</th>
                  <th className="text-center p-2">평균 대기시간</th>
                  <th className="text-center p-2">차량 활용률</th>
                  <th className="text-center p-2">만족도</th>
                  <th className="text-center p-2">비용 효율성</th>
                  <th className="text-center p-2">개선 우선순위</th>
                </tr>
              </thead>
              <tbody>
                {efficiencyData.map((zone, index) => {
                  const grade = zone.utilization > 80 ? "green" : zone.utilization > 60 ? "yellow" : "red"
                  const priority = grade === "red" ? "높음" : grade === "yellow" ? "보통" : "낮음"

                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium">{zone.zone}</td>
                      <td className="p-2 text-center">
                        <Badge variant={grade === "red" ? "destructive" : grade === "yellow" ? "secondary" : "default"}>
                          {grade === "red" ? "레드" : grade === "yellow" ? "옐로우" : "그린"}
                        </Badge>
                      </td>
                      <td className="p-2 text-center">{zone.waitTime}분</td>
                      <td className="p-2 text-center">{zone.utilization}%</td>
                      <td className="p-2 text-center">{zone.satisfaction}/5.0</td>
                      <td className="p-2 text-center">{zone.cost}%</td>
                      <td className="p-2 text-center">
                        <Badge variant={grade === "red" ? "destructive" : grade === "yellow" ? "secondary" : "outline"}>
                          {priority}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
