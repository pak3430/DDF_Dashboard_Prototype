"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

interface BudgetCalculatorProps {
  params: any
  results: any
}

export function BudgetCalculator({ params, results }: BudgetCalculatorProps) {
  const costBreakdown = [
    {
      category: "인건비",
      amount: params.vehicles * params.driverWage * params.operatingDays,
      percentage: 0,
      color: "#3b82f6",
    },
    {
      category: "연료비",
      amount: params.vehicles * params.fuelCost * params.operatingDays,
      percentage: 0,
      color: "#ef4444",
    },
    {
      category: "정비비",
      amount: params.vehicles * params.maintenanceCost,
      percentage: 0,
      color: "#10b981",
    },
  ]

  // Calculate percentages
  const total = costBreakdown.reduce((sum, item) => sum + item.amount, 0)
  costBreakdown.forEach((item) => {
    item.percentage = total > 0 ? Math.round((item.amount / total) * 100) : 0
  })

  const monthlyProjection = Array.from({ length: 12 }, (_, i) => ({
    month: `${i + 1}월`,
    cost: results.totalMonthlyCost,
    passengers: results.expectedPassengers,
    revenue: results.expectedPassengers * 2.5, // 2,500원 평균 요금
  }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>비용 구성</CardTitle>
            <CardDescription>월 운영비용 {results.totalMonthlyCost.toLocaleString()}만원 분석</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="amount"
                  >
                    {costBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${value.toLocaleString()}만원`, "비용"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {costBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{item.amount.toLocaleString()}만원</div>
                    <div className="text-xs text-gray-500">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>운영 효율성</CardTitle>
            <CardDescription>차량당 성과 지표</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(results.expectedPassengers / params.vehicles).toLocaleString()}명
                  </div>
                  <div className="text-sm text-blue-700">차량당 월 이용객</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(results.totalMonthlyCost / params.vehicles).toLocaleString()}만원
                  </div>
                  <div className="text-sm text-green-700">차량당 월 운영비</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.round((results.expectedPassengers / params.vehicles / params.operatingDays) * 10) / 10}명
                  </div>
                  <div className="text-sm text-orange-700">차량당 일 이용객</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round((results.expectedPassengers / params.vehicles / params.operatingHours) * 10) / 10}명
                  </div>
                  <div className="text-sm text-purple-700">차량당 시간 이용객</div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="text-sm text-gray-600">
                  <p className="mb-2">
                    <strong>효율성 평가:</strong>{" "}
                    {results.costPerPassenger < 3000
                      ? "매우 효율적"
                      : results.costPerPassenger < 5000
                        ? "효율적"
                        : "개선 필요"}
                  </p>
                  <p>
                    <strong>권장사항:</strong>{" "}
                    {params.vehicles < 15
                      ? "서비스 확대 검토"
                      : params.vehicles > 30
                        ? "운영 최적화 필요"
                        : "적정 규모 운영"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>연간 운영 전망</CardTitle>
          <CardDescription>월별 비용 및 수익 예측</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyProjection}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cost" fill="#ef4444" name="운영비용 (만원)" />
                <Bar dataKey="revenue" fill="#10b981" name="예상수익 (만원)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
