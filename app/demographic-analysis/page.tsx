import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DemographicOverview } from "@/components/demographic-overview"
import { PopulationDensityMap } from "@/components/population-density-map"
import { AgeDistributionChart } from "@/components/age-distribution-chart"
import { IncomeAnalysis } from "@/components/income-analysis"
import { DRTSuitabilityIndex } from "@/components/drt-suitability-index"
import { Users, MapPin, TrendingUp, Target, Download, RefreshCw } from "lucide-react"

const demographicStats = [
  {
    name: "총 인구",
    value: "284,520명",
    icon: Users,
    change: "+2.3%",
    changeType: "positive" as const,
  },
  {
    name: "인구밀도",
    value: "8,420명/km²",
    icon: MapPin,
    change: "+1.8%",
    changeType: "positive" as const,
  },
  {
    name: "고령화율",
    value: "18.7%",
    icon: TrendingUp,
    change: "+0.9%",
    changeType: "neutral" as const,
  },
  {
    name: "DRT 적합성 지수",
    value: "0.78",
    icon: Target,
    change: "+0.05",
    changeType: "positive" as const,
  },
]

export default function DemographicAnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="md:ml-64">
        <main className="p-6">
          <DashboardHeader
            title="인구·사회경제 특성 분석"
            description="인구밀도, 연령, 소득 데이터 결합을 통한 DRT 적합성 근거 제공"
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {demographicStats.map((stat) => (
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
                    {stat.change} 전년 대비
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
              <span className="text-sm text-gray-600">마지막 업데이트: 1시간 전</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                데이터 새로고침
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                분석 보고서 내보내기
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">개요</TabsTrigger>
              <TabsTrigger value="density">인구밀도</TabsTrigger>
              <TabsTrigger value="age">연령분포</TabsTrigger>
              <TabsTrigger value="income">소득분석</TabsTrigger>
              <TabsTrigger value="suitability">적합성지수</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <DemographicOverview />
            </TabsContent>

            <TabsContent value="density" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>인구밀도 분석</CardTitle>
                  <CardDescription>지역별 인구밀도 분포 및 DRT 수요 예측</CardDescription>
                </CardHeader>
                <CardContent>
                  <PopulationDensityMap />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="age" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>연령대별 분포 분석</CardTitle>
                  <CardDescription>연령구조 변화 및 교통 수요 패턴 분석</CardDescription>
                </CardHeader>
                <CardContent>
                  <AgeDistributionChart />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="income" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>소득수준별 분석</CardTitle>
                  <CardDescription>소득분포와 교통수단 선택 패턴 상관관계</CardDescription>
                </CardHeader>
                <CardContent>
                  <IncomeAnalysis />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suitability" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>DRT 적합성 지수</CardTitle>
                  <CardDescription>인구·사회경제 특성을 종합한 DRT 도입 적합성 평가</CardDescription>
                </CardHeader>
                <CardContent>
                  <DRTSuitabilityIndex />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
