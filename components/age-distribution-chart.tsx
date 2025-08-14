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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Users, TrendingUp, Baby, GraduationCap } from "lucide-react"

const ageDistributionData = [
  { ageGroup: "0-9세", current: 8.2, projected: 7.1, drtUsage: 15.3 },
  { ageGroup: "10-19세", current: 10.0, projected: 8.8, drtUsage: 28.7 },
  { ageGroup: "20-29세", current: 14.2, projected: 12.9, drtUsage: 45.2 },
  { ageGroup: "30-39세", current: 14.3, projected: 13.8, drtUsage: 52.8 },
  { ageGroup: "40-49세", current: 16.8, projected: 15.2, drtUsage: 48.9 },
  { ageGroup: "50-59세", current: 17.8, projected: 16.4, drtUsage: 41.6 },
  { ageGroup: "60-69세", current: 12.4, projected: 15.8, drtUsage: 38.2 },
  { ageGroup: "70세 이상", current: 6.3, projected: 10.0, drtUsage: 62.4 },
]

const generationData = [
  { name: "Z세대 (10-25세)", value: 18.5, color: "#3b82f6", mobility: "높음" },
  { name: "밀레니얼 (26-41세)", value: 28.7, color: "#10b981", mobility: "매우 높음" },
  { name: "X세대 (42-57세)", value: 32.1, color: "#f59e0b", mobility: "높음" },
  { name: "베이비붐 (58-76세)", value: 15.4, color: "#ef4444", mobility: "중간" },
  { name: "시니어 (77세+)", value: 5.3, color: "#8b5cf6", mobility: "낮음" },
]

const mobilityPatterns = [
  { age: "20대", commute: 85, leisure: 65, medical: 15, shopping: 45 },
  { age: "30대", commute: 92, leisure: 58, medical: 22, shopping: 68 },
  { age: "40대", commute: 88, leisure: 52, medical: 28, shopping: 72 },
  { age: "50대", commute: 78, leisure: 48, medical: 35, shopping: 65 },
  { age: "60대", commute: 45, leisure: 42, medical: 58, shopping: 55 },
  { age: "70대+", commute: 12, leisure: 28, medical: 78, shopping: 48 },
]

