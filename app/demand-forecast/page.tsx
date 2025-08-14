"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DemandChart } from "@/components/demand-chart"
import { PatternComparison } from "@/components/pattern-comparison"
import { PredictionAccuracy } from "@/components/prediction-accuracy"
import { DispatchRecommendation } from "@/components/dispatch-recommendation"
import { TrendingUp, Clock, Calendar, Target, AlertCircle, Download } from "lucide-react"

const stations = [
  { value: "all", label: "전체 거점" },
  { value: "gangnam", label: "강남역 거점" },
  { value: "jamsil", label: "잠실역 거점" },
  { value: "seocho", label: "서초구청 거점" },
  { value: "songpa", label: "송파구청 거점" },
  { value: "daechi", label: "대치역 거점" },
]

const timeRanges = [
  { value: "today", label: "오늘" },
  { value: "tomorrow", label: "내일" },
  { value: "week", label: "이번 주" },
  { value: "month", label: "이번 달" },
]

const predictionTypes = [
  { value: "demand", label: "수요 예측" },
  { value: "supply", label: "공급 최적화" },
  { value: "efficiency", label: "효율성 분석" },
]

export default function DemandForecastPage() {
  const [selectedStation, setSelectedStation] = useState("gangnam")
  const [selectedTimeRange, setSelectedTimeRange] = useState("today")
  const [selectedType, setSelectedType] = useState("demand")

  const handleExport = () => {
    console.log("Exporting demand forecast data...")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="md:ml-64">
        <main className="p-6">
          <DashboardHeader
            title="거점별 수요예측"
            description="MST-GCN 모델을 활용한 24시간 수요 변화 예측 및 최적 배차 전략 수립"
          />

          {/* Controls */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                예측 설정
              </CardTitle>
              <CardDescription>분석할 거점과 시간 범위를 선택하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">거점 선택</label>
                  <Select value={selectedStation} onValueChange={setSelectedStation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {stations.map((station) => (
                        <SelectItem key={station.value} value={station.value}>
                          {station.label}
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
                  <label className="text-sm font-medium mb-2 block">예측 유형</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {predictionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button onClick={handleExport} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    데이터 내보내기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">예상 최대 수요</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">247명</div>
                <p className="text-xs text-green-600">오후 6시 예상</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">평균 대기시간</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.3분</div>
                <p className="text-xs text-green-600">-1.2분 개선</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">예측 정확도</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-blue-600">지난 주 평균</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">권장 차량 수</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12대</div>
                <p className="text-xs text-orange-600">+2대 증차 권장</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="forecast" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="forecast">수요 예측</TabsTrigger>
              <TabsTrigger value="patterns">패턴 분석</TabsTrigger>
              <TabsTrigger value="accuracy">정확도</TabsTrigger>
              <TabsTrigger value="recommendations">배차 전략</TabsTrigger>
            </TabsList>

            <TabsContent value="forecast" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <DemandChart station={selectedStation} timeRange={selectedTimeRange} type={selectedType} />
                </div>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>실시간 상태</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">현재 대기 인원</span>
                          <Badge variant="default">23명</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">운행 중 차량</span>
                          <Badge variant="default">8대</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">평균 도착시간</span>
                          <Badge variant="secondary">6분</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">서비스율</span>
                          <Badge variant="default">96.8%</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>예측 알림</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                            <span className="text-sm font-medium text-orange-800">수요 급증 예상</span>
                          </div>
                          <p className="text-xs text-orange-600">오후 5-7시 평소 대비 +35% 예상</p>
                        </div>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800">배차 조정 권장</span>
                          </div>
                          <p className="text-xs text-blue-600">오후 4시부터 차량 2대 추가 투입 권장</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="patterns">
              <PatternComparison station={selectedStation} />
            </TabsContent>

            <TabsContent value="accuracy">
              <PredictionAccuracy station={selectedStation} />
            </TabsContent>

            <TabsContent value="recommendations">
              <DispatchRecommendation station={selectedStation} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
