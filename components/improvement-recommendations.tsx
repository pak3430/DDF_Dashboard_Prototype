"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingUp, Users, Clock, DollarSign } from "lucide-react"

interface ImprovementRecommendationsProps {
  analysisType: string
}

const recommendations = [
  {
    zone: "역삼동",
    type: "red",
    priority: "긴급",
    issue: "차량 활용률 45%, 평균 대기시간 15.8분",
    solutions: ["차량 3대 추가 배치", "대기 지점 2곳 신설", "운행 시간 연장 (22시 → 24시)"],
    expectedImprovement: "활용률 +35%, 대기시간 -8분",
    cost: "월 450만원",
    timeline: "2주",
  },
  {
    zone: "방배동",
    type: "yellow",
    priority: "보통",
    issue: "만족도 3.6점, 비용 효율성 65%",
    solutions: ["노선 최적화", "배차 간격 조정", "승객 앱 개선"],
    expectedImprovement: "만족도 +0.7점, 효율성 +15%",
    cost: "월 180만원",
    timeline: "4주",
  },
  {
    zone: "서초구청",
    type: "yellow",
    priority: "보통",
    issue: "대기시간 8.9분, 서비스율 89%",
    solutions: ["예측 모델 정확도 향상", "실시간 배차 시스템 도입", "승객 분산 유도"],
    expectedImprovement: "대기시간 -3분, 서비스율 +6%",
    cost: "월 220만원",
    timeline: "6주",
  },
]

const quickWins = [
  {
    title: "배차 간격 최적화",
    description: "AI 기반 동적 배차로 대기시간 단축",
    impact: "전체 대기시간 15% 감소",
    effort: "낮음",
    cost: "무료",
  },
  {
    title: "승객 분산 유도",
    description: "앱 푸시 알림으로 혼잡 시간대 회피 유도",
    impact: "피크 시간 수요 10% 분산",
    effort: "낮음",
    cost: "월 50만원",
  },
  {
    title: "대기 지점 재배치",
    description: "수요 패턴 분석 기반 정류장 위치 조정",
    impact: "접근성 20% 향상",
    effort: "보통",
    cost: "월 100만원",
  },
]

export function ImprovementRecommendations({ analysisType }: ImprovementRecommendationsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>우선 개선 대상</CardTitle>
            <CardDescription>레드존 및 옐로우존 개선 방안</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className={`h-5 w-5 ${rec.type === "red" ? "text-red-500" : "text-yellow-500"}`} />
                      <div>
                        <div className="font-medium">{rec.zone}</div>
                        <div className="text-sm text-gray-600">{rec.issue}</div>
                      </div>
                    </div>
                    <Badge variant={rec.type === "red" ? "destructive" : "secondary"}>{rec.priority}</Badge>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm font-medium mb-2">개선 방안:</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {rec.solutions.map((solution, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-green-600">예상 효과</div>
                      <div className="text-xs text-gray-600">{rec.expectedImprovement}</div>
                    </div>
                    <div>
                      <div className="font-medium text-blue-600">소요 비용</div>
                      <div className="text-xs text-gray-600">{rec.cost}</div>
                    </div>
                    <div>
                      <div className="font-medium text-orange-600">구현 기간</div>
                      <div className="text-xs text-gray-600">{rec.timeline}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>빠른 개선 방안</CardTitle>
            <CardDescription>즉시 적용 가능한 효과적인 솔루션</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickWins.map((win, index) => (
                <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium text-blue-900">{win.title}</div>
                    <Badge variant="outline">{win.effort}</Badge>
                  </div>
                  <div className="text-sm text-blue-700 mb-3">{win.description}</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-green-600">예상 효과</div>
                      <div className="text-xs text-gray-600">{win.impact}</div>
                    </div>
                    <div>
                      <div className="font-medium text-orange-600">비용</div>
                      <div className="text-xs text-gray-600">{win.cost}</div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3">
                    적용하기
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>개선 효과 시뮬레이션</CardTitle>
          <CardDescription>권장 개선 방안 적용 시 예상되는 전체 성과 변화</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">+23%</div>
              <div className="text-sm text-green-700">전체 효율성 향상</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">-4.2분</div>
              <div className="text-sm text-blue-700">평균 대기시간 단축</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">+0.8점</div>
              <div className="text-sm text-purple-700">승객 만족도 향상</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">-12%</div>
              <div className="text-sm text-orange-700">운영비용 절감</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
