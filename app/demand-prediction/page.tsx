'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapLeafletHeatmap } from '@/components/map-leaflet-heatmap'
import { Brain, TrendingUp, BarChart3, Map, Clock, AlertTriangle, CheckCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts'

interface DemandPredictionData {
  forecast_data: Array<{
    timestamp: string
    predicted_demand: number
    confidence_interval: [number, number]
    area_breakdown: Array<{
      area_id: string
      area_name: string
      demand_level: number
      recommended_vehicles: number
    }>
  }>
  model_performance: {
    model_accuracy: number
    last_training_date: string
    data_quality_score: number
  }
  drt_recommendations: Array<{
    area_id: string
    recommended_action: 'DRT도입' | '기존서비스유지' | '서비스강화'
    expected_demand_reduction: number
    roi_estimate: number
  }>
}

export default function DemandPredictionPage() {
  const [predictionData, setPredictionData] = useState<DemandPredictionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTimeHorizon, setSelectedTimeHorizon] = useState('24')
  const [selectedArea, setSelectedArea] = useState('all')
  const [modelType, setModelType] = useState('mst_gcn')

  // Mock 데이터 생성 (실제 MST-GCN 모델 연동 전까지 사용)
  const generateMockPredictionData = (): DemandPredictionData => {
    const hours = parseInt(selectedTimeHorizon)
    const forecast_data = Array.from({ length: hours }, (_, i) => {
      const timestamp = new Date(Date.now() + i * 60 * 60 * 1000).toISOString()
      const baseDemand = 50 + Math.sin(i / 4) * 30 + Math.random() * 20
      
      return {
        timestamp,
        predicted_demand: Math.floor(baseDemand),
        confidence_interval: [
          Math.floor(baseDemand - 10), 
          Math.floor(baseDemand + 10)
        ] as [number, number],
        area_breakdown: [
          {
            area_id: 'gangnam',
            area_name: '강남구',
            demand_level: Math.floor(baseDemand * 1.5),
            recommended_vehicles: Math.floor(baseDemand / 8)
          },
          {
            area_id: 'mapo',
            area_name: '마포구', 
            demand_level: Math.floor(baseDemand * 1.2),
            recommended_vehicles: Math.floor(baseDemand / 10)
          },
          {
            area_id: 'songpa',
            area_name: '송파구',
            demand_level: Math.floor(baseDemand * 0.8),
            recommended_vehicles: Math.floor(baseDemand / 12)
          }
        ]
      }
    })

    return {
      forecast_data,
      model_performance: {
        model_accuracy: 85.2 + Math.random() * 5,
        last_training_date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        data_quality_score: 92.1 + Math.random() * 3
      },
      drt_recommendations: [
        {
          area_id: 'gangnam',
          recommended_action: 'DRT도입',
          expected_demand_reduction: 25.3,
          roi_estimate: 1.8
        },
        {
          area_id: 'mapo', 
          recommended_action: '서비스강화',
          expected_demand_reduction: 15.7,
          roi_estimate: 2.1
        },
        {
          area_id: 'songpa',
          recommended_action: '기존서비스유지',
          expected_demand_reduction: 8.2,
          roi_estimate: 0.9
        }
      ]
    }
  }

  // 데이터 fetch 함수
  const fetchPredictionData = async () => {
    setIsLoading(true)
    try {
      // TODO: 실제 MST-GCN API 연동
      // const response = await fetch('/api/v1/dashboard/prediction/demand-forecast', {
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     forecast_type: 'hourly',
      //     target_area: selectedArea,
      //     time_horizon: parseInt(selectedTimeHorizon),
      //     model_type: modelType
      //   })
      // })
      
      // Mock 데이터 사용 (개발 중)
      await new Promise(resolve => setTimeout(resolve, 1500)) // 로딩 시뮬레이션
      const mockData = generateMockPredictionData()
      setPredictionData(mockData)
    } catch (error) {
      console.error('수요 예측 데이터 로드 실패:', error)
      const fallbackData = generateMockPredictionData()
      setPredictionData(fallbackData)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPredictionData()
  }, [selectedTimeHorizon, selectedArea, modelType])

  // 차트 데이터 변환
  const chartData = predictionData?.forecast_data.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    예측수요: item.predicted_demand,
    신뢰구간하한: item.confidence_interval[0],
    신뢰구간상한: item.confidence_interval[1],
    timestamp: item.timestamp
  })) || []

  // 지역별 수요 데이터
  const areaData = predictionData?.forecast_data[0]?.area_breakdown.map(area => ({
    지역: area.area_name,
    수요량: area.demand_level,
    권장차량: area.recommended_vehicles
  })) || []

  // 액션별 색상 매핑
  const getActionColor = (action: string) => {
    switch (action) {
      case 'DRT도입': return 'bg-blue-500 text-white'
      case '서비스강화': return 'bg-orange-500 text-white'
      case '기존서비스유지': return 'bg-gray-500 text-white'
      default: return 'bg-gray-300'
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Brain className="w-8 h-8 text-blue-600" />
            AI 수요 예측
          </h1>
          <p className="text-gray-600 mt-2">MST-GCN 모델 기반 교통 수요 예측 및 DRT 도입 권고</p>
        </div>
        
        {/* 모델 성능 지표 */}
        {predictionData && (
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {predictionData.model_performance.model_accuracy.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500">모델 정확도</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {predictionData.model_performance.data_quality_score.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500">데이터 품질</div>
            </div>
          </div>
        )}
      </div>

      {/* 설정 패널 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            예측 설정
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">예측 시간</label>
              <Select value={selectedTimeHorizon} onValueChange={setSelectedTimeHorizon}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12시간</SelectItem>
                  <SelectItem value="24">24시간</SelectItem>
                  <SelectItem value="48">48시간</SelectItem>
                  <SelectItem value="168">7일</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">대상 지역</label>
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">서울시 전체</SelectItem>
                  <SelectItem value="gangnam">강남구</SelectItem>
                  <SelectItem value="mapo">마포구</SelectItem>
                  <SelectItem value="songpa">송파구</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">예측 모델</label>
              <Select value={modelType} onValueChange={setModelType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mst_gcn">MST-GCN</SelectItem>
                  <SelectItem value="baseline">Baseline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={fetchPredictionData} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? '예측 중...' : '예측 실행'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="forecast" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forecast">수요 예측</TabsTrigger>
          <TabsTrigger value="recommendations">DRT 권고</TabsTrigger>
          <TabsTrigger value="heatmap">예측 히트맵</TabsTrigger>
        </TabsList>

        {/* 수요 예측 탭 */}
        <TabsContent value="forecast" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 시계열 예측 차트 */}
            <Card>
              <CardHeader>
                <CardTitle>시간별 수요 예측</CardTitle>
                <CardDescription>
                  신뢰구간과 함께 표시되는 예측 수요량
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <Brain className="w-8 h-8 animate-pulse mx-auto mb-2 text-blue-600" />
                      <p>AI 모델 예측 중...</p>
                    </div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="신뢰구간상한" 
                        stackId="1"
                        stroke="#ddd" 
                        fill="#f0f0f0" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="신뢰구간하한" 
                        stackId="1"
                        stroke="#ddd" 
                        fill="#ffffff" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="예측수요" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* 지역별 수요 분포 */}
            <Card>
              <CardHeader>
                <CardTitle>지역별 수요 분포</CardTitle>
                <CardDescription>
                  현재 시점 기준 지역별 예측 수요량
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={areaData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="지역" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="수요량" fill="#3b82f6" name="예측 수요량" />
                    <Bar yAxisId="right" dataKey="권장차량" fill="#10b981" name="권장 차량 수" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* 모델 성능 정보 */}
          {predictionData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  모델 성능 현황
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {predictionData.model_performance.model_accuracy.toFixed(1)}%
                    </div>
                    <div className="text-sm text-green-700">예측 정확도</div>
                    <div className="text-xs text-green-600 mt-1">MST-GCN 모델</div>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {predictionData.model_performance.data_quality_score.toFixed(1)}%
                    </div>
                    <div className="text-sm text-blue-700">데이터 품질</div>
                    <div className="text-xs text-blue-600 mt-1">99.1% 완성도</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-gray-600 mb-2">
                      {Math.floor((Date.now() - new Date(predictionData.model_performance.last_training_date).getTime()) / (24 * 60 * 60 * 1000))}일
                    </div>
                    <div className="text-sm text-gray-700">마지막 학습</div>
                    <div className="text-xs text-gray-600 mt-1">실시간 업데이트</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* DRT 권고 탭 */}
        <TabsContent value="recommendations" className="space-y-6">
          {predictionData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {predictionData.drt_recommendations.map((rec, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{rec.area_id}</span>
                      <Badge className={getActionColor(rec.recommended_action)}>
                        {rec.recommended_action}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">수요 감소 예상:</span>
                        <span className="font-medium">{rec.expected_demand_reduction.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">ROI 추정:</span>
                        <span className={`font-medium ${rec.roi_estimate > 1 ? 'text-green-600' : 'text-red-600'}`}>
                          {rec.roi_estimate.toFixed(1)}x
                        </span>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="text-sm text-gray-700">
                          {rec.recommended_action === 'DRT도입' && '신규 DRT 서비스 도입을 권장합니다.'}
                          {rec.recommended_action === '서비스강화' && '기존 서비스의 배차간격 단축을 권장합니다.'}
                          {rec.recommended_action === '기존서비스유지' && '현재 서비스 수준을 유지하는 것이 적절합니다.'}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* 예측 히트맵 탭 */}
        <TabsContent value="heatmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5" />
                수요 예측 히트맵
              </CardTitle>
              <CardDescription>
                AI 모델이 예측한 시간대별 교통 수요 분포
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96">
                <MapLeafletHeatmap
                  filters={{
                    target_date: new Date().toISOString().split('T')[0],
                    time_range: '1h',
                    intensity_type: 'prediction',
                    include_poi: true
                  }}
                  className="w-full h-full"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}