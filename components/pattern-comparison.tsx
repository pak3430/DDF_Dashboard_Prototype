"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface PatternComparisonProps {
  station: string
}

const weekdayData = [
  { day: "월", commute: 85, tourism: 15, elderly: 25, shopping: 35 },
  { day: "화", commute: 82, tourism: 18, elderly: 28, shopping: 32 },
  { day: "수", commute: 88, tourism: 12, elderly: 22, shopping: 38 },
  { day: "목", commute: 90, tourism: 14, elderly: 26, shopping: 41 },
  { day: "금", commute: 95, tourism: 22, elderly: 20, shopping: 55 },
  { day: "토", commute: 35, tourism: 75, elderly: 45, shopping: 85 },
  { day: "일", commute: 25, tourism: 68, elderly: 52, shopping: 72 },
]

export function PatternComparison({ station }: PatternComparisonProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>요일별 수요 패턴</CardTitle>
          <CardDescription>이용 목적별 수요 분석</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekdayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="commute" stackId="a" fill="#3b82f6" name="출퇴근" />
                <Bar dataKey="tourism" stackId="a" fill="#10b981" name="관광" />
                <Bar dataKey="elderly" stackId="a" fill="#f59e0b" name="교통약자" />
                <Bar dataKey="shopping" stackId="a" fill="#ef4444" name="쇼핑" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>계절별 변화 추이</CardTitle>
          <CardDescription>월별 수요 변화 패턴</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div>
                <div className="font-medium">봄철 (3-5월)</div>
                <div className="text-sm text-gray-600">관광 수요 증가, 날씨 영향 적음</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">+15%</div>
                <div className="text-xs text-blue-600">평균 대비</div>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <div>
                <div className="font-medium">여름철 (6-8월)</div>
                <div className="text-sm text-gray-600">폭염, 휴가철 영향으로 변동성 큼</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-red-600">-8%</div>
                <div className="text-xs text-red-600">평균 대비</div>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <div>
                <div className="font-medium">가을철 (9-11월)</div>
                <div className="text-sm text-gray-600">관광 성수기, 안정적 수요</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-orange-600">+22%</div>
                <div className="text-xs text-orange-600">평균 대비</div>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">겨울철 (12-2월)</div>
                <div className="text-sm text-gray-600">한파 영향, 실내 활동 선호</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-600">-5%</div>
                <div className="text-xs text-gray-600">평균 대비</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
