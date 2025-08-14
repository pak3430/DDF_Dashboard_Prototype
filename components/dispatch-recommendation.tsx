"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Car, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

interface DispatchRecommendationProps {
  station: string
}

const recommendations = [
  {
    time: "07:00-09:00",
    action: "차량 3대 추가 투입",
    reason: "출근 시간대 수요 급증 예상",
    impact: "대기시간 40% 단축",
    priority: "high",
    status: "pending",
  },
  {
    time: "12:00-14:00",
    action: "정상 운영 유지",
    reason: "안정적 수요 패턴",
    impact: "현재 서비스 수준 유지",
    priority: "low",
    status: "active",
  },
  {
    time: "17:00-19:00",
    action: "차량 2대 추가, 대기 지점 조정",
    reason: "퇴근 시간대 + 쇼핑 수요 중복",
    impact: "서비스율 15% 향상",
    priority: "high",
    status: "pending",
  },
  {
    time: "21:00-23:00",
    action: "차량 1대 감축",
    reason: "수요 감소, 효율성 최적화",
    impact: "운영비 12% 절감",
    priority: "medium",
    status: "scheduled",
  },
]

export function DispatchRecommendation({ station }: DispatchRecommendationProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>시간대별 배차 전략</CardTitle>
            <CardDescription>MST-GCN 예측 기반 최적 배차 계획</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium">{rec.time}</div>
                        <div className="text-sm text-gray-600">{rec.action}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "default" : "secondary"
                        }
                      >
                        {rec.priority === "high" ? "높음" : rec.priority === "medium" ? "보통" : "낮음"}
                      </Badge>
                      {rec.status === "active" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {rec.status === "pending" && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{rec.reason}</div>
                  <div className="text-sm font-medium text-blue-600">{rec.impact}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>운영 효율성</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-blue-500" />
                <span className="text-sm">차량 활용률</span>
              </div>
              <Badge variant="default">87.3%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" />
                <span className="text-sm">승객 만족도</span>
              </div>
              <Badge variant="default">4.2/5.0</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                <span className="text-sm">비용 효율성</span>
              </div>
              <Badge variant="secondary">우수</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>자동 배차 설정</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">자동 배차 활성화</span>
              <Badge variant="default">ON</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">임계값 설정</span>
              <span className="text-sm text-gray-600">대기시간 10분</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">알림 설정</span>
              <Badge variant="outline">실시간</Badge>
            </div>
            <Button className="w-full mt-4">배차 계획 적용</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>예상 효과</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>대기시간 단축</span>
                <span className="font-medium text-green-600">-2.3분</span>
              </div>
              <div className="flex justify-between">
                <span>서비스율 향상</span>
                <span className="font-medium text-blue-600">+5.2%</span>
              </div>
              <div className="flex justify-between">
                <span>운영비 절감</span>
                <span className="font-medium text-orange-600">-8.1%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
