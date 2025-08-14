"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ScenarioTemplates } from "@/components/scenario-templates"
import { ScenarioComparison as ScenarioComparisonChart } from "@/components/scenario-comparison-chart"
import { HybridScenarioBuilder } from "@/components/hybrid-scenario-builder"
import { PolicyRecommendations } from "@/components/policy-recommendations"
import { GitCompare, TrendingUp, Users, Clock, DollarSign, Target } from "lucide-react"

const predefinedScenarios = [
  {
    id: "commute",
    name: "출퇴근형",
    description: "직장인 출퇴근 시간대 집중 운영",
    icon: Clock,
    color: "blue",
    characteristics: {
      peakHours: "07-09시, 18-20시",
      targetUsers: "직장인, 학생",
      servicePattern: "고빈도 단거리",
      efficiency: 85,
      cost: 3200,
      satisfaction: 4.2,
      coverage: 78,
    },
    metrics: {
      dailyPassengers: 1250,
      peakUtilization: 95,
      offPeakUtilization: 35,
      averageDistance: 3.2,
      averageWaitTime: 6.5,
    },
  },
  {
    id: "tourism",
    name: "관광형",
    description: "관광지 연계 및 여가 활동 지원",
    icon: Users,
    color: "green",
    characteristics: {
      peakHours: "10-16시, 주말 집중",
      targetUsers: "관광객, 여가 이용자",
      servicePattern: "중빈도 중거리",
      efficiency: 72,
      cost: 2800,
      satisfaction: 4.5,
      coverage: 85,
    },
    metrics: {
      dailyPassengers: 980,
      peakUtilization: 88,
      offPeakUtilization: 45,
      averageDistance: 5.8,
      averageWaitTime: 8.2,
    },
  },
  {
    id: "elderly",
    name: "교통약자형",
    description: "고령자 및 교통약자 맞춤 서비스",
    icon: Target,
    color: "purple",
    characteristics: {
      peakHours: "09-11시, 14-16시",
      targetUsers: "고령자, 장애인",
      servicePattern: "저빈도 고서비스",
      efficiency: 68,
      cost: 3800,
      satisfaction: 4.7,
      coverage: 92,
    },
    metrics: {
      dailyPassengers: 650,
      peakUtilization: 75,
      offPeakUtilization: 55,
      averageDistance: 4.1,
      averageWaitTime: 5.8,
    },
  },
  {
    id: "mixed",
    name: "혼합형",
    description: "다양한 수요 패턴을 종합한 균형 운영",
    icon: GitCompare,
    color: "orange",
    characteristics: {
      peakHours: "다중 피크",
      targetUsers: "전 연령층",
      servicePattern: "적응형 운영",
      efficiency: 78,
      cost: 3400,
      satisfaction: 4.3,
      coverage: 88,
    },
    metrics: {
      dailyPassengers: 1100,
      peakUtilization: 82,
      offPeakUtilization: 48,
      averageDistance: 4.2,
      averageWaitTime: 7.1,
    },
  },
]

