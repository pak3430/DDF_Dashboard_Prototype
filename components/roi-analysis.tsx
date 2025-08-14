"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"
import { TrendingUp, DollarSign, Users } from "lucide-react"

interface ROIAnalysisProps {
  params: any
  results: any
}

export function ROIAnalysis({ params, results }: ROIAnalysisProps) {
  // Generate 5-year projection
  const yearlyProjection = Array.from({ length: 5 }, (_, i) => {
    const year = 2024 + i
    const growthRate = 1 + i * 0.05 // 5% annual growth
    const inflationRate = 1 + i * 0.03 // 3% annual inflation

    return {
      year: `${year}년`,
      investment: results.totalAnnualCost * inflationRate,
      revenue: results.expectedPassengers * 12 * 2.5 * growthRate,
      profit: results.expectedPassengers * 12 * 2.5 * growthRate - results.totalAnnualCost * inflationRate,
      roi:
        ((results.expectedPassengers * 12 * 2.5 * growthRate - results.totalAnnualCost * inflationRate) /
          (results.totalAnnualCost * inflationRate)) *
        100,
    }
  })

  const socialBenefits = [
    {
      category: "교통비 절감",
      value: results.expectedPassengers * 12 * 1.2, // 월 1,200원 절감
      description: "기존 교통수단 대비 절약",
    },
    {
      category: "시간 절약",
      value: results.expectedPassengers * 12 * 0.8, // 월 800원 상당
      description: "대기시간 단축 효과",
    },
    {
      category: "환경 개선",
      value: results.expectedPassengers * 12 * 0.5, // 월 500원 상당
      description: "탄소 배출 감소 효과",
    },
    {
      category: "고용 창출",
      value: params.vehicles * 300, // 차량당 월 300만원
      description: "기사 고용 및 관련 산업",
    },
  ]

  const totalSocialBenefit = socialBenefits.reduce((sum, benefit) => sum + benefit.value, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">1년차 ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(results.roi)}%</div>
            <p className="text-xs text-green-600">{results.roi > 0 ? "수익성 양호" : "개선 필요"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">손익분기점</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{results.breakEvenMonths}개월</div>
            <p className="text-xs text-blue-600">투자 회수 기간</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">사회적 편익</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(totalSocialBenefit / 10000).toLocaleString()}억원</div>
            <p className="text-xs text-purple-600">연간 추정 효과</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 편익비율</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((totalSocialBenefit / (results.totalAnnualCost * 10000)) * 100) / 100}
            </div>
            <p className="text-xs text-green-600">B/C Ratio</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>5개년 수익성 전망</CardTitle>
            <CardDescription>연도별 투자 대비 수익 분석</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yearlyProjection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [`${Math.round(value).toLocaleString()}만원`, ""]} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                    name="예상 수익"
                  />
                  <Area
                    type="monotone"
                    dataKey="investment"
                    stackId="2"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.6}
                    name="투자 비용"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>사회적 편익 분석</CardTitle>
            <CardDescription>DRT 도입으로 인한 사회적 가치 창출</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {socialBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{benefit.category}</div>
                    <div className="text-sm text-gray-600">{benefit.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">
                      {Math.round(benefit.value / 10000).toLocaleString()}억원
                    </div>
                    <div className="text-xs text-gray-500">연간</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-blue-900">총 사회적 편익</span>
                <span className="text-xl font-bold text-blue-600">
                  {Math.round(totalSocialBenefit / 10000).toLocaleString()}억원
                </span>
              </div>
              <div className="text-sm text-blue-700">
                투자 대비 사회적 편익:{" "}
                {Math.round((totalSocialBenefit / (results.totalAnnualCost * 10000)) * 100) / 100}배
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>투자 타당성 평가</CardTitle>
          <CardDescription>정책 의사결정을 위한 종합 평가</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">경제적 타당성</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">NPV (순현재가치)</span>
                  <Badge variant={yearlyProjection[4].profit > 0 ? "default" : "destructive"}>
                    {yearlyProjection[4].profit > 0 ? "양수" : "음수"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">IRR (내부수익률)</span>
                  <Badge variant={results.roi > 10 ? "default" : "secondary"}>
                    {results.roi > 10 ? "양호" : "보통"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">회수기간</span>
                  <Badge variant={results.breakEvenMonths < 24 ? "default" : "secondary"}>
                    {results.breakEvenMonths < 24 ? "단기" : "장기"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">사회적 타당성</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">교통 접근성</span>
                  <Badge variant="default">크게 개선</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">환경 영향</span>
                  <Badge variant="default">긍정적</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">고용 창출</span>
                  <Badge variant="default">{params.vehicles * 2}명</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">정책적 타당성</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">정책 목표 부합</span>
                  <Badge variant="default">높음</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">재정 부담</span>
                  <Badge variant={results.totalAnnualCost < 50000 ? "default" : "secondary"}>
                    {results.totalAnnualCost < 50000 ? "적정" : "높음"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">실현 가능성</span>
                  <Badge variant="default">높음</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="font-medium text-green-900 mb-2">종합 평가 결과</div>
            <div className="text-sm text-green-700">
              {results.roi > 15 && results.breakEvenMonths < 18
                ? "투자 타당성이 매우 높습니다. 즉시 사업 추진을 권장합니다."
                : results.roi > 5 && results.breakEvenMonths < 36
                  ? "투자 타당성이 있습니다. 세부 계획 수립 후 추진하시기 바랍니다."
                  : "투자 조건을 재검토하거나 운영 효율성 개선 방안을 모색하시기 바랍니다."}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
