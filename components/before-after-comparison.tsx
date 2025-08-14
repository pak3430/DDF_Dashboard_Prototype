"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Minus, Bus, Car, Train, Users } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

interface BeforeAfterComparisonProps {
  period: string
  region: string
}

export function BeforeAfterComparison({ period, region }: BeforeAfterComparisonProps) {
  const comparisonData = [
    {
      metric: "일평균 이용객",
      before: 1240,
      after: 1680,
      unit: "명",
      change: 35.5,
      trend: "up",
    },
    {
      metric: "평균 대기시간",
      before: 18.5,
      after: 12.3,
      unit: "분",
      change: -33.5,
      trend: "down",
    },
    {
      metric: "서비스 만족도",
      before: 3.2,
      after: 4.4,
      unit: "/5.0",
      change: 37.5,
      trend: "up",
    },
    {
      metric: "월 운영비용",
      before: 3800,
      after: 3100,
      unit: "만원",
      change: -18.4,
      trend: "down",
    },
    {
      metric: "커버리지",
      before: 68,
      after: 92,
      unit: "%",
      change: 35.3,
      trend: "up",
    },
    {
      metric: "차량 활용률",
      before: 62,
      after: 78,
      unit: "%",
      change: 25.8,
      trend: "up",
    },
  ]

  const busRidershipData = [
    {
      route: "101번 버스",
      beforeDRT: 2850,
      afterDRT: 2280,
      change: -20.0,
      replacementRate: 35,
    },
    {
      route: "205번 버스",
      beforeDRT: 1920,
      afterDRT: 1650,
      change: -14.1,
      replacementRate: 28,
    },
    {
      route: "308번 버스",
      beforeDRT: 3200,
      afterDRT: 2560,
      change: -20.0,
      replacementRate: 42,
    },
    {
      route: "412번 버스",
      beforeDRT: 1580,
      afterDRT: 1390,
      change: -12.0,
      replacementRate: 25,
    },
  ]

  const transportModeData = [
    {
      mode: "버스",
      beforeDRT: 9550,
      afterDRT: 7880,
      change: -17.5,
      icon: Bus,
      color: "#3B82F6",
    },
    {
      mode: "택시",
      beforeDRT: 1200,
      afterDRT: 980,
      change: -18.3,
      icon: Car,
      color: "#EF4444",
    },
    {
      mode: "지하철",
      beforeDRT: 3400,
      afterDRT: 3520,
      change: 3.5,
      icon: Train,
      color: "#10B981",
    },
    {
      mode: "DRT",
      beforeDRT: 0,
      afterDRT: 1680,
      change: 100,
      icon: Users,
      color: "#8B5CF6",
    },
  ]

  const monthlyTransportData = [
    { month: "도입 전 6개월", bus: 9550, taxi: 1200, subway: 3400, drt: 0 },
    { month: "도입 1개월", bus: 9100, taxi: 1150, subway: 3420, drt: 420 },
    { month: "도입 2개월", bus: 8650, taxi: 1100, subway: 3440, drt: 680 },
    { month: "도입 3개월", bus: 8200, taxi: 1050, subway: 3460, drt: 890 },
    { month: "도입 4개월", bus: 8050, taxi: 1020, subway: 3480, drt: 1120 },
    { month: "도입 5개월", bus: 7950, taxi: 1000, subway: 3500, drt: 1340 },
    { month: "도입 6개월", bus: 7880, taxi: 980, subway: 3520, drt: 1680 },
  ]

  const substitutionEffectData = [
    { name: "버스에서 DRT로", value: 1170, color: "#3B82F6" },
    { name: "택시에서 DRT로", value: 220, color: "#EF4444" },
    { name: "신규 이용자", value: 290, color: "#10B981" },
  ]

  const monthlyTrendData = [
    { month: "도입 전 6개월", traditional: 1240, drt: 0 },
    { month: "도입 1개월", traditional: 980, drt: 420 },
    { month: "도입 2개월", traditional: 850, drt: 680 },
    { month: "도입 3개월", traditional: 720, drt: 890 },
    { month: "도입 4개월", traditional: 580, drt: 1120 },
    { month: "도입 5개월", traditional: 450, drt: 1340 },
    { month: "도입 6개월", traditional: 320, drt: 1680 },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string, isPositive: boolean) => {
    if (trend === "up" && isPositive) return "text-green-600"
    if (trend === "down" && isPositive) return "text-green-600"
    if (trend === "up" && !isPositive) return "text-red-600"
    if (trend === "down" && !isPositive) return "text-red-600"
    return "text-gray-600"
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">전체 개요</TabsTrigger>
          <TabsTrigger value="bus-ridership">버스 탑승률</TabsTrigger>
          <TabsTrigger value="substitution">대체효과</TabsTrigger>
          <TabsTrigger value="integration">교통체계 통합</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparisonData.map((item, index) => {
              const isPositiveChange =
                item.metric === "평균 대기시간" || item.metric === "월 운영비용" ? item.change < 0 : item.change > 0

              return (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-sm">{item.metric}</h4>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(item.trend)}
                        <span className={`text-sm font-medium ${getTrendColor(item.trend, isPositiveChange)}`}>
                          {item.change > 0 ? "+" : ""}
                          {item.change.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">도입 전</span>
                        <span className="text-sm font-medium">
                          {item.before.toLocaleString()}
                          {item.unit}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">도입 후</span>
                        <span className="text-sm font-bold text-blue-600">
                          {item.after.toLocaleString()}
                          {item.unit}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t">
                      <Badge variant={isPositiveChange ? "default" : "destructive"} className="text-xs">
                        {isPositiveChange ? "개선" : "악화"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Monthly Transition Chart */}
          <Card>
            <CardHeader>
              <CardTitle>이용객 전환 추이</CardTitle>
              <CardDescription>기존 교통수단에서 DRT로의 점진적 전환 과정</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="traditional" stroke="#ef4444" strokeWidth={2} name="기존 교통수단" />
                    <Line type="monotone" dataKey="drt" stroke="#3b82f6" strokeWidth={2} name="DRT 서비스" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bus-ridership" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bus className="h-5 w-5" />
                버스 노선별 탑승률 변화
              </CardTitle>
              <CardDescription>DRT 도입 후 인근 버스 노선의 이용객 변화 분석</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {busRidershipData.map((route, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">{route.route}</h3>
                      <Badge variant={route.change < -15 ? "destructive" : "secondary"}>
                        {route.change > 0 ? "+" : ""}
                        {route.change}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">도입 전 일평균:</span>
                        <span className="font-medium ml-2">{route.beforeDRT.toLocaleString()}명</span>
                      </div>
                      <div>
                        <span className="text-gray-600">도입 후 일평균:</span>
                        <span className="font-medium ml-2">{route.afterDRT.toLocaleString()}명</span>
                      </div>
                      <div>
                        <span className="text-gray-600">DRT 대체율:</span>
                        <span className="font-medium ml-2">{route.replacementRate}%</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${100 + route.change}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 버스 탑승률 시계열 분석 */}
          <Card>
            <CardHeader>
              <CardTitle>버스 탑승률 시계열 변화</CardTitle>
              <CardDescription>DRT 도입 전후 6개월간 버스 이용 패턴 변화</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTransportData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="bus" stackId="1" stroke="#3B82F6" fill="#3B82F6" name="버스" />
                    <Area type="monotone" dataKey="drt" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" name="DRT" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="substitution" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>교통수단별 이용 변화</CardTitle>
                <CardDescription>DRT 도입 전후 각 교통수단 이용률 변화</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transportModeData.map((mode, index) => {
                    const Icon = mode.icon
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5" style={{ color: mode.color }} />
                          <span className="font-medium">{mode.mode}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            {mode.beforeDRT.toLocaleString()} → {mode.afterDRT.toLocaleString()}명
                          </div>
                          <div className={`text-sm font-bold ${mode.change > 0 ? "text-green-600" : "text-red-600"}`}>
                            {mode.change > 0 ? "+" : ""}
                            {mode.change}%
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>DRT 이용자 구성</CardTitle>
                <CardDescription>DRT 이용자의 기존 교통수단별 분포</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={substitutionEffectData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {substitutionEffectData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 대체효과 요약 */}
          <Card>
            <CardHeader>
              <CardTitle>대체효과 요약</CardTitle>
              <CardDescription>DRT 도입으로 인한 교통수단 간 이용 패턴 변화</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Bus className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800">버스 대체효과</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">1,170명</div>
                  <div className="text-sm text-blue-700">일평균 버스 이용자의 17.5%가 DRT로 전환</div>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Car className="h-5 w-5 text-red-600" />
                    <span className="font-medium text-red-800">택시 대체효과</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600 mb-1">220명</div>
                  <div className="text-sm text-red-700">일평균 택시 이용자의 18.3%가 DRT로 전환</div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">신규 수요 창출</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">290명</div>
                  <div className="text-sm text-green-700">기존 교통수단 미이용자의 새로운 이동 수요</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>교통체계 통합 효과</CardTitle>
              <CardDescription>DRT와 기존 교통수단 간의 연계 및 보완 효과</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">연계 교통 이용 패턴</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">DRT → 지하철 연계</span>
                      <Badge variant="default">+15%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">DRT → 버스 연계</span>
                      <Badge variant="secondary">+8%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">지하철 → DRT 연계</span>
                      <Badge variant="default">+12%</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">서비스 보완 효과</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800">First/Last Mile 해결</div>
                      <div className="text-sm text-green-700">지하철역 접근성 42% 개선</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-800">심야 교통 공백 해소</div>
                      <div className="text-sm text-blue-700">23:00-05:00 시간대 서비스 제공</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-medium text-purple-800">교통약자 접근성</div>
                      <div className="text-sm text-purple-700">휠체어 이용자 이동편의 56% 향상</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 통합 교통체계 성과 */}
          <Card>
            <CardHeader>
              <CardTitle>통합 교통체계 성과 지표</CardTitle>
              <CardDescription>DRT 도입으로 인한 전체 교통체계의 효율성 변화</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">92%</div>
                  <div className="text-sm text-blue-700">전체 지역 교통 커버리지</div>
                  <div className="text-xs text-gray-600 mt-1">(도입 전: 68%)</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">25분</div>
                  <div className="text-sm text-green-700">평균 통행 시간</div>
                  <div className="text-xs text-gray-600 mt-1">(도입 전: 32분)</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">1.8회</div>
                  <div className="text-sm text-purple-700">평균 환승 횟수</div>
                  <div className="text-xs text-gray-600 mt-1">(도입 전: 2.3회)</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-1">4.2점</div>
                  <div className="text-sm text-orange-700">교통체계 만족도</div>
                  <div className="text-xs text-gray-600 mt-1">(도입 전: 3.1점)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Service Quality Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>서비스 품질 비교</CardTitle>
            <CardDescription>도입 전후 주요 서비스 지표 변화</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData.slice(0, 4)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="before" fill="#94a3b8" name="도입 전" />
                  <Bar dataKey="after" fill="#3b82f6" name="도입 후" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>주요 성과 요약</CardTitle>
            <CardDescription>DRT 도입으로 인한 핵심 개선 사항</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-medium text-green-800 mb-2">✓ 접근성 대폭 개선</div>
                <div className="text-sm text-green-700">교통소외지역 커버리지 68% → 92% (24%p 증가)</div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-800 mb-2">✓ 이용자 만족도 향상</div>
                <div className="text-sm text-blue-700">평균 만족도 3.2 → 4.4점 (37.5% 개선)</div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="font-medium text-purple-800 mb-2">✓ 운영 효율성 증대</div>
                <div className="text-sm text-purple-700">차량 활용률 62% → 78% (25.8% 향상)</div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="font-medium text-orange-800 mb-2">✓ 비용 효율성 달성</div>
                <div className="text-sm text-orange-700">월 운영비 3,800만원 → 3,100만원 (18.4% 절감)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
