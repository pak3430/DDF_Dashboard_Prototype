"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  LineChart,
  Line,
} from "recharts"
import { DollarSign, TrendingUp, Users, Car } from "lucide-react"

const incomeDistribution = [
  { range: "2천만원 미만", households: 12.3, drtUsage: 45.2, carOwnership: 32.1 },
  { range: "2-3천만원", households: 18.7, drtUsage: 52.8, carOwnership: 58.4 },
  { range: "3-4천만원", households: 22.4, drtUsage: 48.9, carOwnership: 72.6 },
  { range: "4-5천만원", households: 19.8, drtUsage: 41.3, carOwnership: 84.2 },
  { range: "5-6천만원", households: 14.2, drtUsage: 35.7, carOwnership: 91.8 },
  { range: "6천만원 이상", households: 12.6, drtUsage: 28.4, carOwnership: 95.3 },
]

const transportCostAnalysis = [
  { income: "2천만원 미만", current: 180, withDRT: 145, savings: 35 },
  { income: "2-3천만원", current: 220, withDRT: 175, savings: 45 },
  { income: "3-4천만원", current: 280, withDRT: 225, savings: 55 },
  { income: "4-5천만원", current: 350, withDRT: 290, savings: 60 },
  { income: "5-6천만원", current: 420, withDRT: 365, savings: 55 },
  { income: "6천만원 이상", current: 520, withDRT: 475, savings: 45 },
]

const paymentWillingness = [
  { service: "기본 서비스", low: 1500, middle: 2000, high: 2500 },
  { service: "프리미엄", low: 2500, middle: 3500, high: 4500 },
  { service: "정기권", low: 45000, middle: 65000, high: 85000 },
  { service: "가족권", low: 75000, middle: 110000, high: 145000 },
]

const socioeconomicCorrelation = [
  { income: 2500, drtUsage: 45, carOwnership: 35, size: 12 },
  { income: 3500, drtUsage: 52, carOwnership: 58, size: 18 },
  { income: 4500, drtUsage: 48, carOwnership: 72, size: 22 },
  { income: 5500, drtUsage: 41, carOwnership: 84, size: 19 },
  { income: 6500, drtUsage: 35, carOwnership: 91, size: 14 },
  { income: 7500, drtUsage: 28, carOwnership: 95, size: 12 },
]

