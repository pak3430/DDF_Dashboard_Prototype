'use client'

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { MapHeatmapComponent } from "@/components/map-heatmap-component"
import { DetailPanelComponent } from "@/components/detail-panel-component"
import { LineChartComponent } from "@/components/line-chart-component"
import { FilterComponent } from "@/components/filter-component"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export default function TrafficDashboardPage() {
  const [selectedStop, setSelectedStop] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    target_date: new Date().toISOString().split('T')[0],
    time_range: '1h',
    intensity_type: 'total'
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />
      
      <div className="md:ml-64">
        <main className="p-6">
          <DashboardHeader
            title="실시간 교통 현황"
            description="서울시 전체의 실시간 교통 현황을 지도와 차트로 확인"
          />

          {/* Filter Section */}
          <FilterComponent 
            filters={filters}
            onFiltersChange={setFilters}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Map Section - 2/3 Width */}
            <div className="lg:col-span-2">
              <Card className="h-[600px]">
                <CardHeader>
                  <CardTitle>서울시 교통 현황 히트맵</CardTitle>
                </CardHeader>
                <CardContent className="h-[540px]">
                  <MapHeatmapComponent
                    filters={filters}
                    onStopSelect={setSelectedStop}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Detail Panel - 1/3 Width */}
            <div className="lg:col-span-1">
              <DetailPanelComponent 
                selectedStopId={selectedStop}
                filters={filters}
              />
            </div>
          </div>

          {/* Chart Section */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>시간대별 교통량 패턴</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChartComponent 
                  selectedStopId={selectedStop}
                  filters={filters}
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}