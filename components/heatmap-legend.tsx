import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function HeatmapLegend() {
  const legendItems = [
    {
      color: "bg-red-500",
      label: "고위험 지역",
      description: "높은 수요 + 서비스 부족",
      count: 8,
    },
    {
      color: "bg-yellow-500",
      label: "중위험 지역",
      description: "보통 수요 + 부분적 서비스",
      count: 15,
    },
    {
      color: "bg-green-500",
      label: "안정 지역",
      description: "적정 수요 + 충분한 서비스",
      count: 23,
    },
    {
      color: "bg-blue-500",
      label: "저수요 지역",
      description: "낮은 수요",
      count: 12,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>범례</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {legendItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${item.color}`} />
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </div>
              <Badge variant="outline">{item.count}</Badge>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="text-sm font-medium mb-2">데이터 기준</div>
          <div className="text-xs text-gray-600 space-y-1">
            <p>• MST-GCN 모델 기반 수요 예측</p>
            <p>• 실시간 차량 위치 및 운행 데이터</p>
            <p>• 최근 30일 평균 서비스 커버리지</p>
            <p>• 마지막 업데이트: 2분 전</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
