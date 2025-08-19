'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Filter, RefreshCw } from 'lucide-react'
import { useState } from 'react'

interface FilterComponentProps {
  filters: {
    target_date: string
    time_range: string
    intensity_type: string
  }
  onFiltersChange: (filters: any) => void
}

export function FilterComponent({ filters, onFiltersChange }: FilterComponentProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const timeRangeOptions = [
    { value: '1h', label: '최근 1시간', description: '실시간' },
    { value: '3h', label: '최근 3시간', description: '단기 패턴' },
    { value: '6h', label: '최근 6시간', description: '중기 패턴' },
    { value: '12h', label: '최근 12시간', description: '반일 패턴' },
    { value: '24h', label: '최근 24시간', description: '일일 패턴' }
  ]

  const intensityTypeOptions = [
    { value: 'total', label: '총 이용객', description: '승차 + 하차' },
    { value: 'boarding', label: '승차 인원', description: '승차만' },
    { value: 'alighting', label: '하차 인원', description: '하차만' },
    { value: 'congestion', label: '혼잡도', description: '혼잡 점수' }
  ]

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    onFiltersChange(newFilters)
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // 실제 환경에서는 부모 컴포넌트에서 데이터 새로고침 처리
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const handleResetFilters = () => {
    const defaultFilters = {
      target_date: new Date().toISOString().split('T')[0],
      time_range: '1h',
      intensity_type: 'total'
    }
    onFiltersChange(defaultFilters)
  }

  // 현재 선택된 옵션의 description 가져오기
  const getCurrentTimeRangeDesc = () => {
    return timeRangeOptions.find(option => option.value === filters.time_range)?.description || ''
  }

  const getCurrentIntensityDesc = () => {
    return intensityTypeOptions.find(option => option.value === filters.intensity_type)?.description || ''
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <CardTitle className="text-lg">필터 설정</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              실시간 연동
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-8"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              새로고침
            </Button>
          </div>
        </div>
        <CardDescription>
          데이터 표시 옵션을 설정하고 실시간으로 업데이트합니다
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* 날짜 선택 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-600" />
              <label className="text-sm font-medium">기준 날짜</label>
            </div>
            <input
              type="date"
              value={filters.target_date}
              onChange={(e) => handleFilterChange('target_date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              max={new Date().toISOString().split('T')[0]}
            />
            <p className="text-xs text-gray-500">분석 기준일</p>
          </div>

          {/* 시간 범위 선택 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-600" />
              <label className="text-sm font-medium">시간 범위</label>
            </div>
            <Select 
              value={filters.time_range} 
              onValueChange={(value) => handleFilterChange('time_range', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeRangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">{getCurrentTimeRangeDesc()}</p>
          </div>

          {/* 데이터 유형 선택 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <label className="text-sm font-medium">표시 데이터</label>
            </div>
            <Select 
              value={filters.intensity_type} 
              onValueChange={(value) => handleFilterChange('intensity_type', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {intensityTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">{getCurrentIntensityDesc()}</p>
          </div>

          {/* 액션 버튼 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-transparent">액션</label>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                onClick={handleResetFilters}
                className="w-full text-sm"
                size="sm"
              >
                기본값 복원
              </Button>
              <div className="text-xs text-gray-500 text-center">
                {filters.time_range === '1h' ? '실시간 모드' : '히스토리 모드'}
              </div>
            </div>
          </div>
        </div>

        {/* 현재 설정 요약 */}
        <div className="mt-4 pt-4 border-t bg-gray-50 rounded-lg p-3">
          <h4 className="text-sm font-medium mb-2">현재 설정 요약</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-gray-600">기준일:</span>
              <span className="ml-1 font-medium">
                {new Date(filters.target_date).toLocaleDateString('ko-KR')}
              </span>
            </div>
            <div>
              <span className="text-gray-600">범위:</span>
              <span className="ml-1 font-medium">
                {timeRangeOptions.find(opt => opt.value === filters.time_range)?.label}
              </span>
            </div>
            <div>
              <span className="text-gray-600">데이터:</span>
              <span className="ml-1 font-medium">
                {intensityTypeOptions.find(opt => opt.value === filters.intensity_type)?.label}
              </span>
            </div>
          </div>
        </div>

        {/* 자동 업데이트 안내 */}
        {filters.time_range === '1h' && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-800">
                실시간 모드: 30초마다 자동 업데이트
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}