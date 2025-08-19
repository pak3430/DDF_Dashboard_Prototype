# DDF Dashboard API 엔드포인트 명세서
**DRT(수요응답형 버스) 도입을 위한 API 명세서**

*버전: v1.0 | 작성일: 2025년 8월 19일 | 백엔드 팀 협업용*

---

## 📋 **개요**

### 프로젝트 정보
- **프로젝트명**: DDF (DRT-Demand-Forecasting) Dashboard
- **데이터베이스**: PostgreSQL + PostGIS (99.1% 완성도)
- **실데이터**: 178,573개 노선-정류장 매핑, 100,415개 정류장, 1,660개 노선
- **API 베이스 URL**: `http://localhost:3000/api/v1/dashboard`
- **외부 연동**: 서울시 공공데이터 API

### 우선순위별 구현 일정
1. **1순위** (완료): 실시간 교통 현황 API
2. **2순위** (진행중): 수요 예측 및 취약지 분석 API  
3. **3순위** (대기): 시뮬레이션 API

---

## 🚦 **1순위: 실시간 교통 현황 API**

### 1.1 히트맵 데이터 API ✅

**엔드포인트**: `GET /api/v1/dashboard/realtime/heatmap-data`

**설명**: 서울시 전체 교통량 히트맵 데이터 제공

**쿼리 파라미터**:
```typescript
interface HeatmapParams {
  target_date?: string      // YYYY-MM-DD (기본값: 오늘)
  time_range?: string       // '전체' | '출근시간' | '퇴근시간' | '심야시간'
  intensity_type?: string   // 'boarding' | 'alighting' | 'total'
  include_poi?: boolean     // POI 혼잡도 데이터 포함 여부 (신규)
}
```

**응답 형식**:
```typescript
interface HeatmapResponse {
  success: boolean
  timestamp: string
  data: {
    heatmap_points: Array<{
      stop_id: string
      stop_name: string
      lat: number
      lng: number
      intensity: number        // 0-100
      boarding_count: number
      alighting_count: number
      congestion_level: '양호' | '보통' | '혼잡' | '매우혼잡'
    }>
    summary: {
      total_stops: number
      avg_intensity: number
      peak_locations: string[]
      data_freshness: number   // 분 단위
    }
  }
  features: {
    poi_data_available: boolean  // POI 데이터 포함 여부 (신규)
    real_time_updates: boolean
    cache_duration: number
  }
}
```

### 1.2 정류장 상세 정보 API ✅

**엔드포인트**: `GET /api/v1/dashboard/realtime/stop-detail`

**쿼리 파라미터**:
```typescript
interface StopDetailParams {
  stop_id: string           // 필수
  target_date?: string      // YYYY-MM-DD
  include_hourly?: boolean  // 24시간 데이터 포함 여부
}
```

**응답 형식**:
```typescript
interface StopDetailResponse {
  success: boolean
  data: {
    stop_info: {
      stop_id: string
      stop_name: string
      district: string
      coordinates: { lat: number; lng: number }
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
      walking_distance_to_subway: number
    }
  }
}
```

### 1.3 시간대별 패턴 분석 API ✅

**엔드포인트**: `GET /api/v1/dashboard/analytics/hourly-patterns`

**쿼리 파라미터**:
```typescript
interface HourlyPatternsParams {
  area_type?: 'stop' | 'district'
  area_id?: string
  target_date?: string
  chart_type?: 'line' | 'bar'
}
```

**응답 형식**:
```typescript
interface HourlyPatternsResponse {
  success: boolean
  data: {
    area_name: string
    chart_data: {
      labels: string[]      // ['00', '01', ..., '23']
      datasets: Array<{
        label: '승차인원' | '하차인원'
        data: number[]
        borderColor: string
        backgroundColor: string
      }>
    }
    insights: {
      peak_hours: string[]
      off_peak_hours: string[]
      daily_total: {
        boarding: number
        alighting: number
      }
      peak_vs_offpeak_ratio: number
    }
  }
}
```

