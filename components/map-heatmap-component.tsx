'use client'

import { MapLeafletHeatmap } from './map-leaflet-heatmap'

interface HeatmapFilters {
  target_date: string
  time_range: string
  intensity_type: string
}

interface MapHeatmapComponentProps {
  filters: HeatmapFilters
  onStopSelect?: (stopId: string) => void
}

export function MapHeatmapComponent({ filters, onStopSelect }: MapHeatmapComponentProps) {
  // 히트맵 포인트 클릭 핸들러
  const handlePointClick = (point: any) => {
    if (onStopSelect && point.stop_id) {
      onStopSelect(point.stop_id)
    }
  }

  return (
    <MapLeafletHeatmap
      filters={{
        target_date: filters.target_date,
        time_range: filters.time_range,
        intensity_type: filters.intensity_type,
        include_poi: false
      }}
      onPointClick={handlePointClick}
      className="w-full h-full"
    />
  )
}