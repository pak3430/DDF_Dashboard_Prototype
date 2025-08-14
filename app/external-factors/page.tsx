"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WeatherAnalysis } from "@/components/weather-analysis"
import { EventAnalysis } from "@/components/event-analysis"
import { HolidayAnalysis } from "@/components/holiday-analysis"
import { ExternalFactorsSummary } from "@/components/external-factors-summary"
import { Cloud, Calendar, Umbrella, Sun, RefreshCw } from "lucide-react"

export default function ExternalFactorsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="md:ml-64">
        <DashboardHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">외부 변수 영향 분석</h1>
            <p className="text-gray-600">
              날씨, 이벤트, 휴일 등 외부 요인이 DRT 수요에 미치는 영향을 분석하여 예측 정확도를 향상시킵니다.
            </p>
          </div>

          {/* 필터 컨트롤 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                분석 설정
              </CardTitle>
              <CardDescription>분석할 기간과 지역을 선택하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">분석 기간</label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">최근 1주일</SelectItem>
                      <SelectItem value="month">최근 1개월</SelectItem>
                      <SelectItem value="quarter">최근 3개월</SelectItem>
                      <SelectItem value="year">최근 1년</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">분석 지역</label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체 지역</SelectItem>
                      <SelectItem value="gangnam">강남구</SelectItem>
                      <SelectItem value="seocho">서초구</SelectItem>
                      <SelectItem value="songpa">송파구</SelectItem>
                      <SelectItem value="gangdong">강동구</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button onClick={handleRefresh} disabled={isLoading} className="w-full">
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                    데이터 새로고침
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 요약 대시보드 */}
          <ExternalFactorsSummary period={selectedPeriod} region={selectedRegion} />

          {/* 상세 분석 탭 */}
          <Tabs defaultValue="weather" className="mt-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="weather" className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                날씨 영향
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                이벤트 영향
              </TabsTrigger>
              <TabsTrigger value="holidays" className="flex items-center gap-2">
                <Umbrella className="h-4 w-4" />
                휴일 영향
              </TabsTrigger>
              <TabsTrigger value="combined" className="flex items-center gap-2">
                <Cloud className="h-4 w-4" />
                통합 분석
              </TabsTrigger>
            </TabsList>

            <TabsContent value="weather" className="mt-6">
              <WeatherAnalysis period={selectedPeriod} region={selectedRegion} />
            </TabsContent>

            <TabsContent value="events" className="mt-6">
              <EventAnalysis period={selectedPeriod} region={selectedRegion} />
            </TabsContent>

            <TabsContent value="holidays" className="mt-6">
              <HolidayAnalysis period={selectedPeriod} region={selectedRegion} />
            </TabsContent>

            <TabsContent value="combined" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>통합 외부 변수 영향 분석</CardTitle>
                  <CardDescription>
                    모든 외부 요인을 종합하여 DRT 수요에 미치는 복합적 영향을 분석합니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-4">외부 변수 기여도</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">날씨 요인</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                              <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">35%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">이벤트 요인</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                              <div className="w-1/2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">25%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">휴일 요인</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                              <div className="w-2/5 h-2 bg-purple-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">20%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">기타 요인</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                              <div className="w-1/5 h-2 bg-orange-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">20%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">예측 정확도 개선</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-green-500">개선됨</Badge>
                            <span className="font-medium">기본 모델 대비</span>
                          </div>
                          <p className="text-sm text-green-700">
                            외부 변수 통합으로 예측 정확도 <strong>12.5%</strong> 향상
                          </p>
                        </div>

                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-blue-500">분석</Badge>
                            <span className="font-medium">주요 발견사항</span>
                          </div>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• 비 오는 날 수요 평균 23% 증가</li>
                            <li>• 대형 이벤트 시 특정 지역 수요 급증</li>
                            <li>• 연휴 기간 관광지 중심 수요 패턴 변화</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
