import { NextRequest, NextResponse } from 'next/server'

// 서울시 POI별 실시간 인구 API 응답 타입
interface SeoulPOIPopulationData {
  poi_code: string
  poi_name: string
  poi_data: Array<{
    stdr_de_id: string           // 기준일자
    tmzon_pd_se: string          // 시간대구분 
    tmzon_clas_se: string        // 시간대분류
    tot_ppltn_co: number         // 총인구수
    male_ppltn_co: number        // 남성인구수
    fml_ppltn_co: number         // 여성인구수
    ppltn_rate_10: number        // 10대비율
    ppltn_rate_20: number        // 20대비율
    ppltn_rate_30: number        // 30대비율
    ppltn_rate_40: number        // 40대비율
    ppltn_rate_50: number        // 50대비율
    ppltn_rate_60_above: number  // 60대이상비율
    congestion_lvl: string       // 혼잡도수준
    congestion_msg: string       // 혼잡도메시지
  }>
}

interface SeoulPOIApiResponse {
  citydata_ppltn: {
    list_total_count: number
    RESULT: {
      CODE: string
      MESSAGE: string
    }
    row: SeoulPOIPopulationData[]
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const poiCodes = searchParams.get('poi_codes') // 쉼표로 구분된 POI 코드들
  const targetDate = searchParams.get('target_date') || new Date().toISOString().split('T')[0]

  const apiKey = process.env.SEOUL_TRAFFIC_API_KEY
  const baseUrl = process.env.SEOUL_API_BASE_URL
  const endpoint = process.env.SEOUL_POI_POPULATION_API

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
    // 서울시 POI 인구 API 호출
    const formattedDate = targetDate.replace(/-/g, '')
    const apiUrl = `${baseUrl}/${apiKey}${endpoint}/1/1000/${formattedDate}`
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 180 } // 3분 캐시 (POI 데이터는 자주 변경됨)
    })

    if (!response.ok) {
      throw new Error(`Seoul POI API returned ${response.status}`)
    }

    const data: SeoulPOIApiResponse = await response.json()
    
    if (data.citydata_ppltn?.RESULT?.CODE !== 'INFO-000') {
      throw new Error(`Seoul POI API Error: ${data.citydata_ppltn?.RESULT?.MESSAGE}`)
    }

    // POI 코드 필터링 (요청된 POI만)
    let filteredData = data.citydata_ppltn.row
    if (poiCodes) {
      const targetPOIs = poiCodes.split(',')
      filteredData = filteredData.filter(item => 
        targetPOIs.includes(item.poi_code)
      )
    }

    // 현재 시간대 기준으로 최신 데이터만 추출
    const currentHour = new Date().getHours()
    const timeZoneKey = getTimeZoneKey(currentHour)

    // POI별 혼잡도 데이터 변환
    const poiCongestionData = filteredData.map(poi => {
      // 현재 시간대 데이터 찾기
      const currentTimeData = poi.poi_data.find(data => 
        data.tmzon_clas_se === timeZoneKey
      ) || poi.poi_data[0] // 없으면 첫 번째 데이터 사용

      return {
        poi_code: poi.poi_code,
        poi_name: poi.poi_name,
        current_population: currentTimeData.tot_ppltn_co,
        congestion_level: currentTimeData.congestion_lvl,
        congestion_message: currentTimeData.congestion_msg,
        congestion_score: mapCongestionToScore(currentTimeData.congestion_lvl),
        demographics: {
          male_ratio: (currentTimeData.male_ppltn_co / currentTimeData.tot_ppltn_co) * 100,
          female_ratio: (currentTimeData.fml_ppltn_co / currentTimeData.tot_ppltn_co) * 100,
          age_distribution: {
            teens: currentTimeData.ppltn_rate_10,
            twenties: currentTimeData.ppltn_rate_20,
            thirties: currentTimeData.ppltn_rate_30,
            forties: currentTimeData.ppltn_rate_40,
            fifties: currentTimeData.ppltn_rate_50,
            sixties_above: currentTimeData.ppltn_rate_60_above
          }
        },
        timestamp: currentTimeData.stdr_de_id
      }
    })

    // 전체 통계 계산
    const totalPopulation = poiCongestionData.reduce((sum, poi) => sum + poi.current_population, 0)
    const avgCongestionScore = poiCongestionData.reduce((sum, poi) => sum + poi.congestion_score, 0) / poiCongestionData.length

    // 혼잡도 레벨별 분포
    const congestionDistribution = {
      relaxed: poiCongestionData.filter(poi => poi.congestion_score <= 30).length,
      normal: poiCongestionData.filter(poi => poi.congestion_score > 30 && poi.congestion_score <= 60).length,
      crowded: poiCongestionData.filter(poi => poi.congestion_score > 60 && poi.congestion_score <= 80).length,
      very_crowded: poiCongestionData.filter(poi => poi.congestion_score > 80).length
    }

    const responseData = {
      poi_data: poiCongestionData,
      summary: {
        total_pois: poiCongestionData.length,
        total_population: totalPopulation,
        avg_congestion_score: Math.round(avgCongestionScore),
        congestion_distribution,
        peak_areas: poiCongestionData
          .filter(poi => poi.congestion_score >= 70)
          .map(poi => poi.poi_name)
          .slice(0, 5) // 상위 5개 혼잡 지역
      },
      metadata: {
        data_source: 'Seoul Open API - POI Population',
        target_date: targetDate,
        data_timestamp: new Date().toISOString(),
        cache_duration: '3 minutes'
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: responseData
    })

  } catch (error) {
    console.error('Seoul POI API Error:', error)
    
    // 에러 시 Mock POI 데이터 반환
    const mockData = generateMockPOIData(poiCodes)
    
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

// 시간대를 POI API의 시간대 키로 변환
function getTimeZoneKey(hour: number): string {
  if (hour >= 6 && hour < 10) return '06~10'
  if (hour >= 10 && hour < 14) return '10~14'  
  if (hour >= 14 && hour < 18) return '14~18'
  if (hour >= 18 && hour < 22) return '18~22'
  if (hour >= 22 || hour < 2) return '22~02'
  return '02~06'
}

// 혼잡도 수준을 점수로 변환
function mapCongestionToScore(congestionLevel: string): number {
  const levelMap: Record<string, number> = {
    '여유': 20,
    '보통': 50,
    '약간 붐빔': 65,
    '붐빔': 80,
    '매우 붐빔': 95
  }
  return levelMap[congestionLevel] || 50
}

// Mock 데이터 생성 (에러 시 사용)
function generateMockPOIData(poiCodes?: string | null) {
  const mockPOIs = [
    { code: 'POI001', name: '강남역 일대', base_population: 1200 },
    { code: 'POI002', name: '홍대입구 일대', base_population: 800 },
    { code: 'POI003', name: '명동 일대', base_population: 1500 },
    { code: 'POI004', name: '잠실 일대', base_population: 600 },
    { code: 'POI005', name: '신촌 일대', base_population: 700 }
  ]

  let selectedPOIs = mockPOIs
  if (poiCodes) {
    const targetCodes = poiCodes.split(',')
    selectedPOIs = mockPOIs.filter(poi => targetCodes.includes(poi.code))
  }

  const currentHour = new Date().getHours()
  const congestionLevels = ['여유', '보통', '약간 붐빔', '붐빔', '매우 붐빔']

  const poiData = selectedPOIs.map(poi => {
    // 시간대별 인구 변화 시뮬레이션
    let populationMultiplier = 1
    if (currentHour >= 7 && currentHour <= 9) populationMultiplier = 1.8  // 출근시간
    else if (currentHour >= 12 && currentHour <= 13) populationMultiplier = 1.4  // 점심시간
    else if (currentHour >= 18 && currentHour <= 20) populationMultiplier = 2.0  // 퇴근/저녁시간
    else if (currentHour >= 22 || currentHour <= 5) populationMultiplier = 0.3  // 심야시간

    const currentPopulation = Math.floor(poi.base_population * populationMultiplier * (0.8 + Math.random() * 0.4))
    const congestionScore = Math.min((currentPopulation / poi.base_population) * 50, 95)
    const congestionLevel = congestionLevels[Math.floor(congestionScore / 20)]

    return {
      poi_code: poi.code,
      poi_name: poi.name,
      current_population: currentPopulation,
      congestion_level: congestionLevel,
      congestion_message: `${poi.name}이(가) ${congestionLevel} 상태입니다.`,
      congestion_score: Math.floor(congestionScore),
      demographics: {
        male_ratio: 45 + Math.random() * 10,
        female_ratio: 45 + Math.random() * 10,
        age_distribution: {
          teens: Math.random() * 15,
          twenties: 20 + Math.random() * 15,
          thirties: 20 + Math.random() * 15,
          forties: 15 + Math.random() * 10,
          fifties: 10 + Math.random() * 10,
          sixties_above: Math.random() * 15
        }
      },
      timestamp: new Date().toISOString().split('T')[0]
    }
  })

  const totalPopulation = poiData.reduce((sum, poi) => sum + poi.current_population, 0)
  const avgCongestionScore = poiData.reduce((sum, poi) => sum + poi.congestion_score, 0) / poiData.length

  return {
    poi_data: poiData,
    summary: {
      total_pois: poiData.length,
      total_population: totalPopulation,
      avg_congestion_score: Math.round(avgCongestionScore),
      congestion_distribution: {
        relaxed: poiData.filter(poi => poi.congestion_score <= 30).length,
        normal: poiData.filter(poi => poi.congestion_score > 30 && poi.congestion_score <= 60).length,
        crowded: poiData.filter(poi => poi.congestion_score > 60 && poi.congestion_score <= 80).length,
        very_crowded: poiData.filter(poi => poi.congestion_score > 80).length
      },
      peak_areas: poiData
        .filter(poi => poi.congestion_score >= 70)
        .map(poi => poi.poi_name)
    }
  }
}