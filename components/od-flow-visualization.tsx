"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { MapPin, Clock, Users, ArrowRight } from "lucide-react"

const hourlyFlowData = [
  { hour: "06", flow: 1200, peak: false },
  { hour: "07", flow: 3400, peak: true },
  { hour: "08", flow: 4800, peak: true },
  { hour: "09", flow: 3200, peak: true },
  { hour: "10", flow: 2100, peak: false },
  { hour: "11", flow: 1800, peak: false },
  { hour: "12", flow: 2400, peak: false },
  { hour: "13", flow: 2200, peak: false },
  { hour: "14", flow: 1900, peak: false },
  { hour: "15", flow: 2100, peak: false },
  { hour: "16", flow: 2800, peak: false },
  { hour: "17", flow: 4200, peak: true },
  { hour: "18", flow: 4600, peak: true },
  { hour: "19", flow: 3800, peak: true },
  { hour: "20", flow: 2600, peak: false },
  { hour: "21", flow: 1800, peak: false },
  { hour: "22", flow: 1200, peak: false },
]

const topODPairs = [
  { origin: "강남역", destination: "여의도", volume: 2340, distance: "8.2km", time: "25분" },
  { origin: "잠실", destination: "강남", volume: 1890, distance: "12.1km", time: "32분" },
  { origin: "홍대", destination: "강남", volume: 1650, distance: "15.3km", time: "38분" },
  { origin: "신촌", destination: "여의도", volume: 1420, distance: "9.7km", time: "28분" },
  { origin: "건대", destination: "강남", volume: 1280, distance: "18.5km", time: "42분" },
]

export function ODFlowVisualization() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("daily")
  const [selectedDirection, setSelectedDirection] = useState("both")

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">일별</SelectItem>
              <SelectItem value="hourly">시간별</SelectItem>
              <SelectItem value="weekly">주별</SelectItem>
              <SelectItem value="monthly">월별</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <ArrowRight className="h-4 w-4 text-gray-500" />
          <Select value={selectedDirection} onValueChange={setSelectedDirection}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="both">양방향</SelectItem>
              <SelectItem value="inbound">유입</SelectItem>
              <SelectItem value="outbound">유출</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="map" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="map">흐름 지도</TabsTrigger>
          <TabsTrigger value="chart">시간별 분석</TabsTrigger>
          <TabsTrigger value="ranking">주요 O/D</TabsTrigger>
        </TabsList>

        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>O/D 통행 흐름 지도</CardTitle>
              <CardDescription>주요 출발지-목적지 간 통행량을 시각화한 흐름 지도</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center relative">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">O/D 흐름 지도</h3>
                  <p className="text-gray-600 mb-4">MST-GCN 기반 통행 패턴 시각화</p>
                  <Button variant="outline">지도 데이터 로드</Button>
                </div>

                {/* Flow Legend */}
                <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border">
                  <h4 className="font-medium mb-3">통행량 범례</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-red-500"></div>
                      <span className="text-sm">높음 (2000+)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-yellow-500"></div>
                      <span className="text-sm">중간 (1000-2000)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-green-500"></div>
                      <span className="text-sm">낮음 (0-1000)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chart">
          <Card>
            <CardHeader>
              <CardTitle>시간대별 통행량 분석</CardTitle>
              <CardDescription>24시간 통행량 변화 패턴 및 첨두시간 식별</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="flow"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  오전 첨두: 07-09시
                </Badge>
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  오후 첨두: 17-19시
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  일평균: 2,450건/시간
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ranking">
          <Card>
            <CardHeader>
              <CardTitle>주요 O/D 쌍 순위</CardTitle>
              <CardDescription>통행량 기준 상위 출발지-목적지 쌍 분석</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topODPairs.map((pair, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{pair.origin}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{pair.destination}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{pair.volume.toLocaleString()}건/일</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{pair.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{pair.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