### 1.4 POI별 실시간 혼잡도 API ✅ (신규)

**엔드포인트**: `GET /api/v1/dashboard/realtime/poi-population`

**설명**: 서울시 주요 POI(관심지점)의 실시간 인구밀도 및 혼잡도 제공

**쿼리 파라미터**:
```typescript
interface POIPopulationParams {
  poi_codes?: string        // 쉼표로 구분된 POI 코드 (예: "POI001,POI002")
  target_date?: string      // YYYY-MM-DD (기본값: 오늘)
}
```

**응답 형식**:
```typescript
interface POIPopulationResponse {
  success: boolean
  timestamp: string
  data: {
    poi_data: Array<{
      poi_code: string
      poi_name: string
      current_population: number
      congestion_level: '여유' | '보통' | '약간 붐빔' | '붐빔' | '매우 붐빔'
      congestion_message: string
      congestion_score: number    // 0-100
      demographics: {
        male_ratio: number
        female_ratio: number
        age_distribution: {
          teens: number
          twenties: number
          thirties: number
          forties: number
          fifties: number
          sixties_above: number
        }
      }
      timestamp: string
    }>
    summary: {
      total_pois: number
      total_population: number
      avg_congestion_score: number
      congestion_distribution: {
        relaxed: number         // 여유 단계 POI 수
        normal: number          // 보통 단계 POI 수
        crowded: number         // 혼잡 단계 POI 수
        very_crowded: number    // 매우혼잡 단계 POI 수
      }
      peak_areas: string[]      // 상위 5개 혼잡 지역명
    }
    metadata: {
      data_source: string
      target_date: string
      data_timestamp: string
      cache_duration: string
    }
  }
}
```

**데이터베이스 연동**:
```sql
-- POI별 혼잡도 데이터 조회 (시간대별)
SELECT 
    poi_code,
    poi_name,
    tmzon_clas_se as time_zone,
    tot_ppltn_co as total_population,
    congestion_lvl as congestion_level,
    congestion_msg as congestion_message
FROM poi_population_data 
WHERE stdr_de_id = ? 
AND poi_code IN (?)
ORDER BY tot_ppltn_co DESC;
```

**서울시 API 매핑**:
- **API 엔드포인트**: `/api/1/json/citydata_ppltn`
- **응답 필드**: `poi_code`, `poi_name`, `tot_ppltn_co`, `congestion_lvl`, `congestion_msg`
- **시간대 구분**: `tmzon_clas_se` (06~10, 10~14, 14~18, 18~22, 22~02, 02~06)
- **캐시 정책**: 3분 (POI 데이터는 빈번히 변경)

---

## 📊 **2순위: 수요 예측 및 취약지 분석 API**

### 2.1 교통 취약지 분석 API 🔄

**엔드포인트**: `GET /api/v1/dashboard/analytics/vulnerability-analysis`

**쿼리 파라미터**:
```typescript
interface VulnerabilityParams {
  analysis_type?: 'overall' | 'district' | 'route'
  target_date?: string
  include_ranking?: boolean
}
```

**응답 형식**:
```typescript
interface VulnerabilityResponse {
  success: boolean
  data: {
    vulnerability_score: {
      seoul_average: number
      district_scores: Array<{
        district_name: string
        score: number
        rank: number
        category: '매우취약' | '취약' | '보통' | '양호'
      }>
    }
    critical_areas: Array<{
      area_id: string
      area_name: string
      coordinates: { lat: number; lng: number }
      issues: string[]
      priority_score: number
    }>
    improvement_suggestions: Array<{
      area_id: string
      suggestion_type: 'DRT도입' | '노선증설' | '배차간격단축'
      expected_benefit: string
      implementation_cost: 'Low' | 'Medium' | 'High'
    }>
  }
}
```

