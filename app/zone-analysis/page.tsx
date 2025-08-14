"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ZoneMap } from "@/components/zone-map"
import { EfficiencyMetrics } from "@/components/efficiency-metrics"
import { ImprovementRecommendations } from "@/components/improvement-recommendations"
import { ResourceAllocation } from "@/components/resource-allocation"
import { AlertTriangle, CheckCircle, BarChart3, MapPin, Settings, Download } from "lucide-react"

const analysisTypes = [
  { value: "efficiency", label: "효율성 분석" },
  { value: "utilization", label: "활용률 분석" },
  { value: "satisfaction", label: "만족도 분석" },
  { value: "cost", label: "비용 효율성" },
]

const timeRanges = [
  { value: "realtime", label: "실시간" },
  { value: "today", label: "오늘" },
  { value: "week", label: "이번 주" },
  { value: "month", label: "이번 달" },
]

const clusteringMethods = [
  { value: "kmeans", label: "K-means" },
  { value: "dbscan", label: "DBSCAN" },
  { value: "hierarchical", label: "계층적 클러스터링" },
]

export default function ZoneAnalysisPage() {
  const [selectedAnalysis, setSelectedAnalysis] = useState("efficiency")
  const [selectedTimeRange, setSelectedTimeRange] = useState("realtime")
  const [selectedMethod, setSelectedMethod] = useState("kmeans")

  const handleExport = () => {
    console.log("Exporting zone analysis data...")
  }

  const handleRecalculate = () => {
    console.log("Recalculating zones...")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="md:ml-64">
        <main className="p-6">
          <DashboardHeader
            title="레드/그린존 분석"
            description="서비스 효율성 클러스터링을 통한 저효율 지역 식별 및 개선 방안 도출"
          />

          {/* Controls */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                분석 설정
              </CardTitle>
              <CardDescription>클러스터링 방법과 분석 기준을 선택하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">분석 유형</label>
                  <Select value={selectedAnalysis} onValueChange={setSelectedAnalysis}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {analysisTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">시간 범위</label>
                  <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">클러스터링</label>
                  <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {clusteringMethods.map((method) => (
                        <SelectItem key={method.value} value={method.value}>
                          {method.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button onClick={handleRecalculate} className="w-full">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    재분석
                  </Button>
                </div>

                <div className="flex items-end">
                  <Button variant="outline" onClick={handleExport} className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    내보내기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Zone Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">레드존 (저효율)</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">8개 구역</div>
                <p className="text-xs text-red-600">즉시 개선 필요</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">옐로우존 (보통)</CardTitle>
                <MapPin className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">15개 구역</div>
                <p className="text-xs text-yellow-600">모니터링 필요</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">그린존 (고효율)</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">23개 구역</div>
                <p className="text-xs text-green-600">우수한 성과</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">전체 효율성</CardTitle>
                <BarChart3 className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">78.4%</div>
                <p className="text-xs text-blue-600">+2.1% 전월 대비</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="zones" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="zones">구역 분석</TabsTrigger>
              <TabsTrigger value="metrics">효율성 지표</TabsTrigger>
              <TabsTrigger value="recommendations">개선 방안</TabsTrigger>
              <TabsTrigger value="allocation">자원 배분</TabsTrigger>
            </TabsList>

            <TabsContent value="zones" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ZoneMap analysisType={selectedAnalysis} timeRange={selectedTimeRange} method={selectedMethod} />
                </div>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>클러스터링 결과</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                            <div>
                              <div className="font-medium text-red-900">레드존</div>
                              <div className="text-sm text-red-600">효율성 &lt; 60%</div>
                            </div>
                          </div>
                          <Badge variant="destructive">8개</Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                            <div>
                              <div className="font-medium text-yellow-900">옐로우존</div>
                              <div className="text-sm text-yellow-600">효율성 60-80%</div>
                            </div>
                          </div>
                          <Badge variant="secondary">15개</Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                            <div>
                              <div className="font-medium text-green-900">그린존</div>
                              <div className="text-sm text-green-600">효율성 &gt; 80%</div>
                            </div>
                          </div>
                          <Badge variant="default">23개</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>실시간 알림</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium text-red-800">긴급</span>
                          </div>
                          <p className="text-xs text-red-600">강남구 역삼동 효율성 급락 (45%)</p>
                          <p className="text-xs text-red-500 mt-1">3분 전</p>
                        </div>

                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-800">주의</span>
                          </div>
                          <p className="text-xs text-yellow-600">서초구 방배동 레드존 전환 위험</p>
                          <p className="text-xs text-yellow-500 mt-1">8분 전</p>
                        </div>

                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">개선</span>
                          </div>
                          <p className="text-xs text-green-600">송파구 잠실동 그린존 진입</p>
                          <p className="text-xs text-green-500 mt-1">15분 전</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="metrics">
              <EfficiencyMetrics analysisType={selectedAnalysis} timeRange={selectedTimeRange} />
            </TabsContent>

            <TabsContent value="recommendations">
              <ImprovementRecommendations analysisType={selectedAnalysis} />
            </TabsContent>

            <TabsContent value="allocation">
              <ResourceAllocation analysisType={selectedAnalysis} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