export default function ScenarioComparisonPage() {
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>(["commute", "tourism"])
  const [comparisonMode, setComparisonMode] = useState<"performance" | "cost" | "satisfaction">("performance")

  const handleScenarioToggle = (scenarioId: string) => {
    setSelectedScenarios((prev) =>
      prev.includes(scenarioId) ? prev.filter((id) => id !== scenarioId) : [...prev, scenarioId],
    )
  }

  const selectedScenarioData = predefinedScenarios.filter((scenario) => selectedScenarios.includes(scenario.id))

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="md:ml-64">
        <main className="p-6">
          <DashboardHeader
            title="시나리오 비교"
            description="사전 정의된 정책 패턴별 수요 및 성과 비교를 통한 최적 운영 방안 도출"
          />

          {/* Scenario Selection */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitCompare className="h-5 w-5" />
                시나리오 선택
              </CardTitle>
              <CardDescription>비교할 운영 패턴을 선택하세요 (최대 4개)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {predefinedScenarios.map((scenario) => {
                  const isSelected = selectedScenarios.includes(scenario.id)
                  const IconComponent = scenario.icon

                  return (
                    <div
                      key={scenario.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? `border-${scenario.color}-500 bg-${scenario.color}-50`
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleScenarioToggle(scenario.id)}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Checkbox checked={isSelected} onChange={() => {}} />
                        <IconComponent className={`h-5 w-5 text-${scenario.color}-600`} />
                        <div className="font-medium">{scenario.name}</div>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">{scenario.description}</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <div className="font-medium">효율성</div>
                          <div className="text-gray-600">{scenario.characteristics.efficiency}%</div>
                        </div>
                        <div>
                          <div className="font-medium">만족도</div>
                          <div className="text-gray-600">{scenario.characteristics.satisfaction}/5.0</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">{selectedScenarios.length}개 시나리오 선택됨 (최대 4개)</div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setComparisonMode("performance")}
                    className={comparisonMode === "performance" ? "bg-blue-50" : ""}
                  >
                    성과 비교
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setComparisonMode("cost")}
                    className={comparisonMode === "cost" ? "bg-blue-50" : ""}
                  >
                    비용 비교
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setComparisonMode("satisfaction")}
                    className={comparisonMode === "satisfaction" ? "bg-blue-50" : ""}
                  >
                    만족도 비교
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Results */}
          {selectedScenarios.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">최고 효율성</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.max(...selectedScenarioData.map((s) => s.characteristics.efficiency))}%
                  </div>
                  <p className="text-xs text-green-600">
                    {
                      selectedScenarioData.find(
                        (s) =>
                          s.characteristics.efficiency ===
                          Math.max(...selectedScenarioData.map((s) => s.characteristics.efficiency)),
                      )?.name
                    }{" "}
                    패턴
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">최저 비용</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.min(...selectedScenarioData.map((s) => s.characteristics.cost)).toLocaleString()}만원
                  </div>
                  <p className="text-xs text-blue-600">
                    {
                      selectedScenarioData.find(
                        (s) =>
                          s.characteristics.cost ===
                          Math.min(...selectedScenarioData.map((s) => s.characteristics.cost)),
                      )?.name
                    }{" "}
                    패턴
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">최고 만족도</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.max(...selectedScenarioData.map((s) => s.characteristics.satisfaction))}/5.0
                  </div>
                  <p className="text-xs text-purple-600">
                    {
                      selectedScenarioData.find(
                        (s) =>
                          s.characteristics.satisfaction ===
                          Math.max(...selectedScenarioData.map((s) => s.characteristics.satisfaction)),
                      )?.name
                    }{" "}
                    패턴
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">최대 커버리지</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.max(...selectedScenarioData.map((s) => s.characteristics.coverage))}%
                  </div>
                  <p className="text-xs text-orange-600">
                    {
                      selectedScenarioData.find(
                        (s) =>
                          s.characteristics.coverage ===
                          Math.max(...selectedScenarioData.map((s) => s.characteristics.coverage)),
                      )?.name
                    }{" "}
                    패턴
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Content */}
          <Tabs defaultValue="templates" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="templates">시나리오 템플릿</TabsTrigger>
              <TabsTrigger value="comparison">비교 분석</TabsTrigger>
              <TabsTrigger value="hybrid">혼합 시나리오</TabsTrigger>
              <TabsTrigger value="recommendations">정책 제언</TabsTrigger>
            </TabsList>

            <TabsContent value="templates">
              <ScenarioTemplates scenarios={predefinedScenarios} selectedScenarios={selectedScenarios} />
            </TabsContent>

            <TabsContent value="comparison">
              <ScenarioComparisonChart
                scenarios={selectedScenarioData}
                comparisonMode={comparisonMode}
                onModeChange={setComparisonMode}
              />
            </TabsContent>

            <TabsContent value="hybrid">
              <HybridScenarioBuilder scenarios={predefinedScenarios} />
            </TabsContent>

            <TabsContent value="recommendations">
              <PolicyRecommendations scenarios={selectedScenarioData} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
