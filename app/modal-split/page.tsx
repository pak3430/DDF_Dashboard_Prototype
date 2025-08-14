import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModalSplitChart } from "@/components/modal-split-chart"
import { BarChart3, Car, Bus, Train, Download, RefreshCw } from "lucide-react"

const modalSplitStats = [
  {
    name: "DRT 분담률",
    value: "23.7%",
    icon: BarChart3,
    change: "+8.3%",
    changeType: "positive" as const,
  },
  {
    name: "승용차 분담률",
    value: "45.2%",
    icon: Car,
    change: "-12.1%",
    changeType: "positive" as const,
  },
  {
    name: "버스 분담률",
    value: "28.4%",
    icon: Bus,
    change: "+2.8%",
    changeType: "positive" as const,
  },
  {
    name: "지하철 분담률",
    value: "2.7%",
    icon: Train,
    change: "+1.0%",
    changeType: "positive" as const,
  },
]

export default function ModalSplitPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="md:ml-64">
        <main className="p-6">
          <DashboardHeader
            title="수단 분담률 분석"
            description="MST-GCN 예측 결과 기반 DRT 도입 시 교통수단별 분담률 변화 시뮬레이션"
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {modalSplitStats.map((stat) => (
              <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.name}</CardTitle>
                  <stat.icon className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className={`text-xs mt-1 ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change} DRT 도입 후
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
              <span className="text-sm text-gray-600">마지막 시뮬레이션: 5분 전</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                시뮬레이션 재실행
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                분석 결과 내보내기
              </Button>
            </div>
          </div>

          <Tabs defaultValue="current" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="current">현재 분담률</TabsTrigger>
              <TabsTrigger value="simulation">DRT 도입 후</TabsTrigger>
              <TabsTrigger value="comparison">변화 비교</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>현재 교통수단 분담률</CardTitle>
                  <CardDescription>DRT 도입 전 기존 교통수단별 이용 현황</CardDescription>
                </CardHeader>
                <CardContent>
                  <ModalSplitChart type="current" />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="simulation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>DRT 도입 후 예상 분담률</CardTitle>
                  <CardDescription>MST-GCN 모델 기반 DRT 도입 시 교통수단별 분담률 변화 예측</CardDescription>
                </CardHeader>
                <CardContent>
                  <ModalSplitChart type="simulation" />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>도입 전후 분담률 변화</CardTitle>
                  <CardDescription>교통수단별 분담률 변화량 및 전환 패턴 분석</CardDescription>
                </CardHeader>
                <CardContent>
                  <ModalSplitChart type="comparison" />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
