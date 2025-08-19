import { NextRequest, NextResponse } from 'next/server'

// 서울시 정류장별 승하차 API 타입 정의
interface SeoulStopBoardingData {
  stdrDe: string          // 기준일자
  routeId: string         // 노선ID  
  routeNm: string         // 노선명
  rtType: string          // 노선유형
  staId: string           // 정류장ID
  staNm: string           // 정류장명
  a05: string             // 일일 승하차 총계
  a05Num00h: string       // 00시 승하차
  a05Num01h: string       // 01시 승하차
  // ... 24시간 데이터
  a05Num23h: string       // 23시 승하차
  ridePnsgerCnt: string   // 승차인원 (null일 수 있음)
  alghPnsgerCnt: string   // 하차인원 (null일 수 있음)
}

interface SeoulApiResponse {
  TaimsTpssStaRouteInfoH: {
    list_total_count: number
    RESULT: {
      CODE: string
      MESSAGE: string
    }
    row: SeoulStopBoardingData[]
  }
}

// 정류장 좌표 데이터 (CSV에서 로드해야 함)
const mockStopCoordinates: Record<string, { lat: number; lng: number }> = {
  // 실제로는 seoul_node_info.csv에서 로드
  "default": { lat: 37.5665, lng: 126.9780 }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const targetDate = searchParams.get('target_date') || new Date().toISOString().split('T')[0]
  const timeRange = searchParams.get('time_range') || '1h'
  const intensityType = searchParams.get('intensity_type') || 'total'

  const apiKey = process.env.SEOUL_TRAFFIC_API_KEY
  const baseUrl = process.env.SEOUL_API_BASE_URL
  const endpoint = process.env.SEOUL_STOP_BOARDING_API

  if (!apiKey) {
    return NextResponse.json({
      success: false,
      error: {
        code: 'MISSING_API_KEY',
        message: 'Seoul Traffic API key is not configured',
        details: 'Please set SEOUL_TRAFFIC_API_KEY in environment variables'
      }
    }, { status: 500 })
  }

  try {
    // 서울시 API 호출
    const formattedDate = targetDate.replace(/-/g, '')
    const apiUrl = `${baseUrl}/${apiKey}${endpoint}/1/1000/${formattedDate}`
    
    console.log('Calling Seoul API:', apiUrl)
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // 캐시 설정 (30초)
      next: { revalidate: 30 }
    })

    if (!response.ok) {
      throw new Error(`Seoul API returned ${response.status}: ${response.statusText}`)
    }

    const data: SeoulApiResponse = await response.json()
    
    // API 응답 상태 확인
    if (data.TaimsTpssStaRouteInfoH?.RESULT?.CODE !== 'INFO-000') {
      throw new Error(`Seoul API Error: ${data.TaimsTpssStaRouteInfoH?.RESULT?.MESSAGE}`)
    }

    // 데이터 변환: 서울시 API → 히트맵 포맷
    const heatmapPoints = data.TaimsTpssStaRouteInfoH.row
      .filter(item => item.a05 && parseFloat(item.a05) > 0) // 유효한 데이터만
      .map(item => {
        // 좌표 정보 가져오기 (실제로는 CSV 파일에서)
        const coordinates = mockStopCoordinates[item.staId] || mockStopCoordinates.default
        
        // 시간 범위에 따른 강도 계산
        let intensity = 0
        
        if (timeRange === '1h') {
          const currentHour = new Date().getHours().toString().padStart(2, '0')
          const hourlyField = `a05Num${currentHour}h` as keyof SeoulStopBoardingData
          intensity = parseFloat(item[hourlyField] as string) || 0
        } else {
          // 전체 일일 데이터 사용
          intensity = parseFloat(item.a05) || 0
        }

        // 0-1 정규화 (최대값을 100으로 가정)
        const normalizedIntensity = Math.min(intensity / 100, 1)

        return [
          coordinates.lat,
          coordinates.lng,
          normalizedIntensity
        ] as [number, number, number]
      })
      .filter(point => point[2] > 0) // 강도가 0인 포인트 제거

    // 통계 계산
    const intensityValues = heatmapPoints.map(point => point[2])
    const maxIntensity = Math.max(...intensityValues, 1)
    const minIntensity = Math.min(...intensityValues, 0)

    // 응답 데이터 구성
    const responseData = {
      heatmap_points: heatmapPoints,
      bounds: {
        north: 37.7,
        south: 37.4,
        east: 127.2,
        west: 126.7
      },
      legend: {
        min_value: Math.floor(minIntensity * 100),
        max_value: Math.floor(maxIntensity * 100),
        unit: '명/시간'
      },
      updated_at: new Date().toISOString(),
      metadata: {
        total_points: heatmapPoints.length,
        data_source: 'Seoul Open API',
        api_status: 'success',
        time_range: timeRange,
        intensity_type: intensityType,
        target_date: targetDate
      }
    }

    // POI 혼잡도 데이터 추가 (선택사항)
    let enhancedResponseData = responseData
    const includePOI = searchParams.get('include_poi') === 'true'
    
    if (includePOI) {
      try {
        // POI 데이터 병합 로직 (추후 구현)
        console.log('POI 데이터 병합 요청됨 - 향후 구현 예정')
      } catch (poiError) {
        console.log('POI 데이터 로드 실패, 기본 히트맵 데이터 사용')
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: enhancedResponseData,
      features: {
        poi_data_available: false, // 향후 true로 변경
        real_time_updates: true,
        cache_duration: 30
      }
    })

  } catch (error) {
    console.error('Seoul API Error:', error)
    
    // 에러 시 Mock 데이터 반환 (개발용)
    const mockHeatmapPoints = generateMockHeatmapData()
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        heatmap_points: mockHeatmapPoints,
        bounds: {
          north: 37.7,
          south: 37.4,
          east: 127.2,
          west: 126.7
        },
        legend: {
          min_value: 0,
          max_value: 100,
          unit: '명/시간'
        },
        updated_at: new Date().toISOString(),
        metadata: {
          total_points: mockHeatmapPoints.length,
          data_source: 'Mock Data (API Error)',
          api_status: 'fallback',
          error_message: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    })
  }
}

// Mock 데이터 생성 함수 (에러 시 사용)
function generateMockHeatmapData(): [number, number, number][] {
  const mockPoints: [number, number, number][] = []
  const seoulCenters = [
    [37.5665, 126.9780], // 시청
    [37.5636, 126.9757], // 명동  
    [37.5157, 127.0411], // 강남역
    [37.5569, 126.9358], // 홍대입구역
    [37.6013, 126.9292], // 수유역
  ]

  seoulCenters.forEach(([lat, lng]) => {
    for (let i = 0; i < 20; i++) {
      const offsetLat = lat + (Math.random() - 0.5) * 0.02
      const offsetLng = lng + (Math.random() - 0.5) * 0.02
      const intensity = Math.random()
      mockPoints.push([offsetLat, offsetLng, intensity])
    }
  })

  return mockPoints
}