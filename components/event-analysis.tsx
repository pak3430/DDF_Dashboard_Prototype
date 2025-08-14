import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, TrendingUp } from "lucide-react"

interface EventAnalysisProps {
  period: string
  region: string
}

export function EventAnalysis({ period, region }: EventAnalysisProps) {
  // 모의 이벤트 데이터
  const upcomingEvents = [
    {
      id: 1,
      name: "K-POP 콘서트",
      date: "2024-01-15",
      location: "잠실 올림픽공원",
      expectedAttendees: 50000,
      demandIncrease: 85,
      impactRadius: "3km",
      status: "high-impact",
    },
    {
      id: 2,
      name: "지역 축제",
      date: "2024-01-20",
      location: "강남구 일대",
      expectedAttendees: 15000,
      demandIncrease: 35,
      impactRadius: "2km",
      status: "medium-impact",
    },
    {
      id: 3,
      name: "학술 컨퍼런스",
      date: "2024-01-25",
      location: "코엑스",
      expectedAttendees: 5000,
      demandIncrease: 15,
      impactRadius: "1km",
      status: "low-impact",
    },
  ]

  const pastEvents = [
    {
      name: "신년 행사",
      date: "2024-01-01",
      actualIncrease: 92,
      predictedIncrease: 85,
      accuracy: 92,
    },
    {
      name: "문화 공연",
      date: "2023-12-25",
      actualIncrease: 45,
      predictedIncrease: 50,
      accuracy: 90,
    },
    {
      name: "스포츠 경기",
      date: "2023-12-20",
      actualIncrease: 67,
      predictedIncrease: 60,
      accuracy: 89,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high-impact":
        return "bg-red-500"
      case "medium-impact":
        return "bg-yellow-500"
      case "low-impact":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "high-impact":
        return "높음"
      case "medium-impact":
        return "보통"
      case "low-impact":
        return "낮음"
      default:
        return "미상"
    }
  }

  return (
    <div className="space-y-6">
      {/* 예정된 이벤트 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            예정된 이벤트 및 예상 영향
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-lg">{event.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {event.expectedAttendees.toLocaleString()}명
                      </div>
                    </div>
                  </div>
                  <Badge className={`text-white ${getStatusColor(event.status)}`}>
                    영향도 {getStatusLabel(event.status)}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="font-medium text-blue-800">예상 수요 증가</div>
                    <div className="text-2xl font-bold text-blue-600">+{event.demandIncrease}%</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="font-medium text-green-800">영향 반경</div>
                    <div className="text-2xl font-bold text-green-600">{event.impactRadius}</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="font-medium text-purple-800">추가 배차 권장</div>
                    <div className="text-2xl font-bold text-purple-600">{Math.ceil(event.demandIncrease / 20)}대</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 과거 이벤트 예측 정확도 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            과거 이벤트 예측 정확도
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">이벤트명</th>
                  <th className="text-left p-3">날짜</th>
                  <th className="text-left p-3">예측 증가율</th>
                  <th className="text-left p-3">실제 증가율</th>
                  <th className="text-left p-3">정확도</th>
                </tr>
              </thead>
              <tbody>
                {pastEvents.map((event, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 font-medium">{event.name}</td>
                    <td className="p-3">{event.date}</td>
                    <td className="p-3">+{event.predictedIncrease}%</td>
                    <td className="p-3">+{event.actualIncrease}%</td>
                    <td className="p-3">
                      <Badge
                        variant={event.accuracy >= 90 ? "default" : event.accuracy >= 80 ? "secondary" : "destructive"}
                      >
                        {event.accuracy}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="font-medium">예측 성능 요약</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">평균 정확도:</span>
                <span className="font-bold ml-2">90.3%</span>
              </div>
              <div>
                <span className="text-gray-600">최고 정확도:</span>
                <span className="font-bold ml-2">92%</span>
              </div>
              <div>
                <span className="text-gray-600">개선 필요:</span>
                <span className="font-bold ml-2">대규모 이벤트</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
