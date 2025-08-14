"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { Car, Bus, Train, BarChart3, TrendingUp, TrendingDown } from "lucide-react"

interface ModalSplitChartProps {
  type: "current" | "simulation" | "comparison"
}

const currentData = [
  { name: "승용차", value: 57.3, color: "#ef4444", icon: Car },
  { name: "버스", value: 25.6, color: "#10b981", icon: Bus },
  { name: "지하철", value: 15.4, color: "#3b82f6", icon: Train },
  { name: "택시", value: 1.7, color: "#f59e0b", icon: Car },
]

const simulationData = [
  { name: "승용차", value: 45.2, color: "#ef4444", icon: Car },
  { name: "버스", value: 28.4, color: "#10b981", icon: Bus },
  { name: "DRT", value: 23.7, color: "#8b5cf6", icon: BarChart3 },
  { name: "지하철", value: 2.7, color: "#3b82f6", icon: Train },
]

const comparisonData = [
  { name: "승용차", before: 57.3, after: 45.2, change: -12.1 },
  { name: "버스", before: 25.6, after: 28.4, change: +2.8 },
  { name: "지하철", before: 15.4, after: 2.7, change: -12.7 },
  { name: "택시", before: 1.7, after: 0, change: -1.7 },
  { name: "DRT", before: 0, after: 23.7, change: +23.7 },
]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={12}>
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  )
}

export function ModalSplitChart({ type }: ModalSplitChartProps) {
  if (type === "current") {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={currentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {currentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">교통수단별 분담률</h4>
            {currentData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                  <item.icon className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{item.value}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>현황 분석</CardTitle>
            <CardDescription>기존 교통수단 이용 패턴 특성</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">주요 문제점</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• 승용차 의존도 과도하게 높음 (57.3%)</li>
                  <li>• 대중교통 접근성 부족</li>
                  <li>• 교통 혼잡 및 환경 문제 심화</li>
                </ul>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">개선 기회</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• DRT 도입으로 승용차 대체 가능</li>
                  <li>• 대중교통 연계 강화 필요</li>
                  <li>• 지속가능한 교통체계 구축</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (type === "simulation") {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={simulationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {simulationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">DRT 도입 후 예상 분담률</h4>
            {simulationData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                  <item.icon className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">{item.name}</span>
                  {item.name === "DRT" && <Badge className="bg-purple-100 text-purple-800 text-xs">NEW</Badge>}
                </div>
                <div className="text-right">
                  <div className="font-bold">{item.value}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>시뮬레이션 결과</CardTitle>
            <CardDescription>MST-GCN 모델 기반 DRT 도입 효과 예측</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">DRT 효과</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• 신규 교통수단으로 23.7% 분담</li>
                  <li>• 승용차 이용 12.1% 감소</li>
                  <li>• 교통 접근성 크게 개선</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">환경 효과</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• CO2 배출량 15% 감소</li>
                  <li>• 교통 혼잡 완화</li>
                  <li>• 지속가능한 교통체계</li>
                </ul>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">사회적 효과</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 교통약자 이동권 보장</li>
                  <li>• 교통비 부담 경감</li>
                  <li>• 지역 균형 발전</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (type === "comparison") {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>교통수단별 분담률 변화</CardTitle>
            <CardDescription>DRT 도입 전후 비교 분석</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="before" fill="#94a3b8" name="도입 전" />
                <Bar dataKey="after" fill="#3b82f6" name="도입 후" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {comparisonData.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="text-center">
                  <h4 className="font-medium mb-2">{item.name}</h4>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {item.change > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : item.change < 0 ? (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    ) : null}
                    <span
                      className={`font-bold ${
                        item.change > 0 ? "text-green-600" : item.change < 0 ? "text-red-600" : "text-gray-600"
                      }`}
                    >
                      {item.change > 0 ? "+" : ""}
                      {item.change}%p
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {item.before}% → {item.after}%
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>전환 패턴 분석</CardTitle>
            <CardDescription>교통수단 간 이용자 전환 흐름</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-3">DRT로의 전환 (23.7%)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">12.1%</div>
                    <div className="text-sm text-gray-600">승용차에서</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">9.9%</div>
                    <div className="text-sm text-gray-600">지하철에서</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">1.7%</div>
                    <div className="text-sm text-gray-600">택시에서</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-3">버스 이용 증가 (2.8%)</h4>
                <p className="text-sm text-green-700">
                  DRT와 버스 간 연계 서비스 강화로 버스 이용률도 함께 증가하는 시너지 효과 발생
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-3">예상 효과</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium mb-2">교통 개선</h5>
                    <ul className="space-y-1 text-blue-700">
                      <li>• 도로 교통량 12% 감소</li>
                      <li>• 평균 통행시간 8분 단축</li>
                      <li>• 주차 수요 15% 감소</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">환경 개선</h5>
                    <ul className="space-y-1 text-blue-700">
                      <li>• 연간 CO2 2,400톤 감소</li>
                      <li>• 대기질 개선</li>
                      <li>• 소음 공해 감소</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
