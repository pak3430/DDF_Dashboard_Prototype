"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Lightbulb, Target, AlertTriangle, CheckCircle, Clock, Users, DollarSign, TrendingUp } from "lucide-react"

interface PolicyRecommendationsProps {
  scenarios?: Array<{
    id: string
    name: string
    characteristics: {
      efficiency: number
      cost: number
      satisfaction: number
      coverage: number
    }
  }>
  period?: string
  region?: string
}

export function PolicyRecommendations({ scenarios, period, region }: PolicyRecommendationsProps) {
  const generateRecommendations = () => {
    const recommendations = []

    // If scenarios are provided (from scenario comparison page)
    if (scenarios && scenarios.length > 0) {
      const avgEfficiency = scenarios.reduce((sum, s) => sum + s.characteristics.efficiency, 0) / scenarios.length
      const avgCost = scenarios.reduce((sum, s) => sum + s.characteristics.cost, 0) / scenarios.length
      const avgSatisfaction = scenarios.reduce((sum, s) => sum + s.characteristics.satisfaction, 0) / scenarios.length

      if (avgEfficiency < 80) {
        recommendations.push({
          id: 1,
          priority: "high",
          category: "효율성 개선",
          title: "실시간 배차 시스템 고도화",
          description: "AI 기반 동적 배차 알고리즘 도입으로 운영 효율성 극대화",
          impact: `차량 활용률 ${100 - avgEfficiency}% 향상 예상`,
          cost: "초기 투자 800만원, 월 유지비 50만원",
          timeline: "3개월",
          status: "planning",
          benefits: ["효율성 향상", "비용 절감", "서비스 품질 개선"],
          risks: ["기술적 복잡성", "직원 교육 필요"],
        })
      }

      if (avgCost > 3000) {
        recommendations.push({
          id: 2,
          priority: "high",
          category: "비용 최적화",
          title: "운영 비용 절감 방안",
          description: "노선 최적화 및 차량 운영 효율성 개선을 통한 비용 절감",
          impact: `월 운영비 ${Math.round((avgCost - 3000) * 0.3)}만원 절감 예상`,
          cost: "컨설팅 비용 200만원",
          timeline: "2개월",
          status: "ready",
          benefits: ["운영비 절감", "효율성 향상", "수익성 개선"],
          risks: ["서비스 품질 저하 우려", "초기 조정 기간 필요"],
        })
      }

      if (avgSatisfaction < 4.0) {
        recommendations.push({
          id: 3,
          priority: "medium",
          category: "서비스 품질",
          title: "고객 만족도 개선 프로그램",
          description: "대기시간 단축 및 차량 내 편의시설 개선",
          impact: `만족도 ${(4.5 - avgSatisfaction).toFixed(1)}점 향상 예상`,
          cost: "월 150만원 추가 소요",
          timeline: "1개월",
          status: "evaluation",
          benefits: ["만족도 향상", "재이용률 증가", "브랜드 이미지 개선"],
          risks: ["추가 비용 발생", "효과 측정 어려움"],
        })
      }
    } else {
      // Generate recommendations based on period and region analysis
      const periodBasedRecommendations = getPeriodBasedRecommendations(period)
      const regionBasedRecommendations = getRegionBasedRecommendations(region)
      recommendations.push(...periodBasedRecommendations, ...regionBasedRecommendations)
    }

    // Add common recommendations
    recommendations.push(
      {
        id: 4,
        priority: "medium",
        category: "인프라 확충",
        title: "스마트 정류장 설치",
        description: "주요 거점에 디지털 정보 제공 스마트 정류장 구축",
        impact: "이용 편의성 향상, 브랜드 이미지 개선",
        cost: "정류장당 150만원, 총 10개소 1,500만원",
        timeline: "4개월",
        status: "proposal",
        benefits: ["편의성 향상", "정보 제공", "이미지 개선"],
        risks: ["높은 초기 비용", "유지보수 부담"],
      },
      {
        id: 5,
        priority: "low",
        category: "정책 연계",
        title: "타 교통수단 연계 강화",
        description: "지하철, 버스와의 환승 할인 및 통합 요금제 도입",
        impact: "대중교통 이용률 증가, 시너지 효과 창출",
        cost: "시스템 구축비 300만원, 할인 보전비 월 120만원",
        timeline: "6개월",
        status: "research",
        benefits: ["이용률 증가", "정책 연계", "시너지 효과"],
        risks: ["복잡한 협의 과정", "수익성 감소"],
      },
    )

    return recommendations
  }

  // Helper functions for period and region based recommendations
  const getPeriodBasedRecommendations = (period?: string) => {
    const recommendations = []

    if (period === "6months" || period === "1year") {
      recommendations.push({
        id: 10,
        priority: "high",
        category: "서비스 확대",
        title: "운영 시간 연장",
        description: "이용 패턴 분석 결과 야간 수요 증가로 운영시간 연장 필요",
        impact: "야간 이용객 30% 증가 예상",
        cost: "월 추가 운영비 200만원",
        timeline: "1개월",
        status: "ready",
        benefits: ["이용률 증가", "접근성 향상", "수익 증대"],
        risks: ["운영비 증가", "안전 관리 강화 필요"],
      })
    }

    if (period === "2years") {
      recommendations.push({
        id: 11,
        priority: "medium",
        category: "시스템 고도화",
        title: "예측 모델 정확도 개선",
        description: "2년간 축적된 데이터를 활용한 MST-GCN 모델 재학습",
        impact: "수요 예측 정확도 15% 향상",
        cost: "모델 개선비 500만원",
        timeline: "2개월",
        status: "planning",
        benefits: ["예측 정확도 향상", "효율성 개선", "비용 절감"],
        risks: ["기술적 복잡성", "검증 기간 필요"],
      })
    }

    return recommendations
  }

  const getRegionBasedRecommendations = (region?: string) => {
    const recommendations = []

    if (region === "rural") {
      recommendations.push({
        id: 12,
        priority: "high",
        category: "농촌 특화",
        title: "농촌형 DRT 서비스 모델",
        description: "농촌 지역 특성에 맞는 맞춤형 서비스 모델 도입",
        impact: "농촌 지역 교통 접근성 50% 향상",
        cost: "서비스 모델 개발비 300만원",
        timeline: "3개월",
        status: "evaluation",
        benefits: ["농촌 접근성", "사회적 가치", "정책 효과"],
        risks: ["수익성 확보 어려움", "운영 복잡성"],
      })
    }

    if (region === "urban") {
      recommendations.push({
        id: 13,
        priority: "medium",
        category: "도심 최적화",
        title: "도심 혼잡 구간 우회 서비스",
        description: "교통 혼잡 시간대 우회 경로 자동 설정 시스템",
        impact: "평균 이동시간 20% 단축",
        cost: "시스템 개발비 400만원",
        timeline: "2개월",
        status: "planning",
        benefits: ["이동시간 단축", "만족도 향상", "효율성 개선"],
        risks: ["복잡한 알고리즘", "실시간 처리 부하"],
      })
    }

    return recommendations
  }

  const recommendations = generateRecommendations()

  const implementationPlan = [
    { phase: "1단계 (1-3개월)", items: ["피크 시간대 차량 증편", "실시간 배차 시스템 고도화"] },
    { phase: "2단계 (4-6개월)", items: ["야간 서비스 시범 운영", "스마트 정류장 설치"] },
    { phase: "3단계 (7-12개월)", items: ["타 교통수단 연계 강화", "서비스 품질 고도화"] },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "planning":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "evaluation":
        return <Target className="h-4 w-4 text-orange-600" />
      case "proposal":
        return <Lightbulb className="h-4 w-4 text-purple-600" />
      case "research":
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "ready":
        return "즉시 실행 가능"
      case "planning":
        return "계획 수립 중"
      case "evaluation":
        return "타당성 검토"
      case "proposal":
        return "제안 단계"
      case "research":
        return "연구 필요"
      default:
        return status
    }
  }

  const priorityCounts = {
    high: recommendations.filter((r) => r.priority === "high").length,
    medium: recommendations.filter((r) => r.priority === "medium").length,
    low: recommendations.filter((r) => r.priority === "low").length,
  }

  return (
    <div className="space-y-6">
      {/* Priority Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{priorityCounts.high}</div>
            <div className="text-sm text-gray-600">고우선순위</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{priorityCounts.medium}</div>
            <div className="text-sm text-gray-600">중우선순위</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{priorityCounts.low}</div>
            <div className="text-sm text-gray-600">저우선순위</div>
          </CardContent>
        </Card>
      </div>

      {/* Scenario Analysis Summary - only show if scenarios are provided */}
      {scenarios && scenarios.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              선택된 시나리오 분석 결과
            </CardTitle>
            <CardDescription>{scenarios.map((s) => s.name).join(", ")} 패턴 기반 정책 제언</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-800">평균 효율성</div>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(scenarios.reduce((sum, s) => sum + s.characteristics.efficiency, 0) / scenarios.length)}%
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-medium text-green-800">평균 만족도</div>
                <div className="text-2xl font-bold text-green-600">
                  {(scenarios.reduce((sum, s) => sum + s.characteristics.satisfaction, 0) / scenarios.length).toFixed(
                    1,
                  )}
                  점
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="font-medium text-purple-800">평균 비용</div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(
                    scenarios.reduce((sum, s) => sum + s.characteristics.cost, 0) / scenarios.length,
                  ).toLocaleString()}
                  만원
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {(period || region) && !scenarios && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              분석 기간 및 지역 정보
            </CardTitle>
            <CardDescription>
              {period &&
                `분석 기간: ${period === "3months" ? "3개월" : period === "6months" ? "6개월" : period === "1year" ? "1년" : "2년"}`}
              {period && region && " | "}
              {region &&
                `대상 지역: ${region === "all" ? "전체 지역" : region === "urban" ? "도심권" : region === "suburban" ? "교외권" : "농촌권"}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-800">분석 기간</div>
                <div className="text-lg font-bold text-blue-600">
                  {period === "3months" ? "3개월" : period === "6months" ? "6개월" : period === "1year" ? "1년" : "2년"}
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-medium text-green-800">대상 지역</div>
                <div className="text-lg font-bold text-green-600">
                  {region === "all"
                    ? "전체 지역"
                    : region === "urban"
                      ? "도심권"
                      : region === "suburban"
                        ? "교외권"
                        : "농촌권"}
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="font-medium text-purple-800">제언 수</div>
                <div className="text-lg font-bold text-purple-600">{recommendations.length}개</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <Card key={rec.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={getPriorityColor(rec.priority)}>
                      {rec.priority === "high" && "고우선순위"}
                      {rec.priority === "medium" && "중우선순위"}
                      {rec.priority === "low" && "저우선순위"}
                    </Badge>
                    <Badge variant="outline">{rec.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{rec.title}</CardTitle>
                  <CardDescription>{rec.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(rec.status)}
                  <span className="text-sm text-gray-600">{getStatusText(rec.status)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      예상 효과
                    </h4>
                    <p className="text-sm text-gray-700">{rec.impact}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      소요 비용
                    </h4>
                    <p className="text-sm text-gray-700">{rec.cost}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      구현 기간
                    </h4>
                    <p className="text-sm text-gray-700">{rec.timeline}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-green-600">기대 효과</h4>
                    <div className="flex flex-wrap gap-1">
                      {rec.benefits.map((benefit, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 text-orange-600">고려사항</h4>
                    <div className="flex flex-wrap gap-1">
                      {rec.risks.map((risk, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {risk}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button size="sm" className="w-full">
                      상세 계획 보기
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Implementation Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            구현 로드맵
          </CardTitle>
          <CardDescription>단계별 정책 개선 계획</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {implementationPlan.map((phase, index) => (
              <div key={index} className="relative">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-2">{phase.phase}</h4>
                    <div className="space-y-1">
                      {phase.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {index < implementationPlan.length - 1 && (
                  <div className="absolute left-4 top-8 w-px h-6 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            성공 지표 및 모니터링
          </CardTitle>
          <CardDescription>정책 개선 효과 측정을 위한 핵심 지표</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="font-medium mb-2">이용객 증가율</div>
              <div className="text-2xl font-bold text-blue-600">+25%</div>
              <div className="text-sm text-gray-600">목표 달성률</div>
              <Progress value={85} className="mt-2 h-2" />
            </div>

            <div className="p-4 border rounded-lg">
              <div className="font-medium mb-2">만족도 개선</div>
              <div className="text-2xl font-bold text-green-600">4.6점</div>
              <div className="text-sm text-gray-600">목표: 4.5점</div>
              <Progress value={92} className="mt-2 h-2" />
            </div>

            <div className="p-4 border rounded-lg">
              <div className="font-medium mb-2">비용 효율성</div>
              <div className="text-2xl font-bold text-purple-600">-20%</div>
              <div className="text-sm text-gray-600">운영비 절감</div>
              <Progress value={80} className="mt-2 h-2" />
            </div>

            <div className="p-4 border rounded-lg">
              <div className="font-medium mb-2">커버리지 확대</div>
              <div className="text-2xl font-bold text-orange-600">95%</div>
              <div className="text-sm text-gray-600">목표: 90%</div>
              <Progress value={95} className="mt-2 h-2" />
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2">다음 분기 목표</h4>
            <ul className="text-sm space-y-1 text-blue-800">
              <li>• 피크 시간대 차량 증편으로 대기시간 12분 이하 달성</li>
              <li>• AI 배차 시스템 도입으로 차량 활용률 85% 달성</li>
              <li>• 야간 서비스 시범 운영으로 24시간 서비스 체계 구축</li>
              <li>• 이용자 만족도 4.6점 이상 유지</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
