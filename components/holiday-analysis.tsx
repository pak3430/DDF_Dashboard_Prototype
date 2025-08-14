import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, TrendingDown, TrendingUp, Users } from "lucide-react"

interface HolidayAnalysisProps {
  period: string
  region: string
}

export function HolidayAnalysis({ period, region }: HolidayAnalysisProps) {
  // 모의 휴일 데이터
  const holidayTypes = [
    {
      type: "국경일",
      examples: ["신정", "삼일절", "어린이날"],
      avgDemandChange: -15,
      pattern: "관광지 증가, 주거지역 감소",
      color: "bg-red-500",
    },
    {
      type: "연휴",
      examples: ["추석", "설날", "어버이날"],
      avgDemandChange: -25,
      pattern: "전반적 감소, 교통 허브 증가",
      color: "bg-blue-500",
    },
    {
      type: "대체휴일",
      examples: ["대체공휴일"],
      avgDemandChange: -10,
      pattern: "평일 대비 소폭 감소",
      color: "bg-green-500",
    },
    {
      type: "임시휴일",
      examples: ["선거일", "특별휴일"],
      avgDemandChange: -20,
      pattern: "예측 어려움, 변동성 높음",
      color: "bg-purple-500",
    },
  ]

  const upcomingHolidays = [
    {
      name: "설날 연휴",
      dates: "2024-02-09 ~ 2024-02-12",
      duration: 4,
      expectedChange: -30,
      specialNotes: "귀성 교통으로 인한 특정 지역 수요 급증 예상",
    },
    {
      name: "삼일절",
      dates: "2024-03-01",
      duration: 1,
      expectedChange: -12,
      specialNotes: "기념행사 지역 수요 증가 예상",
    },
    {
      name: "어린이날",
      dates: "2024-05-05",
      duration: 1,
      expectedChange: -8,
      specialNotes: "놀이공원, 가족 시설 주변 수요 증가",
    },
  ]

  const seasonalPatterns = [
    { season: "봄", months: "3-5월", pattern: "야외활동 증가", demandChange: 5 },
    { season: "여름", months: "6-8월", pattern: "휴가철 변동성", demandChange: -10 },
    { season: "가을", months: "9-11월", pattern: "안정적 패턴", demandChange: 2 },
    { season: "겨울", months: "12-2월", pattern: "날씨 의존성 높음", demandChange: 8 },
  ]

  return (
    <div className="space-y-6">
      {/* 휴일 유형별 영향 분석 */}
      <Card>
        <CardHeader>
          <CardTitle>휴일 유형별 영향 분석</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {holidayTypes.map((holiday, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${holiday.color}`} />
                    <h3 className="font-medium">{holiday.type}</h3>
                    <Badge variant="outline">{holiday.examples.join(", ")}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {holiday.avgDemandChange < 0 ? (
                      <TrendingDown className="h-4 w-4 text-blue-500" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`font-bold ${holiday.avgDemandChange < 0 ? "text-blue-500" : "text-red-500"}`}>
                      {holiday.avgDemandChange > 0 ? "+" : ""}
                      {holiday.avgDemandChange}%
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>패턴:</strong> {holiday.pattern}
                </div>
                <Progress value={Math.abs(holiday.avgDemandChange)} className="h-2 mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 예정된 휴일 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            예정된 휴일 및 예상 영향
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingHolidays.map((holiday, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-lg">{holiday.name}</h3>
                    <p className="text-sm text-gray-600">{holiday.dates}</p>
                  </div>
                  <Badge variant={Math.abs(holiday.expectedChange) > 20 ? "destructive" : "secondary"}>
                    {holiday.duration}일간
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="font-medium text-blue-800">예상 수요 변화</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {holiday.expectedChange > 0 ? "+" : ""}
                      {holiday.expectedChange}%
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-medium text-gray-800">특이사항</div>
                    <div className="text-sm text-gray-600 mt-1">{holiday.specialNotes}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 계절별 패턴 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            계절별 수요 패턴
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {seasonalPatterns.map((season, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-lg mb-2">{season.season}</h3>
                <p className="text-sm text-gray-600 mb-3">{season.months}</p>
                <div className="mb-3">
                  <span className={`text-2xl font-bold ${season.demandChange >= 0 ? "text-red-500" : "text-blue-500"}`}>
                    {season.demandChange > 0 ? "+" : ""}
                    {season.demandChange}%
                  </span>
                </div>
                <p className="text-xs text-gray-600">{season.pattern}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
