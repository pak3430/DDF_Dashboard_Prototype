"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
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
} from "recharts"
import { Car, TrendingUp, Users, Clock, AlertCircle, Play, Pause, RotateCcw } from "lucide-react"

const conversionData = [
  { time: "06:00", baseline: 850, withDRT: 680, conversion: 20 },
  { time: "07:00", baseline: 1200, withDRT: 900, conversion: 25 },
  { time: "08:00", baseline: 1800, withDRT: 1260, conversion: 30 },
  { time: "09:00", baseline: 1400, withDRT: 1050, conversion: 25 },
  { time: "10:00", baseline: 900, withDRT: 720, conversion: 20 },
  { time: "11:00", baseline: 800, withDRT: 680, conversion: 15 },
  { time: "12:00", baseline: 1100, withDRT: 880, conversion: 20 },
  { time: "13:00", baseline: 1000, withDRT: 800, conversion: 20 },
  { time: "14:00", baseline: 950, withDRT: 760, conversion: 20 },
  { time: "15:00", baseline: 1050, withDRT: 840, conversion: 20 },
  { time: "16:00", baseline: 1300, withDRT: 975, conversion: 25 },
  { time: "17:00", baseline: 1600, withDRT: 1120, conversion: 30 },
  { time: "18:00", baseline: 1900, withDRT: 1330, conversion: 30 },
  { time: "19:00", baseline: 1500, withDRT: 1125, conversion: 25 },
  { time: "20:00", baseline: 1200, withDRT: 960, conversion: 20 },
  { time: "21:00", baseline: 1000, withDRT: 850, conversion: 15 },
  { time: "22:00", baseline: 800, withDRT: 720, conversion: 10 },
  { time: "23:00", baseline: 600, withDRT: 570, conversion: 5 },
]

const trafficVolumeData = [
  { route: "중앙로", baseline: 2400, withDRT: 1920, reduction: 20 },
  { route: "시청대로", baseline: 1800, withDRT: 1530, reduction: 15 },
  { route: "역전로", baseline: 2200, withDRT: 1760, reduction: 20 },
  { route: "대학로", baseline: 1600, withDRT: 1360, reduction: 15 },
  { route: "산업로", baseline: 1400, withDRT: 1190, reduction: 15 },
]

export default function ConversionSimulationPage() {
  const [isSimulating, setIsSimulating] = useState(false)
  const [conversionRate, setConversionRate] = useState([25])
  const [selectedScenario, setSelectedScenario] = useState("standard")
  const [timeRange, setTimeRange] = useState("24h")

  const handleSimulation = () => {
    setIsSimulating(!isSimulating)
  }

  const resetSimulation = () => {
    setIsSimulating(false)
    setConversionRate([25])
    setSelectedScenario("standard")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="md:ml-64">
        <main className="p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">전환율·교통량 변화 예측</h1>
                <p className="text-gray-600 mt-1">승용차→DRT 전환율과 교통량 변화 시뮬레이션</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  MST-GCN 예측
                </Badge>
                <Button onClick={handleSimulation} className="flex items-center gap-2">
                  {isSimulating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isSimulating ? "일시정지" : "시뮬레이션 시작"}
                </Button>
                <Button variant="outline" onClick={resetSimulation}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  초기화
                </Button>
              </div>
            </div>
          </div>

          {/* 시뮬레이션 제어 패널 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>시뮬레이션 설정</CardTitle>
              <CardDescription>전환율 및 시나리오 설정을 통한 예측 분석</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    목표 전환율: {conversionRate[0]}%
                  </label>
                  <Slider
                    value={conversionRate}
                    onValueChange={setConversionRate}
                    max={50}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">시나리오</label>
                  <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">보수적 (15-20%)</SelectItem>
                      <SelectItem value="standard">표준 (20-30%)</SelectItem>
                      <SelectItem value="aggressive">적극적 (30-40%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">분석 기간</label>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">24시간</SelectItem>
                      <SelectItem value="week">주간</SelectItem>
                      <SelectItem value="month">월간</SelectItem>
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
                <CardTitle className="text-sm font-medium">예상 전환율</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{conversionRate[0]}%</div>
                <p className="text-xs text-gray-600 mt-1">일평균 기준</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">교통량 감소</CardTitle>
                <Car className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">-18.2%</div>
                <p className="text-xs text-gray-600 mt-1">주요 도로 기준</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">DRT 이용자</CardTitle>
                <Users className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">3,240명</div>
                <p className="text-xs text-gray-600 mt-1">일평균 예상</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">첨두시간 효과</CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">30%</div>
                <p className="text-xs text-gray-600 mt-1">07-09시, 17-19시</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* 시간대별 전환율 차트 */}
            <Card>
              <CardHeader>
                <CardTitle>시간대별 승용차 이용량 변화</CardTitle>
                <CardDescription>DRT 도입 전후 승용차 이용량 비교</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="baseline" stroke="#ef4444" strokeWidth={2} name="도입 전" />
                    <Line type="monotone" dataKey="withDRT" stroke="#3b82f6" strokeWidth={2} name="도입 후" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 도로별 교통량 감소 */}
            <Card>
              <CardHeader>
                <CardTitle>주요 도로별 교통량 감소</CardTitle>
                <CardDescription>DRT 도입으로 인한 도로별 교통량 변화</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={trafficVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="route" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="baseline" fill="#ef4444" name="도입 전" />
                    <Bar dataKey="withDRT" fill="#3b82f6" name="도입 후" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* 시뮬레이션 결과 요약 */}
          <Card>
            <CardHeader>
              <CardTitle>시뮬레이션 결과 요약</CardTitle>
              <CardDescription>전환율 시나리오별 주요 지표 분석</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">교통 혼잡 완화</h4>
                  <p className="text-sm text-blue-700 mb-2">
                    주요 도로의 교통량이 평균 18.2% 감소하여 교통 혼잡이 크게 완화될 것으로 예상됩니다.
                  </p>
                  <div className="text-xs text-blue-600">
                    • 첨두시간 혼잡도 30% 감소
                    <br />• 평균 통행속도 15% 향상
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">환경 개선 효과</h4>
                  <p className="text-sm text-green-700 mb-2">
                    승용차 이용 감소로 인한 대기오염 물질 배출량 감소 효과가 기대됩니다.
                  </p>
                  <div className="text-xs text-green-600">
                    • CO2 배출량 22% 감소
                    <br />• 미세먼지 발생량 18% 감소
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">사회적 편익</h4>
                  <p className="text-sm text-purple-700 mb-2">
                    교통약자의 이동권 보장과 전체적인 교통 접근성이 향상됩니다.
                  </p>
                  <div className="text-xs text-purple-600">
                    • 교통약자 이동성 40% 향상
                    <br />• 대중교통 접근성 25% 개선
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-1">주의사항</h4>
                    <p className="text-sm text-yellow-800">
                      시뮬레이션 결과는 MST-GCN 모델 기반 예측이며, 실제 결과는 지역 특성, 운영 방식, 외부 요인 등에
                      따라 달라질 수 있습니다. 정기적인 모니터링과 모델 업데이트가 필요합니다.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
