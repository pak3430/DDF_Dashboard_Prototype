"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ZoneMapProps {
  analysisType: string
  timeRange: string
  method: string
}

// Mock zone data
const zones = [
  { id: 1, name: "강남역", type: "green", efficiency: 92.3, x: 60, y: 40 },
  { id: 2, name: "역삼동", type: "red", efficiency: 45.2, x: 65, y: 35 },
  { id: 3, name: "서초구청", type: "yellow", efficiency: 72.1, x: 55, y: 50 },
  { id: 4, name: "방배동", type: "yellow", efficiency: 68.9, x: 50, y: 55 },
  { id: 5, name: "잠실역", type: "green", efficiency: 88.7, x: 75, y: 60 },
  { id: 6, name: "송파구청", type: "green", efficiency: 85.4, x: 80, y: 65 },
  { id: 7, name: "대치역", type: "red", efficiency: 52.8, x: 70, y: 45 },
  { id: 8, name: "도곡동", type: "yellow", efficiency: 74.3, x: 68, y: 52 },
]

export function ZoneMap({ analysisType, timeRange, method }: ZoneMapProps) {
  const getZoneColor = (type: string) => {
    switch (type) {
      case "red":
        return "bg-red-500"
      case "yellow":
        return "bg-yellow-500"
      case "green":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getZoneBorderColor = (type: string) => {
    switch (type) {
      case "red":
        return "border-red-600"
      case "yellow":
        return "border-yellow-600"
      case "green":
        return "border-green-600"
      default:
        return "border-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>레드/그린존 분포 현황</CardTitle>
        <CardDescription>
          {method === "kmeans" ? "K-means" : method === "dbscan" ? "DBSCAN" : "계층적"} 클러스터링 기반 효율성 분석
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] bg-gray-50 rounded-lg relative overflow-hidden border-2 border-dashed border-gray-300">
          {/* Map background */}
          <div className="absolute inset-4 bg-white rounded border flex items-center justify-center">
            <div className="text-center text-gray-400 mb-8">
              <div className="text-lg font-medium mb-2">서울시 DRT 서비스 구역</div>
              <div className="text-sm">실제 구현 시 상세 지도가 표시됩니다</div>
            </div>
          </div>

          {/* Zone markers */}
          {zones.map((zone) => (
            <div
              key={zone.id}
              className={`absolute w-12 h-12 rounded-full border-4 ${getZoneColor(zone.type)} ${getZoneBorderColor(
                zone.type,
              )} transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform`}
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
              }}
              title={`${zone.name}: ${zone.efficiency}% 효율성`}
            >
              <div className="text-white text-xs font-bold">{zone.id}</div>
            </div>
          ))}

          {/* Zone details overlay */}
          <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-xs">
            <div className="text-sm font-medium mb-3">구역 상세 정보</div>
            <div className="space-y-2 text-xs">
              {zones.slice(0, 3).map((zone) => (
                <div key={zone.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getZoneColor(zone.type)}`}></div>
                    <span>{zone.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {zone.efficiency}%
                  </Badge>
                </div>
              ))}
              <div className="text-gray-500 text-center pt-1">... 및 {zones.length - 3}개 구역 더</div>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg border">
            <div className="text-xs font-medium mb-2">효율성 등급</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>레드존 (&lt;60%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>옐로우존 (60-80%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>그린존 (&gt;80%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis summary */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="font-medium text-red-900">최저 효율성</div>
            <div className="text-xl font-bold text-red-600">45.2%</div>
            <div className="text-red-600">역삼동 구역</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="font-medium text-green-900">최고 효율성</div>
            <div className="text-xl font-bold text-green-600">92.3%</div>
            <div className="text-green-600">강남역 구역</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="font-medium text-blue-900">평균 효율성</div>
            <div className="text-xl font-bold text-blue-600">72.8%</div>
            <div className="text-blue-600">전체 구역</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
