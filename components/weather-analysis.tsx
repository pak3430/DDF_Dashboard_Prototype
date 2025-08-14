import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Cloud, CloudRain, Sun, Wind } from "lucide-react"

interface WeatherAnalysisProps {
  period: string
  region: string
}

export function WeatherAnalysis({ period, region }: WeatherAnalysisProps) {
  // 모의 날씨 데이터
  const weatherDemandData = [
    { date: "2024-01-01", sunny: 100, cloudy: 115, rainy: 145, snowy: 125, temp: 5 },
    { date: "2024-01-02", sunny: 95, cloudy: 120, rainy: 150, snowy: 130, temp: 3 },
    { date: "2024-01-03", sunny: 105, cloudy: 110, rainy: 140, snowy: 120, temp: 7 },
    { date: "2024-01-04", sunny: 98, cloudy: 125, rainy: 155, snowy: 135, temp: 2 },
    { date: "2024-01-05", sunny: 102, cloudy: 118, rainy: 148, snowy: 128, temp: 6 },
    { date: "2024-01-06", sunny: 108, cloudy: 112, rainy: 142, snowy: 122, temp: 8 },
    { date: "2024-01-07", sunny: 92, cloudy: 128, rainy: 158, snowy: 138, temp: 1 },
  ]

  const weatherImpactSummary = [
    { condition: "맑음", icon: Sun, impact: 0, color: "text-yellow-500", demandChange: "기준" },
    { condition: "흐림", icon: Cloud, impact: 15, color: "text-gray-500", demandChange: "+15%" },
    { condition: "비", icon: CloudRain, impact: 45, color: "text-blue-500", demandChange: "+45%" },
    { condition: "눈", icon: Wind, impact: 25, color: "text-purple-500", demandChange: "+25%" },
  ]

  return (
    <div className="space-y-6">
      {/* 날씨별 수요 영향 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {weatherImpactSummary.map((weather, index) => {
          const Icon = weather.icon
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`h-5 w-5 ${weather.color}`} />
                  <span className="font-medium">{weather.condition}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{weather.demandChange}</span>
                    <Badge
                      variant={weather.impact > 30 ? "destructive" : weather.impact > 10 ? "secondary" : "default"}
                    >
                      {weather.impact > 30 ? "높음" : weather.impact > 10 ? "보통" : "기준"}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">평균 수요 변화율</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 날씨별 수요 패턴 */}
        <Card>
          <CardHeader>
            <CardTitle>날씨별 수요 패턴</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weatherDemandData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => new Date(value).getMonth() + 1 + "/" + new Date(value).getDate()}
                />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sunny" stroke="#F59E0B" name="맑음" />
                <Line type="monotone" dataKey="cloudy" stroke="#6B7280" name="흐림" />
                <Line type="monotone" dataKey="rainy" stroke="#3B82F6" name="비" />
                <Line type="monotone" dataKey="snowy" stroke="#8B5CF6" name="눈" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 기온별 수요 분석 */}
        <Card>
          <CardHeader>
            <CardTitle>기온별 수요 분석</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weatherDemandData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="temp" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rainy" fill="#3B82F6" name="수요량" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 날씨 예보 기반 수요 예측 */}
      <Card>
        <CardHeader>
          <CardTitle>향후 7일 날씨 기반 수요 예측</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {[
              { day: "월", weather: "sunny", temp: "8°C", demand: 105, change: 0 },
              { day: "화", weather: "cloudy", temp: "6°C", demand: 120, change: 15 },
              { day: "수", weather: "rainy", temp: "4°C", demand: 152, change: 45 },
              { day: "목", weather: "cloudy", temp: "7°C", demand: 118, change: 12 },
              { day: "금", weather: "sunny", temp: "10°C", demand: 108, change: 3 },
              { day: "토", weather: "rainy", temp: "5°C", demand: 148, change: 41 },
              { day: "일", weather: "sunny", temp: "12°C", demand: 95, change: -10 },
            ].map((forecast, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="font-medium mb-2">{forecast.day}</div>
                <div className="mb-2">
                  {forecast.weather === "sunny" && <Sun className="h-6 w-6 mx-auto text-yellow-500" />}
                  {forecast.weather === "cloudy" && <Cloud className="h-6 w-6 mx-auto text-gray-500" />}
                  {forecast.weather === "rainy" && <CloudRain className="h-6 w-6 mx-auto text-blue-500" />}
                </div>
                <div className="text-sm text-gray-600 mb-2">{forecast.temp}</div>
                <div className="font-bold">{forecast.demand}</div>
                <div
                  className={`text-xs ${forecast.change > 0 ? "text-red-500" : forecast.change < 0 ? "text-blue-500" : "text-gray-500"}`}
                >
                  {forecast.change > 0 ? "+" : ""}
                  {forecast.change}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
