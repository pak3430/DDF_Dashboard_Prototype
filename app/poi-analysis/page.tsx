"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { POIMap } from "@/components/poi-map"
import { POIList } from "@/components/poi-list"
import { POIAnalytics } from "@/components/poi-analytics"
import { MapPin, School, Hospital, Building, ShoppingCart, Camera, Users } from "lucide-react"

export default function POIAnalysisPage() {
  const [selectedPOITypes, setSelectedPOITypes] = useState<string[]>(["school", "hospital", "tourist"])
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")

  const poiTypes = [
    { id: "school", name: "학교", icon: School, color: "bg-blue-500", count: 45 },
    { id: "hospital", name: "병원", icon: Hospital, color: "bg-red-500", count: 23 },
    { id: "tourist", name: "관광지", icon: Camera, color: "bg-green-500", count: 18 },
    { id: "shopping", name: "쇼핑센터", icon: ShoppingCart, color: "bg-purple-500", count: 12 },
    { id: "office", name: "관공서", icon: Building, color: "bg-gray-500", count: 8 },
    { id: "community", name: "커뮤니티센터", icon: Users, color: "bg-orange-500", count: 15 },
  ]

  const handlePOITypeToggle = (typeId: string) => {
    setSelectedPOITypes((prev) => (prev.includes(typeId) ? prev.filter((id) => id !== typeId) : [...prev, typeId]))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="md:ml-64">
        <DashboardHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">POI 오버레이 분석</h1>
            <p className="text-gray-600">
              주요 시설물(POI) 위치와 DRT 수요 패턴의 상관관계를 분석하여 수요 집중 원인을 파악합니다.
            </p>
          </div>

          {/* 필터 컨트롤 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                POI 필터 설정
              </CardTitle>
              <CardDescription>분석할 POI 유형과 지역, 시간대를 선택하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* POI 유형 선택 */}
                <div>
                  <h3 className="font-medium mb-3">POI 유형</h3>
                  <div className="space-y-2">
                    {poiTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <div key={type.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={type.id}
                            checked={selectedPOITypes.includes(type.id)}
                            onCheckedChange={() => handlePOITypeToggle(type.id)}
                          />
                          <label
                            htmlFor={type.id}
                            className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                          >
                            <div className={`w-3 h-3 rounded-full ${type.color}`} />
                            <Icon className="h-4 w-4" />
                            {type.name}
                            <Badge variant="secondary" className="ml-auto">
                              {type.count}
                            </Badge>
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* 지역 선택 */}
                <div>
                  <h3 className="font-medium mb-3">분석 지역</h3>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="지역 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체 지역</SelectItem>
                      <SelectItem value="downtown">시내 중심가</SelectItem>
                      <SelectItem value="residential">주거 지역</SelectItem>
                      <SelectItem value="suburban">교외 지역</SelectItem>
                      <SelectItem value="industrial">산업 단지</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 시간대 필터 */}
                <div>
                  <h3 className="font-medium mb-3">분석 시간대</h3>
                  <Select value={timeFilter} onValueChange={setTimeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="시간대 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체 시간</SelectItem>
                      <SelectItem value="morning">오전 (06:00-12:00)</SelectItem>
                      <SelectItem value="afternoon">오후 (12:00-18:00)</SelectItem>
                      <SelectItem value="evening">저녁 (18:00-24:00)</SelectItem>
                      <SelectItem value="night">심야 (00:00-06:00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 지도 및 분석 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* POI 지도 */}
            <div className="lg:col-span-2">
              <POIMap selectedTypes={selectedPOITypes} region={selectedRegion} timeFilter={timeFilter} />
            </div>

            {/* POI 목록 */}
            <div>
              <POIList selectedTypes={selectedPOITypes} region={selectedRegion} />
            </div>
          </div>

          {/* POI 분석 결과 */}
          <POIAnalytics selectedTypes={selectedPOITypes} region={selectedRegion} timeFilter={timeFilter} />
        </main>
      </div>
    </div>
  )
}
