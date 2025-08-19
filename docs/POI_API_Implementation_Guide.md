# POI 혼잡도 API 구현 가이드
**DDF Dashboard - POI별 실시간 인구밀도 API 상세 구현 가이드**

*작성일: 2025년 8월 19일 | 백엔드 팀 협업용*

---

## 📋 **신규 추가된 POI API 개요**

### 구현된 파일 위치
- **API 파일**: `/app/api/v1/dashboard/realtime/poi-population/route.ts`
- **환경변수**: `.env.local`에 `SEOUL_POI_REALTIME_API` 추가
- **히트맵 연동**: `/app/api/v1/dashboard/realtime/heatmap-data/route.ts` 업데이트

---

## 🚀 **1. POI 혼잡도 API 완전 구현**

### API 엔드포인트
```
GET /api/v1/dashboard/realtime/poi-population
```

### 쿼리 파라미터
```typescript
interface POIPopulationParams {
  poi_codes?: string        // "POI001,POI002" 형태
  target_date?: string      // "2025-08-19" 형태
}
```

### 사용 예시
```bash
# 전체 POI 조회
GET /api/v1/dashboard/realtime/poi-population

# 특정 POI만 조회  
GET /api/v1/dashboard/realtime/poi-population?poi_codes=POI001,POI002

# 특정 날짜 데이터
GET /api/v1/dashboard/realtime/poi-population?target_date=2025-08-19
```

---

## 📊 **2. 응답 데이터 구조**

### 완전한 응답 예시
```json
{
  "success": true,
  "timestamp": "2025-08-19T21:30:00.000Z",
  "data": {
    "poi_data": [
      {
        "poi_code": "POI001",
        "poi_name": "강남역 일대",
        "current_population": 2400,
        "congestion_level": "매우 붐빔",
        "congestion_message": "강남역 일대가 매우 붐빔 상태입니다.",
        "congestion_score": 95,
        "demographics": {
          "male_ratio": 52.3,
          "female_ratio": 47.7,
          "age_distribution": {
            "teens": 8.5,
            "twenties": 31.2,
            "thirties": 28.7,
            "forties": 18.3,
            "fifties": 9.8,
            "sixties_above": 3.5
          }
        },
        "timestamp": "2025-08-19"
      }
    ],
    "summary": {
      "total_pois": 5,
      "total_population": 4200,
      "avg_congestion_score": 67,
      "congestion_distribution": {
        "relaxed": 1,
        "normal": 1,
        "crowded": 2,
        "very_crowded": 1
      },
      "peak_areas": ["강남역 일대", "홍대입구 일대"]
    },
    "metadata": {
      "data_source": "Seoul Open API - POI Population",
      "target_date": "2025-08-19",
      "data_timestamp": "2025-08-19T21:30:00.000Z",
      "cache_duration": "3 minutes"
    }
  }
}
```

---

## 🔗 **3. 서울시 API 연동 상세**

### 서울시 API 매핑
```typescript
// 서울시 API 엔드포인트
const apiUrl = `${baseUrl}/${apiKey}/api/1/json/citydata_ppltn/1/1000/${formattedDate}`

// 서울시 API 응답 → 우리 API 변환
interface SeoulPOIPopulationData {
  poi_code: string                 // → poi_code
  poi_name: string                 // → poi_name
  poi_data: Array<{
    tot_ppltn_co: number          // → current_population
    congestion_lvl: string        // → congestion_level
    congestion_msg: string        // → congestion_message
    tmzon_clas_se: string         // 시간대구분 (06~10, 10~14, ...)
    male_ppltn_co: number         // → demographics.male_ratio
    fml_ppltn_co: number          // → demographics.female_ratio
    ppltn_rate_10: number         // → demographics.age_distribution.teens
    // ... 연령대별 비율
  }>
}
```

### 시간대 변환 로직
```typescript
function getTimeZoneKey(hour: number): string {
  if (hour >= 6 && hour < 10) return '06~10'    // 출근시간
  if (hour >= 10 && hour < 14) return '10~14'  // 오전
  if (hour >= 14 && hour < 18) return '14~18'  // 오후
  if (hour >= 18 && hour < 22) return '18~22'  // 퇴근/저녁
  if (hour >= 22 || hour < 2) return '22~02'   // 심야
  return '02~06'                               // 새벽
}
```

### 혼잡도 점수 변환
```typescript
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
```

---

## 🔧 **4. 히트맵 API 연동 강화**

### 업데이트된 히트맵 API
```
GET /api/v1/dashboard/realtime/heatmap-data?include_poi=true
```

### 응답 구조 변경
```typescript
// 기존 응답에 추가된 features 섹션
{
  "success": true,
  "data": { /* 기존 히트맵 데이터 */ },
  "features": {
    "poi_data_available": false,    // 향후 true로 변경 예정
    "real_time_updates": true,
    "cache_duration": 30
  }
}
```

### 향후 POI-히트맵 병합 로직 (구현 예정)
```typescript
// 히트맵 데이터 + POI 데이터 통합
if (includePOI && poiResponse.success) {
  const combinedHeatmapPoints = heatmapPoints.map(point => {
    const nearbyPOI = findNearestPOI(point.lat, point.lng, poiData)
    return {
      ...point,
      poi_influence: nearbyPOI ? nearbyPOI.congestion_score * 0.3 : 0,
      combined_intensity: point.intensity + (nearbyPOI?.congestion_score * 0.3 || 0)
    }
  })
}
```

