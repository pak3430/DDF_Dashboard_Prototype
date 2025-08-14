"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Heart, Accessibility, TreePine, Building } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

interface SocialImpactMetricsProps {
  period: string
  region: string
}

export function SocialImpactMetrics({ period, region }: SocialImpactMetricsProps) {
  const socialMetrics = [
    {
      category: "교통약자 지원",
      icon: Accessibility,
      color: "blue",
      metrics: [
        { name: "고령자 이용률", before: 12, after: 34, unit: "%" },
        { name: "장애인 이용률", before: 8, after: 28, unit: "%" },
        { name: "접근성 개선도", before: 45, after: 78, unit: "%" },
      ],
    },
    {
      category: "사회적 포용",
      icon: Heart,
      color: "purple",
      metrics: [
        { name: "저소득층 이용률", before: 15, after: 42, unit: "%" },
        { name: "사회적 고립 감소", before: 0, after: 35, unit: "%" },
        { name: "지역 연결성", before: 52, after: 81, unit: "%" },
      ],
    },
    {
      category: "환경 개선",
      icon: TreePine,
      color: "green",
      metrics: [
        { name: "CO2 배출 감소", before: 0, after: 23, unit: "%" },
        { name: "대기질 개선", before: 0, after: 18, unit: "%" },
        { name: "소음 감소", before: 0, after: 15, unit: "%" },
      ],
    },
    {
      category: "지역 경제",
      icon: Building,
      color: "orange",
      metrics: [
        { name: "상권 활성화", before: 0, after: 28, unit: "%" },
        { name: "고용 창출", before: 0, after: 45, unit: "명" },
        { name: "관광객 증가", before: 0, after: 32, unit: "%" },
      ],
    },
  ]

  const demographicData = [
    { name: "10-20대", value: 18, color: "#3b82f6" },
    { name: "30-40대", value: 25, color: "#8b5cf6" },
    { name: "50-60대", value: 32, color: "#f59e0b" },
    { name: "70대 이상", value: 25, color: "#ef4444" },
  ]

  const accessibilityData = [
    { area: "의료시설", before: 45, after: 85 },
    { area: "교육시설", before: 52, after: 78 },
    { area: "상업시설", before: 38, after: 82 },
    { area: "공공시설", before: 41, after: 79 },
    { area: "문화시설", before: 28, after: 65 },
    { area: "복지시설", before: 35, after: 73 },
  ]

  const radarData = [
    { subject: "접근성", before: 45, after: 85, fullMark: 100 },
    { subject: "편의성", before: 52, after: 78, fullMark: 100 },
    { subject: "안전성", before: 68, after: 88, fullMark: 100 },
    { subject: "경제성", before: 38, after: 72, fullMark: 100 },
    { subject: "환경성", before: 42, after: 75, fullMark: 100 },
    { subject: "포용성", before: 35, after: 82, fullMark: 100 },
  ]

  return (
    <div className="space-y-6">
      {/* Social Impact Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialMetrics.map((category, index) => {
          const IconComponent = category.icon
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconComponent className={`h-5 w-5 text-${category.color}-600`} />
                  {category.category}
                </CardTitle>
                <CardDescription>DRT 도입으로 인한 {category.category} 개선 효과</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.metrics.map((metric, metricIndex) => {
                    const improvement = metric.after - metric.before
                    const improvementRate = metric.before > 0 ? (improvement / metric.before) * 100 : improvement

                    return (
                      <div key={metricIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{metric.name}</span>
                          <Badge variant="default" className={`bg-${category.color}-600`}>
                            +{improvement}
                            {metric.unit}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-gray-500">도입 전: </span>
                            <span>
                              {metric.before}
                              {metric.unit}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">도입 후: </span>
                            <span className="font-medium">
                              {metric.after}
                              {metric.unit}
                            </span>
                          </div>
                        </div>
                        <Progress value={(metric.after / 100) * 100} className="h-2" />
                        {metric.before > 0 && (
                          <div className="text-xs text-green-600">{improvementRate.toFixed(1)}% 개선</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Demographics and Accessibility */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>연령대별 이용 현황</CardTitle>
            <CardDescription>DRT 서비스 이용자 연령 분포</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={demographicData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {demographicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              고령층(50세 이상) 이용률이 57%로 교통약자 지원 효과가 높게 나타남
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>시설별 접근성 개선</CardTitle>
            <CardDescription>주요 시설에 대한 접근성 향상도</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={accessibilityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="area" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="before" fill="#94a3b8" name="도입 전" />
                  <Bar dataKey="after" fill="#3b82f6" name="도입 후" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Social Impact Radar */}
      <Card>
        <CardHeader>
          <CardTitle>종합 사회적 영향 분석</CardTitle>
          <CardDescription>DRT 도입 전후 사회적 지표 비교</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="도입 전" dataKey="before" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.3} />
                <Radar name="도입 후" dataKey="after" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Impact Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            사회적 영향 요약
          </CardTitle>
          <CardDescription>DRT 도입으로 인한 주요 사회적 성과</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">+156%</div>
              <div className="text-sm text-blue-700">교통약자 이용률 증가</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">-23%</div>
              <div className="text-sm text-green-700">탄소 배출량 감소</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">+35%</div>
              <div className="text-sm text-purple-700">사회적 고립 감소</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">45명</div>
              <div className="text-sm text-orange-700">신규 고용 창출</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">주요 성과</h4>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• 교통약자(고령자, 장애인) 이용률 3배 증가로 사회적 포용성 크게 향상</li>
              <li>• 의료시설, 상업시설 접근성 2배 개선으로 생활 편의성 증대</li>
              <li>• 친환경 교통수단 도입으로 지역 환경 개선에 기여</li>
              <li>• 지역 상권 활성화 및 관광객 증가로 경제적 파급효과 창출</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
