"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  LineChart,
  Line,
} from "recharts"

interface ScenarioComparisonChartProps {
  scenarios: any[]
  comparisonMode: "performance" | "cost" | "satisfaction"
  onModeChange: (mode: "performance" | "cost" | "satisfaction") => void
}

export function ScenarioComparison({ scenarios, comparisonMode, onModeChange }: ScenarioComparisonChartProps) {
  if (scenarios.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-gray-500">
            <div className="text-lg font-medium mb-2">시나리오를 선택해주세요</div>
            <div className="text-sm">비교할 시나리오를 2개 이상 선택하면 분석 결과가 표시됩니다</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const chartData = scenarios.map((scenario) => ({
    name: scenario.name,
    효율성: scenario.characteristics.efficiency,
    비용: scenario.characteristics.cost / 100, // Scale for chart
    만족도: scenario.characteristics.satisfaction * 20, // Scale to 100
    커버리지: scenario.characteristics.coverage,
    일이용객: scenario.metrics.dailyPassengers / 10, // Scale for chart
    피크활용률: scenario.metrics.peakUtilization,
    대기시간: scenario.metrics.averageWaitTime,
  }))

  const radarData = [
    {
      metric: "효율성",
      ...scenarios.reduce((acc, scenario) => ({ ...acc, [scenario.name]: scenario.characteristics.efficiency }), {}),
    },
    {
      metric: "비용효율성",
      ...scenarios.reduce(
        (acc, scenario) => ({ ...acc, [scenario.name]: 100 - scenario.characteristics.cost / 50 }),
        {},
      ),
    },
    {
      metric: "만족도",
      ...scenarios.reduce(
        (acc, scenario) => ({ ...acc, [scenario.name]: scenario.characteristics.satisfaction * 20 }),
        {},
      ),
    },
    {
      metric: "커버리지",
      ...scenarios.reduce((acc, scenario) => ({ ...acc, [scenario.name]: scenario.characteristics.coverage }), {}),
    },
    {
      metric: "활용률",
      ...scenarios.reduce((acc, scenario) => ({ ...acc, [scenario.name]: scenario.metrics.peakUtilization }), {}),
    },
  ]

  const timeSeriesData = Array.from({ length: 24 }, (_, hour) => {
    const data: any = { hour: `${hour}:00` }
    scenarios.forEach((scenario) => {
      // Mock hourly demand pattern based on scenario type
      let demand = 0
      if (scenario.id === "commute") {
        demand = hour >= 7 && hour <= 9 ? 90 : hour >= 18 && hour <= 20 ? 85 : 20
      } else if (scenario.id === "tourism") {
        demand = hour >= 10 && hour <= 16 ? 80 : hour >= 19 && hour <= 21 ? 60 : 15
      } else if (scenario.id === "elderly") {
        demand = hour >= 9 && hour <= 11 ? 70 : hour >= 14 && hour <= 16 ? 65 : 25
      } else {
        demand = hour >= 7 && hour <= 9 ? 75 : hour >= 18 && hour <= 20 ? 70 : hour >= 10 && hour <= 16 ? 50 : 20
      }
      data[scenario.name] = demand + Math.random() * 10 - 5 // Add some variation
    })
    return data
  })

  const colors = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"]

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle>비교 분석 모드</CardTitle>
          <CardDescription>분석하고자 하는 관점을 선택하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant={comparisonMode === "performance" ? "default" : "outline"}
              onClick={() => onModeChange("performance")}
            >
              성과 비교
            </Button>
            <Button variant={comparisonMode === "cost" ? "default" : "outline"} onClick={() => onModeChange("cost")}>
              비용 비교
            </Button>
            <Button
              variant={comparisonMode === "satisfaction" ? "default" : "outline"}
              onClick={() => onModeChange("satisfaction")}
            >
              만족도 비교
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>
              {comparisonMode === "performance"
                ? "성과 지표 비교"
                : comparisonMode === "cost"
                  ? "비용 효율성 비교"
                  : "만족도 지표 비교"}
            </CardTitle>
            <CardDescription>시나리오별 주요 지표 비교</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {comparisonMode === "performance" && (
                    <>
                      <Bar dataKey="효율성" fill="#3b82f6" name="효율성 (%)" />
                      <Bar dataKey="커버리지" fill="#10b981" name="커버리지 (%)" />
                      <Bar dataKey="피크활용률" fill="#8b5cf6" name="피크 활용률 (%)" />
                    </>
                  )}
                  {comparisonMode === "cost" && (
                    <>
                      <Bar dataKey="비용" fill="#ef4444" name="월 비용 (×100만원)" />
                      <Bar dataKey="일이용객" fill="#10b981" name="일 이용객 (×10명)" />
                    </>
                  )}
                  {comparisonMode === "satisfaction" && (
                    <>
                      <Bar dataKey="만족도" fill="#8b5cf6" name="만족도 (×20점)" />
                      <Bar dataKey="대기시간" fill="#ef4444" name="대기시간 (분)" />
                    </>
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>종합 성과 비교</CardTitle>
            <CardDescription>다차원 지표 기반 종합 평가</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  {scenarios.map((scenario, index) => (
                    <Radar
                      key={scenario.id}
                      name={scenario.name}
                      dataKey={scenario.name}
                      stroke={colors[index]}
                      fill={colors[index]}
                      fillOpacity={0.3}
                    />
                  ))}
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Series Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>시간대별 수요 패턴 비교</CardTitle>
          <CardDescription>24시간 수요 변화 패턴 분석</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                {scenarios.map((scenario, index) => (
                  <Line
                    key={scenario.id}
                    type="monotone"
                    dataKey={scenario.name}
                    stroke={colors[index]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>상세 비교표</CardTitle>
          <CardDescription>시나리오별 세부 지표 비교</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">지표</th>
                  {scenarios.map((scenario) => (
                    <th key={scenario.id} className="text-center p-2">
                      {scenario.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">효율성</td>
                  {scenarios.map((scenario) => (
                    <td key={scenario.id} className="p-2 text-center">
                      {scenario.characteristics.efficiency}%
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">월 운영비용</td>
                  {scenarios.map((scenario) => (
                    <td key={scenario.id} className="p-2 text-center">
                      {scenario.characteristics.cost.toLocaleString()}만원
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">만족도</td>
                  {scenarios.map((scenario) => (
                    <td key={scenario.id} className="p-2 text-center">
                      {scenario.characteristics.satisfaction}/5.0
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">서비스 커버리지</td>
                  {scenarios.map((scenario) => (
                    <td key={scenario.id} className="p-2 text-center">
                      {scenario.characteristics.coverage}%
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">일 평균 이용객</td>
                  {scenarios.map((scenario) => (
                    <td key={scenario.id} className="p-2 text-center">
                      {scenario.metrics.dailyPassengers.toLocaleString()}명
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">평균 대기시간</td>
                  {scenarios.map((scenario) => (
                    <td key={scenario.id} className="p-2 text-center">
                      {scenario.metrics.averageWaitTime}분
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
