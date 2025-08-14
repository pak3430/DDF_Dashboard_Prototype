"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, ZoomIn, ZoomOut, Layers } from "lucide-react"

interface POIMapProps {
  selectedTypes: string[]
  region: string
  timeFilter: string
}

export function POIMap({ selectedTypes, region, timeFilter }: POIMapProps) {
  const [mapView, setMapView] = useState<"satellite" | "street" | "hybrid">("street")
  const [showHeatmap, setShowHeatmap] = useState(true)
  const [selectedPOI, setSelectedPOI] = useState<any>(null)

  // 모의 POI 데이터
  const mockPOIs = [
    { id: 1, name: "중앙초등학교", type: "school", lat: 37.5665, lng: 126.978, demand: 85 },
    { id: 2, name: "시립병원", type: "hospital", lat: 37.5645, lng: 126.975, demand: 92 },
    { id: 3, name: "관광문화센터", type: "tourist", lat: 37.5685, lng: 126.98, demand: 78 },
    { id: 4, name: "대형마트", type: "shopping", lat: 37.5625, lng: 126.972, demand: 65 },
    { id: 5, name: "구청", type: "office", lat: 37.5705, lng: 126.982, demand: 45 },
  ]

  const filteredPOIs = mockPOIs.filter((poi) => selectedTypes.includes(poi.type))

  return (
    <Card className="h-[600px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            POI 오버레이 지도
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={showHeatmap ? "default" : "outline"}
              size="sm"
              onClick={() => setShowHeatmap(!showHeatmap)}
            >
              <Layers className="h-4 w-4 mr-1" />
              히트맵
            </Button>
            <Button variant="outline" size="sm">
              <Navigation className="h-4 w-4 mr-1" />
              현재 위치
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 relative">
        {/* 지도 컨테이너 (실제 구현에서는 Leaflet/Mapbox 사용) */}
        <div className="h-[500px] bg-gray-100 relative overflow-hidden">
          {/* 모의 지도 배경 */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" className="text-gray-400">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>

          {/* POI 마커들 */}
          {filteredPOIs.map((poi, index) => (
            <div
              key={poi.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + index * 10}%`,
              }}
              onClick={() => setSelectedPOI(poi)}
            >
              <div className="relative">
                <div
                  className={`w-6 h-6 rounded-full border-2 border-white shadow-lg ${
                    poi.type === "school"
                      ? "bg-blue-500"
                      : poi.type === "hospital"
                        ? "bg-red-500"
                        : poi.type === "tourist"
                          ? "bg-green-500"
                          : poi.type === "shopping"
                            ? "bg-purple-500"
                            : "bg-gray-500"
                  }`}
                />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <Badge variant="secondary" className="text-xs">
                    {poi.name}
                  </Badge>
                </div>
              </div>
            </div>
          ))}

          {/* 수요 히트맵 오버레이 */}
          {showHeatmap && (
            <div className="absolute inset-0 pointer-events-none">
              {filteredPOIs.map((poi, index) => (
                <div
                  key={`heatmap-${poi.id}`}
                  className="absolute rounded-full opacity-30"
                  style={{
                    left: `${15 + index * 15}%`,
                    top: `${25 + index * 10}%`,
                    width: `${poi.demand}px`,
                    height: `${poi.demand}px`,
                    background: `radial-gradient(circle, rgba(255,0,0,0.6) 0%, rgba(255,255,0,0.3) 50%, transparent 100%)`,
                  }}
                />
              ))}
            </div>
          )}

          {/* 지도 컨트롤 */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button variant="outline" size="sm">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>

          {/* 범례 */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
            <h4 className="font-medium text-sm mb-2">범례</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span>학교</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>병원</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>관광지</span>
              </div>
              {showHeatmap && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-yellow-500" />
                  <span>수요 밀도</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* POI 상세 정보 팝업 */}
        {selectedPOI && (
          <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg border max-w-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{selectedPOI.name}</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedPOI(null)}>
                ×
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">유형:</span>
                <Badge variant="outline">
                  {selectedPOI.type === "school"
                    ? "학교"
                    : selectedPOI.type === "hospital"
                      ? "병원"
                      : selectedPOI.type === "tourist"
                        ? "관광지"
                        : selectedPOI.type === "shopping"
                          ? "쇼핑센터"
                          : "기타"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">수요 지수:</span>
                <span className="font-medium">{selectedPOI.demand}/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">주요 이용 시간:</span>
                <span>08:00-18:00</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