**데이터베이스 쿼리**:
```sql
-- 저빈도 노선 식별 (486개 매우저빈도 노선 활용)
WITH low_frequency_routes AS (
  SELECT route_id, route_name, avg_headway, daily_frequency
  FROM route_details 
  WHERE avg_headway > 30  -- 30분 이상 배차간격
),
underserved_areas AS (
  SELECT 
    bs.stop_id,
    bs.stop_name,
    bs.coordinates,
    COUNT(rs.route_id) as route_count,
    AVG(rd.avg_headway) as avg_service_frequency
  FROM bus_stops bs
  LEFT JOIN route_stops rs ON bs.stop_id = rs.stop_id
  LEFT JOIN route_details rd ON rs.route_id = rd.route_id
  GROUP BY bs.stop_id, bs.stop_name, bs.coordinates
  HAVING COUNT(rs.route_id) < 3 OR AVG(rd.avg_headway) > 20
)
SELECT * FROM underserved_areas;
```

### 2.2 DRT 수요 예측 API 🔄

**엔드포인트**: `GET /api/v1/dashboard/prediction/demand-forecast`

**쿼리 파라미터**:
```typescript
interface DemandForecastParams {
  forecast_type: 'hourly' | 'daily' | 'weekly'
  target_area?: string
  time_horizon?: number     // 예측 시간 (시간 단위)
  model_type?: 'mst_gcn' | 'baseline'
}
```

**응답 형식**:
```typescript
interface DemandForecastResponse {
  success: boolean
  data: {
    forecast_data: Array<{
      timestamp: string
      predicted_demand: number
      confidence_interval: [number, number]
      area_breakdown: Array<{
        area_id: string
        area_name: string
        demand_level: number
        recommended_vehicles: number
      }>
    }>
    model_performance: {
      model_accuracy: number
      last_training_date: string
      data_quality_score: number
    }
    drt_recommendations: Array<{
      area_id: string
      recommended_action: 'DRT도입' | '기존서비스유지' | '서비스강화'
      expected_demand_reduction: number
      roi_estimate: number
    }>
  }
}
```

### 2.3 지역별 상세 분석 API 🔄

**엔드포인트**: `GET /api/v1/dashboard/analytics/district-analysis`

**쿼리 파라미터**:
```typescript
interface DistrictAnalysisParams {
  district_id: string       // 필수
  analysis_depth?: 'basic' | 'detailed'
  include_comparisons?: boolean
}
```

**응답 형식**:
```typescript
interface DistrictAnalysisResponse {
  success: boolean
  data: {
    district_info: {
      district_id: string
      district_name: string
      area_km2: number
      population: number
    }
    transportation_metrics: {
      total_stops: number
      total_routes: number
      avg_service_frequency: number
      coverage_ratio: number      // 서비스 커버리지 비율
    }
    demand_patterns: {
      peak_demand_times: string[]
      daily_avg_passengers: number
      weekend_vs_weekday_ratio: number
    }
    drt_suitability: {
      suitability_score: number  // 0-100
      key_factors: string[]
      implementation_priority: 'High' | 'Medium' | 'Low'
    }
    comparison_with_seoul: {
      service_density_vs_average: number
      demand_intensity_vs_average: number
      efficiency_score_vs_average: number
    }
  }
}
```

---

## 🎯 **3순위: 시뮬레이션 API (대기중)**

### 3.1 DRT 시뮬레이션 API ⏳

**엔드포인트**: `POST /api/v1/dashboard/simulation/drt-scenario`

**요청 본문**:
```typescript
interface DRTSimulationRequest {
  scenario_name: string
  target_areas: string[]
  vehicle_config: {
    vehicle_count: number
    vehicle_capacity: number
    operating_hours: {
      start: string
      end: string
    }
  }
  service_config: {
    max_detour_time: number
    max_waiting_time: number
    fare_structure: {
      base_fare: number
      distance_rate: number
    }
  }
  simulation_duration: number   // 시뮬레이션 일 수
}
```

