import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, TrendingUp, Clock, Users } from "lucide-react"

interface POIListProps {
  selectedTypes: string[]
  region: string
}

export function POIList({ selectedTypes, region }: POIListProps) {
  // 모의 POI 데이터
  const mockPOIs = [
    {
      id: 1,
      name: "중앙초등학교",
      type: "school",
      address: "서울시 중구 명동길 123",
      demand: 85,
      peakHours: "07:30-08:30, 15:00-16:00",
      weeklyUsers: 450,
      trend: "up",
    },
    {
      id: 2,
      name: "시립병원",
      type: "hospital",
      address: "서울시 중구 을지로 456",
      demand: 92,
      peakHours: "09:00-11:00, 14:00-17:00",
      weeklyUsers: 680,
      trend: "up",
    },
    {
      id: 3,
      name: "관광문화센터",
      type: "tourist",
      address: "서울시 중구 충무로 789",
      demand: 78,
      peakHours: "10:00-12:00, 14:00-18:00",
      weeklyUsers: 320,
      trend: "down",
    },
    {
      id: 4,
      name: "대형마트",
      type: "shopping",
      address: "서울시 중구 퇴계로 321",
      demand: 65,
      peakHours: "11:00-13:00, 18:00-20:00",
      weeklyUsers: 280,
      trend: "stable",
    },
    {
      id: 5,
      name: "구청",
      type: "office",
      address: "서울시 중구 세종대로 654",
      demand: 45,
      peakHours: "09:00-12:00, 13:00-17:00",
      weeklyUsers: 150,
      trend: "stable",
    },
  ]

  const filteredPOIs = mockPOIs.filter((poi) => selectedTypes.includes(poi.type))

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      school: "학교",
      hospital: "병원",
      tourist: "관광지",
      shopping: "쇼핑센터",
      office: "관공서",
      community: "커뮤니티센터",
    }
    return labels[type] || type
  }

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      school: "bg-blue-500",
      hospital: "bg-red-500",
      tourist: "bg-green-500",
      shopping: "bg-purple-500",
      office: "bg-gray-500",
      community: "bg-orange-500",
    }
    return colors[type] || "bg-gray-500"
  }

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-3 w-3 text-green-500" />
    if (trend === "down") return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
    return <div className="h-3 w-3 bg-gray-400 rounded-full" />
  }

  return (
    <Card className="h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          POI 목록
          <Badge variant="secondary" className="ml-auto">
            {filteredPOIs.length}개
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          <div className="p-4 space-y-4">
            {filteredPOIs.map((poi) => (
              <div key={poi.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getTypeColor(poi.type)}`} />
                    <h3 className="font-medium">{poi.name}</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(poi.trend)}
                    <Badge variant="outline" className="text-xs">
                      {poi.demand}/100
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">{poi.address}</p>

                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {getTypeLabel(poi.type)}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-3 w-3" />
                    <span>피크: {poi.peakHours}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-3 w-3" />
                    <span>주간 이용자: {poi.weeklyUsers}명</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t">
                  <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                    상세 분석 보기
                  </Button>
                </div>
              </div>
            ))}

            {filteredPOIs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>선택된 POI 유형이 없습니다.</p>
                <p className="text-sm">필터에서 POI 유형을 선택해주세요.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