export function IncomeAnalysis() {
  const [selectedView, setSelectedView] = useState("distribution")

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center gap-4">
        <Select value={selectedView} onValueChange={setSelectedView}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="distribution">소득분포</SelectItem>
            <SelectItem value="transport">교통비 분석</SelectItem>
            <SelectItem value="willingness">지불의향</SelectItem>
            <SelectItem value="correlation">상관관계</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedView === "distribution" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>소득구간별 가구 분포</CardTitle>
                <CardDescription>지역 내 소득수준별 가구 비율</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={incomeDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="households" fill="#3b82f6" name="가구비율(%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>소득별 DRT 이용률</CardTitle>
                <CardDescription>소득수준과 DRT 이용 의향 관계</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={incomeDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="drtUsage" stroke="#10b981" strokeWidth={2} name="DRT 이용률(%)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>소득구간별 특성 분석</CardTitle>
              <CardDescription>소득수준에 따른 교통 이용 패턴</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incomeDistribution.map((income, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-center">
                        <div className="font-medium text-sm">{income.range}</div>
                        <div className="text-xs text-gray-600">{income.households}%</div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">DRT 이용률</span>
                          <span className="font-medium">{income.drtUsage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: `${income.drtUsage}%` }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">자가용 보유율</span>
                          <span className="font-medium">{income.carOwnership}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${income.carOwnership}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={income.drtUsage >= 45 ? "default" : income.drtUsage >= 35 ? "secondary" : "outline"}
                      >
                        {income.drtUsage >= 45 ? "높음" : income.drtUsage >= 35 ? "중간" : "낮음"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedView === "transport" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>소득별 교통비 절감 효과</CardTitle>
              <CardDescription>DRT 도입 시 소득구간별 교통비 변화</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={transportCostAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="income" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}천원`, ""]} />
                  <Bar dataKey="current" fill="#ef4444" name="현재 교통비" />
                  <Bar dataKey="withDRT" fill="#10b981" name="DRT 이용 시" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">평균 50천원</div>
                <div className="text-sm text-gray-600">월 교통비 절감</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">18.5%</div>
                <div className="text-sm text-gray-600">평균 절감률</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">중소득층</div>
                <div className="text-sm text-gray-600">최대 수혜층</div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {selectedView === "willingness" && (
        <Card>
          <CardHeader>
            <CardTitle>소득별 지불의향 분석</CardTitle>
            <CardDescription>DRT 서비스 유형별 지불 가능 금액</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={paymentWillingness}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="service" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value.toLocaleString()}원`, ""]} />
                <Bar dataKey="low" fill="#ef4444" name="저소득층" />
                <Bar dataKey="middle" fill="#f59e0b" name="중소득층" />
                <Bar dataKey="high" fill="#10b981" name="고소득층" />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-3">가격 정책 제안</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 기본 요금: 2,000원 (중소득층 기준)</li>
                  <li>• 저소득층 할인: 25% (1,500원)</li>
                  <li>• 정기권: 월 65,000원</li>
                  <li>• 가족권: 월 110,000원</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-3">수익성 분석</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 중소득층이 주요 수익원 (60%)</li>
                  <li>• 정기권 이용률 높을 것으로 예상</li>
                  <li>• 소득별 차등 요금제 필요</li>
                  <li>• 사회적 할인 정책 고려</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedView === "correlation" && (
        <Card>
          <CardHeader>
            <CardTitle>소득-교통수단 상관관계</CardTitle>
            <CardDescription>소득수준과 교통수단 선택의 상관관계 분석</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={socioeconomicCorrelation}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="income" name="소득" unit="만원" />
                <YAxis dataKey="drtUsage" name="DRT 이용률" unit="%" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter dataKey="drtUsage" fill="#3b82f6" />
              </ScatterChart>
            </ResponsiveContainer>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">상관관계 분석 결과</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2">주요 발견사항</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 소득과 DRT 이용률 간 음의 상관관계</li>
                    <li>• 중소득층(3-4천만원)에서 DRT 선호도 높음</li>
                    <li>• 고소득층은 자가용 선호 경향</li>
                    <li>• 저소득층은 경제적 이유로 DRT 이용</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">정책 시사점</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 중소득층 타겟 마케팅 집중</li>
                    <li>• 저소득층 지원 정책 필요</li>
                    <li>• 고소득층 대상 프리미엄 서비스</li>
                    <li>• 소득별 맞춤형 서비스 설계</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            소득분석 종합 결과
          </CardTitle>
          <CardDescription>DRT 서비스 경제성 및 정책 방향</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <h4 className="font-medium">주요 타겟층</h4>
              </div>
              <ul className="text-sm space-y-1">
                <li>• 중소득층 (3-4천만원): 48.9% 이용률</li>
                <li>• 전체 가구의 42.2% 차지</li>
                <li>• 가장 높은 지불의향 보유</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <h4 className="font-medium">경제적 효과</h4>
              </div>
              <ul className="text-sm space-y-1">
                <li>• 평균 월 50천원 교통비 절감</li>
                <li>• 저소득층 부담 경감 효과</li>
                <li>• 지역 경제 활성화 기여</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-purple-600" />
                <h4 className="font-medium">정책 방향</h4>
              </div>
              <ul className="text-sm space-y-1">
                <li>• 소득별 차등 요금제 도입</li>
                <li>• 저소득층 할인 정책</li>
                <li>• 중소득층 중심 서비스 설계</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
