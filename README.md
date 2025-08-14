# DDF 대시보드 프로토타입

이 프로젝트는 데이터 기반 의사결정(Data-Driven Decision-making)을 지원하기 위해 구축된 인터랙티브 대시보드 프로토타입입니다. 다양한 데이터 분석 및 시뮬레이션 기능을 통해 복잡한 시나리오를 시각화하고 효과적인 전략 수립을 돕습니다.

## ✨ 주요 기능

이 대시보드는 다음과 같은 다양한 분석 및 시뮬레이션 모듈을 제공합니다.

- **수요 예측 (`demand-forecast`):** 시계열 데이터를 기반으로 미래 수요를 예측합니다.
- **인구 통계 분석 (`demographic-analysis`):** 연령 분포, 소득 수준 등 인구 통계학적 특성을 분석합니다.
- **OD 분석 (`od-analysis`):** 출발지-목적지 간의 이동 패턴과 흐름을 시각화합니다.
- **예산 시뮬레이터 (`budget-simulator`):** 예산 제약 조건 하에서 최적의 분배 방안을 시뮬레이션합니다.
- **시나리오 비교 (`scenario-comparison`):** 다양한 시나리오의 예상 결과를 비교 분석하여 최적의 대안을 선택할 수 있도록 지원합니다.
- **취약성 분석 (`vulnerability-analysis`):** 특정 외부 요인에 대한 시스템의 취약점을 분석하고 시각화합니다.
- **히트맵 분석 (`heatmap`):** 지리적 데이터의 밀집도를 히트맵으로 시각화하여 패턴을 파악합니다.
- **정책 가이드 (`policy-guide`):** 데이터 분석 결과를 바탕으로 정책 권장 사항을 제공합니다.

## 🛠️ 기술 스택

- **프레임워크:** Next.js (App Router)
- **언어:** TypeScript
- **UI:** React
- **스타일링:** Tailwind CSS
- **UI 컴포넌트:** shadcn/ui
- **패키지 매니저:** pnpm

## 📂 프로젝트 구조

```
/
├── app/                  # Next.js App Router 기반 페이지 및 라우팅
│   ├── [feature]/page.tsx  # 각 기능별 페이지 컴포넌트
│   └── layout.tsx        # 전역 레이아웃
├── components/           # 재사용 가능한 리액트 컴포넌트
│   ├── ui/               # shadcn/ui 기본 컴포넌트
│   └── *.tsx             # 기능별 조합 컴포넌트
├── lib/                  # 유틸리티 함수 (cn 등)
├── public/               # 정적 에셋 (이미지, 폰트 등)
└── styles/               # 전역 스타일
```

## 🚀 시작하기

### 1. 저장소 복제

```bash
git clone <repository-url>
cd DDF_Dashboard_Prototype
```

### 2. 의존성 설치

이 프로젝트는 `pnpm`을 사용합니다.

```bash
pnpm install
```

### 3. 개발 서버 실행

```bash
pnpm run dev
```

이제 브라우저에서 `http://localhost:3000`으로 접속하여 대시보드를 확인할 수 있습니다.

## 📜 사용 가능한 스크립트

- `pnpm dev`: 개발 모드로 애플리케이션을 실행합니다.
- `pnpm build`: 프로덕션용으로 애플리케이션을 빌드합니다.
- `pnpm start`: 빌드된 프로덕션 서버를 시작합니다.
- `pnpm lint`: ESLint를 사용하여 코드 스타일을 검사합니다.