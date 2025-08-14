"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Plus, Trash2 } from "lucide-react"

interface ScenarioComparisonProps {
  currentParams: any
  currentResults: any
}

export function ScenarioComparison({ currentParams, currentResults }: ScenarioComparisonProps) {
  const [scenarios, setScenarios] = useState([
    {
      id: 1,
      name: "현재 설정",
      vehicles: currentParams.vehicles,
      cost: currentResults.totalMonthlyCost,
      passengers: currentResults.expectedPassengers,
      roi: currentResults.roi,
      type: "current",
    },
    {
      id: 2,
      name: "소규모 운영",
      vehicles: 5,
      cost: 1250,
      passengers: 680,
      roi: 8.5,
      type: "saved",
    },
    {
      id: 3,
      name: "대규모 운영",
      vehicles: 20,
      cost: 4800,
      passengers: 2850,
      roi: 22.3,
      type: "saved",
    },
    {
      id: 4,
      name: "효율성 중심",
      vehicles: 12,
      cost: 2950,
      passengers: 1680,
      roi: 18.7,
      type: "saved",
    },
  ])

  const addCurrentScenario = () => {
    const newScenario = {
      id: Date.now(),
      name: `시나리오 ${scenarios.length}`,
      vehicles: currentParams.vehicles,
      cost: currentResults.totalMonthlyCost,
      passengers: currentResults.expectedPassengers,
      roi: currentResults.roi,
      type: "saved" as const,
    }
    setScenarios([...scenarios, newScenario])
  }

  const removeScenario = (id: number) => {
    setScenarios(scenarios.filter((s) => s.id !== id))
  }

  const chartData = scenarios.map((scenario) => ({
    name: scenario.name,
    비용: scenario.cost,
    이용객: scenario.passengers / 10, // Scale down for chart visibility
    ROI: scenario.roi,
  }))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>시나리오 비교 분석</CardTitle>
          <CardDescription>다양한 운영 조건별 성과 비교</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-600">{scenarios.length}개 시나리오 비교 중</div>
            <Button onClick={addCurrentScenario} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              현재 설정 추가
            </Button>
          </div>

          <div className="h-[300px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="비용" fill="#ef4444" name="월 비용 (만원)" />
                <Bar dataKey="이용객" fill="#3b82f6" name="월 이용객 (×10명)" />
                <Bar dataKey="ROI" fill="#10b981" name="ROI (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((scenario) => (
              <div key={scenario.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-medium">{scenario.name}</div>
                    <div className="text-sm text-gray-600">차량 {scenario.vehicles}대 운영</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={scenario.type === "current" ? "default" : "outline"}>
                      {scenario.type === "current" ? "현재" : "저장됨"}
                    </Badge>
                    {scenario.type !== "current" && (
                      <Button variant="ghost" size="sm" onClick={() => removeScenario(scenario.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-red-600">{scenario.cost.toLocaleString()}만원</div>
                    <div className="text-gray-600">월 비용</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-blue-600">{scenario.passengers.toLocaleString()}명</div>
                    <div className="text-gray-600">월 이용객</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-600">{Math.round(scenario.roi)}%</div>
                    <div className="text-gray-600">ROI</div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t">
                  <div className="text-xs text-gray-500">
                    승객당 비용: {Math.round((scenario.cost / scenario.passengers) * 10000).toLocaleString()}원 | 차량당
                    이용객: {Math.round(scenario.passengers / scenario.vehicles)}명
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>최적 시나리오 추천</CardTitle>
          <CardDescription>목적별 최적 운영 방안</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="font-medium text-green-900 mb-2">수익성 최우선</div>
              <div className="text-sm text-green-700 mb-3">
                ROI가 가장 높은 시나리오를 선택하여 투자 효율성을 극대화합니다.
              </div>
              <div className="text-lg font-bold text-green-600">
                {scenarios.reduce((best, current) => (current.roi > best.roi ? current : best)).name}
              </div>
              <div className="text-sm text-green-600">
                ROI: {Math.round(scenarios.reduce((best, current) => (current.roi > best.roi ? current : best)).roi)}%
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="font-medium text-blue-900 mb-2">서비스 최우선</div>
              <div className="text-sm text-blue-700 mb-3">
                최대한 많은 이용객에게 서비스를 제공하여 공공성을 극대화합니다.
              </div>
              <div className="text-lg font-bold text-blue-600">
                {scenarios.reduce((best, current) => (current.passengers > best.passengers ? current : best)).name}
              </div>
              <div className="text-sm text-blue-600">
                월 이용객:{" "}
                {scenarios
                  .reduce((best, current) => (current.passengers > best.passengers ? current : best))
                  .passengers.toLocaleString()}
                명
              </div>
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="font-medium text-orange-900 mb-2">균형 최우선</div>
              <div className="text-sm text-orange-700 mb-3">
                비용 효율성과 서비스 품질의 균형을 고려한 최적 방안입니다.
              </div>
              <div className="text-lg font-bold text-orange-600">효율성 중심</div>
              <div className="text-sm text-orange-600">종합 점수: 85점</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
