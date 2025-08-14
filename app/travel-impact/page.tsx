"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Clock, DollarSign, TrendingDown, TrendingUp, MapPin, Calculator } from "lucide-react"

const travelTimeData = [
  { route: "시청→대학교", car: 25, drt: 18, bus: 35, savings: 7 },
  { route: "주거지→상업지", car: 20, drt: 15, bus: 28, savings: 5 },
  { route: "병원→시장", car: 15, drt: 12, bus: 22, savings: 3 },
  { route: "역→공단", car: 30, drt: 22, bus: 40, savings: 8 },
  { route: "학교→주거지", car: 18, drt: 14, bus: 25, savings: 4 },
]

const costComparisonData = [
  { category: "연료비", car: 3500, drt: 1200, taxi: 8500 },
  { category: "주차비", car: 2000, drt: 0, taxi: 0 },
  { category: "통행료", car: 800, drt: 1200, taxi: 8500 },
  { category: "유지비", car: 1200, drt: 0, taxi: 0 },
]

const timeValueData = [
  { name: "시간 절약", value: 45, color: "#3b82f6" },
  { name: "비용 절약", value: 35, color: "#10b981" },
  { name: "편의성 향상", value: 20, color: "#f59e0b" },
]

const hourlyImpactData = [
  { time: "06:00", timeSaving: 5, costSaving: 1200 },
  { time: "07:00", timeSaving: 8, costSaving: 1800 },
  { time: "08:00", timeSaving: 12, costSaving: 2500 },
  { time: "09:00", timeSaving: 7, costSaving: 1600 },
  { time: "10:00", timeSaving: 4, costSaving: 1000 },
  { time: "11:00", timeSaving: 3, costSaving: 800 },
  { time: "12:00", timeSaving: 6, costSaving: 1400 },
  { time: "13:00", timeSaving: 5, costSaving: 1200 },
  { time: "14:00", timeSaving: 4, costSaving: 1000 },
  { time: "15:00", timeSaving: 5, costSaving: 1200 },
  { time: "16:00", timeSaving: 7, costSaving: 1600 },
  { time: "17:00", timeSaving: 10, costSaving: 2200 },
  { time: "18:00", timeSaving: 11, costSaving: 2400 },
  { time: "19:00", timeSaving: 8, costSaving: 1800 },
  { time: "20:00", timeSaving: 6, costSaving: 1400 },
  { time: "21:00", timeSaving: 4, costSaving: 1000 },
  { time: "22:00", timeSaving: 3, costSaving: 800 },
  { time: "23:00", timeSaving: 2, costSaving: 600 },
]

export default function TravelImpactPage() {
  const [selectedRoute, setSelectedRoute] = useState("all")
  const [analysisType, setAnalysisType] = useState("time")
  const [timeHorizon, setTimeHorizon] = useState("daily")

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="md:ml-64">
        <main className="p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">통행 시간·비용 변화 예측</h1>
                <p className="text-gray-600 mt-1">DRT 운행 시 시간/비용 변화 분석</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  실시간 분석
                </Badge>
                <Button>
                  <Calculator className="h-4 w-4 mr-2" />
                  상세 계산
                </Button>
              </div>
            </div>
          </div>

          {/* 분석 설정 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>분석 설정</CardTitle>
              <CardDescription>경로 및 분석 유형 선택</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">분석 경로</label>
                  <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체 경로</SelectItem>
                      <SelectItem value="downtown">도심 구간</SelectItem>
                      <SelectItem value="suburban">교외 구간</SelectItem>
                      <SelectItem value="mixed">혼합 구간</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">분석 유형</label>
                  <Select value={analysisType} onValueChange={setAnalysisType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="time">시간 분석</SelectItem>
                      <SelectItem value="cost">비용 분석</SelectItem>
                      <SelectItem value="combined">종합 분석</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">분석 기간</label>
                  <Select value={timeHorizon} onValueChange={setTimeHorizon}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">일간</SelectItem>
                      <SelectItem value="weekly">주간</SelectItem>
                      <SelectItem value="monthly">월간</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 핵심 지표 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">평균 시간 절약</CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">5.4분</div>
                <p className="text-xs text-gray-600 mt-1">통행당 평균</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">비용 절약</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">₩1,340</div>
                <p className="text-xs text-gray-600 mt-1">통행당 평균</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">접근성 향상</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">32%</div>
                <p className="text-xs text-gray-600 mt-1">교통약자 기준</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">만족도 지수</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">8.2/10</div>
                <p className="text-xs text-gray-600 mt-1">이용자 평가</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* 경로별 통행시간 비교 */}
            <Card>
              <CardHeader>
                <CardTitle>경로별 통행시간 비교</CardTitle>
                <CardDescription>교통수단별 소요시간 분석 (분)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={travelTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="route" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="car" fill="#ef4444" name="승용차" />
                    <Bar dataKey="drt" fill="#3b82f6" name="DRT" />
                    <Bar dataKey="bus" fill="#f59e0b" name="버스" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 비용 비교 */}
            <Card>
              <CardHeader>
                <CardTitle>교통수단별 비용 비교</CardTitle>
                <CardDescription>월간 교통비용 분석 (원)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={costComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="car" fill="#ef4444" name="승용차" />
                    <Bar dataKey="drt" fill="#3b82f6" name="DRT" />
                    <Bar dataKey="taxi" fill="#f59e0b" name="택시" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* 시간대별 영향 분석 */}
            <Card>
              <CardHeader>
                <CardTitle>시간대별 절약 효과</CardTitle>
                <CardDescription>시간 및 비용 절약 효과 분석</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={hourlyImpactData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="timeSaving"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="시간 절약 (분)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="costSaving"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="비용 절약 (원)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 편익 구성 */}
            <Card>
              <CardHeader>
                <CardTitle>DRT 도입 편익 구성</CardTitle>
                <CardDescription>사용자 관점에서의 편익 분석</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={timeValueData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {timeValueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* 상세 분석 결과 */}
          <Card>
            <CardHeader>
              <CardTitle>통행 영향 분석 결과</CardTitle>
              <CardDescription>DRT 도입으로 인한 종합적인 통행 패턴 변화</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">긍정적 영향</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <TrendingDown className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-900">통행시간 단축</p>
                        <p className="text-sm text-green-700">평균 5.4분 단축으로 일일 32분 절약</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-900">교통비 절약</p>
                        <p className="text-sm text-green-700">월평균 4만원 교통비 절약 효과</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-900">접근성 향상</p>
                        <p className="text-sm text-green-700">교통약자 이동편의성 32% 개선</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">고려사항</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-orange-900">대기시간</p>
                        <p className="text-sm text-orange-700">평균 3-5분 대기시간 발생 가능</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-orange-900">수요 변동</p>
                        <p className="text-sm text-orange-700">첨두시간 수요 집중으로 서비스 품질 변동</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-orange-900">지역별 편차</p>
                        <p className="text-sm text-orange-700">지역 특성에 따른 효과 차이 존재</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">종합 평가</h4>
                <p className="text-sm text-blue-800">
                  DRT 도입으로 인한 통행시간 단축과 비용 절약 효과가 명확하게 나타나며, 특히 교통약자의 이동편의성
                  향상에 큰 기여를 할 것으로 예상됩니다. 다만 첨두시간 수요 집중과 지역별 편차를 고려한 운영 전략이
                  필요합니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
