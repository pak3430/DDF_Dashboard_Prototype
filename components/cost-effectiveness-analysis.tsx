"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, Calculator, PieChartIcon } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

interface CostEffectivenessAnalysisProps {
  period: string
  region: string
}

export function CostEffectivenessAnalysis({ period, region }: CostEffectivenessAnalysisProps) {
  const costBreakdown = [
    { category: "차량 운영비", amount: 1850, percentage: 59.7, color: "#3b82f6" },
    { category: "인건비", amount: 780, percentage: 25.2, color: "#8b5cf6" },
    { category: "연료비", amount: 280, percentage: 9.0, color: "#f59e0b" },
    { category: "유지보수비", amount: 120, percentage: 3.9, color: "#ef4444" },
    { category: "기타", amount: 70, percentage: 2.3, color: "#10b981" },
  ]

  const roiData = [
    { month: "1개월", investment: 3100, benefit: 1200, roi: -61.3 },
    { month: "3개월", investment: 3100, benefit: 2100, roi: -32.3 },
    { month: "6개월", investment: 3100, benefit: 2800, roi: -9.7 },
    { month: "12개월", investment: 3100, benefit: 3400, roi: 9.7 },
    { month: "24개월", investment: 3100, benefit: 4200, roi: 35.5 },
    { month: "36개월", investment: 3100, benefit: 4800, roi: 54.8 },
  ]

  const comparisonData = [
    {
      service: "기존 버스",
      costPerKm: 4200,
      costPerPassenger: 2800,
      satisfaction: 3.2,
      coverage: 68,
    },
    {
      service: "DRT",
      costPerKm: 2850,
      costPerPassenger: 1850,
      satisfaction: 4.4,
      coverage: 92,
    },
    {
      service: "택시 보조",
      costPerKm: 8500,
      costPerPassenger: 6200,
      satisfaction: 4.1,
      coverage: 95,
    },
  ]

  const benefitCategories = [
    {
      category: "직접 편익",
      items: [
        { name: "운영비 절감", value: 700, unit: "만원/월" },
        { name: "연료비 절약", value: 180, unit: "만원/월" },
        { name: "유지비 절감", value: 120, unit: "만원/월" },
      ],
    },
    {
      category: "간접 편익",
      items: [
        { name: "시간 절약 가치", value: 420, unit: "만원/월" },
        { name: "환경 개선 효과", value: 150, unit: "만원/월" },
        { name: "사회적 비용 절감", value: 280, unit: "만원/월" },
      ],
    },
    {
      category: "사회적 편익",
      items: [
        { name: "고용 창출 효과", value: 320, unit: "만원/월" },
        { name: "지역경제 활성화", value: 450, unit: "만원/월" },
        { name: "복지 비용 절감", value: 180, unit: "만원/월" },
      ],
    },
  ]

  const totalBenefit = benefitCategories.reduce(
    (total, category) => total + category.items.reduce((sum, item) => sum + item.value, 0),
    0,
  )

  const totalCost = 3100
  const netBenefit = totalBenefit - totalCost
  const benefitCostRatio = totalBenefit / totalCost

  return (
    <div className="space-y-6">
      {/* Cost-Benefit Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">{totalCost.toLocaleString()}만원</div>
            <div className="text-sm text-gray-600">월 총 비용</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{totalBenefit.toLocaleString()}만원</div>
            <div className="text-sm text-gray-600">월 총 편익</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Calculator className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">+{netBenefit.toLocaleString()}만원</div>
            <div className="text-sm text-gray-600">순 편익</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <PieChartIcon className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{benefitCostRatio.toFixed(2)}</div>
            <div className="text-sm text-gray-600">편익/비용 비율</div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Breakdown and ROI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>비용 구성</CardTitle>
            <CardDescription>월 운영비 3,100만원 세부 내역</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) => `${category} ${percentage.toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {costBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}만원`, "금액"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>투자 회수 기간</CardTitle>
            <CardDescription>시간별 ROI 변화 추이</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={roiData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, "ROI"]} />
                  <Line type="monotone" dataKey="roi" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-gray-600">약 12개월 후 투자 회수, 24개월 후 35.5% ROI 달성 예상</div>
          </CardContent>
        </Card>
      </div>

      {/* Service Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>교통수단별 비용 효율성 비교</CardTitle>
          <CardDescription>DRT vs 기존 교통수단 비용 대비 효과 분석</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="service" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="costPerPassenger" fill="#3b82f6" name="승객당 비용(원)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {comparisonData.map((service, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="font-medium mb-3">{service.service}</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>km당 비용:</span>
                    <span>{service.costPerKm.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>승객당 비용:</span>
                    <span>{service.costPerPassenger.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>만족도:</span>
                    <span>{service.satisfaction}/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>커버리지:</span>
                    <span>{service.coverage}%</span>
                  </div>
                </div>
                {service.service === "DRT" && <Badge className="w-full mt-3 justify-center">최적 효율</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefit Categories */}
      <Card>
        <CardHeader>
          <CardTitle>편익 분석</CardTitle>
          <CardDescription>DRT 도입으로 인한 다양한 편익 효과</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefitCategories.map((category, index) => {
              const categoryTotal = category.items.reduce((sum, item) => sum + item.value, 0)
              const categoryPercentage = (categoryTotal / totalBenefit) * 100

              return (
                <div key={index} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{category.category}</h4>
                    <Badge variant="outline">{categoryPercentage.toFixed(1)}%</Badge>
                  </div>

                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-1">
                        <div className="flex justify-between items-center text-sm">
                          <span>{item.name}</span>
                          <span className="font-medium">
                            {item.value.toLocaleString()}
                            {item.unit}
                          </span>
                        </div>
                        <Progress value={(item.value / totalBenefit) * 100} className="h-1" />
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center font-medium">
                      <span>소계</span>
                      <span>{categoryTotal.toLocaleString()}만원</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Economic Impact Summary */}
      <Card>
        <CardHeader>
          <CardTitle>경제적 영향 요약</CardTitle>
          <CardDescription>DRT 도입의 종합적 경제 효과</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-green-600">긍정적 효과</h4>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-green-50 rounded">
                  <div className="font-medium">비용 효율성</div>
                  <div>기존 대비 34% 운영비 절감 달성</div>
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <div className="font-medium">투자 회수</div>
                  <div>12개월 내 투자 회수, 높은 ROI 실현</div>
                </div>
                <div className="p-3 bg-purple-50 rounded">
                  <div className="font-medium">사회적 가치</div>
                  <div>월 850만원 상당의 사회적 편익 창출</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-orange-600">향후 전망</h4>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-orange-50 rounded">
                  <div className="font-medium">규모 확대</div>
                  <div>서비스 확대 시 규모의 경제 효과 기대</div>
                </div>
                <div className="p-3 bg-indigo-50 rounded">
                  <div className="font-medium">기술 발전</div>
                  <div>자율주행 등 신기술 도입으로 추가 비용 절감</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded">
                  <div className="font-medium">정책 확산</div>
                  <div>성공 모델로 타 지역 확산 가능성</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
