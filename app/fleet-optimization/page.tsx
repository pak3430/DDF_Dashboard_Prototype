"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts"
import { MapPin, Car, Clock, TrendingUp, Users, AlertTriangle, CheckCircle, Settings } from "lucide-react"

const fleetData = [
  { time: "06:00", demand: 45, vehicles: 8, efficiency: 85, waitTime: 12 },
  { time: "07:00", demand: 120, vehicles: 15, efficiency: 92, waitTime: 8 },
  { time: "08:00", demand: 180, vehicles: 22, efficiency: 88, waitTime: 15 },
  { time: "09:00", demand: 95, vehicles: 18, efficiency: 90, waitTime: 10 },
  { time: "10:00", demand: 70, vehicles: 12, efficiency: 87, waitTime: 14 },
  { time: "11:00", demand: 85, vehicles: 14, efficiency: 89, waitTime: 11 },
  { time: "12:00", demand: 110, vehicles: 16, efficiency: 91, waitTime: 9 },
  { time: "13:00", demand: 95, vehicles: 15, efficiency: 88, waitTime: 13 },
  { time: "14:00", demand: 80, vehicles: 13, efficiency: 86, waitTime: 16 },
  { time: "15:00", demand: 100, vehicles: 16, efficiency: 90, waitTime: 10 },
  { time: "16:00", demand: 140, vehicles: 20, efficiency: 89, waitTime: 12 },
  { time: "17:00", demand: 160, vehicles: 24, efficiency: 87, waitTime: 18 },
  { time: "18:00", demand: 130, vehicles: 19, efficiency: 91, waitTime: 9 },
  { time: "19:00", demand: 90, vehicles: 14, efficiency: 88, waitTime: 14 },
  { time: "20:00", demand: 60, vehicles: 10, efficiency: 85, waitTime: 17 },
  { time: "21:00", demand: 40, vehicles: 7, efficiency: 83, waitTime: 20 },
]

const vehicleLocations = [
  { id: "V001", lat: 37.5665, lng: 126.978, status: "운행중", passengers: 3, destination: "강남역" },
  { id: "V002", lat: 37.5651, lng: 126.9895, status: "대기중", passengers: 0, destination: "-" },
  { id: "V003", lat: 37.5489, lng: 126.9913, status: "운행중", passengers: 2, destination: "홍대입구역" },
  { id: "V004", lat: 37.5172, lng: 127.0473, status: "충전중", passengers: 0, destination: "-" },
  { id: "V005", lat: 37.5326, lng: 126.991, status: "운행중", passengers: 4, destination: "여의도역" },
]

const optimizationScenarios = [
  { scenario: "현재 운영", vehicles: 20, cost: 2400, efficiency: 87, satisfaction: 82 },
  { scenario: "AI 최적화", vehicles: 18, cost: 2160, efficiency: 94, satisfaction: 91 },
  { scenario: "수요 기반", vehicles: 22, cost: 2640, efficiency: 89, satisfaction: 88 },
  { scenario: "비용 최소화", vehicles: 16, cost: 1920, efficiency: 81, satisfaction: 76 },
]

export default function FleetOptimizationPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("today")
  const [vehicleCount, setVehicleCount] = useState([20])
  const [optimizationMode, setOptimizationMode] = useState("efficiency")

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="md:ml-64">
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">차량 투입 및 배치 최적화</h1>
            <p className="text-gray-600">실시간 차량 위치 추적과 최적 배치 전략을 통한 운영 효율성 극대화</p>
          </div>

          {/* 실시간 현황 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">운행 차량</p>
                    <p className="text-2xl font-bold text-blue-600">18대</p>
                  </div>
                  <Car className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">전체 20대 중</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">평균 대기시간</p>
                    <p className="text-2xl font-bold text-green-600">12분</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">목표: 15분 이내</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">운영 효율성</p>
                    <p className="text-2xl font-bold text-purple-600">89%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">전일 대비 +3%</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">탑승률</p>
                    <p className="text-2xl font-bold text-orange-600">76%</p>
                  </div>
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">평균 3.2명/차량</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="realtime" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="realtime">실시간 모니터링</TabsTrigger>
              <TabsTrigger value="optimization">배치 최적화</TabsTrigger>
              <TabsTrigger value="scheduling">운행 스케줄링</TabsTrigger>
              <TabsTrigger value="analysis">성과 분석</TabsTrigger>
            </TabsList>

            <TabsContent value="realtime" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>실시간 차량 위치</CardTitle>
                    <CardDescription>현재 운행 중인 차량들의 위치와 상태</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">실시간 지도 (구현 예정)</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {vehicleLocations.map((vehicle) => (
                        <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Badge
                              variant={
                                vehicle.status === "운행중"
                                  ? "default"
                                  : vehicle.status === "대기중"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {vehicle.status}
                            </Badge>
                            <span className="font-medium">{vehicle.id}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">승객: {vehicle.passengers}명</p>
                            <p className="text-xs text-gray-500">{vehicle.destination}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>시간대별 수요-공급 현황</CardTitle>
                    <CardDescription>실시간 수요 대비 차량 배치 현황</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={fleetData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="demand" stroke="#3b82f6" name="수요" strokeWidth={2} />
                        <Line type="monotone" dataKey="vehicles" stroke="#10b981" name="배치 차량" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="optimization" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>최적화 시나리오 비교</CardTitle>
                    <CardDescription>다양한 배치 전략의 성과 비교</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={optimizationScenarios}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="scenario" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="efficiency" fill="#3b82f6" name="효율성 (%)" />
                        <Bar dataKey="satisfaction" fill="#10b981" name="만족도 (%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>최적화 설정</CardTitle>
                    <CardDescription>배치 최적화 파라미터 조정</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">차량 대수</label>
                      <Slider
                        value={vehicleCount}
                        onValueChange={setVehicleCount}
                        max={30}
                        min={10}
                        step={1}
                        className="mb-2"
                      />
                      <p className="text-sm text-gray-500">{vehicleCount[0]}대</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">최적화 모드</label>
                      <Select value={optimizationMode} onValueChange={setOptimizationMode}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="efficiency">효율성 우선</SelectItem>
                          <SelectItem value="cost">비용 최소화</SelectItem>
                          <SelectItem value="satisfaction">만족도 우선</SelectItem>
                          <SelectItem value="balanced">균형 최적화</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      최적화 실행
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="scheduling" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>운행 스케줄 최적화</CardTitle>
                  <CardDescription>시간대별 최적 차량 배치 계획</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={fleetData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="demand"
                        stackId="1"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                        name="예상 수요"
                      />
                      <Area
                        type="monotone"
                        dataKey="vehicles"
                        stackId="2"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.3}
                        name="배치 차량"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>효율성 vs 대기시간</CardTitle>
                    <CardDescription>운영 효율성과 고객 만족도의 상관관계</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <ScatterChart data={fleetData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="efficiency" name="효율성" />
                        <YAxis dataKey="waitTime" name="대기시간" />
                        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                        <Scatter name="시간대별 성과" fill="#3b82f6" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>최적화 권고사항</CardTitle>
                    <CardDescription>AI 분석 기반 개선 제안</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-green-800">출퇴근 시간 차량 증편</p>
                          <p className="text-sm text-green-600">7-9시, 17-19시 차량 20% 증편 시 효율성 12% 향상 예상</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-800">거점 재배치</p>
                          <p className="text-sm text-blue-600">강남, 홍대 거점 추가 시 평균 대기시간 25% 단축 가능</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-800">심야 운영 검토</p>
                          <p className="text-sm text-yellow-600">21시 이후 수요 부족으로 차량 감편 검토 필요</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
