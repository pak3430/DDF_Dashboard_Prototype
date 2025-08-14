"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Clock, DollarSign, Leaf, Target, FileText, BarChart3 } from "lucide-react"
import { BeforeAfterComparison } from "@/components/before-after-comparison"
import { KpiDashboard } from "@/components/kpi-dashboard"
import { TimeSeriesAnalysis } from "@/components/time-series-analysis"
import { SocialImpactMetrics } from "@/components/social-impact-metrics"
import { CostEffectivenessAnalysis } from "@/components/cost-effectiveness-analysis"
import { PolicyRecommendations } from "@/components/policy-recommendations"

export default function ImpactAnalysisPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [selectedRegion, setSelectedRegion] = useState("all")

  const overallMetrics = {
    serviceImprovement: 34,
    costReduction: 18,
    satisfactionIncrease: 42,
    accessibilityImprovement: 56,
    environmentalBenefit: 23,
    economicImpact: 28,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="md:ml-64">
        <main className="p-6">
          <DashboardHeader title="효과 검증 지표" description="DRT 도입 전후 비교를 통한 정책 효과 분석" />

          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-3">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">3개월</SelectItem>
                    <SelectItem value="6months">6개월</SelectItem>
                    <SelectItem value="1year">1년</SelectItem>
                    <SelectItem value="2years">2년</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 지역</SelectItem>
                    <SelectItem value="urban">도심권</SelectItem>
                    <SelectItem value="suburban">교외권</SelectItem>
                    <SelectItem value="rural">농촌권</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  보고서 생성
                </Button>
              </div>
            </div>

            {/* Overall Impact Summary */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">+{overallMetrics.serviceImprovement}%</div>
                  <div className="text-sm text-gray-600">서비스 개선</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">-{overallMetrics.costReduction}%</div>
                  <div className="text-sm text-gray-600">비용 절감</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600">+{overallMetrics.satisfactionIncrease}%</div>
                  <div className="text-sm text-gray-600">만족도 증가</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600">+{overallMetrics.accessibilityImprovement}%</div>
                  <div className="text-sm text-gray-600">접근성 개선</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Leaf className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-green-500">+{overallMetrics.environmentalBenefit}%</div>
                  <div className="text-sm text-gray-600">환경 개선</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <BarChart3 className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="text-2xl font-bold text-indigo-600">+{overallMetrics.economicImpact}%</div>
                  <div className="text-sm text-gray-600">경제적 효과</div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analysis Tabs */}
            <Tabs defaultValue="comparison" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
                <TabsTrigger value="comparison">전후 비교</TabsTrigger>
                <TabsTrigger value="kpi">핵심 지표</TabsTrigger>
                <TabsTrigger value="trends">시계열 분석</TabsTrigger>
                <TabsTrigger value="social">사회적 효과</TabsTrigger>
                <TabsTrigger value="cost">비용 효과</TabsTrigger>
                <TabsTrigger value="recommendations">개선 방안</TabsTrigger>
              </TabsList>

              <TabsContent value="comparison">
                <BeforeAfterComparison period={selectedPeriod} region={selectedRegion} />
              </TabsContent>

              <TabsContent value="kpi">
                <KpiDashboard period={selectedPeriod} region={selectedRegion} />
              </TabsContent>

              <TabsContent value="trends">
                <TimeSeriesAnalysis period={selectedPeriod} region={selectedRegion} />
              </TabsContent>

              <TabsContent value="social">
                <SocialImpactMetrics period={selectedPeriod} region={selectedRegion} />
              </TabsContent>

              <TabsContent value="cost">
                <CostEffectivenessAnalysis period={selectedPeriod} region={selectedRegion} />
              </TabsContent>

              <TabsContent value="recommendations">
                <PolicyRecommendations period={selectedPeriod} region={selectedRegion} />
              </TabsContent>
            </Tabs>

            {/* Success Indicators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  정책 성공도 평가
                </CardTitle>
                <CardDescription>설정된 목표 대비 달성도 현황</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">서비스 커버리지</span>
                      <Badge variant="default">목표 달성</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                    <div className="text-xs text-gray-600">92% (목표: 85%)</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">이용객 만족도</span>
                      <Badge variant="default">목표 달성</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "88%" }}></div>
                    </div>
                    <div className="text-xs text-gray-600">4.4/5.0 (목표: 4.0)</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">운영 효율성</span>
                      <Badge variant="secondary">진행 중</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "76%" }}></div>
                    </div>
                    <div className="text-xs text-gray-600">76% (목표: 80%)</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">비용 절감</span>
                      <Badge variant="default">목표 달성</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                    <div className="text-xs text-gray-600">18% 절감 (목표: 15%)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
