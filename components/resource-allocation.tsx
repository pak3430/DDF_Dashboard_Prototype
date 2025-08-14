"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Car, Users, DollarSign, Clock, Target } from "lucide-react"

interface ResourceAllocationProps {
  analysisType: string
}

const allocationPlan = [
  {
    zone: "역삼동 (레드존)",
    currentVehicles: 5,
    recommendedVehicles: 8,
    currentBudget: 280,
    recommendedBudget: 450,
    priority: 1,
    expectedROI: "높음",
    timeline: "즉시",
  },
  {
    zone: "방배동 (옐로우존)",
    currentVehicles: 6,
    recommendedVehicles: 7,
    currentBudget: 320,
    recommendedBudget: 380,
    priority: 2,
    expectedROI: "보통",
    timeline: "2주",
  },
  {
    zone: "서초구청 (옐로우존)",
    currentVehicles: 7,
    recommendedVehicles: 8,
    currentBudget: 380,
    recommendedBudget: 420,
    priority: 3,
    expectedROI: "보통",
    timeline: "4주",
  },
]

const budgetBreakdown = [
  { category: "차량 운영비", current: 1200, recommended: 1450, percentage: 58 },
  { category: "인건비", current: 800, recommended: 950, percentage: 38 },
  { category: "시설 유지비", current: 150, recommended: 180, percentage: 7 },
  { category: "기술 개발비", current: 100, recommended: 120, percentage: 5 },
]

export function ResourceAllocation({ analysisType }: ResourceAllocationProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>우선순위별 자원 배분 계획</CardTitle>
              <CardDescription>효율성 개선을 위한 단계별 투자 전략</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allocationPlan.map((plan, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold text-sm">
                          {plan.priority}
                        </div>
                        <div>
                          <div className="font-medium">{plan.zone}</div>
                          <div className="text-sm text-gray-600">우선순위 {plan.priority}순위</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{plan.timeline}</Badge>
                        <div className="text-sm text-gray-600 mt-1">ROI: {plan.expectedROI}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Car className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium">차량 배치</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          현재: {plan.currentVehicles}대 → 권장: {plan.recommendedVehicles}대
                        </div>
                        <div className="text-xs text-green-600">
                          +{plan.recommendedVehicles - plan.currentVehicles}대 증차
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium">예산 배정</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          현재: {plan.currentBudget}만원 → 권장: {plan.recommendedBudget}만원
                        </div>
                        <div className="text-xs text-orange-600">
                          +{plan.recommendedBudget - plan.currentBudget}만원 증액
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <Button size="sm" className="w-full">
                        배분 계획 승인
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>예산 배분 현황</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgetBreakdown.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{item.category}</span>
                      <span className="text-sm text-gray-600">{item.percentage}%</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>현재: {item.current}만원</span>
                      <span>권장: {item.recommended}만원</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>투자 효과 예측</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">효율성 향상</span>
                  </div>
                  <span className="text-green-600 font-bold">+28%</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">대기시간 단축</span>
                  </div>
                  <span className="text-blue-600 font-bold">-5.2분</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">서비스 커버리지</span>
                  </div>
                  <span className="text-purple-600 font-bold">+15%</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium">ROI</span>
                  </div>
                  <span className="text-orange-600 font-bold">180%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>실행 일정</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">1단계: 역삼동</div>
                    <div className="text-gray-600">즉시 시작 (2주 완료)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">2단계: 방배동</div>
                    <div className="text-gray-600">2주 후 시작 (4주 완료)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">3단계: 서초구청</div>
                    <div className="text-gray-600">6주 후 시작 (8주 완료)</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
