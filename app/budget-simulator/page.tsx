"use client"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BudgetCalculator } from "@/components/budget-calculator"
import { ROIAnalysis } from "@/components/roi-analysis"
import { ScenarioComparison } from "@/components/scenario-comparison"
import { ReportGenerator } from "@/components/report-generator"
import { Calculator, TrendingUp, FileText, BarChart3, Download, Save } from "lucide-react"

interface SimulationParams {
  vehicles: number
  operatingHours: number
  driverWage: number
  fuelCost: number
  maintenanceCost: number
  operatingDays: number
  serviceArea: number
  targetPassengers: number
}

export default function BudgetSimulatorPage() {
  const [params, setParams] = useState<SimulationParams>({
    vehicles: 10,
    operatingHours: 16,
    driverWage: 250,
    fuelCost: 150,
    maintenanceCost: 80,
    operatingDays: 25,
    serviceArea: 5,
    targetPassengers: 1000,
  })

  const [results, setResults] = useState({
    totalMonthlyCost: 0,
    totalAnnualCost: 0,
    costPerPassenger: 0,
    expectedPassengers: 0,
    roi: 0,
    breakEvenMonths: 0,
  })

  // Calculate results whenever parameters change
  useEffect(() => {
    const calculateResults = () => {
      const monthlyDriverCost = params.vehicles * params.driverWage * params.operatingDays
      const monthlyFuelCost = params.vehicles * params.fuelCost * params.operatingDays
      const monthlyMaintenanceCost = params.vehicles * params.maintenanceCost
      const totalMonthlyCost = monthlyDriverCost + monthlyFuelCost + monthlyMaintenanceCost

      const expectedPassengers = Math.round(
        params.vehicles * params.operatingHours * 3.2 * params.operatingDays * (params.serviceArea / 10),
      )

      const costPerPassenger = expectedPassengers > 0 ? totalMonthlyCost / expectedPassengers : 0
      const monthlyRevenue = expectedPassengers * 2500 // 평균 요금 2,500원
      const roi = totalMonthlyCost > 0 ? ((monthlyRevenue - totalMonthlyCost) / totalMonthlyCost) * 100 : 0
      const breakEvenMonths = roi > 0 ? Math.ceil(totalMonthlyCost / (monthlyRevenue - totalMonthlyCost)) : 0

      setResults({
        totalMonthlyCost,
        totalAnnualCost: totalMonthlyCost * 12,
        costPerPassenger,
        expectedPassengers,
        roi,
        breakEvenMonths,
      })
    }

    calculateResults()
  }, [params])

  const handleParamChange = (key: keyof SimulationParams, value: number) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveScenario = () => {
    console.log("Saving scenario:", params, results)
  }

  const handleExportReport = () => {
    console.log("Exporting budget report...")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="md:ml-64">
        <main className="p-6">
          <DashboardHeader
            title="예산 시뮬레이터"
            description="차량 대수와 운영 조건을 설정하여 예상 비용과 투자 효과를 분석합니다"
          />

          {/* Quick Results Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">월 운영비용</CardTitle>
                <Calculator className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{results.totalMonthlyCost.toLocaleString()}만원</div>
                <p className="text-xs text-gray-600">연간 {results.totalAnnualCost.toLocaleString()}만원</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">예상 이용객</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{results.expectedPassengers.toLocaleString()}명</div>
                <p className="text-xs text-green-600">월 평균</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">승객당 비용</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(results.costPerPassenger).toLocaleString()}원</div>
                <p className="text-xs text-blue-600">1인당 운영비</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">투자 수익률</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(results.roi)}%</div>
                <p className="text-xs text-orange-600">
                  {results.breakEvenMonths > 0 ? `${results.breakEvenMonths}개월 후 손익분기` : "즉시 수익"}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Parameters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  시뮬레이션 설정
                </CardTitle>
                <CardDescription>운영 조건을 설정하여 예산을 계산하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>차량 대수: {params.vehicles}대</Label>
                  <Slider
                    value={[params.vehicles]}
                    onValueChange={(value) => handleParamChange("vehicles", value[0])}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>일일 운영시간: {params.operatingHours}시간</Label>
                  <Slider
                    value={[params.operatingHours]}
                    onValueChange={(value) => handleParamChange("operatingHours", value[0])}
                    max={24}
                    min={8}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>월 운영일수: {params.operatingDays}일</Label>
                  <Slider
                    value={[params.operatingDays]}
                    onValueChange={(value) => handleParamChange("operatingDays", value[0])}
                    max={31}
                    min={20}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="driverWage">기사 일당 (만원)</Label>
                    <Input
                      id="driverWage"
                      type="number"
                      value={params.driverWage}
                      onChange={(e) => handleParamChange("driverWage", Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuelCost">일일 연료비 (만원)</Label>
                    <Input
                      id="fuelCost"
                      type="number"
                      value={params.fuelCost}
                      onChange={(e) => handleParamChange("fuelCost", Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maintenanceCost">월 정비비 (만원)</Label>
                    <Input
                      id="maintenanceCost"
                      type="number"
                      value={params.maintenanceCost}
                      onChange={(e) => handleParamChange("maintenanceCost", Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceArea">서비스 면적 (km²)</Label>
                    <Input
                      id="serviceArea"
                      type="number"
                      value={params.serviceArea}
                      onChange={(e) => handleParamChange("serviceArea", Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSaveScenario} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    시나리오 저장
                  </Button>
                  <Button variant="outline" onClick={handleExportReport} className="flex-1 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    보고서 생성
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results and Analysis */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="calculator" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="calculator">비용 분석</TabsTrigger>
                  <TabsTrigger value="roi">ROI 분석</TabsTrigger>
                  <TabsTrigger value="comparison">시나리오 비교</TabsTrigger>
                  <TabsTrigger value="report">보고서</TabsTrigger>
                </TabsList>

                <TabsContent value="calculator">
                  <BudgetCalculator params={params} results={results} />
                </TabsContent>

                <TabsContent value="roi">
                  <ROIAnalysis params={params} results={results} />
                </TabsContent>

                <TabsContent value="comparison">
                  <ScenarioComparison currentParams={params} currentResults={results} />
                </TabsContent>

                <TabsContent value="report">
                  <ReportGenerator params={params} results={results} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
