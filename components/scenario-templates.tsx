"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Target, GitCompare, Copy, Edit } from "lucide-react"

interface ScenarioTemplatesProps {
  scenarios: any[]
  selectedScenarios: string[]
}

export function ScenarioTemplates({ scenarios, selectedScenarios }: ScenarioTemplatesProps) {
  const handleCopyScenario = (scenarioId: string) => {
    console.log("Copying scenario:", scenarioId)
  }

  const handleEditScenario = (scenarioId: string) => {
    console.log("Editing scenario:", scenarioId)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scenarios.map((scenario) => {
          const isSelected = selectedScenarios.includes(scenario.id)
          const IconComponent = scenario.icon

          return (
            <Card
              key={scenario.id}
              className={isSelected ? `border-${scenario.color}-500 bg-${scenario.color}-50` : ""}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <IconComponent className={`h-6 w-6 text-${scenario.color}-600`} />
                  {scenario.name}
                  {isSelected && <Badge variant="default">선택됨</Badge>}
                </CardTitle>
                <CardDescription>{scenario.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Key Characteristics */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-gray-700">피크 시간</div>
                      <div className="text-gray-600">{scenario.characteristics.peakHours}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">주요 이용자</div>
                      <div className="text-gray-600">{scenario.characteristics.targetUsers}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">서비스 패턴</div>
                      <div className="text-gray-600">{scenario.characteristics.servicePattern}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">일 평균 이용객</div>
                      <div className="text-gray-600">{scenario.metrics.dailyPassengers.toLocaleString()}명</div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>효율성</span>
                        <span>{scenario.characteristics.efficiency}%</span>
                      </div>
                      <Progress value={scenario.characteristics.efficiency} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>서비스 커버리지</span>
                        <span>{scenario.characteristics.coverage}%</span>
                      </div>
                      <Progress value={scenario.characteristics.coverage} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>만족도</span>
                        <span>{scenario.characteristics.satisfaction}/5.0</span>
                      </div>
                      <Progress value={(scenario.characteristics.satisfaction / 5) * 100} className="h-2" />
                    </div>
                  </div>

                  {/* Detailed Metrics */}
                  <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-3 rounded-lg">
                    <div>
                      <div className="font-medium">피크 활용률</div>
                      <div className="text-gray-600">{scenario.metrics.peakUtilization}%</div>
                    </div>
                    <div>
                      <div className="font-medium">비피크 활용률</div>
                      <div className="text-gray-600">{scenario.metrics.offPeakUtilization}%</div>
                    </div>
                    <div>
                      <div className="font-medium">평균 이동거리</div>
                      <div className="text-gray-600">{scenario.metrics.averageDistance}km</div>
                    </div>
                    <div>
                      <div className="font-medium">평균 대기시간</div>
                      <div className="text-gray-600">{scenario.metrics.averageWaitTime}분</div>
                    </div>
                  </div>

                  {/* Cost Information */}
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-blue-900">월 운영비용</div>
                        <div className="text-sm text-blue-700">차량 10대 기준</div>
                      </div>
                      <div className="text-xl font-bold text-blue-600">
                        {scenario.characteristics.cost.toLocaleString()}만원
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyScenario(scenario.id)}
                      className="flex-1"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      복사
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditScenario(scenario.id)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      편집
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Template Usage Guide */}
      <Card>
        <CardHeader>
          <CardTitle>시나리오 활용 가이드</CardTitle>
          <CardDescription>각 시나리오 패턴의 적용 상황과 기대 효과</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">권장 적용 상황</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <div className="font-medium">출퇴근형</div>
                    <div className="text-gray-600">신도시, 업무지구, 대학가 등 통근/통학 수요가 집중된 지역</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium">관광형</div>
                    <div className="text-gray-600">관광지, 상업지구, 문화시설이 밀집된 여가 활동 중심 지역</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="h-4 w-4 text-purple-500 mt-0.5" />
                  <div>
                    <div className="font-medium">교통약자형</div>
                    <div className="text-gray-600">고령화 지역, 의료시설 인근, 대중교통 접근성이 낮은 지역</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GitCompare className="h-4 w-4 text-orange-500 mt-0.5" />
                  <div>
                    <div className="font-medium">혼합형</div>
                    <div className="text-gray-600">다양한 수요가 혼재하는 복합 지역, 대규모 서비스 구역</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">구현 시 고려사항</h4>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="font-medium text-yellow-900">출퇴근형</div>
                  <div className="text-yellow-700">피크 시간 집중 배차, 비피크 시간 효율성 확보 방안 필요</div>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-medium text-green-900">관광형</div>
                  <div className="text-green-700">계절별/날씨별 수요 변동성 고려, 관광지 연계 노선 설계</div>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="font-medium text-purple-900">교통약자형</div>
                  <div className="text-purple-700">접근성 우선, 저상버스 도입, 의료기관 연계 서비스</div>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="font-medium text-orange-900">혼합형</div>
                  <div className="text-orange-700">동적 배차 시스템, 실시간 수요 대응, 복합 KPI 관리</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
