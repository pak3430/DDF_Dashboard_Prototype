'use client'

import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.heat'

// Leaflet heat 타입 확장
declare module 'leaflet' {
  function heatLayer(
    latlngs: [number, number, number][],
    options?: any
  ): L.Layer
}

interface HeatmapData {
  heatmap_points: [number, number, number][]
  bounds?: {
    north: number
    south: number
    east: number
    west: number
  }
  legend?: {
    min_value: number
    max_value: number
    unit: string
  }
  metadata?: {
    total_points: number
    data_source: string
  }
}

interface LeafletMapClientProps {
  heatmapData: HeatmapData | null
  isLoading: boolean
  onPointClick?: (lat: number, lng: number, intensity: number) => void
  bounds?: {
    north: number
    south: number
    east: number
    west: number
  }
}

const LeafletMapClient: React.FC<LeafletMapClientProps> = ({
  heatmapData,
  isLoading,
  onPointClick,
  bounds
}) => {
  const mapRef = useRef<L.Map | null>(null)
  const heatLayerRef = useRef<L.Layer | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // 지도 초기화
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    // 서울시 중심 좌표
    const seoulCenter: [number, number] = [37.5665, 126.9780]
    
    // 지도 생성
    const map = L.map(containerRef.current, {
      center: seoulCenter,
      zoom: 11,
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true,
    })

    // OpenStreetMap 타일 레이어 추가
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
      minZoom: 8,
    }).addTo(map)

    // 서울시 경계 표시 (대략적)
    if (bounds) {
      const seoulBounds = L.latLngBounds(
        [bounds.south, bounds.west],
        [bounds.north, bounds.east]
      )
      L.rectangle(seoulBounds, {
        color: '#3b82f6',
        weight: 2,
        opacity: 0.3,
        fillOpacity: 0.05,
        dashArray: '5, 10'
      }).addTo(map)
    }

    mapRef.current = map

    // 컴포넌트 언마운트 시 지도 정리
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [bounds])

  // 히트맵 데이터 업데이트
  useEffect(() => {
    if (!mapRef.current || !heatmapData || isLoading) return

    // 기존 히트맵 레이어 제거
    if (heatLayerRef.current) {
      mapRef.current.removeLayer(heatLayerRef.current)
      heatLayerRef.current = null
    }

    // 새 히트맵 레이어 생성
    if (heatmapData.heatmap_points && heatmapData.heatmap_points.length > 0) {
      const heatLayer = L.heatLayer(heatmapData.heatmap_points, {
        radius: 25,
        blur: 15,
        maxZoom: 17,
        minOpacity: 0.3,
        gradient: {
          0.0: '#313695',
          0.1: '#4575b4',
          0.2: '#74add1',
          0.3: '#abd9e9',
          0.4: '#e0f3f8',
          0.5: '#ffffcc',
          0.6: '#fed976',
          0.7: '#feb24c',
          0.8: '#fd8d3c',
          0.9: '#f03b20',
          1.0: '#bd0026'
        }
      })

      heatLayer.addTo(mapRef.current)
      heatLayerRef.current = heatLayer

      // 히트맵 데이터에 맞춰 지도 범위 조정
      if (bounds) {
        const seoulBounds = L.latLngBounds(
          [bounds.south, bounds.west],
          [bounds.north, bounds.east]
        )
        mapRef.current.fitBounds(seoulBounds, { padding: [20, 20] })
      }
    }

    // 지도 클릭 이벤트 (히트맵 포인트 클릭 감지)
    const handleMapClick = (e: L.LeafletMouseEvent) => {
      if (!onPointClick || !heatmapData.heatmap_points) return

      const clickedLat = e.latlng.lat
      const clickedLng = e.latlng.lng

      // 클릭 위치와 가장 가까운 히트맵 포인트 찾기
      let closestPoint: [number, number, number] | null = null
      let minDistance = Infinity

      heatmapData.heatmap_points.forEach((point) => {
        const [lat, lng, intensity] = point
        const distance = Math.sqrt(
          Math.pow(clickedLat - lat, 2) + Math.pow(clickedLng - lng, 2)
        )
        
        if (distance < minDistance && distance < 0.01) { // 0.01도 이내
          minDistance = distance
          closestPoint = point
        }
      })

      if (closestPoint) {
        const [lat, lng, intensity] = closestPoint
        onPointClick(lat, lng, intensity)
      }
    }

    mapRef.current.on('click', handleMapClick)

    return () => {
      if (mapRef.current) {
        mapRef.current.off('click', handleMapClick)
      }
    }
  }, [heatmapData, isLoading, onPointClick, bounds])

  return (
    <div className="relative w-full h-full">
      <div 
        ref={containerRef} 
        className="w-full h-full rounded-lg overflow-hidden"
        style={{ minHeight: '400px' }}
      />
      
      {/* 로딩 오버레이 */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-700">히트맵 데이터 로딩 중...</span>
          </div>
        </div>
      )}
      
      {/* 데이터 없음 오버레이 */}
      {!isLoading && heatmapData && heatmapData.heatmap_points.length === 0 && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="text-center">
            <div className="text-gray-500 mb-2">표시할 히트맵 데이터가 없습니다</div>
            <div className="text-sm text-gray-400">
              다른 시간대나 날짜를 선택해보세요
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LeafletMapClient