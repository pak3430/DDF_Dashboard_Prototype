'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  MapPin, 
  Users, 
  Clock, 
  Bus, 
  Building2,
  Loader2,
  AlertTriangle 
} from 'lucide-react'

interface HeatmapFilters {
  target_date: string
  time_range: string
  intensity_type: string
}

interface StopDetail {
  stop_info: {
    stop_id: string
    stop_name: string
    district: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  current_status: {
    boarding_total: number
    alighting_total: number
    congestion_level: '양호' | '보통' | '혼잡' | '매우혼잡'
    congestion_score: number
    last_updated: string
  }
  hourly_data: Array<{
    hour: string
    boarding: number
    alighting: number
    congestion: number
  }>
  nearby_info: {
    routes: string[]
    poi_nearby: string[]
    walking_distance_to_subway?: number
  }
}

interface DetailPanelComponentProps {
  selectedStopId: string | null
  filters: HeatmapFilters
}

export function DetailPanelComponent({ selectedStopId, filters }: DetailPanelComponentProps) {
  const [stopDetail, setStopDetail] = useState<StopDetail | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // API 호출 함수
  const fetchStopDetail = async (stopId: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // TODO: 실제 API 엔드포인트로 변경
      const response = await fetch(`/api/v1/dashboard/realtime/stop-detail?stop_id=${stopId}&target_date=${filters.target_date}`)
      
      if (!response.ok) {
        throw new Error('정류장 정보를 불러오는데 실패했습니다')
      }
      
      const data = await response.json()
      setStopDetail(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다')
      // 개발용 mock 데이터
      setStopDetail(generateMockStopDetail(stopId))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (selectedStopId) {
      fetchStopDetail(selectedStopId)
    } else {
      setStopDetail(null)
    }
  }, [selectedStopId, filters])

  // Mock 데이터 생성 함수 (개발용)
  const generateMockStopDetail = (stopId: string): StopDetail => {
    const mockNames = ['홍대입구역', '강남역', '종로3가역', '명동역', '잠실역', '노원역']
    const mockDistricts = ['마포구', '강남구', '종로구', '중구', '송파구', '노원구']
    const congestionLevels: StopDetail['current_status']['congestion_level'][] = ['양호', '보통', '혼잡', '매우혼잡']
    
    return {
      stop_info: {
        stop_id: stopId,
        stop_name: mockNames[Math.floor(Math.random() * mockNames.length)],
        district: mockDistricts[Math.floor(Math.random() * mockDistricts.length)],
        coordinates: {
          lat: 37.5 + Math.random() * 0.2,
          lng: 126.9 + Math.random() * 0.3
        }
      },
      current_status: {
        boarding_total: Math.floor(Math.random() * 100) + 20,
        alighting_total: Math.floor(Math.random() * 80) + 15,
        congestion_level: congestionLevels[Math.floor(Math.random() * congestionLevels.length)],
        congestion_score: Math.floor(Math.random() * 100),
        last_updated: new Date().toISOString()
      },
      hourly_data: Array.from({ length: 24 }, (_, i) => ({
        hour: i.toString().padStart(2, '0'),
        boarding: Math.floor(Math.random() * 50) + (i >= 7 && i <= 9 ? 50 : i >= 17 && i <= 19 ? 40 : 0),
        alighting: Math.floor(Math.random() * 40) + (i >= 7 && i <= 9 ? 40 : i >= 17 && i <= 19 ? 45 : 0),
        congestion: Math.floor(Math.random() * 100)
      })),
      nearby_info: {
        routes: ['2번', '6002번', '7017번'].slice(0, Math.floor(Math.random() * 3) + 1),
        poi_nearby: ['병원', '학교', '쇼핑센터', '공원'].slice(0, Math.floor(Math.random() * 4) + 1),
        walking_distance_to_subway: Math.floor(Math.random() * 500) + 100
      }
    }
  }

  const getCongestionColor = (level: string) => {
    switch (level) {
      case '매우혼잡': return 'bg-red-500'
      case '혼잡': return 'bg-orange-500'
      case '보통': return 'bg-yellow-500'
      case '양호': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  // 선택된 정류장이 없는 경우
  if (!selectedStopId) {
    return (
      <Card className="h-full">
        <CardContent className="h-full flex flex-col items-center justify-center text-center">
          <MapPin className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">정류장을 선택하세요</h3>
          <p className="text-gray-500 text-sm">지도에서 정류장을 클릭하면 상세 정보를 확인할 수 있습니다</p>
        </CardContent>
      </Card>
    )
  }

  // 로딩 중
  if (isLoading) {
    return (
      <Card className="h-full">
        <CardContent className="h-full flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600">정류장 정보 로딩중...</p>
        </CardContent>
      </Card>
    )
  }

  // 에러 발생
  if (error || !stopDetail) {
    return (
      <Card className="h-full">
        <CardContent className="h-full flex flex-col items-center justify-center text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-red-700 mb-2">오류 발생</h3>
          <p className="text-red-500 text-sm">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{stopDetail.stop_info.stop_name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {stopDetail.stop_info.district}
            </CardDescription>
          </div>
          <Badge 
            className={`${getCongestionColor(stopDetail.current_status.congestion_level)} text-white`}
          >
            {stopDetail.current_status.congestion_level}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* 현재 상태 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Users className="h-5 w-5 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-semibold text-blue-900">
              {stopDetail.current_status.boarding_total}
            </div>
            <div className="text-xs text-blue-700">승차</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Users className="h-5 w-5 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-semibold text-green-900">
              {stopDetail.current_status.alighting_total}
            </div>
            <div className="text-xs text-green-700">하차</div>
          </div>
        </div>

        {/* 혼잡도 점수 */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>혼잡도 점수</span>
            <span className="font-semibold">{stopDetail.current_status.congestion_score}점</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getCongestionColor(stopDetail.current_status.congestion_level)}`}
              style={{ width: `${stopDetail.current_status.congestion_score}%` }}
            />
          </div>
        </div>

        <Separator />

        {/* 경유 노선 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Bus className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium">경유 노선</span>
          </div>
          <div className="flex gap-1 flex-wrap">
            {stopDetail.nearby_info.routes.map((route) => (
              <Badge key={route} variant="outline" className="text-xs">
                {route}
              </Badge>
            ))}
          </div>
        </div>

        {/* 주변 시설 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium">주변 시설</span>
          </div>
          <div className="flex gap-1 flex-wrap">
            {stopDetail.nearby_info.poi_nearby.map((poi) => (
              <Badge key={poi} variant="secondary" className="text-xs">
                {poi}
              </Badge>
            ))}
          </div>
        </div>

        {/* 접근성 정보 */}
        {stopDetail.nearby_info.walking_distance_to_subway && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium">지하철역 도보 거리</span>
            </div>
            <p className="text-sm text-gray-700">
              약 {stopDetail.nearby_info.walking_distance_to_subway}m (도보 {Math.ceil(stopDetail.nearby_info.walking_distance_to_subway / 80)}분)
            </p>
          </div>
        )}

        <Separator />

        {/* 업데이트 시간 */}
        <div className="text-xs text-gray-500 text-center">
          마지막 업데이트: {new Date(stopDetail.current_status.last_updated).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  )
}