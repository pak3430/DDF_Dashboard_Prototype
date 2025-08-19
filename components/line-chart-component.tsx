'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Loader2, TrendingUp, Users, Clock } from 'lucide-react'

interface HeatmapFilters {
  target_date: string
  time_range: string
  intensity_type: string
}

interface HourlyPatternData {
  area_name: string
  chart_data: {
    labels: string[]
    datasets: Array<{
      label: string
      data: number[]
      borderColor: string
      backgroundColor?: string
      fill?: boolean
    }>
  }
  insights: {
    peak_hours: string[]
    off_peak_hours: string[]
    daily_total: {
      boarding: number
      alighting: number
    }
    peak_vs_offpeak_ratio: number
  }
}

interface LineChartComponentProps {
  selectedStopId: string | null
  filters: HeatmapFilters
}

// Chart.js 데이터를 Recharts 형식으로 변환
const transformChartData = (chartData: HourlyPatternData['chart_data']) => {
  return chartData.labels.map((hour, index) => ({
    hour,
    승차: chartData.datasets.find(d => d.label === '승차인원')?.data[index] || 0,
    하차: chartData.datasets.find(d => d.label === '하차인원')?.data[index] || 0,
  }))
}

export function LineChartComponent({ selectedStopId, filters }: LineChartComponentProps) {
  const [patternData, setPatternData] = useState<HourlyPatternData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // API 호출 함수
  const fetchHourlyPattern = async (stopId: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // TODO: 실제 API 엔드포인트로 변경
      const response = await fetch(`/api/v1/dashboard/analytics/hourly-patterns?area_type=stop&area_id=${stopId}&target_date=${filters.target_date}`)
      
      if (!response.ok) {
        throw new Error('시간대별 패턴 데이터를 불러오는데 실패했습니다')
      }
      
      const data = await response.json()
      setPatternData(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다')
      // 개발용 mock 데이터
      setPatternData(generateMockPatternData(stopId))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (selectedStopId) {
      fetchHourlyPattern(selectedStopId)
    } else {
      // 전체 서울시 평균 데이터 표시
      setPatternData(generateMockPatternData('seoul-average'))
    }
  }, [selectedStopId, filters])

  // Mock 데이터 생성 함수 (개발용)
  const generateMockPatternData = (areaId: string): HourlyPatternData => {
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
    
    // 실제적인 교통 패턴 시뮬레이션
    const generateRealisticData = () => {
      return hours.map((_, hour) => {
        let baseValue = 10
        
        // 출근시간 (7-9시) 피크
        if (hour >= 7 && hour <= 9) {
          baseValue += Math.random() * 40 + 30
        }
        // 퇴근시간 (17-19시) 피크  
        else if (hour >= 17 && hour <= 19) {
          baseValue += Math.random() * 35 + 25
        }
        // 점심시간 (12-13시) 소폭 증가
        else if (hour >= 12 && hour <= 13) {
          baseValue += Math.random() * 15 + 10
        }
        // 야간시간 (22-05시) 최소
        else if (hour >= 22 || hour <= 5) {
          baseValue = Math.random() * 5 + 2
        }
        // 평상시간
        else {
          baseValue += Math.random() * 20 + 5
        }
        
        return Math.floor(baseValue)
      })
    }

    const boardingData = generateRealisticData()
    const alightingData = generateRealisticData()

    const totalBoarding = boardingData.reduce((sum, val) => sum + val, 0)
    const totalAlighting = alightingData.reduce((sum, val) => sum + val, 0)

    return {
      area_name: areaId === 'seoul-average' ? '서울시 전체 평균' : `정류장 ${areaId}`,
      chart_data: {
        labels: hours,
        datasets: [
          {
            label: '승차인원',
            data: boardingData,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true
          },
          {
            label: '하차인원',
            data: alightingData,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            fill: true
          }
        ]
      },
      insights: {
        peak_hours: ['08', '18'],
        off_peak_hours: ['02', '03', '04'],
        daily_total: {
          boarding: totalBoarding,
          alighting: totalAlighting
        },
        peak_vs_offpeak_ratio: 2.5
      }
    }
  }

  const getPeakHourBadgeColor = (hour: string) => {
    if (patternData?.insights.peak_hours.includes(hour)) {
      return 'bg-red-100 text-red-800'
    }
    if (patternData?.insights.off_peak_hours.includes(hour)) {
      return 'bg-blue-100 text-blue-800'
    }
    return 'bg-gray-100 text-gray-800'
  }

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">시간대별 패턴 로딩중...</p>
        </div>
      </div>
    )
  }

  if (error || !patternData) {
    return (
      <div className="h-64 flex items-center justify-center text-center">
        <div>
          <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">데이터 없음</h3>
          <p className="text-gray-500 text-sm">{error || '시간대별 패턴 데이터를 불러올 수 없습니다'}</p>
        </div>
      </div>
    )
  }

  const chartData = transformChartData(patternData.chart_data)

  return (
    <div className="space-y-4">
      {/* 제목과 통계 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{patternData.area_name}</h3>
          <p className="text-sm text-gray-600">24시간 승하차 패턴 분석</p>
        </div>
        
        <div className="flex gap-2">
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <Users className="h-4 w-4 text-blue-600 mx-auto mb-1" />
            <div className="text-sm font-semibold text-blue-900">
              {patternData.insights.daily_total.boarding.toLocaleString()}
            </div>
            <div className="text-xs text-blue-700">일일 승차</div>
          </div>
          <div className="text-center p-2 bg-red-50 rounded-lg">
            <Users className="h-4 w-4 text-red-600 mx-auto mb-1" />
            <div className="text-sm font-semibold text-red-900">
              {patternData.insights.daily_total.alighting.toLocaleString()}
            </div>
            <div className="text-xs text-red-700">일일 하차</div>
          </div>
        </div>
      </div>

      {/* 차트 */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="hour" 
              fontSize={12}
              tickFormatter={(hour) => `${hour}시`}
            />
            <YAxis fontSize={12} />
            <Tooltip 
              formatter={(value, name) => [value, name]}
              labelFormatter={(hour) => `${hour}시`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="승차" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="하차" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 인사이트 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium">피크 시간</span>
          </div>
          <div className="flex gap-1 flex-wrap">
            {patternData.insights.peak_hours.map((hour) => (
              <Badge key={hour} className="bg-red-100 text-red-800 text-xs">
                {hour}시
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">오프피크 시간</span>
          </div>
          <div className="flex gap-1 flex-wrap">
            {patternData.insights.off_peak_hours.map((hour) => (
              <Badge key={hour} className="bg-blue-100 text-blue-800 text-xs">
                {hour}시
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">피크 배율</span>
          </div>
          <div className="text-lg font-semibold text-green-700">
            {patternData.insights.peak_vs_offpeak_ratio}x
          </div>
          <div className="text-xs text-gray-600">오프피크 대비</div>
        </div>
      </div>
    </div>
  )
}