import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Cloud, Calendar, Sun, AlertTriangle } from "lucide-react"

interface ExternalFactorsSummaryProps {
  period: string
  region: string
}

export function ExternalFactorsSummary({ period, region }: ExternalFactorsSummaryProps) {
  // 모의 데이터
  const summaryData = {
    weatherImpact: 35,
    eventImpact: 25,
    holidayImpact: 20,
    overallAccuracy: 87.5,
    significantFactors: [
      { name: "강우", impact: "+23%", type: "weather", trend: "up" },
      { name: "콘서트", impact: "+45%", type: "event", trend: "up" },
      { name: "연휴", impact: "-15%", type: "holiday", trend: "down" },
    ],
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* 날씨 영향도 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Cloud className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">날씨 영향도</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{summaryData.weatherImpact}%</span>
              <Badge variant="secondary">높음</Badge>
            </div>
            <Progress value={summaryData.weatherImpact} className="h-2" />
            <p className="text-xs text-gray-600">수요 변동에 미치는 영향</p>
          </div>
        </CardContent>
      </Card>

      {/* 이벤트 영향도 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">이벤트 영향도</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{summaryData.eventImpact}%</span>
              <Badge variant="secondary">보통</Badge>
            </div>
            <Progress value={summaryData.eventImpact} className="h-2" />
            <p className="text-xs text-gray-600">지역 행사 및 이벤트 영향</p>
          </div>
        </CardContent>
      </Card>

      {/* 휴일 영향도 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-medium">휴일 영향도</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{summaryData.holidayImpact}%</span>
              <Badge variant="secondary">보통</Badge>
            </div>
            <Progress value={summaryData.holidayImpact} className="h-2" />
            <p className="text-xs text-gray-600">공휴일 및 연휴 영향</p>
          </div>
        </CardContent>
      </Card>

      {/* 전체 예측 정확도 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-medium">예측 정확도</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{summaryData.overallAccuracy}%</span>
              <Badge className="bg-green-500">우수</Badge>
            </div>
            <Progress value={summaryData.overallAccuracy} className="h-2" />
            <p className="text-xs text-gray-600">외부 변수 통합 후</p>
          </div>
        </CardContent>
      </Card>

      {/* 주요 영향 요인 */}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            주요 영향 요인 ({period})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {summaryData.significantFactors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {factor.type === "weather" && <Cloud className="h-4 w-4 text-blue-500" />}
                  {factor.type === "event" && <Calendar className="h-4 w-4 text-green-500" />}
                  {factor.type === "holiday" && <Sun className="h-4 w-4 text-orange-500" />}
                  <span className="font-medium">{factor.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${factor.trend === "up" ? "text-red-500" : "text-blue-500"}`}>
                    {factor.impact}
                  </span>
                  {factor.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-blue-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
