import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Users,
  MapPin,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Building2,
  Car,
  Calculator,
  Target,
} from "lucide-react"

const stats = [
  {
    name: "분석 대상 지역",
    value: "15개 구역",
    icon: MapPin,
    change: "신규 분석",
    changeType: "positive" as const,
  },
  {
    name: "취약지 식별률",
    value: "87.3%",
    icon: AlertCircle,
    change: "+5.2%",
    changeType: "positive" as const,
  },
  {
    name: "수요 예측 정확도",
    value: "92.1%",
    icon: Target,
    change: "+3.8%",
    changeType: "positive" as const,
  },
  {
    name: "승용차 대비 경쟁력",
    value: "78.5%",
    icon: Car,
    change: "+12.3%",
    changeType: "positive" as const,
  },
  {
    name: "예상 전환율",
    value: "23.7%",
    icon: TrendingUp,
    change: "시뮬레이션",
    changeType: "positive" as const,
  },
  {
    name: "투자 회수 기간",
    value: "3.2년",
    icon: Calculator,
    change: "-0.8년",
    changeType: "positive" as const,
  },
]

const quickActions = [
  // 수요 및 취약지 분석
  {
    title: "대중교통 취약지 분석",
    description: "MST-GCN 기반 취약지역 식별 및 승용차 대비 경쟁력 분석",
    href: "/vulnerability-analysis",
    icon: MapPin,
    category: "수요 및 취약지 분석",
    priority: 5,
  },
  {
    title: "가중점(O/D) 분석",
    description: "시공간 그래프 기반 첨두/비첨두 통행량 및 광역 이동 수요 예측",
    href: "/od-analysis",
    icon: TrendingUp,
    category: "수요 및 취약지 분석",
    priority: 5,
  },
  {
    title: "수단 분담률 분석",
    description: "DRT 도입 시 교통수단별 분담률 변화 시뮬레이션",
    href: "/modal-split",
    icon: BarChart3,
    category: "수요 및 취약지 분석",
    priority: 5,
  },
  // 지역 특성 분석
  {
    title: "인구·사회경제 특성 분석",
    description: "인구밀도, 연령, 소득 데이터 결합을 통한 DRT 적합성 분석",
    href: "/demographic-analysis",
    icon: Users,
    category: "지역 특성 분석",
    priority: 5,
  },
  // 운영 시뮬레이션
  {
    title: "전환율·교통량 변화 예측",
    description: "승용차→DRT 전환율과 교통량 변화 시뮬레이션",
    href: "/conversion-simulation",
    icon: Car,
    category: "운영 시뮬레이션",
    priority: 5,
  },
  {
    title: "통행 시간·비용 변화 예측",
    description: "DRT 운행 시 시간/비용 변화 분석",
    href: "/travel-impact",
    icon: TrendingUp,
    category: "운영 시뮬레이션",
    priority: 4,
  },
  {
    title: "차량 투입 및 배치 최적화",
    description: "시간대별 적정 차량 대수 및 배치 전략 산출",
    href: "/fleet-optimization",
    icon: Building2,
    category: "운영 시뮬레이션",
    priority: 4,
  },
  // 운영 비용/수익 예측
  {
    title: "비용·수입 예측",
    description: "차량, 인건비, 유류비 기반 운영비 및 예상 수입 산출",
    href: "/cost-revenue",
    icon: DollarSign,
    category: "운영 비용/수익 예측",
    priority: 5,
  },
  {
    title: "재정 지원 규모 산정",
    description: "보조금 규모 및 재정 계획 수립",
    href: "/financial-planning",
    icon: Calculator,
    category: "운영 비용/수익 예측",
    priority: 4,
  },
]

const groupedActions = quickActions.reduce(
  (acc, action) => {
    if (!acc[action.category]) {
      acc[action.category] = []
    }
    acc[action.category].push(action)
    return acc
  },
  {} as Record<string, typeof quickActions>,
)

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="md:ml-64">
        <main className="p-6">
          <DashboardHeader
            title="DDF Dashboard"
            description="MST-GCN 기반 DRT 도입 적합성 분석 및 운영 시뮬레이션 시스템"
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.name}</CardTitle>
                  <stat.icon className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">분석 기능</h2>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                9개 핵심 기능
              </Badge>
            </div>

            {Object.entries(groupedActions).map(([category, actions]) => (
              <div key={category} className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {actions.map((action) => (
                    <Card key={action.title} className="hover:shadow-md transition-shadow cursor-pointer relative">
                      <Badge
                        className={`absolute -top-2 -right-2 text-white text-xs ${
                          action.priority === 5 ? "bg-red-500" : "bg-orange-500"
                        }`}
                      >
                        중요도 {action.priority}
                      </Badge>
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <action.icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{action.title}</CardTitle>
                            <CardDescription className="mt-1 text-sm">{action.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>MST-GCN 모델 상태</CardTitle>
                <CardDescription>시공간 예측 모델 및 데이터 처리 상태</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">MST-GCN 모델</span>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">학습 완료</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">시공간 데이터 수집</span>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">실시간</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">인구·사회경제 데이터</span>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">동기화됨</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">교통카드 데이터</span>
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">처리 중</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">마지막 분석</span>
                    <span className="text-sm text-gray-600">15분 전</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>프로젝트 진행 상황</CardTitle>
                <CardDescription>DDF 프로젝트 요구사항별 진행도</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">수요 및 취약지 분석</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                      <span className="text-xs text-gray-600">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">지역 특성 분석</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                      <span className="text-xs text-gray-600">70%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">운영 시뮬레이션</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                      <span className="text-xs text-gray-600">60%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">비용/수익 예측</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                      <span className="text-xs text-gray-600">45%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
