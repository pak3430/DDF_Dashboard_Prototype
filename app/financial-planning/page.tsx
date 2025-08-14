"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  LineChart,
  Line,
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
import { Banknote, TrendingUp, Calculator, AlertTriangle, CheckCircle, Target } from "lucide-react"

const subsidyScenarios = [
  { year: "1년차", noSubsidy: -800, partialSubsidy: 400, fullSubsidy: 1200, required: 2000 },
  { year: "2년차", noSubsidy: -200, partialSubsidy: 800, fullSubsidy: 1600, required: 1800 },
  { year: "3년차", noSubsidy: 200, partialSubsidy: 1200, fullSubsidy: 2000, required: 1600 },
  { year: "4년차", noSubsidy: 600, partialSubsidy: 1600, fullSubsidy: 2400, required: 1400 },
  { year: "5년차", noSubsidy: 1000, partialSubsidy: 2000, fullSubsidy: 2800, required: 1200 },
]

const fundingSources = [
  { source: "국비 지원", amount: 800, percentage: 40, color: "#3b82f6", description: "교통약자 이동지원 사업" },
  { source: "시도비", amount: 600, percentage: 30, color: "#10b981", description: "지역 교통 개선 예산" },
  { source: "시군구비", amount: 400, percentage: 20, color: "#f59e0b", description: "지방자치단체 예산" },
  { source: "민간 투자", amount: 200, percentage: 10, color: "#ef4444", description: "운영사 자본 투입" },
]

const budgetAllocation = [
  { category: "차량 구입비", amount: 1200, percentage: 35, priority: "높음" },
  { category: "시스템 구축비", amount: 600, percentage: 18, priority: "높음" },
  { category: "인프라 구축", amount: 500, percentage: 15, priority: "중간" },
  { category: "운영비 지원", amount: 400, percentage: 12, priority: "높음" },
  { category: "마케팅", amount: 200, percentage: 6, priority: "낮음" },
  { source: "예비비", amount: 300, percentage: 9, priority: "중간" },
  { category: "기타", amount: 200, percentage: 5, priority: "낮음" },
]

const riskFactors = [
  { factor: "수요 부족", probability: "중간", impact: "높음", mitigation: "마케팅 강화, 요금 조정" },
  { factor: "운영비 증가", probability: "높음", impact: "중간", mitigation: "효율성 개선, 비용 최적화" },
  { factor: "정책 변경", probability: "낮음", impact: "높음", mitigation: "정부 협의, 대안 마련" },
  { factor: "경쟁 서비스", probability: "중간", impact: "중간", mitigation: "차별화 전략, 서비스 개선" },
]

