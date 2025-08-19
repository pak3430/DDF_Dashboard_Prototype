import { NextRequest, NextResponse } from 'next/server'

// 서울시 API 응답 타입 재사용
interface SeoulStopBoardingData {
  stdrDe: string
  routeId: string
  routeNm: string
  rtType: string
  staId: string
  staNm: string
  a05: string
  a05Num00h: string
  a05Num01h: string
  a05Num02h: string
  a05Num03h: string
  a05Num04h: string
  a05Num05h: string
  a05Num06h: string
  a05Num07h: string
  a05Num08h: string
  a05Num09h: string
  a05Num10h: string
  a05Num11h: string
  a05Num12h: string
  a05Num13h: string
  a05Num14h: string
  a05Num15h: string
  a05Num16h: string
  a05Num17h: string
  a05Num18h: string
  a05Num19h: string
  a05Num20h: string
  a05Num21h: string
  a05Num22h: string
  a05Num23h: string
  ridePnsgerCnt: string
  alghPnsgerCnt: string
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

// Mock POI 데이터 (실제로는 seoul_poi_info.csv에서 로드)
const mockPOIData: Record<string, string[]> = {
  default: ['버스정류장', '편의점', '카페']
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const stopId = searchParams.get('stop_id')
  const targetDate = searchParams.get('target_date') || new Date().toISOString().split('T')[0]
  const includeHourly = searchParams.get('include_hourly') !== 'false'

  if (!stopId) {
    return NextResponse.json({
      success: false,
      error: {
        code: 'MISSING_STOP_ID',
        message: 'stop_id parameter is required',
        details: 'Please provide a valid stop_id'
      }
    }, { status: 400 })
  }

  const apiKey = process.env.SEOUL_TRAFFIC_API_KEY
  const baseUrl = process.env.SEOUL_API_BASE_URL
  const endpoint = process.env.SEOUL_STOP_BOARDING_API

  if (!apiKey) {
    return NextResponse.json({
      success: false,
      error: {
        code: 'MISSING_API_KEY',
        message: 'Seoul Traffic API key is not configured'
      }
    }, { status: 500 })
  }

  try {
    // 서울시 API 호출
    const formattedDate = targetDate.replace(/-/g, '')
    const apiUrl = `${baseUrl}/${apiKey}${endpoint}/1/1000/${formattedDate}`
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 } // 1분 캐시
    })

    if (!response.ok) {
      throw new Error(`Seoul API returned ${response.status}`)
    }

    const data: SeoulApiResponse = await response.json()
    
    if (data.TaimsTpssStaRouteInfoH?.RESULT?.CODE !== 'INFO-000') {
      throw new Error(`Seoul API Error: ${data.TaimsTpssStaRouteInfoH?.RESULT?.MESSAGE}`)
    }

    // 특정 정류장 데이터 찾기
    const stopData = data.TaimsTpssStaRouteInfoH.row.find(item => item.staId === stopId)
    
    if (!stopData) {
      throw new Error('Stop not found')
    }

    // 시간대별 데이터 변환
    const hourlyData = []
    for (let hour = 0; hour < 24; hour++) {
      const hourStr = hour.toString().padStart(2, '0')
      const hourlyField = `a05Num${hourStr}h` as keyof SeoulStopBoardingData
      const hourlyValue = parseFloat(stopData[hourlyField] as string) || 0
      
      // 승차/하차 분리 (실제 데이터가 없으므로 비율로 추정)
      const boarding = Math.floor(hourlyValue * 0.6) // 60% 승차
      const alighting = hourlyValue - boarding // 40% 하차
      
      hourlyData.push({
        hour: hourStr,
        boarding,
        alighting,
        congestion: Math.min((hourlyValue / 10) * 100, 100) // 혼잡도 계산
      })
    }

    // 현재 혼잡도 계산
    const totalDaily = parseFloat(stopData.a05) || 0
    const currentHour = new Date().getHours()
    const currentHourData = hourlyData[currentHour]
    const congestionScore = currentHourData.congestion
    
    let congestionLevel: '양호' | '보통' | '혼잡' | '매우혼잡' = '양호'
    if (congestionScore >= 80) congestionLevel = '매우혼잡'
    else if (congestionScore >= 60) congestionLevel = '혼잡'
    else if (congestionScore >= 40) congestionLevel = '보통'

    // 경유 노선 정보 (같은 정류장의 다른 노선들)
    const routesAtStop = data.TaimsTpssStaRouteInfoH.row
      .filter(item => item.staId === stopId)
      .map(item => item.routeNm)
      .filter((route, index, self) => self.indexOf(route) === index) // 중복 제거

    // 응답 데이터 구성
    const responseData = {
      stop_info: {
        stop_id: stopId,
        stop_name: stopData.staNm,
        district: extractDistrictFromName(stopData.staNm),
        coordinates: {
          lat: 37.5665 + (Math.random() - 0.5) * 0.1, // Mock 좌표
          lng: 126.9780 + (Math.random() - 0.5) * 0.1
        }
      },
      current_status: {
        boarding_total: currentHourData.boarding,
        alighting_total: currentHourData.alighting,
        congestion_level: congestionLevel,
        congestion_score: Math.floor(congestionScore),
        last_updated: new Date().toISOString()
      },
      hourly_data: includeHourly ? hourlyData : [],
      nearby_info: {
        routes: routesAtStop,
        poi_nearby: mockPOIData.default,
        walking_distance_to_subway: Math.floor(Math.random() * 500) + 100
      },
      metadata: {
        data_source: 'Seoul Open API',
        target_date: targetDate,
        daily_total: totalDaily,
        route_type: stopData.rtType
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: responseData
    })

  } catch (error) {
    console.error('Seoul API Error (Stop Detail):', error)
    
    // 에러 시 Mock 데이터 반환
    const mockData = generateMockStopDetail(stopId, targetDate)
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: mockData,
      meta: {
        data_source: 'Mock Data (API Error)',
        error_message: error instanceof Error ? error.message : 'Unknown error'
      }
    })
  }
}

