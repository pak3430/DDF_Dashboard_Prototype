'use client'

import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Activity, MapPin, Clock, TrendingUp, AlertCircle } from 'lucide-react'

// Leaflet을 동적으로 임포트 (서버사이드 렌더링 방지)
const LeafletMap = dynamic(() => import('./leaflet-map-client'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
    <div className="text-gray-500">지도 로딩 중...</div>
  </div>
})

interface HeatmapPoint {
  lat: number
  lng: number
  intensity: number
  stop_id?: string
  stop_name?: string
  congestion_level?: '양호' | '보통' | '혼잡' | '매우혼잡'
}

interface HeatmapData {
  heatmap_points: [number, number, number][]
  bounds: {
    north: number
    south: number
    east: number
    west: number
  }
  legend: {
    min_value: number
    max_value: number
    unit: string
  }
  updated_at: string
  metadata: {
    total_points: number
    data_source: string
    api_status: string
  }
}

interface MapLeafletHeatmapProps {
  filters?: {
    target_date?: string
    time_range?: string
    intensity_type?: string
    include_poi?: boolean
  }
  onPointClick?: (point: HeatmapPoint) => void
  className?: string
}

export function MapLeafletHeatmap({ 
  filters = {}, 
  onPointClick,
  className = ""
}: MapLeafletHeatmapProps) {
  const [heatmapData, setHeatmapData] = useState<HeatmapData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPoint, setSelectedPoint] = useState<HeatmapPoint | null>(null)
  const refreshInterval = useRef<NodeJS.Timeout | null>(null)

  // 히트맵 데이터 fetch 함수
  const fetchHeatmapData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const params = new URLSearchParams({
        target_date: filters.target_date || new Date().toISOString().split('T')[0],
        time_range: filters.time_range || '1h',
        intensity_type: filters.intensity_type || 'total',
        include_poi: filters.include_poi ? 'true' : 'false'
      })
      
      const response = await fetch(`/api/v1/dashboard/realtime/heatmap-data?${params}`)
      const result = await response.json()
      
      if (result.success) {
        setHeatmapData(result.data)
      } else {
        throw new Error(result.error?.message || 'API 호출 실패')
      }
    } catch (err) {
      console.error('히트맵 데이터 로드 에러:', err)
      setError(err instanceof Error ? err.message : '알 수 없는 오류 발생')
    } finally {
      setIsLoading(false)
    }
  }

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchHeatmapData()
    
    // 30초마다 자동 새로고침
    refreshInterval.current = setInterval(fetchHeatmapData, 30000)
    
    return () => {
      if (refreshInterval.current) {
        clearInterval(refreshInterval.current)
      }
    }
  }, [filters.target_date, filters.time_range, filters.intensity_type, filters.include_poi])

  // 히트맵 포인트 클릭 핸들러
  const handlePointClick = (lat: number, lng: number, intensity: number) => {
    const point: HeatmapPoint = {
      lat,
      lng,
      intensity,
      stop_name: `정류장-${Math.floor(Math.random() * 1000)}`,
      congestion_level: intensity > 0.8 ? '매우혼잡' : 
                       intensity > 0.6 ? '혼잡' : 
                       intensity > 0.3 ? '보통' : '양호'
    }
    
    setSelectedPoint(point)
    onPointClick?.(point)
  }

  // 수동 새로고침
  const handleRefresh = () => {
    fetchHeatmapData()
  }

  // 혼잡도 레벨 색상
  const getCongestionColor = (level: string) => {
    switch (level) {
      case '매우혼잡': return 'bg-red-500'
      case '혼잡': return 'bg-orange-500'
      case '보통': return 'bg-yellow-500'
      case '양호': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  // 혼잡도 레벨 텍스트 색상
  const getCongestionTextColor = (level: string) => {
    switch (level) {
      case '매우혼잡': return 'text-red-700'
      case '혼잡': return 'text-orange-700'  
      case '보통': return 'text-yellow-700'
      case '양호': return 'text-green-700'
      default: return 'text-gray-700'
    }
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              서울시 교통량 히트맵
            </CardTitle>
            <CardDescription>
              실시간 정류장별 승하차 인원 현황
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <Activity className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              새로고침
            </Button>
          </div>
        </div>
        
        {/* 데이터 상태 표시 */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {heatmapData && (
            <>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {heatmapData.metadata.total_points}개 정류장
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {new Date(heatmapData.updated_at).toLocaleTimeString('ko-KR')} 업데이트
              </div>
              <Badge variant="secondary" className="text-xs">
                {heatmapData.metadata.data_source}
              </Badge>
            </>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* 에러 상태 */}
        {error && (
          <div className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">데이터 로드 중 오류 발생</p>
            <p className="text-sm text-gray-500 mb-4">{error}</p>
            <Button onClick={handleRefresh} variant="outline">
              다시 시도
            </Button>
          </div>
        )}
        
        {/* 히트맵 표시 */}
        {!error && (
          <div className="relative h-96">
            <LeafletMap
              heatmapData={heatmapData}
              isLoading={isLoading}
              onPointClick={handlePointClick}
              bounds={heatmapData?.bounds}
            />
            
            {/* 범례 */}
            {heatmapData && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <h4 className="text-sm font-semibold mb-2">교통량 범례</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-300 to-blue-500 rounded"></div>
                    <span>낮음</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded"></div>
                    <span>보통</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-700 rounded"></div>
                    <span>높음</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t text-xs text-gray-600">
                  {heatmapData.legend.min_value} - {heatmapData.legend.max_value} {heatmapData.legend.unit}
                </div>
              </div>
            )}
            
            {/* 선택된 포인트 정보 */}
            {selectedPoint && (
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
                <h4 className="font-semibold mb-2">{selectedPoint.stop_name}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>위치:</span>
                    <span>{selectedPoint.lat.toFixed(4)}, {selectedPoint.lng.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>혼잡도:</span>
                    <Badge 
                      className={`${getCongestionColor(selectedPoint.congestion_level || '양호')} text-white`}
                    >
                      {selectedPoint.congestion_level}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>강도:</span>
                    <span className={getCongestionTextColor(selectedPoint.congestion_level || '양호')}>
                      {Math.floor(selectedPoint.intensity * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}