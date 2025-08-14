"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { Target, TrendingUp, Users, MapPin, Star, CheckCircle } from "lucide-react"

const suitabilityFactors = [
  { factor: "인구밀도", score: 85, weight: 25, description: "서비스 효율성의 핵심 요소" },
  { factor: "연령구조", score: 78, weight: 20, description: "고령화율과 교통약자 비율" },
  { factor: "소득수준", score: 82, weight: 20, description: "지불능력과 서비스 수용성" },
  { factor: "교통접근성", score: 65, weight: 15, description: "기존 대중교통 인프라" },
  { factor: "지역특성", score: 88, weight: 10, description: "도시화 정도와 개발 수준" },
  { factor: "정책환경", score: 92, weight: 10, description: "지자체 정책 의지와 예산" },
]

const radarData = suitabilityFactors.map((factor) => ({
  subject: factor.factor,
  score: factor.score,
  fullMark: 100,
}))

const districtSuitability = [
  { district: "중앙구", overall: 0.92, population: 95, age: 85, income: 90, access: 75, policy: 95 },
  { district: "서구", overall: 0.88, population: 85, age: 82, income: 88, access: 70, policy: 90 },
  { district: "북구", overall: 0.85, population: 88, age: 80, income: 85, access: 68, policy: 88 },
  { district: "동구", overall: 0.78, population: 78, age: 75, income: 80, access: 65, policy: 85 },
  { district: "남구", overall: 0.72, population: 72, age: 70, income: 75, access: 60, policy: 80 },
  { district: "외곽", overall: 0.45, population: 35, age: 65, income: 45, access: 25, policy: 75 },
]

const implementationPriority = [
  {
    priority: 1,
    district: "중앙구",
    score: 0.92,
    readiness: "즉시 가능",
    timeline: "3개월",
    investment: "5억원",
    expectedROI: "18개월",
  },
  {
    priority: 2,
    district: "서구",
    score: 0.88,
    readiness: "준비 완료",
    timeline: "4개월",
    investment: "6억원",
    expectedROI: "20개월",
  },
  {
    priority: 3,
    district: "북구",
    score: 0.85,
    readiness: "계획 수립",
    timeline: "6개월",
    investment: "5.5억원",
    expectedROI: "22개월",
  },
]

const getSuitabilityLevel = (score: number) => {
  if (score >= 0.8) return { level: "최적", color: "bg-green-500", textColor: "text-green-800" }
  if (score >= 0.6) return { level: "적합", color: "bg-blue-500", textColor: "text-blue-800" }
  if (score >= 0.4) return { level: "검토", color: "bg-yellow-500", textColor: "text-yellow-800" }
  return { level: "부적합", color: "bg-red-500", textColor: "text-red-800" }
}

export function DRTSuitabilityIndex() {
  const overallScore = suitabilityFactors.reduce((sum, factor) => sum + (factor.score * factor.weight) / 100, 0)

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            종합 DRT 적합성 지수
          </CardTitle>
          <CardDescription>인구·사회경제 특성을 종합한 DRT 도입 적합성 평가</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-green-600 mb-2">{(overallScore / 100).toFixed(2)}</div>
            <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">매우 적합</Badge>
            <p className="text-gray-600 mt-2">DRT 도입에 최적화된 지역 특성을 보유</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <Star className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="font-medium text-green-800">적합성 등급</div>
              <div className="text-lg font-bold text-green-600">A+</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="font-medium text-blue-800">성공 확률</div>
              <div className="text-lg font-bold text-blue-600">92%</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <CheckCircle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="font-medium text-purple-800">권장 수준</div>
              <div className="text-lg font-bold text-purple-600">즉시 도입</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Factor Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>요인별 적합성 분석</CardTitle>
            <CardDescription>6개 핵심 요인별 점수 및 가중치</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="적합성 점수" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>요인별 상세 평가</CardTitle>
            <CardDescription>각 요인의 점수와 중요도</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suitabilityFactors.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{factor.factor}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        가중치 {factor.weight}%
                      </Badge>
                    </div>
                    <span className="font-bold text-green-600">{factor.score}점</span>
                  </div>
                  <Progress value={factor.score} className="h-2" />
                  <p className="text-xs text-gray-600">{factor.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* District Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>구역별 적합성 비교</CardTitle>
          <CardDescription>지역별 DRT 도입 적합성 순위</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={districtSuitability}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="district" />
              <YAxis domain={[0, 1]} />
              <Tooltip formatter={(value: any) => [value.toFixed(2), "적합성 지수"]} />
              <Bar dataKey="overall" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 space-y-4">
            {districtSuitability.map((district, index) => {
              const suitability = getSuitabilityLevel(district.overall)
              return (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{district.district}</h4>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs text-gray-600">인구: {district.population}</span>
                        <span className="text-xs text-gray-600">소득: {district.income}</span>
                        <span className="text-xs text-gray-600">접근성: {district.access}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{district.overall.toFixed(2)}</div>
                    <Badge className={`text-xs ${suitability.textColor} bg-opacity-20`}>{suitability.level}</Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Priority */}
      <Card>
        <CardHeader>
          <CardTitle>도입 우선순위 및 로드맵</CardTitle>
          <CardDescription>적합성 기반 단계별 도입 계획</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {implementationPriority.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full font-semibold">
                      {item.priority}
                    </div>
                    <div>
                      <h4 className="font-medium">{item.district}</h4>
                      <Badge variant="default" className="text-xs">
                        {item.readiness}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{item.score}</div>
                    <div className="text-xs text-gray-600">적합성 지수</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>구축 기간: {item.timeline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span>투자 규모: {item.investment}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-purple-600" />
                    <span>회수 기간: {item.expectedROI}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            정책 권고사항
          </CardTitle>
          <CardDescription>DRT 적합성 분석 기반 핵심 제언</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-green-800">강점 활용 방안</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>높은 인구밀도를 활용한 효율적 노선 설계</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>우수한 소득수준 기반 지속가능한 수익 모델</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>적극적인 정책 환경 활용한 신속한 도입</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>고령화 대비 선제적 교통약자 서비스</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-orange-800">개선 필요 사항</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>기존 대중교통과의 연계성 강화</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>외곽 지역 특화 서비스 모델 개발</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>교통 인프라 보완 투자</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>지역별 맞춤형 요금 정책 수립</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">최종 결론</h4>
            <p className="text-sm text-green-800">
              종합 적합성 지수 0.78로 DRT 도입에 매우 적합한 지역입니다. 특히 중앙구, 서구, 북구를 우선 도입 지역으로
              하여 단계적 확산 전략을 권장합니다. 높은 인구밀도와 우수한 사회경제적 여건을 바탕으로 성공적인 DRT 서비스
              정착이 가능할 것으로 예상됩니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
