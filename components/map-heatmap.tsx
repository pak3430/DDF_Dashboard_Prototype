"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface MapHeatmapProps {
  timeFilter: string
  dayFilter: string
  regionFilter: string
  isLoading: boolean
}

// Mock data for demonstration
const generateHeatmapData = (timeFilter: string, dayFilter: string, regionFilter: string) => {
  const baseData = [
    { lat: 37.5665, lng: 126.978, intensity: 0.8, label: "명동역" },
    { lat: 37.5663, lng: 126.9779, intensity: 0.9, label: "을지로입구역" },
    { lat: 37.5547, lng: 126.9706, intensity: 0.7, label: "강남역" },
    { lat: 37.5172, lng: 127.0473, intensity: 0.6, label: "잠실역" },
    { lat: 37.4979, lng: 127.0276, intensity: 0.8, label: "강남구청역" },
    { lat: 37.5014, lng: 127.0396, intensity: 0.5, label: "선릉역" },
    { lat: 37.5087, lng: 127.0633, intensity: 0.9, label: "송파구청" },
    { lat: 37.4862, lng: 127.0323, intensity: 0.7, label: "대치역" },
  ]

  // Simulate filter effects
  return baseData.map((point) => ({
    ...point,
    intensity: Math.random() * 0.9 + 0.1, // Random intensity for demo
  }))
}

export function MapHeatmap({ timeFilter, dayFilter, regionFilter, isLoading }: MapHeatmapProps) {
  const [heatmapData, setHeatmapData] = useState<any[]>([])

  useEffect(() => {
    const data = generateHeatmapData(timeFilter, dayFilter, regionFilter)
    setHeatmapData(data)
  }, [timeFilter, dayFilter, regionFilter])

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">히트맵 데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg">
      {/* Simulated map with heatmap points */}
      <div className="absolute inset-0 p-4">
        <div className="relative h-full bg-white rounded border-2 border-dashed border-gray-300">
          {/* Map placeholder */}
          <div className="absolute inset-4 bg-gray-100 rounded flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-lg font-medium mb-2">서울시 교통취약지 히트맵</div>
              <div className="text-sm">실제 구현 시 Leaflet/Mapbox 지도가 표시됩니다</div>
            </div>
          </div>

          {/* Simulated heatmap points */}
          {heatmapData.map((point, index) => (
            <div
              key={index}
              className="absolute w-8 h-8 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
              style={{
                left: `${20 + (index % 4) * 20}%`,
                top: `${20 + Math.floor(index / 4) * 20}%`,
                backgroundColor: `rgba(${point.intensity > 0.7 ? "239, 68, 68" : point.intensity > 0.4 ? "245, 158, 11" : "34, 197, 94"}, ${point.intensity})`,
                boxShadow: `0 0 20px rgba(${point.intensity > 0.7 ? "239, 68, 68" : point.intensity > 0.4 ? "245, 158, 11" : "34, 197, 94"}, ${point.intensity * 0.5})`,
              }}
              title={`${point.label}: ${Math.round(point.intensity * 100)}% 위험도`}
            />
          ))}

          {/* Legend overlay */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border">
            <div className="text-xs font-medium mb-2">위험도</div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>높음</span>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>보통</span>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>낮음</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
