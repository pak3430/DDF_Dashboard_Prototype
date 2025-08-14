"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, TrendingUp, Filter } from "lucide-react"

const densityData = [
  { id: 1, district: "중앙구", density: 12400, population: 45200, area: 3.6, drtScore: 0.92 },
  { id: 2, district: "서구", density: 9800, population: 52100, area: 5.3, drtScore: 0.85 },
  { id: 3, district: "북구", density: 10200, population: 48300, area: 4.7, drtScore: 0.88 },
  { id: 4, district: "동구", density: 8900, population: 38900, area: 4.4, drtScore: 0.78 },
  { id: 5, district: "남구", density: 7600, population: 41800, area: 5.5, drtScore: 0.72 },
  { id: 6, district: "외곽", density: 3400, population: 58220, area: 17.1, drtScore: 0.45 },
]

const getDensityLevel = (density: number) => {
  if (density >= 10000) return { level: "고밀도", color: "bg-red-500", textColor: "text-red-800" }
  if (density >= 7000) return { level: "중밀도", color: "bg-yellow-500", textColor: "text-yellow-800" }
  return { level: "저밀도", color: "bg-green-500", textColor: "text-green-800" }
}

export function PopulationDensityMap() {
  const [selectedMetric, setSelectedMetric] = useState("density")
  const [selectedTimeframe, setSelectedTimeframe] = useState("current")

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="density">인구밀도</SelectItem>
              <SelectItem value="population">총인구</SelectItem>
              <SelectItem value="growth">증가율</SelectItem>
              <SelectItem value="drtScore">DRT 적합도</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">현재</SelectItem>
              <SelectItem value="5years">5년 전</SelectItem>
              <SelectItem value="projection">5년 후</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Map Visualization */}
      <div className="relative">
        <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">인구밀도 분포 지도</h3>
            <p className="text-gray-600 mb-4">지역별 인구밀도 및 DRT 적합성 시각화</p>
            <Button variant="outline">지도 데이터 로드</Button>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border">
          <h4 className="font-medium mb-3">인구밀도 범례</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm">고밀도 (10,000+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm">중밀도 (7,000-10,000)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm">저밀도 (7,000 미만)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Density Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>구역별 인구밀도 순위</CardTitle>
            <CardDescription>인구밀도 기준 상위 지역 분석</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {densityData
                .sort((a, b) => b.density - a.density)
                .map((area, index) => {
                  const densityInfo = getDensityLevel(area.density)
                  return (
                    <div key={area.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{area.district}</h4>
                          <p className="text-sm text-gray-600">면적: {area.area}km²</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{area.density.toLocaleString()}명/km²</div>
                        <Badge className={`text-xs ${densityInfo.textColor} bg-opacity-20`}>{densityInfo.level}</Badge>
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>DRT 적합성 분석</CardTitle>
            <CardDescription>인구밀도 기반 DRT 도입 적합성 평가</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {densityData
                .sort((a, b) => b.drtScore - a.drtScore)
                .map((area, index) => (
                  <div key={area.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{area.district}</h4>
                        <p className="text-sm text-gray-600">인구: {area.population.toLocaleString()}명</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{area.drtScore}</div>
                      <Badge
                        variant={area.drtScore >= 0.8 ? "default" : area.drtScore >= 0.6 ? "secondary" : "outline"}
                      >
                        {area.drtScore >= 0.8 ? "최적" : area.drtScore >= 0.6 ? "적합" : "검토"}
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>인구밀도 통계 요약</CardTitle>
          <CardDescription>전체 지역 인구밀도 현황 및 특성</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">평균 밀도</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(densityData.reduce((sum, d) => sum + d.density, 0) / densityData.length).toLocaleString()}
              </div>
              <div className="text-sm text-blue-700">명/km²</div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">최고 밀도</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {Math.max(...densityData.map((d) => d.density)).toLocaleString()}
              </div>
              <div className="text-sm text-green-700">중앙구</div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-800">고밀도 지역</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {densityData.filter((d) => d.density >= 10000).length}개
              </div>
              <div className="text-sm text-purple-700">구역</div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-800">총 인구</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(densityData.reduce((sum, d) => sum + d.population, 0) / 1000)}K
              </div>
              <div className="text-sm text-orange-700">명</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">분석 결과</h4>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• 중앙구, 북구, 서구가 고밀도 지역으로 DRT 도입에 최적</li>
              <li>• 동구, 남구는 중밀도로 DRT 서비스 확대 검토 필요</li>
              <li>• 외곽 지역은 저밀도이나 면적이 넓어 특별한 서비스 모델 필요</li>
              <li>• 전체적으로 DRT 도입에 적합한 인구밀도 분포를 보임</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
