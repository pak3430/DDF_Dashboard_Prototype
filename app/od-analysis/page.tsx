import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ODFlowVisualization } from "@/components/od-flow-visualization"
import { TrendingUp, MapPin, Users, Clock, Download, RefreshCw } from "lucide-react"

const odStats = [
  {
    name: "총 통행량",
    value: "45,230건/일",
    icon: Users,
    change: "+8.3%",
    changeType: "positive" as const,
  },
  {
    name: "첨두시간 집중도",
    value: "34.2%",
    icon: Clock,
    change: "-2.1%",
    changeType: "positive" as const,
  },
  {
    name: "광역 통행 비율",
    value: "28.7%",
    icon: MapPin,
    change: "+5.4%",
    changeType: "positive" as const,
  },
  {
    name: "평균 통행거리",
    value: "12.8km",
    icon: TrendingUp,
    change: "+1.2km",
    changeType: "neutral" as const,
  },
]

export default function ODAnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="md:ml-64">
        <main className="p-6">
          <DashboardHeader
            title="가중점(O/D) 분석"
            description="시공간 그래프 기반 첨두/비첨두 통행량 및 광역 이동 수요 예측"
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {odStats.map((stat) => (
              <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.name}</CardTitle>
                  <stat.icon className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p
                    className={`text-xs mt-1 ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : stat.changeType === "negative"
                          ? "text-red-600"
                          : "text-gray-600"
                    }`}
                  >
                    {stat.change} 전월 대비
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                중요도 5 - 최우선
              </Badge>
              <span className="text-sm text-gray-600">마지막 업데이트: 10분 전</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                데이터 새로고침
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                분석 결과 내보내기
              </Button>
            </div>
          </div>

          <Tabs defaultValue="flow" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="flow">통행 흐름</TabsTrigger>
              <TabsTrigger value="peak">첨두 분석</TabsTrigger>
              <TabsTrigger value="regional">광역 통행</TabsTrigger>
            </TabsList>

            <TabsContent value="flow" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>MST-GCN 기반 O/D 통행 흐름</CardTitle>
                  <CardDescription>시공간 그래프 신경망을 활용한 출발지-목적지 통행 패턴 분석</CardDescription>
                </CardHeader>
                <CardContent>
                  <ODFlowVisualization />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="peak" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>첨두/비첨두 시간대 분석</CardTitle>
                  <CardDescription>시간대별 통행량 변화 패턴 및 집중도 분석</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="text-center">
                      <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">첨두시간 분석 차트</h3>
                      <p className="text-gray-600">시간대별 통행량 변화 패턴</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="regional" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>광역 이동 수요 예측</CardTitle>
                  <CardDescription>서울 등 광역권 이동 패턴 및 수요 예측 분석</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">광역 통행 지도</h3>
                      <p className="text-gray-600">지역간 이동 패턴 시각화</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
