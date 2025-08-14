"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { DollarSign, TrendingUp, TrendingDown, Calculator, AlertCircle } from "lucide-react"

const monthlyData = [
  { month: "1월", revenue: 2400, cost: 3200, profit: -800, ridership: 1200 },
  { month: "2월", revenue: 2800, cost: 3100, profit: -300, ridership: 1400 },
  { month: "3월", revenue: 3200, cost: 3000, profit: 200, ridership: 1600 },
  { month: "4월", revenue: 3600, cost: 2900, profit: 700, ridership: 1800 },
  { month: "5월", revenue: 4000, cost: 2950, profit: 1050, ridership: 2000 },
  { month: "6월", revenue: 4200, cost: 3000, profit: 1200, ridership: 2100 },
  { month: "7월", revenue: 4400, cost: 3100, profit: 1300, ridership: 2200 },
  { month: "8월", revenue: 4300, cost: 3050, profit: 1250, ridership: 2150 },
  { month: "9월", revenue: 4500, cost: 3000, profit: 1500, ridership: 2250 },
  { month: "10월", revenue: 4600, cost: 2980, profit: 1620, ridership: 2300 },
  { month: "11월", revenue: 4400, cost: 3020, profit: 1380, ridership: 2200 },
  { month: "12월", revenue: 4800, cost: 3100, profit: 1700, ridership: 2400 },
]

const costBreakdown = [
  { category: "차량 운영비", amount: 1200, percentage: 40, color: "#3b82f6" },
  { category: "인건비", amount: 900, percentage: 30, color: "#10b981" },
  { category: "연료비", amount: 450, percentage: 15, color: "#f59e0b" },
  { category: "시스템 운영비", amount: 300, percentage: 10, color: "#ef4444" },
  { category: "기타", amount: 150, percentage: 5, color: "#8b5cf6" },
]

const revenueStreams = [
  { source: "승차 요금", amount: 3200, percentage: 70, color: "#3b82f6" },
  { source: "정부 보조금", amount: 1000, percentage: 22, color: "#10b981" },
  { source: "광고 수익", amount: 240, percentage: 5, color: "#f59e0b" },
  { source: "기타", amount: 160, percentage: 3, color: "#ef4444" },
]

const scenarioData = [
  { scenario: "보수적", revenue: 4200, cost: 3100, profit: 1100, breakeven: 18 },
  { scenario: "현실적", revenue: 4600, cost: 3000, profit: 1600, breakeven: 14 },
  { scenario: "낙관적", revenue: 5200, cost: 2900, profit: 2300, breakeven: 11 },
  { scenario: "최적화", revenue: 5000, cost: 2700, profit: 2300, breakeven: 10 },
]

