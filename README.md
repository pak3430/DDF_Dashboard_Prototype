# DDF Dashboard
**DRT(수요응답형 버스) 도입을 위한 AI 기반 분석 및 시각화 시스템**

![Dashboard Preview](https://img.shields.io/badge/Status-Development-yellow)
![API Integration](https://img.shields.io/badge/API-Seoul%20Open%20Data-green)
![Deadline](https://img.shields.io/badge/Deadline-2025.08.29-red)

## 📋 프로젝트 개요
- **팀명**: 도리토스(DRTS)
- **과정명**: [IBM X RedHat] AI Transformation AX Academy
- **대상 지역**: 서울시
- **개발 기간**: 2025.08.19 ~ 2025.08.29

MST-GCN(Multi-Scale Temporal Graph Convolutional Network) 모델 기반으로 서울시 교통 수요를 예측하고, DRT 도입 타당성을 분석하는 대시보드입니다.

## 🎯 주요 기능

### 🔥 1순위: 실시간 교통 현황 대시보드 (✅ 완료)
- **실시간 히트맵**: 서울시 전체 교통량 시각화
- **정류장 상세 정보**: 클릭 시 승하차 데이터 및 혼잡도 표시
- **시간대별 패턴 차트**: 24시간 교통량 변화 분석
- **실시간 필터링**: 날짜/시간/데이터 타입별 조회

### ⭐ 2순위: 수요 예측 및 분석 (🔄 진행중)
- **DRT 수요 예측**: MST-GCN 모델 결과 히트맵 표시
- **취약지 분석**: 교통 소외지역 식별 및 우선순위 랭킹
- **지역별 상세 분석**: 구/동 단위 교통 현황

### 📋 3순위: 시뮬레이션 (⏳ 대기중)
- **DRT 도입 시나리오**: 차량 수, 운영시간, 요금 설정
- **경제성 분석**: 비용/수익, ROI 분석

## 🛠️ 기술 스택
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui  
- **Charts**: Recharts
- **Maps**: Leaflet.js, React-Leaflet
- **API**: Next.js API Routes → 서울시 공공데이터 API
- **Deployment**: Vercel (예정)

## 🚀 실행 방법

### 1. 프로젝트 설치
```bash
git clone <repository-url>
cd DDF_Dashboard_Prototype
pnpm install
```

### 2. 환경변수 설정
**서울시 공공데이터 API 키 발급**:
1. [서울시 공공데이터](https://data.seoul.go.kr/) 회원가입
2. "정류장별 승하차 인원정보" 검색 → API 신청
3. 발급받은 키를 `.env.local`에 입력

```bash
# .env.local 파일 생성
SEOUL_TRAFFIC_API_KEY=발급받은_API_키
SEOUL_API_BASE_URL=http://openapi.seoul.go.kr:8088
SEOUL_STOP_BOARDING_API=/api/1/json/TaimsTpssStaRouteInfoH
```

### 3. 개발 서버 실행
```bash
pnpm dev
```
http://localhost:3000 에서 확인

## 📱 페이지 구조
| 경로 | 설명 | 우선순위 | 상태 |
|------|------|----------|------|
| `/` | 메인 대시보드 (프로젝트 개요, 진행 상황) | - | ✅ |
| `/traffic-dashboard` | 실시간 교통 현황 (히트맵 + 상세패널 + 차트) | 1순위 | ✅ |
| `/heatmap` | 교통량 히트맵 전용 페이지 | 1순위 | ✅ |
| `/vulnerability-analysis` | 취약지 분석 | 2순위 | ✅ |
| `/demand-prediction` | 수요 예측 | 2순위 | 🔄 |
| `/simulation` | 시뮬레이션 | 3순위 | ⏳ |

## 🔌 API 엔드포인트

### 실시간 교통 현황
```typescript
GET /api/v1/dashboard/realtime/heatmap-data
// 히트맵용 교통량 데이터
// 파라미터: target_date, time_range, intensity_type

GET /api/v1/dashboard/realtime/stop-detail  
// 정류장 상세 정보
// 파라미터: stop_id, target_date, include_hourly

GET /api/v1/dashboard/analytics/hourly-patterns
// 시간대별 교통 패턴
// 파라미터: area_type, area_id, target_date, chart_type
```

## 📊 데이터 소스
- **서울시 공공데이터 API**: 
  - 정류장별 승하차 인원정보 (TaimsTpssStaRouteInfoH)
  - 실시간 인구 데이터 (citydata_ppltn)
  - 행정동별 OD 데이터 (TaimsTpssEmdOdTc)
- **CSV 파일**: 
  - `seoul_route_info.csv` (1,660개 버스노선)
  - `seoul_node_info.csv` (100,415개 교통노드)  
  - `seoul_poi_info.csv` (120개 POI)

## 📈 개발 진행 상황

### ✅ 완료된 작업 (95%)
1. **UI/UX 설계**: 요구사항 기반 컴포넌트 설계
2. **핵심 컴포넌트 개발**: 
   - `MapHeatmapComponent` - 히트맵 시각화
   - `DetailPanelComponent` - 정류장 상세 패널
   - `LineChartComponent` - 시간대별 교통량 차트
   - `FilterComponent` - 실시간 필터링
3. **실제 API 연동**: 서울시 공공데이터 API 완전 연동
4. **데이터 처리**: API 응답 → 컴포넌트 데이터 변환
5. **에러 처리**: API 실패시 Mock 데이터 fallback
6. **실시간 업데이트**: 30초~5분 자동 새로고침

### 🔄 진행중인 작업 (5%)
- MST-GCN 모델 연동 (백엔드 협업 대기)
- Leaflet.js 지도 라이브러리 완성
- 성능 최적화

## 👥 팀 역할 분담
| 팀원 | 담당 영역 | 주요 기능 |
|------|-----------|----------|
| **박상훈** | Frontend, 데이터 시각화 | 교통 현황 대시보드, 리포트 생성 |
| **이경수** | Backend, API 개발 | 수요 예측, 시뮬레이션, 시스템 아키텍처 |
| **고병수** | AI/ML 모델링 | MST-GCN 모델, 데이터 분석, 모델 서빙 |

## 🚦 현재 API 연동 상태

### ✅ 연동 완료
- ✅ 정류장별 승하차 데이터
- ✅ POI별 실시간 인구  
- ✅ 행정동별 OD 데이터

### 🔄 개발중
- 🔄 MST-GCN 예측 모델
- ⏳ 시뮬레이션 API

## 💡 프로젝트 특징
- **실시간 데이터**: 서울시 공공 API 직접 연동
- **반응형 디자인**: 모바일/데스크톱 최적화
- **모듈화 설계**: 컴포넌트 재사용성 고려
- **성능 최적화**: API 캐싱, 데이터 압축
- **에러 처리**: Graceful fallback to mock data
- **개발 친화적**: Hot reload, TypeScript 타입 안정성

## 🎯 8월 29일 배포 목표
- [x] 실시간 교통 현황 대시보드
- [ ] 수요 예측 기능  
- [ ] 지도 라이브러리 완성
- [ ] 성능 최적화
- [ ] Vercel 배포

## 📝 라이센스
이 프로젝트는 IBM X RedHat AI Academy 교육용 프로젝트입니다.

---
**마지막 업데이트**: 2025.08.19  
**API 연동 상태**: 서울시 공공데이터 API 연동 완료  
**현재 진행률**: 95% (API 키 설정 후 100% 동작)