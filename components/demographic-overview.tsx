"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Home, Briefcase, GraduationCap, Heart } from "lucide-react"

const populationByDistrict = [
  { district: "중앙구", population: 45200, density: 12400, growth: 2.3 },
  { district: "동구", population: 38900, density: 8900, growth: 1.8 },
  { district: "서구", population: 52100, density: 9800, growth: 3.1 },
  { district: "남구", population: 41800, density: 7600, growth: 1.2 },
  { district: "북구", population: 48300, density: 10200, growth: 2.7 },
  { district: "외곽", population: 58220, density: 3400, growth: 4.2 },
]

const ageGroups = [
  { name: "0-19세", value: 18.2, color: "#3b82f6" },
  { name: "20-39세", value: 28.5, color: "#10b981" },
  { name: "40-59세", value: 34.6, color: "#f59e0b" },
  { name: "60세 이상", value: 18.7, color: "#ef4444" },
]

const socioeconomicIndicators = [
  {
    name: "평균 가구소득",
    value: "4,850만원",
    icon: Briefcase,
    description: "연간 가구소득 중위값",
    trend: "+3.2%",
  },
  {
    name: "자가보유율",
    value: "68.4%",
    icon: Home,
    description: "주택 자가보유 비율",
    trend: "+1.1%",
  },
  {
    name: "대학진학률",
    value: "72.8%",
    icon: GraduationCap,
    description: "고등교육 이수율",
    trend: "+0.8%",
  },
  {
    name: "의료접근성",
    value: "85.2%",
    icon: Heart,
    description: "의료시설 접근 용이성",
    trend: "+2.4%",
  },
]

export function DemographicOverview() {
  return (
    <div className="space-y-6">
      {/* Key Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {socioeconomicIndicators.map((indicator, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{indicator.name}</CardTitle>
              <indicator.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{indicator.value}</div>
              <p className="text-xs text-muted-foreground">{indicator.description}</p>
              <div className="flex items-center mt-2">
                <Badge variant="secondary" className="text-xs text-green-600">
                  {indicator.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Population by District */}
        <Card>
          <CardHeader>
            <CardTitle>구역별 인구 분포</CardTitle>
            <CardDescription>지역별 인구수 및 밀도 현황</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={populationByDistrict}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="population" fill="#3b82f6" name="인구수" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Age Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>연령대별 분포</CardTitle>
            <CardDescription>전체 인구의 연령구조</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ageGroups}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {ageGroups.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* District Details */}
      <Card>
        <CardHeader>
          <CardTitle>구역별 상세 정보</CardTitle>
          <CardDescription>인구밀도, 성장률 및 DRT 적합성 평가</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {populationByDistrict.map((district, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-800 rounded-full font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{district.district}</h4>
                    <p className="text-sm text-gray-600">인구: {district.population.toLocaleString()}명</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-sm">
                    <span className="font-medium">밀도:</span> {district.density.toLocaleString()}명/km²
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">성장률:</span>{" "}
                    <span className="text-green-600">+{district.growth}%</span>
                  </div>
                  <div className="text-sm">
                    <Badge
                      variant={district.density > 10000 ? "default" : district.density > 7000 ? "secondary" : "outline"}
                    >
                      {district.density > 10000 ? "고밀도" : district.density > 7000 ? "중밀도" : "저밀도"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* DRT Suitability Summary */}
      <Card>
        <CardHeader>
          <CardTitle>DRT 적합성 종합 평가</CardTitle>
          <CardDescription>인구·사회경제 특성 기반 DRT 도입 타당성</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">인구학적 요인</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">인구밀도</span>
                  <span className="text-sm font-medium">높음</span>
                </div>
                <Progress value={85} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm">고령화율</span>
                  <span className="text-sm font-medium">중간</span>
                </div>
                <Progress value={65} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm">인구증가율</span>
                  <span className="text-sm font-medium">양호</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">경제적 요인</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">소득수준</span>
                  <span className="text-sm font-medium">높음</span>
                </div>
                <Progress value={80} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm">지불능력</span>
                  <span className="text-sm font-medium">양호</span>
                </div>
                <Progress value={78} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm">경제활동</span>
                  <span className="text-sm font-medium">활발</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">사회적 요인</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">교육수준</span>
                  <span className="text-sm font-medium">높음</span>
                </div>
                <Progress value={88} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm">기술수용성</span>
                  <span className="text-sm font-medium">높음</span>
                </div>
                <Progress value={85} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm">사회참여</span>
                  <span className="text-sm font-medium">활발</span>
                </div>
                <Progress value={79} className="h-2" />
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-green-900">종합 적합성 지수</span>
              <span className="text-2xl font-bold text-green-600">0.78</span>
            </div>
            <div className="text-sm text-green-700">
              인구·사회경제 특성 분석 결과 DRT 도입에 매우 적합한 지역으로 평가됩니다. 높은 인구밀도와 소득수준, 우수한
              교육수준이 DRT 서비스의 성공적 정착을 뒷받침할 것으로 예상됩니다.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