export function AgeDistributionChart() {
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
            <SelectItem value="distribution">연령분포</SelectItem>
            <SelectItem value="generation">세대별 분석</SelectItem>
            <SelectItem value="mobility">이동패턴</SelectItem>
            <SelectItem value="projection">미래 전망</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedView === "distribution" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>연령대별 인구 분포</CardTitle>
                <CardDescription>현재 인구구조 및 DRT 이용률</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ageDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ageGroup" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="current" fill="#3b82f6" name="인구비율(%)" />
                    <Bar dataKey="drtUsage" fill="#10b981" name="DRT 이용률(%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>세대별 구성</CardTitle>
                <CardDescription>주요 세대별 인구 비중</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={generationData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${value}%`}
                    >
                      {generationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>연령대별 특성 분석</CardTitle>
              <CardDescription>DRT 이용 패턴 및 특성</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ageDistributionData.map((age, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-16 text-center">
                        <div className="font-medium">{age.ageGroup}</div>
                        <div className="text-sm text-gray-600">{age.current}%</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">DRT 이용률</span>
                          <Badge
                            variant={age.drtUsage >= 50 ? "default" : age.drtUsage >= 30 ? "secondary" : "outline"}
                          >
                            {age.drtUsage >= 50 ? "높음" : age.drtUsage >= 30 ? "중간" : "낮음"}
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${age.drtUsage}%` }}></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">{age.drtUsage}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedView === "generation" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {generationData.map((gen, index) => (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <div className="w-4 h-4 rounded mx-auto mb-2" style={{ backgroundColor: gen.color }}></div>
                  <div className="font-medium text-sm mb-1">{gen.name}</div>
                  <div className="text-2xl font-bold">{gen.value}%</div>
                  <Badge variant="outline" className="text-xs mt-1">
                    {gen.mobility}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>세대별 DRT 이용 특성</CardTitle>
              <CardDescription>각 세대의 교통 이용 패턴 및 선호도</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-3">Z세대 & 밀레니얼</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 앱 기반 서비스 선호</li>
                    <li>• 실시간 정보 중시</li>
                    <li>• 공유 경제 친화적</li>
                    <li>• 환경 의식 높음</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-3">X세대</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 실용성 중시</li>
                    <li>• 비용 효율성 고려</li>
                    <li>• 안정성 선호</li>
                    <li>• 가족 단위 이용</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-3">베이비붐 & 시니어</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• 편의성 최우선</li>
                    <li>• 의료 접근성 중요</li>
                    <li>• 안전성 강조</li>
                    <li>• 개인 맞춤 서비스</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedView === "mobility" && (
        <Card>
          <CardHeader>
            <CardTitle>연령대별 이동 목적 패턴</CardTitle>
            <CardDescription>연령에 따른 통행 목적별 이용률</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={mobilityPatterns}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="commute" fill="#3b82f6" name="통근/통학" />
                <Bar dataKey="leisure" fill="#10b981" name="여가/오락" />
                <Bar dataKey="medical" fill="#ef4444" name="의료/복지" />
                <Bar dataKey="shopping" fill="#f59e0b" name="쇼핑/업무" />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <div className="font-medium text-blue-800">통근/통학</div>
                <div className="text-sm text-blue-600">20-40대 집중</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg text-center">
                <div className="font-medium text-green-800">여가/오락</div>
                <div className="text-sm text-green-600">전 연령 고른 분포</div>
              </div>
              <div className="p-3 bg-red-50 rounded-lg text-center">
                <div className="font-medium text-red-800">의료/복지</div>
                <div className="text-sm text-red-600">60대 이상 집중</div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg text-center">
                <div className="font-medium text-yellow-800">쇼핑/업무</div>
                <div className="text-sm text-yellow-600">30-50대 높음</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedView === "projection" && (
        <Card>
          <CardHeader>
            <CardTitle>인구구조 변화 전망</CardTitle>
            <CardDescription>향후 10년간 연령구조 변화 예측</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={ageDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="current" stroke="#3b82f6" name="현재" strokeWidth={2} />
                <Line type="monotone" dataKey="projected" stroke="#ef4444" name="10년 후" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>

            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-800 mb-2">주요 변화 전망</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• 고령인구(70세+) 비율 6.3% → 10.0%로 증가</li>
                <li>• 생산가능인구(20-64세) 비율 감소 추세</li>
                <li>• DRT 수요층인 고령자 및 교통약자 증가</li>
                <li>• 의료 접근성 중심의 서비스 설계 필요</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            연령구조 분석 결과
          </CardTitle>
          <CardDescription>DRT 서비스 설계를 위한 핵심 인사이트</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Baby className="h-4 w-4 text-blue-600" />
                <h4 className="font-medium">주요 이용층</h4>
              </div>
              <ul className="text-sm space-y-1">
                <li>• 20-40대: 통근/업무 중심 (47.3%)</li>
                <li>• 60대 이상: 의료/생활 중심 (18.7%)</li>
                <li>• 고령자 DRT 이용률 높음 (62.4%)</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <h4 className="font-medium">성장 동력</h4>
              </div>
              <ul className="text-sm space-y-1">
                <li>• 고령화 진행으로 수요 증가</li>
                <li>• 밀레니얼 세대 기술 친화적</li>
                <li>• 교통약자 이동권 확대</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-purple-600" />
                <h4 className="font-medium">서비스 전략</h4>
              </div>
              <ul className="text-sm space-y-1">
                <li>• 세대별 맞춤 인터페이스</li>
                <li>• 의료시설 연계 강화</li>
                <li>• 가족 단위 서비스 고려</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