export default function CostRevenuePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [vehicleCount, setVehicleCount] = useState("20")
  const [farePrice, setFarePrice] = useState("2000")
  const [operatingHours, setOperatingHours] = useState("16")

  const calculateBreakeven = () => {
    const vehicles = Number.parseInt(vehicleCount)
    const fare = Number.parseInt(farePrice)
    const hours = Number.parseInt(operatingHours)

    const monthlyCost = vehicles * 150000 // 차량당 월 운영비
    const dailyRevenue = (vehicles * 8 * fare) / 1000 // 일 수익 (천원)
    const monthlyRevenue = dailyRevenue * 30

    return Math.ceil((monthlyCost / (monthlyRevenue * 1000)) * 30)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="md:ml-64">
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">비용·수입 예측</h1>
            <p className="text-gray-600">차량, 인건비, 유류비, 시스템비 기반 운영비와 예상 수입 분석</p>
          </div>

          {/* 주요 지표 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">월 수익</p>
                    <p className="text-2xl font-bold text-green-600">460만원</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">전월 대비 +4.5%</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">월 비용</p>
                    <p className="text-2xl font-bold text-red-600">300만원</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">전월 대비 -1.7%</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">순이익</p>
                    <p className="text-2xl font-bold text-blue-600">160만원</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">이익률 34.8%</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">손익분기점</p>
                    <p className="text-2xl font-bold text-purple-600">14개월</p>
                  </div>
                  <Calculator className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">초기 투자 회수</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">수익 개요</TabsTrigger>
              <TabsTrigger value="breakdown">비용 분석</TabsTrigger>
              <TabsTrigger value="forecast">수익 예측</TabsTrigger>
              <TabsTrigger value="calculator">계산기</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>월별 수익성 추이</CardTitle>
                    <CardDescription>수익, 비용, 순이익 변화</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}만원`, ""]} />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#10b981" name="수익" strokeWidth={2} />
                        <Line type="monotone" dataKey="cost" stroke="#ef4444" name="비용" strokeWidth={2} />
                        <Line type="monotone" dataKey="profit" stroke="#3b82f6" name="순이익" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>수익원 구성</CardTitle>
                    <CardDescription>수익 구조 분석</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={revenueStreams}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="amount"
                          label={({ name, percentage }) => `${name} ${percentage}%`}
                        >
                          {revenueStreams.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}만원`, ""]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>시나리오별 수익성 비교</CardTitle>
                  <CardDescription>다양한 운영 시나리오의 재정 성과</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={scenarioData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="scenario" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}만원`, ""]} />
                      <Legend />
                      <Bar dataKey="revenue" fill="#10b981" name="수익" />
                      <Bar dataKey="cost" fill="#ef4444" name="비용" />
                      <Bar dataKey="profit" fill="#3b82f6" name="순이익" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="breakdown" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>비용 구조 분석</CardTitle>
                    <CardDescription>운영비 세부 항목별 분석</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={costBreakdown}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="amount"
                          label={({ name, percentage }) => `${name} ${percentage}%`}
                        >
                          {costBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}만원`, ""]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>비용 항목별 상세</CardTitle>
                    <CardDescription>월별 비용 변화 추이</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {costBreakdown.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                            <span className="font-medium">{item.category}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{item.amount}만원</p>
                            <p className="text-sm text-gray-500">{item.percentage}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>비용 최적화 제안</CardTitle>
                  <CardDescription>AI 분석 기반 비용 절감 방안</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">연료비 절감</h4>
                      <p className="text-sm text-green-600">전기차 도입 시 월 180만원 절감 가능</p>
                      <Badge className="mt-2 bg-green-100 text-green-800">절감액: 40%</Badge>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">운영 효율화</h4>
                      <p className="text-sm text-blue-600">AI 배차 시스템으로 인건비 15% 절감</p>
                      <Badge className="mt-2 bg-blue-100 text-blue-800">절감액: 135만원</Badge>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">유지보수 최적화</h4>
                      <p className="text-sm text-purple-600">예측 정비로 차량 운영비 20% 절감</p>
                      <Badge className="mt-2 bg-purple-100 text-purple-800">절감액: 240만원</Badge>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">시스템 통합</h4>
                      <p className="text-sm text-orange-600">플랫폼 통합으로 시스템비 30% 절감</p>
                      <Badge className="mt-2 bg-orange-100 text-orange-800">절감액: 90만원</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="forecast" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>5년 수익성 전망</CardTitle>
                  <CardDescription>장기 재정 계획 및 성장 시나리오</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}만원`, ""]} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stackId="1"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.3}
                        name="수익"
                      />
                      <Area
                        type="monotone"
                        dataKey="cost"
                        stackId="2"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.3}
                        name="비용"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>1년차 예측</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>총 수익</span>
                        <span className="font-bold">5,520만원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>총 비용</span>
                        <span className="font-bold">3,600만원</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>순이익</span>
                        <span className="font-bold text-green-600">1,920만원</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>3년차 예측</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>총 수익</span>
                        <span className="font-bold">7,200만원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>총 비용</span>
                        <span className="font-bold">4,320만원</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>순이익</span>
                        <span className="font-bold text-green-600">2,880만원</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>5년차 예측</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>총 수익</span>
                        <span className="font-bold">9,600만원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>총 비용</span>
                        <span className="font-bold">5,280만원</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>순이익</span>
                        <span className="font-bold text-green-600">4,320만원</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>수익성 계산기</CardTitle>
                    <CardDescription>운영 조건 변경에 따른 수익성 시뮬레이션</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="vehicles">차량 대수</Label>
                        <Input
                          id="vehicles"
                          type="number"
                          value={vehicleCount}
                          onChange={(e) => setVehicleCount(e.target.value)}
                          placeholder="20"
                        />
                      </div>
                      <div>
                        <Label htmlFor="fare">승차 요금 (원)</Label>
                        <Input
                          id="fare"
                          type="number"
                          value={farePrice}
                          onChange={(e) => setFarePrice(e.target.value)}
                          placeholder="2000"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="hours">일 운영시간</Label>
                      <Input
                        id="hours"
                        type="number"
                        value={operatingHours}
                        onChange={(e) => setOperatingHours(e.target.value)}
                        placeholder="16"
                      />
                    </div>

                    <Button className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      수익성 계산
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>계산 결과</CardTitle>
                    <CardDescription>입력 조건 기반 예상 수익성</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">월 예상 수익</span>
                          <span className="font-bold text-green-600">
                            {(
                              (Number.parseInt(vehicleCount) * 8 * Number.parseInt(farePrice) * 30) /
                              1000
                            ).toLocaleString()}
                            만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">월 예상 비용</span>
                          <span className="font-bold text-red-600">
                            {(Number.parseInt(vehicleCount) * 150).toLocaleString()}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="text-sm text-gray-600">월 순이익</span>
                          <span className="font-bold text-blue-600">
                            {(
                              (Number.parseInt(vehicleCount) * 8 * Number.parseInt(farePrice) * 30) / 1000 -
                              Number.parseInt(vehicleCount) * 150
                            ).toLocaleString()}
                            만원
                          </span>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertCircle className="h-5 w-5 text-blue-600" />
                          <span className="font-medium text-blue-800">손익분기점</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{calculateBreakeven()}개월</p>
                        <p className="text-sm text-blue-600">초기 투자 회수 예상 기간</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">주요 가정</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 차량당 일 평균 8회 운행</li>
                          <li>• 차량당 월 운영비 150만원</li>
                          <li>• 월 30일 운영 기준</li>
                          <li>• 탑승률 75% 가정</li>
                        </ul>
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
