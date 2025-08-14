"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Save, RotateCcw } from "lucide-react"

interface HybridScenarioBuilderProps {
  scenarios: any[]
}

export function HybridScenarioBuilder({ scenarios }: HybridScenarioBuilderProps) {
  const [hybridName, setHybridName] = useState("커스텀 혼합 시나리오")
  const [weights, setWeights] = useState<{ [key: string]: number }>({
    commute: 40,
    tourism: 30,
    elderly: 20,
    mixed: 10,
  })

  const [customParams, setCustomParams] = useState({
    vehicles: 12,
    operatingHours: 16,
    peakBoost: 1.2,
    offPeakReduction: 0.7,
  })

  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0)

  const calculateHybridMetrics = () => {
    let totalEfficiency = 0
    let totalCost = 0
    let totalSatisfaction = 0
    let totalCoverage = 0
    let totalPassengers = 0

    scenarios.forEach((scenario) => {
      const weight = weights[scenario.id] / 100
      totalEfficiency += scenario.characteristics.efficiency * weight
      totalCost += scenario.characteristics.cost * weight
      totalSatisfaction += scenario.characteristics.satisfaction * weight
      totalCoverage += scenario.characteristics.coverage * weight
      totalPassengers += scenario.metrics.dailyPassengers * weight
    })

    return {
      efficiency: Math.round(totalEfficiency),
      cost: Math.round(totalCost),
      satisfaction: Math.round(totalSatisfaction * 10) / 10,
      coverage: Math.round(totalCoverage),
      dailyPassengers: Math.round(totalPassengers),
    }
  }

  const hybridMetrics = calculateHybridMetrics()

  const handleWeightChange = (scenarioId: string, value: number[]) => {
    setWeights((prev) => ({ ...prev, [scenarioId]: value[0] }))
  }

  const handleReset = () => {
    setWeights({ commute: 25, tourism: 25, elderly: 25, mixed: 25 })
    setCustomParams({
      vehicles: 12,
      operatingHours: 16,
      peakBoost: 1.2,
      offPeakReduction: 0.7,
    })
  }

  const handleSave = () => {
    console.log("Saving hybrid scenario:", { hybridName, weights, customParams, hybridMetrics })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            혼합 시나리오 생성기
          </CardTitle>
          <CardDescription>여러 시나리오 패턴을 조합하여 최적의 운영 방안을 설계하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weight Configuration */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="scenarioName">시나리오 이름</Label>
                <Input
                  id="scenarioName"
                  value={hybridName}
                  onChange={(e) => setHybridName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">패턴 가중치 설정</h4>
                  <Badge variant={totalWeight === 100 ? "default" : "destructive"}>총합: {totalWeight}%</Badge>
                </div>

                <div className="space-y-4">
                  {scenarios.map((scenario) => (
                    <div key={scenario.id}>
                      <div className="flex justify-between items-center mb-2">
                        <Label className="flex items-center gap-2">
                          <scenario.icon className={`h-4 w-4 text-${scenario.color}-600`} />
                          {scenario.name}
                        </Label>
                        <span className="text-sm font-medium">{weights[scenario.id]}%</span>
                      </div>
                      <Slider
                        value={[weights[scenario.id]]}
                        onValueChange={(value) => handleWeightChange(scenario.id, value)}
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">운영 파라미터</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vehicles">차량 대수</Label>
                    <Input
                      id="vehicles"
                      type="number"
                      value={customParams.vehicles}
                      onChange={(e) => setCustomParams((prev) => ({ ...prev, vehicles: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hours">운영 시간</Label>
                    <Input
                      id="hours"
                      type="number"
                      value={customParams.operatingHours}
                      onChange={(e) => setCustomParams((prev) => ({ ...prev, operatingHours: Number(e.target.value) }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>피크 시간 증폭: {customParams.peakBoost}x</Label>
                    <Slider
                      value={[customParams.peakBoost]}
                      onValueChange={(value) => setCustomParams((prev) => ({ ...prev, peakBoost: value[0] }))}
                      max={2}
                      min={1}
                      step={0.1}
                      className="w-full mt-2"
                    />
                  </div>
                  <div>
                    <Label>비피크 감소: {customParams.offPeakReduction}x</Label>
                    <Slider
                      value={[customParams.offPeakReduction]}
                      onValueChange={(value) => setCustomParams((prev) => ({ ...prev, offPeakReduction: value[0] }))}
                      max={1}
                      min={0.3}
                      step={0.1}
                      className="w-full mt-2"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  초기화
                </Button>
                <Button onClick={handleSave} className="flex-1" disabled={totalWeight !== 100}>
                  <Save className="h-4 w-4 mr-2" />
                  저장
                </Button>
              </div>
            </div>

            {/* Preview Results */}
            <div className="space-y-4">
              <h4 className="font-medium">예상 성과</h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{hybridMetrics.efficiency}%</div>
                  <div className="text-sm text-blue-700">효율성</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{hybridMetrics.cost.toLocaleString()}만원</div>
                  <div className="text-sm text-green-700">월 운영비</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{hybridMetrics.satisfaction}/5.0</div>
                  <div className="text-sm text-purple-700">만족도</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{hybridMetrics.coverage}%</div>
                  <div className="text-sm text-orange-700">커버리지</div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-medium mb-2">예상 일 이용객</div>
                <div className="text-2xl font-bold">{hybridMetrics.dailyPassengers.toLocaleString()}명</div>
                <div className="text-sm text-gray-600 mt-1">
                  차량당: {Math.round(hybridMetrics.dailyPassengers / customParams.vehicles)}명
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-medium">패턴 구성</h5>
                {scenarios.map((scenario) => {
                  const weight = weights[scenario.id]
                  if (weight === 0) return null

                  return (
                    <div key={scenario.id} className="flex items-center justify-between p-2 bg-white rounded border">
                      <div className="flex items-center gap-2">
                        <scenario.icon className={`h-4 w-4 text-${scenario.color}-600`} />
                        <span className="text-sm">{scenario.name}</span>
                      </div>
                      <Badge variant="outline">{weight}%</Badge>
                    </div>
                  )
                })}
              </div>

              {totalWeight !== 100 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-sm text-yellow-800">
                    가중치 총합이 100%가 되어야 시나리오를 저장할 수 있습니다.
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Saved Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>저장된 혼합 시나리오</CardTitle>
          <CardDescription>이전에 생성한 커스텀 시나리오 목록</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="font-medium mb-2">균형형 혼합 시나리오</div>
              <div className="text-sm text-gray-600 mb-3">출퇴근 40% + 관광 35% + 교통약자 25%</div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="font-medium">효율성</div>
                  <div>79%</div>
                </div>
                <div>
                  <div className="font-medium">비용</div>
                  <div>3,100만원</div>
                </div>
                <div>
                  <div className="font-medium">만족도</div>
                  <div>4.3/5.0</div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-3 bg-transparent">
                불러오기
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="font-medium mb-2">효율성 중심 시나리오</div>
              <div className="text-sm text-gray-600 mb-3">출퇴근 60% + 혼합 40%</div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="font-medium">효율성</div>
                  <div>85%</div>
                </div>
                <div>
                  <div className="font-medium">비용</div>
                  <div>2,800만원</div>
                </div>
                <div>
                  <div className="font-medium">만족도</div>
                  <div>4.1/5.0</div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-3 bg-transparent">
                불러오기
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
