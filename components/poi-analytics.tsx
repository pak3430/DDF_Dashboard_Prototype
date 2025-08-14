import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, MapPin, Users, Target } from "lucide-react"

interface POIAnalyticsProps {
  selectedTypes: string[]
  region: string
  timeFilter: string
}

export function POIAnalytics({ selectedTypes, region, timeFilter }: POIAnalyticsProps) {
  // 모의 분석 데이터
  const demandByType = [
    { type: "학교", demand: 85, count: 12, color: "#3B82F6" },
    { type: "병원", demand: 92, count: 8, color: "#EF4444" },
    { type: "관광지", demand: 78, count: 6, color: "#10B981" },
    { type: "쇼핑센터", demand: 65, count: 4, color: "#8B5CF6" },
    { type: "관공서", demand: 45, count: 3, color: "#6B7280" },
  ]

  const timeAnalysis = [
    { time: "06:00", school: 20, hospital: 15, tourist: 5, shopping: 10 },
    { time: "08:00", school: 85, hospital: 45, tourist: 15, shopping: 25 },
    { time: "10:00", school: 30, hospital: 70, tourist: 60, shopping: 40 },
    { time: "12:00", school: 40, hospital: 80, tourist: 75, shopping: 65 },
    { time: "14:00", school: 25, hospital: 85, tourist: 80, shopping: 70 },
    { time: "16:00", school: 75, hospital: 60, tourist: 70, shopping: 55 },
    { time: "18:00", school: 15, hospital: 40, tourist: 45, shopping: 80 },
    { time: "20:00", school: 5, hospital: 25, tourist: 30, shopping: 60 },
  ]

  const correlationData = [
    { poi: "중앙초등학교", distance: 200, correlation: 0.85, impact: "high" },
    { poi: "시립병원", distance: 150, correlation: 0.92, impact: "high" },
    { poi: "관광문화센터", distance: 300, correlation: 0.78, impact: "medium" },
    { poi: "대형마트", distance: 250, correlation: 0.65, impact: "medium" },
    { poi: "구청", distance: 400, correlation: 0.45, impact: "low" },
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case "high":
        return "높음"
      case "medium":
        return "보통"
      case "low":
        return "낮음"
      default:
        return "미상"
    }
  }

  return (
    <div className="space-y-6">
      {/* 요약 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">총 POI 수</p>
                <p className="text-2xl font-bold">33개</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">평균 수요 지수</p>
                <p className="text-2xl font-bold">73</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">주간 총 이용자</p>
                <p className="text-2xl font-bold">1,880명</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">고수요 POI</p>
                <p className="text-2xl font-bold">8개</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* POI 유형별 수요 분석 */}
        <Card>
          <CardHeader>
            <CardTitle>POI 유형별 수요 분석</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {demandByType.map((item) => (
                <div key={item.type} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-medium">{item.type}</span>
                      <Badge variant="secondary">{item.count}개</Badge>
                    </div>
                    <span className="text-sm font-medium">{item.demand}/100</span>
                  </div>
                  <Progress value={item.demand} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 시간대별 수요 패턴 */}
        <Card>
          <CardHeader>
            <CardTitle>시간대별 수요 패턴</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="school" stroke="#3B82F6" name="학교" />
                <Line type="monotone" dataKey="hospital" stroke="#EF4444" name="병원" />
                <Line type="monotone" dataKey="tourist" stroke="#10B981" name="관광지" />
                <Line type="monotone" dataKey="shopping" stroke="#8B5CF6" name="쇼핑센터" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* POI-수요 상관관계 분석 */}
      <Card>
        <CardHeader>
          <CardTitle>POI-수요 상관관계 분석</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">POI 명</th>
                  <th className="text-left p-2">거리 (m)</th>
                  <th className="text-left p-2">상관계수</th>
                  <th className="text-left p-2">영향도</th>
                  <th className="text-left p-2">상관관계</th>
                </tr>
              </thead>
              <tbody>
                {correlationData.map((item) => (
                  <tr key={item.poi} className="border-b">
                    <td className="p-2 font-medium">{item.poi}</td>
                    <td className="p-2">{item.distance}m</td>
                    <td className="p-2">{item.correlation}</td>
                    <td className="p-2">
                      <Badge variant="secondary" className={`text-white ${getImpactColor(item.impact)}`}>
                        {getImpactLabel(item.impact)}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <Progress value={item.correlation * 100} className="h-2 w-20" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 개선 제안 */}
      <Card>
        <CardHeader>
          <CardTitle>POI 기반 개선 제안</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-medium text-green-600">✓ 효과적인 POI 연계</h3>
              <ul className="space-y-2 text-sm">
                <li>• 시립병원 주변 배차 시간 확대 (상관계수 0.92)</li>
                <li>• 중앙초등학교 등하교 시간 집중 배치</li>
                <li>• 관광문화센터 주말 운영 강화</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-orange-600">⚠ 개선 필요 영역</h3>
              <ul className="space-y-2 text-sm">
                <li>• 구청 주변 수요 대비 서비스 부족</li>
                <li>• 쇼핑센터 저녁 시간대 배차 부족</li>
                <li>• 신규 POI 발굴 및 연계 필요</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