export default function FinancialPlanningPage() {
  const [planningPeriod, setPlanningPeriod] = useState("5years")
  const [subsidyLevel, setSubsidyLevel] = useState([60])
  const [targetROI, setTargetROI] = useState("15")
  const [riskTolerance, setRiskTolerance] = useState("medium")

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="md:ml-64">
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">재정 지원 규모 산정</h1>
            <p className="text-gray-600">보조금 규모 및 재정 계획 수립을 위한 종합 분석</p>
          </div>

          {/* 주요 지표 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">필요 보조금</p>
                    <p className="text-2xl font-bold text-blue-600">2,000만원</p>
                  </div>
                  <Banknote className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">월 평균 기준</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">총 사업비</p>
                    <p className="text-2xl font-bold text-green-600">34억원</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">5년 계획 기준</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">자립 예상</p>
                    <p className="text-2xl font-bold text-purple-600">3년차</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">보조금 없이 운영</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">예상 ROI</p>
                    <p className="text-2xl font-bold text-orange-600">18.5%</p>
                  </div>
                  <Calculator className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">5년 평균 수익률</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="subsidy" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="subsidy">보조금 산정</TabsTrigger>
              <TabsTrigger value="funding">재원 조달</TabsTrigger>
              <TabsTrigger value="budget">예산 배분</TabsTrigger>
              <TabsTrigger value="risk">리스크 관리</TabsTrigger>
            </TabsList>

            <TabsContent value="subsidy" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>보조금 시나리오별 수익성</CardTitle>
                    <CardDescription>보조금 수준에 따른 5년간 재정 전망</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={subsidyScenarios}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}만원`, ""]} />
                        <Legend />
                        <Line type="monotone" dataKey="noSubsidy" stroke="#ef4444" name="보조금 없음" strokeWidth={2} />
                        <Line
                          type="monotone"
                          dataKey="partialSubsidy"
                          stroke="#f59e0b"
                          name="부분 지원"
                          strokeWidth={2}
                        />
                        <Line type="monotone" dataKey="fullSubsidy" stroke="#10b981" name="전액 지원" strokeWidth={2} />
                        <Line
                          type="monotone"
                          dataKey="required"
                          stroke="#3b82f6"
                          name="필요 보조금"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>보조금 계산기</CardTitle>
                    <CardDescription>조건별 필요 보조금 산정</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">계획 기간</Label>
                      <Select value={planningPeriod} onValueChange={setPlanningPeriod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3years">3년</SelectItem>
                          <SelectItem value="5years">5년</SelectItem>
                          <SelectItem value="7years">7년</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2 block">보조금 비율 (%)</Label>
                      <Slider
                        value={subsidyLevel}
                        onValueChange={setSubsidyLevel}
                        max={100}
                        min={0}
                        step={10}
                        className="mb-2"
                      />
                      <p className="text-sm text-gray-500">{subsidyLevel[0]}%</p>
                    </div>

                    <div>
                      <Label htmlFor="roi">목표 ROI (%)</Label>
                      <Input
                        id="roi"
                        type="number"
                        value={targetROI}
                        onChange={(e) => setTargetROI(e.target.value)}
                        placeholder="15"
                      />
                    </div>

                    <Button className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      보조금 계산
                    </Button>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">계산 결과</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>월 필요 보조금</span>
                          <span className="font-bold">
                            {Math.round((2000 * subsidyLevel[0]) / 100).toLocaleString()}만원
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>연간 보조금</span>
                          <span className="font-bold">
                            {Math.round((24000 * subsidyLevel[0]) / 100).toLocaleString()}만원
                          </span>
                        </div>
                        <div className="flex justify-between border-t pt-1">
                          <span>총 보조금</span>
                          <span className="font-bold text-blue-600">
                            {Math.round(
                              (24000 * Number.parseInt(planningPeriod.replace("years", "")) * subsidyLevel[0]) / 100,
                            ).toLocaleString()}
                            만원
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>보조금 단계별 감축 계획</CardTitle>
                  <CardDescription>자립 운영을 위한 보조금 감축 로드맵</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {subsidyScenarios.map((year, index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2">{year.year}</h4>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-gray-600">필요 보조금</span>
                            <p className="font-bold text-blue-600">{year.required.toLocaleString()}만원</p>
                          </div>
                          <div className="text-xs text-gray-500">
                            감축률:{" "}
                            {index === 0
                              ? "0%"
                              : `${Math.round(((subsidyScenarios[0].required - year.required) / subsidyScenarios[0].required) * 100)}%`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="funding" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>재원 조달 구조</CardTitle>
                    <CardDescription>재정 지원 출처별 분담 비율</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={fundingSources}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="amount"
                          label={({ name, percentage }) => `${name} ${percentage}%`}
                        >
                          {fundingSources.map((entry, index) => (
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
                    <CardTitle>재원별 상세 정보</CardTitle>
                    <CardDescription>각 재원의 특성 및 조달 방안</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {fundingSources.map((source, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 rounded" style={{ backgroundColor: source.color }}></div>
                              <span className="font-medium">{source.source}</span>
                            </div>
                            <span className="font-bold">{source.amount}만원</span>
                          </div>
                          <p className="text-sm text-gray-600">{source.description}</p>
                          <div className="mt-2">
                            <Badge variant="outline">{source.percentage}%</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>재원 조달 일정</CardTitle>
                  <CardDescription>단계별 재원 확보 계획</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">1단계 (준비)</h4>
                        <ul className="text-sm text-blue-600 space-y-1">
                          <li>• 사업계획서 작성</li>
                          <li>• 예비타당성 조사</li>
                          <li>• 재원 확보 협의</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">2단계 (승인)</h4>
                        <ul className="text-sm text-green-600 space-y-1">
                          <li>• 국비 지원 신청</li>
                          <li>• 지방비 예산 편성</li>
                          <li>• 민간 투자 유치</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-2">3단계 (집행)</h4>
                        <ul className="text-sm text-orange-600 space-y-1">
                          <li>• 예산 배정 및 집행</li>
                          <li>• 단계별 자금 투입</li>
                          <li>• 집행 현황 모니터링</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-2">4단계 (관리)</h4>
                        <ul className="text-sm text-purple-600 space-y-1">
                          <li>• 성과 평가</li>
                          <li>• 정산 및 보고</li>
                          <li>• 지속 지원 계획</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="budget" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>예산 배분 계획</CardTitle>
                  <CardDescription>사업 영역별 예산 할당 및 우선순위</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={budgetAllocation}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}만원`, ""]} />
                      <Bar dataKey="amount" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>예산 항목별 상세</CardTitle>
                    <CardDescription>각 항목의 예산 규모 및 우선순위</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {budgetAllocation.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <span className="font-medium">{item.category}</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge
                                variant={
                                  item.priority === "높음"
                                    ? "default"
                                    : item.priority === "중간"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {item.priority}
                              </Badge>
                              <span className="text-sm text-gray-500">{item.percentage}%</span>
                            </div>
                          </div>
                          <span className="font-bold">{item.amount}만원</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>연도별 예산 집행 계획</CardTitle>
                    <CardDescription>5년간 예산 집행 일정</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-2 text-center text-sm font-medium text-gray-600">
                        <div>구분</div>
                        <div>1년차</div>
                        <div>2년차</div>
                        <div>3년차</div>
                        <div>4-5년차</div>
                      </div>

                      <div className="space-y-2">
                        <div className="grid grid-cols-5 gap-2 text-center text-sm">
                          <div className="font-medium">초기투자</div>
                          <div className="bg-blue-100 p-2 rounded">80%</div>
                          <div className="bg-blue-50 p-2 rounded">20%</div>
                          <div className="p-2">-</div>
                          <div className="p-2">-</div>
                        </div>

                        <div className="grid grid-cols-5 gap-2 text-center text-sm">
                          <div className="font-medium">운영비</div>
                          <div className="bg-green-100 p-2 rounded">100%</div>
                          <div className="bg-green-100 p-2 rounded">80%</div>
                          <div className="bg-green-50 p-2 rounded">60%</div>
                          <div className="bg-green-50 p-2 rounded">40%</div>
                        </div>

                        <div className="grid grid-cols-5 gap-2 text-center text-sm">
                          <div className="font-medium">시설개선</div>
                          <div className="p-2">-</div>
                          <div className="bg-orange-100 p-2 rounded">30%</div>
                          <div className="bg-orange-100 p-2 rounded">50%</div>
                          <div className="bg-orange-50 p-2 rounded">20%</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="risk" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>재정 리스크 분석</CardTitle>
                  <CardDescription>주요 리스크 요인 및 대응 방안</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {riskFactors.map((risk, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">{risk.factor}</h4>
                          <div className="flex space-x-2">
                            <Badge
                              variant={
                                risk.probability === "높음"
                                  ? "destructive"
                                  : risk.probability === "중간"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              발생확률: {risk.probability}
                            </Badge>
                            <Badge
                              variant={
                                risk.impact === "높음"
                                  ? "destructive"
                                  : risk.impact === "중간"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              영향도: {risk.impact}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                          <div>
                            <span className="text-sm font-medium">대응방안: </span>
                            <span className="text-sm text-gray-600">{risk.mitigation}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>비상 계획</CardTitle>
                    <CardDescription>리스크 발생 시 대응 시나리오</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="font-medium text-red-800">수요 급감 시</span>
                        </div>
                        <ul className="text-sm text-red-600 space-y-1">
                          <li>• 운영 규모 20% 축소</li>
                          <li>• 마케팅 예산 50% 증액</li>
                          <li>• 요금 체계 재검토</li>
                        </ul>
                      </div>

                      <div className="p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <span className="font-medium text-orange-800">보조금 삭감 시</span>
                        </div>
                        <ul className="text-sm text-orange-600 space-y-1">
                          <li>• 민간 투자 확대</li>
                          <li>• 운영 효율성 극대화</li>
                          <li>• 부가 수익 창출</li>
                        </ul>
                      </div>

                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-yellow-600" />
                          <span className="font-medium text-yellow-800">조기 자립 시</span>
                        </div>
                        <ul className="text-sm text-yellow-600 space-y-1">
                          <li>• 서비스 지역 확대</li>
                          <li>• 차량 대수 증편</li>
                          <li>• 추가 사업 검토</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>재정 건전성 지표</CardTitle>
                    <CardDescription>재정 상태 모니터링 지표</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">자기자본비율</span>
                        <div className="text-right">
                          <span className="font-bold text-green-600">65%</span>
                          <p className="text-xs text-gray-500">목표: 60% 이상</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">부채비율</span>
                        <div className="text-right">
                          <span className="font-bold text-blue-600">35%</span>
                          <p className="text-xs text-gray-500">목표: 40% 이하</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">유동비율</span>
                        <div className="text-right">
                          <span className="font-bold text-purple-600">180%</span>
                          <p className="text-xs text-gray-500">목표: 150% 이상</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">보조금 의존도</span>
                        <div className="text-right">
                          <span className="font-bold text-orange-600">45%</span>
                          <p className="text-xs text-gray-500">목표: 30% 이하</p>
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