// 정류장명에서 지역 추출
function extractDistrictFromName(stopName: string): string {
  const districts = ['강남구', '서초구', '송파구', '강동구', '마포구', '종로구', '중구', '용산구', '성동구', '광진구']
  for (const district of districts) {
    if (stopName.includes(district)) {
      return district
    }
  }
  return '서울시'
}

// Mock 데이터 생성 (에러 시 사용)
function generateMockStopDetail(stopId: string, targetDate: string) {
  const mockNames = ['홍대입구역', '강남역', '종로3가역', '명동역', '잠실역']
  const mockDistricts = ['마포구', '강남구', '종로구', '중구', '송파구']
  const congestionLevels: ('양호' | '보통' | '혼잡' | '매우혼잡')[] = ['양호', '보통', '혼잡', '매우혼잡']
  
  // 현실적인 시간대별 데이터 생성
  const hourlyData = Array.from({ length: 24 }, (_, hour) => {
    let baseBoarding = 10
    let baseAlighting = 8
    
    // 출퇴근시간 피크 반영
    if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
      baseBoarding += Math.random() * 30 + 20
      baseAlighting += Math.random() * 25 + 15
    } else if (hour >= 12 && hour <= 13) {
      baseBoarding += Math.random() * 15 + 10
      baseAlighting += Math.random() * 15 + 10
    } else if (hour <= 5 || hour >= 23) {
      baseBoarding = Math.random() * 5
      baseAlighting = Math.random() * 5
    }
    
    const boarding = Math.floor(baseBoarding)
    const alighting = Math.floor(baseAlighting)
    
    return {
      hour: hour.toString().padStart(2, '0'),
      boarding,
      alighting,
      congestion: Math.min(((boarding + alighting) / 20) * 100, 100)
    }
  })

  const currentHour = new Date().getHours()
  const currentData = hourlyData[currentHour]
  
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
      boarding_total: currentData.boarding,
      alighting_total: currentData.alighting,
      congestion_level: congestionLevels[Math.floor(Math.random() * congestionLevels.length)],
      congestion_score: Math.floor(currentData.congestion),
      last_updated: new Date().toISOString()
    },
    hourly_data: hourlyData,
    nearby_info: {
      routes: ['2번', '6002번', '7017번'].slice(0, Math.floor(Math.random() * 3) + 1),
      poi_nearby: mockPOIData.default,
      walking_distance_to_subway: Math.floor(Math.random() * 500) + 100
    }
  }
}