---

## 🗄️ **5. 데이터베이스 스키마 (권장)**

### POI 마스터 테이블
```sql
CREATE TABLE poi_master (
    poi_code VARCHAR(10) PRIMARY KEY,
    poi_name VARCHAR(100) NOT NULL,
    poi_type VARCHAR(50),           -- '상업지구', '업무지구', '관광지' 등
    coordinates GEOMETRY(POINT, 4326),
    district VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### POI 인구 데이터 테이블
```sql
CREATE TABLE poi_population_data (
    id SERIAL PRIMARY KEY,
    poi_code VARCHAR(10) REFERENCES poi_master(poi_code),
    stdr_de_id DATE,                -- 기준일자
    tmzon_clas_se VARCHAR(10),      -- 시간대구분
    tot_ppltn_co INTEGER,           -- 총인구수
    male_ppltn_co INTEGER,          -- 남성인구수
    fml_ppltn_co INTEGER,           -- 여성인구수
    congestion_lvl VARCHAR(20),     -- 혼잡도수준
    congestion_msg TEXT,            -- 혼잡도메시지
    ppltn_rate_10 DECIMAL(5,2),     -- 10대비율
    ppltn_rate_20 DECIMAL(5,2),     -- 20대비율
    ppltn_rate_30 DECIMAL(5,2),     -- 30대비율
    ppltn_rate_40 DECIMAL(5,2),     -- 40대비율
    ppltn_rate_50 DECIMAL(5,2),     -- 50대비율
    ppltn_rate_60_above DECIMAL(5,2), -- 60대이상비율
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(poi_code, stdr_de_id, tmzon_clas_se)
);
```

### 인덱스 생성
```sql
-- 조회 성능 최적화
CREATE INDEX idx_poi_population_date ON poi_population_data(stdr_de_id);
CREATE INDEX idx_poi_population_code_date ON poi_population_data(poi_code, stdr_de_id);
CREATE INDEX idx_poi_population_congestion ON poi_population_data(congestion_lvl);

-- 공간 인덱스 (PostGIS)
CREATE INDEX idx_poi_master_coordinates ON poi_master USING GIST(coordinates);
```

---

## ⚠️ **6. 에러 처리 및 Fallback**

### API 에러 시 Mock 데이터 제공
```typescript
// 서울시 API 실패 시 자동 fallback
catch (error) {
  console.error('Seoul POI API Error:', error)
  
  const mockData = generateMockPOIData(poiCodes)
  
  return NextResponse.json({
    success: true,
    data: mockData,
    meta: {
      data_source: 'Mock Data (API Error)',
      error_message: error.message
    }
  })
}
```

### Mock 데이터 특징
- **현실적인 시간대별 패턴**: 출퇴근시간 피크, 심야시간 최소
- **지역별 특성**: 강남역(비즈니스), 홍대(문화), 명동(쇼핑) 등
- **혼잡도 분포**: 5단계 혼잡도 균등 분포

---

## 🚀 **7. 구현 우선순위**

### 즉시 구현 (경수님)
1. **POI 마스터 테이블 생성**: 서울시 주요 POI 50개 등록
2. **배치 ETL 구현**: 매일 POI 인구 데이터 수집/저장
3. **API 최적화**: 캐시 레이어, 인덱스 최적화

### 이번 주 구현
1. **POI-히트맵 병합**: `include_poi=true` 완전 구현
2. **실시간 알림**: 혼잡도 급변 시 알림 기능
3. **대시보드 연동**: 프론트엔드 컴포넌트 연동

### 향후 확장
1. **예측 모델**: MST-GCN에 POI 데이터 feature 추가
2. **이상 탐지**: 비정상 혼잡도 패턴 감지
3. **추천 시스템**: POI 기반 DRT 경로 추천

---

## 📋 **8. 테스트 가이드**

### API 테스트 명령어
```bash
# 개발 서버에서 POI API 테스트
curl "http://localhost:3000/api/v1/dashboard/realtime/poi-population?poi_codes=POI001"

# POI 연동 히트맵 테스트
curl "http://localhost:3000/api/v1/dashboard/realtime/heatmap-data?include_poi=true"

# 특정 날짜 POI 데이터 테스트
curl "http://localhost:3000/api/v1/dashboard/realtime/poi-population?target_date=2025-08-19"
```

### 예상 응답 시간
- **POI API**: < 500ms (캐시 hit), < 2s (API 호출)
- **히트맵 + POI**: < 1s (병합 처리 포함)
- **Mock 데이터**: < 100ms

---

## 🎯 **9. 성공 지표**

### 기술적 지표
- **API 응답시간**: 95% 요청이 2초 이내
- **데이터 정확도**: 서울시 API와 98% 일치
- **캐시 적중률**: 80% 이상

### 비즈니스 지표  
- **DRT 수요 예측 정확도**: POI 데이터 추가로 15% 향상 목표
- **취약지 식별 정확도**: POI 혼잡도 + 교통량으로 20% 향상
- **사용자 만족도**: 실시간 혼잡도 정보로 UX 개선

---

**마지막 업데이트**: 2025년 8월 19일  
**구현 상태**: POI API 100% 완료, 히트맵 연동 준비 완료  
**다음 단계**: 경수님의 데이터베이스 연동 및 최적화