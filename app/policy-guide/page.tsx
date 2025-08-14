"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuestionMappingCard } from "@/components/question-mapping-card"
import { Search, HelpCircle } from "lucide-react"

export default function PolicyGuidePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPhase, setSelectedPhase] = useState("all")
  const router = useRouter()

  // 정책 질문-기능 매핑 데이터
  const questionMappings = [
    // 도입 전 질문들
    {
      id: 1,
      question: "어느 지역에 DRT를 우선 도입해야 할까요?",
      category: "location",
      phase: "pre-implementation",
      description: "교통취약지 분석을 통해 우선 도입 지역을 파악합니다.",
      targetPage: "/heatmap",
      features: ["교통취약지 히트맵", "수요 예측 분석"],
      difficulty: "beginner",
      estimatedTime: "5분",
    },
    {
      id: 2,
      question: "예산이 얼마나 필요한가요?",
      category: "budget",
      phase: "pre-implementation",
      description: "차량 대수와 운영 조건에 따른 예산을 시뮬레이션합니다.",
      targetPage: "/budget-simulator",
      features: ["예산 시뮬레이터", "ROI 분석"],
      difficulty: "beginner",
      estimatedTime: "10분",
    },
    {
      id: 3,
      question: "어떤 운영 방식이 가장 효과적일까요?",
      category: "strategy",
      phase: "pre-implementation",
      description: "출퇴근형, 관광형, 교통약자형 등 다양한 시나리오를 비교합니다.",
      targetPage: "/scenario-comparison",
      features: ["시나리오 비교", "패턴 분석"],
      difficulty: "intermediate",
      estimatedTime: "15분",
    },
    {
      id: 4,
      question: "주요 시설물 주변 수요는 어떻게 될까요?",
      category: "demand",
      phase: "pre-implementation",
      description: "학교, 병원 등 POI 주변의 수요 패턴을 분석합니다.",
      targetPage: "/poi-analysis",
      features: ["POI 오버레이", "수요 상관관계 분석"],
      difficulty: "intermediate",
      estimatedTime: "12분",
    },

    // 도입 후 질문들
    {
      id: 5,
      question: "어느 지역이 가장 비효율적인가요?",
      category: "efficiency",
      phase: "post-implementation",
      description: "레드존 분석을 통해 저효율 지역을 파악하고 개선방안을 제시합니다.",
      targetPage: "/zone-analysis",
      features: ["레드/그린존 분석", "효율성 지표"],
      difficulty: "intermediate",
      estimatedTime: "8분",
    },
    {
      id: 6,
      question: "시간대별 수요 패턴은 어떻게 되나요?",
      category: "demand",
      phase: "post-implementation",
      description: "24시간 수요 변화와 거점별 패턴을 분석합니다.",
      targetPage: "/demand-forecast",
      features: ["수요예측 차트", "패턴 비교"],
      difficulty: "beginner",
      estimatedTime: "7분",
    },
    {
      id: 7,
      question: "운영 성과는 어떻게 측정하나요?",
      category: "performance",
      phase: "post-implementation",
      description: "KPI 지표와 실시간 모니터링을 통해 성과를 측정합니다.",
      targetPage: "/zone-analysis",
      features: ["KPI 대시보드", "실시간 모니터링"],
      difficulty: "advanced",
      estimatedTime: "20분",
    },

    // 효과 검증 질문들
    {
      id: 8,
      question: "DRT 도입 효과는 어떻게 검증하나요?",
      category: "validation",
      phase: "validation",
      description: "도입 전후 비교를 통해 정책 효과를 검증합니다.",
      targetPage: "/impact-analysis",
      features: ["효과 검증 지표", "전후 비교 분석"],
      difficulty: "advanced",
      estimatedTime: "25분",
    },
    {
      id: 9,
      question: "기존 교통수단에 미친 영향은?",
      category: "impact",
      phase: "validation",
      description: "버스, 택시 등 기존 교통수단의 이용 변화를 분석합니다.",
      targetPage: "/impact-analysis",
      features: ["대체효과 분석", "교통체계 통합"],
      difficulty: "advanced",
      estimatedTime: "18분",
    },
    {
      id: 10,
      question: "장기적 확산 가능성은 어떻게 평가하나요?",
      category: "expansion",
      phase: "validation",
      description: "성과 데이터를 바탕으로 확산 전략을 수립합니다.",
      targetPage: "/scenario-comparison",
      features: ["확산 시나리오", "지속가능성 평가"],
      difficulty: "expert",
      estimatedTime: "30분",
    },
  ]

  const filteredQuestions = questionMappings.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || q.category === selectedCategory
    const matchesPhase = selectedPhase === "all" || q.phase === selectedPhase
    return matchesSearch && matchesCategory && matchesPhase
  })

  const handleQuestionClick = (targetPage: string) => {
    router.push(targetPage)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500"
      case "intermediate":
        return "bg-yellow-500"
      case "advanced":
        return "bg-orange-500"
      case "expert":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "초급"
      case "intermediate":
        return "중급"
      case "advanced":
        return "고급"
      case "expert":
        return "전문가"
      default:
        return "미상"
    }
  }

  const getPhaseLabel = (phase: string) => {
    switch (phase) {
      case "pre-implementation":
        return "도입 전"
      case "post-implementation":
        return "도입 후"
      case "validation":
        return "효과 검증"
      default:
        return "기타"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="md:ml-64">
        <DashboardHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">정책 질문-기능 매핑 가이드</h1>
            <p className="text-gray-600">정책 담당자의 주요 질문에 대응하는 대시보드 기능을 빠르게 찾아보세요.</p>
          </div>

          {/* 검색 및 필터 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                질문 검색 및 필터
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="질문이나 키워드를 검색하세요..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 카테고리</SelectItem>
                    <SelectItem value="location">지역 분석</SelectItem>
                    <SelectItem value="budget">예산 계획</SelectItem>
                    <SelectItem value="strategy">운영 전략</SelectItem>
                    <SelectItem value="demand">수요 분석</SelectItem>
                    <SelectItem value="efficiency">효율성</SelectItem>
                    <SelectItem value="performance">성과 측정</SelectItem>
                    <SelectItem value="validation">효과 검증</SelectItem>
                    <SelectItem value="impact">영향 분석</SelectItem>
                    <SelectItem value="expansion">확산 전략</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedPhase} onValueChange={setSelectedPhase}>
                  <SelectTrigger>
                    <SelectValue placeholder="단계 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 단계</SelectItem>
                    <SelectItem value="pre-implementation">도입 전</SelectItem>
                    <SelectItem value="post-implementation">도입 후</SelectItem>
                    <SelectItem value="validation">효과 검증</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* 단계별 탭 */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="pre-implementation">도입 전</TabsTrigger>
              <TabsTrigger value="post-implementation">도입 후</TabsTrigger>
              <TabsTrigger value="validation">효과 검증</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredQuestions.map((question) => (
                  <QuestionMappingCard key={question.id} question={question} onNavigate={handleQuestionClick} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pre-implementation" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredQuestions
                  .filter((q) => q.phase === "pre-implementation")
                  .map((question) => (
                    <QuestionMappingCard key={question.id} question={question} onNavigate={handleQuestionClick} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="post-implementation" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredQuestions
                  .filter((q) => q.phase === "post-implementation")
                  .map((question) => (
                    <QuestionMappingCard key={question.id} question={question} onNavigate={handleQuestionClick} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="validation" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredQuestions
                  .filter((q) => q.phase === "validation")
                  .map((question) => (
                    <QuestionMappingCard key={question.id} question={question} onNavigate={handleQuestionClick} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* 검색 결과가 없을 때 */}
          {filteredQuestions.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <HelpCircle className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">검색 결과가 없습니다</h3>
                <p className="text-gray-600 mb-4">다른 키워드로 검색하거나 필터를 조정해보세요.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSelectedPhase("all")
                  }}
                >
                  필터 초기화
                </Button>
              </CardContent>
            </Card>
          )}

          {/* 도움말 섹션 */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                사용 가이드
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">난이도 표시</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500 text-white">초급</Badge>
                      <span className="text-sm">기본적인 데이터 확인</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-500 text-white">중급</Badge>
                      <span className="text-sm">분석 및 비교 기능</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-orange-500 text-white">고급</Badge>
                      <span className="text-sm">복합 분석 및 해석</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-500 text-white">전문가</Badge>
                      <span className="text-sm">고도의 전문 지식 필요</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">사용 팁</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 질문 카드를 클릭하면 해당 기능으로 바로 이동합니다</li>
                    <li>• 예상 소요 시간을 참고하여 분석 계획을 세우세요</li>
                    <li>• 단계별로 순서대로 진행하면 더 효과적입니다</li>
                    <li>• 검색 기능을 활용하여 원하는 질문을 빠르게 찾으세요</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