**응답 형식**:
```typescript
interface DRTSimulationResponse {
  success: boolean
  data: {
    scenario_id: string
    simulation_results: {
      service_metrics: {
        total_trips: number
        avg_waiting_time: number
        avg_detour_time: number
        vehicle_utilization: number
      }
      economic_analysis: {
        operating_cost: number
        revenue: number
        roi: number
        break_even_point: string
      }
      environmental_impact: {
        co2_reduction: number
        fuel_savings: number
      }
      user_satisfaction: {
        satisfaction_score: number
        complaint_rate: number
        recommendation_rate: number
      }
    }
    comparison_with_baseline: {
      cost_difference: number
      efficiency_improvement: number
      user_experience_improvement: number
    }
  }
}
```

---

## 🔗 **데이터베이스 스키마 연동**

### 주요 테이블 구조
```sql
-- 버스 정류장 (100,415개)
CREATE TABLE bus_stops (
    stop_id VARCHAR PRIMARY KEY,
    stop_name VARCHAR NOT NULL,
    coordinates GEOMETRY(POINT, 4326),
    district VARCHAR,
    node_type INTEGER
);

-- 버스 노선 (1,660개)
CREATE TABLE bus_routes (
    route_id VARCHAR PRIMARY KEY,
    route_name VARCHAR NOT NULL,
    route_type VARCHAR,
    total_distance FLOAT,
    operating_company VARCHAR
);

-- 노선-정류장 매핑 (178,573개)
CREATE TABLE route_stops (
    route_id VARCHAR,
    stop_id VARCHAR,
    sequence_number INTEGER,
    FOREIGN KEY (route_id) REFERENCES bus_routes(route_id),
    FOREIGN KEY (stop_id) REFERENCES bus_stops(stop_id)
);

-- 운행 일정
CREATE TABLE operation_schedules (
    route_id VARCHAR PRIMARY KEY,
    avg_headway INTEGER,        -- 평균 배차간격 (분)
    daily_frequency INTEGER,    -- 일일 운행 횟수
    first_bus_time TIME,
    last_bus_time TIME,
    FOREIGN KEY (route_id) REFERENCES bus_routes(route_id)
);
```

---

## 🚀 **구현 가이드**

### 우선순위 구현 순서
1. **즉시 구현**: 취약지 분석 API (기존 DB 데이터 활용)
2. **이번 주**: DRT 수요 예측 API (MST-GCN 모델 연동)
3. **다음 주**: 시뮬레이션 API (시간 여유시)

### 성능 최적화 권장사항
- **캐싱**: Redis 활용 (실시간 데이터 5분, 분석 데이터 1시간)
- **인덱싱**: PostGIS 공간 인덱스, 시간 기반 파티셔닝
- **배치 처리**: 대용량 분석은 비동기 처리

### 에러 처리 표준
```typescript
interface APIError {
  success: false
  error: {
    code: string
    message: string
    details?: string
    timestamp: string
  }
}
```

---

## 📋 **체크리스트**

### 백엔드 개발 체크리스트
- [x] POI 혼잡도 API 구현 (신규 완료)
- [x] 히트맵 API POI 연동 준비 완료 (신규 완료)
- [ ] 취약지 분석 API 구현
- [ ] MST-GCN 모델 서빙 연동
- [ ] 데이터베이스 최적화 (인덱스 생성)
- [ ] API 문서 자동화 (Swagger)
- [ ] 단위 테스트 작성
- [ ] 성능 테스트 (1000 RPS)

### 프론트엔드 연동 체크리스트
- [x] 실시간 교통 현황 API 연동 완료
- [x] POI 혼잡도 API 연동 준비 완료 (신규 완료)
- [ ] 취약지 분석 컴포넌트 연동
- [ ] 수요 예측 차트 연동
- [ ] POI 데이터 히트맵 병합 구현
- [ ] 에러 처리 및 로딩 상태 개선

---

**마지막 업데이트**: 2025년 8월 19일  
**담당자**: 박상훈 (Frontend), 이경수 (Backend), 고병수 (AI/ML)  
**목표 완료일**: 2025년 8월 29일