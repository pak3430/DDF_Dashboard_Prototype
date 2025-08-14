"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Badge } from "@/components/ui/badge"

interface PredictionAccuracyProps {
  station: string
}

const accuracyData = [
  { date: "1/1", accuracy: 92.1, mae: 3.2, rmse: 4.1 },
  { date: "1/2", accuracy: 94.3, mae: 2.8, rmse: 3.6 },
  { date: "1/3", accuracy: 91.8, mae: 3.5, rmse: 4.3 },
  { date: "1/4", accuracy: 95.2, mae: 2.4, rmse: 3.1 },
  { date: "1/5", accuracy: 93.7, mae: 2.9, rmse: 3.8 },
  { date: "1/6", accuracy: 96.1, mae: 2.1, rmse: 2.9 },
  { date: "1/7", accuracy: 94.8, mae: 2.6, rmse: 3.4 },
]

export function PredictionAccuracy({ station }: PredictionAccuracyProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>예측 정확도 추이</CardTitle>
            <CardDescription>지난 7일간 MST-GCN 모델 성능 지표</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={accuracyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={2} name="정확도 (%)" />
                  <Line type="monotone" dataKey="mae" stroke="#ef4444" strokeWidth={2} name="평균 절대 오차" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>모델 성능 지표</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">평균 정확도</span>
              <Badge variant="default">94.2%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">평균 절대 오차</span>
              <Badge variant="secondary">2.8명</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">제곱근 평균 오차</span>
              <Badge variant="secondary">3.6명</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">신뢰 구간</span>
              <Badge variant="outline">95%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>모델 상태</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">학습 데이터</span>
              <Badge variant="default">최신</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">모델 버전</span>
              <Badge variant="outline">v2.1.3</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">마지막 업데이트</span>
              <span className="text-xs text-gray-600">2시간 전</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">다음 재학습</span>
              <span className="text-xs text-gray-600">내일 02:00</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
