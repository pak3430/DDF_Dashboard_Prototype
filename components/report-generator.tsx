"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Share, Printer } from "lucide-react"

interface ReportGeneratorProps {
  params: any
  results: any
}

export function ReportGenerator({ params, results }: ReportGeneratorProps) {
  const handleDownloadPDF = () => {
    console.log("Downloading PDF report...")
  }

  const handleDownloadExcel = () => {
    console.log("Downloading Excel report...")
  }

  const handleShare = () => {
    console.log("Sharing report...")
  }

  const handlePrint = () => {
    window.print()
  }

  const reportSections = [
    {
      title: "사업 개요",
      content: [
        `서비스 지역: ${params.serviceArea}km² 권역`,
        `운영 차량: ${params.vehicles}대`,
        `일일 운영시간: ${params.operatingHours}시간`,
        `월 운영일수: ${params.operatingDays}일`,
      ],
    },
    {
      title: "예산 분석",
      content: [
        `월 운영비용: ${results.totalMonthlyCost.toLocaleString()}만원`,
        `연간 운영비용: ${results.totalAnnualCost.toLocaleString()}만원`,
        `승객당 운영비: ${Math.round(results.costPerPassenger).toLocaleString()}원`,
        `차량당 월 비용: ${Math.round(results.totalMonthlyCost / params.vehicles).toLocaleString()}만원`,
      ],
    },
    {
      title: "서비스 효과",
      content: [
        `예상 월 이용객: ${results.expectedPassengers.toLocaleString()}명`,
        `연간 예상 이용객: ${(results.expectedPassengers * 12).toLocaleString()}명`,
        `차량당 일 이용객: ${Math.round(results.expectedPassengers / params.vehicles / params.operatingDays)}명`,
        `시간당 이용객: ${Math.round(results.expectedPassengers / params.vehicles / params.operatingHours)}명`,
      ],
    },
    {
      title: "투자 수익성",
      content: [
        `투자 수익률(ROI): ${Math.round(results.roi)}%`,
        `손익분기점: ${results.breakEvenMonths}개월`,
        `연간 예상 수익: ${Math.round(results.expectedPassengers * 12 * 2.5).toLocaleString()}만원`,
        `순이익: ${Math.round(results.expectedPassengers * 12 * 2.5 - results.totalAnnualCost).toLocaleString()}만원`,
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            사업계획서 생성
          </CardTitle>
          <CardDescription>의회 보고 및 예산 심사용 종합 보고서</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Button onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              PDF 다운로드
            </Button>
            <Button variant="outline" onClick={handleDownloadExcel}>
              <Download className="h-4 w-4 mr-2" />
              Excel 다운로드
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share className="h-4 w-4 mr-2" />
              공유하기
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              인쇄하기
            </Button>
          </div>

          <div className="space-y-6 print:space-y-4">
            {/* Report Header */}
            <div className="text-center border-b pb-4 print:pb-2">
              <h1 className="text-2xl font-bold mb-2">DRT 서비스 도입 사업계획서</h1>
              <p className="text-gray-600">MST-GCN 기반 수요응답형 교통 서비스</p>
              <p className="text-sm text-gray-500 mt-2">작성일: {new Date().toLocaleDateString("ko-KR")}</p>
            </div>

            {/* Executive Summary */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg print:bg-gray-50">
              <h2 className="text-lg font-bold mb-3">사업 요약</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">{results.totalAnnualCost.toLocaleString()}만원</div>
                  <div className="text-gray-600">연간 투자액</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">
                    {(results.expectedPassengers * 12).toLocaleString()}명
                  </div>
                  <div className="text-gray-600">연간 이용객</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-600">{Math.round(results.roi)}%</div>
                  <div className="text-gray-600">투자 수익률</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600">{results.breakEvenMonths}개월</div>
                  <div className="text-gray-600">손익분기점</div>
                </div>
              </div>
            </div>

            {/* Report Sections */}
            {reportSections.map((section, index) => (
              <div key={index} className="print:break-inside-avoid">
                <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Recommendations */}
            <div className="print:break-inside-avoid">
              <h3 className="text-lg font-semibold mb-3">정책 제언</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-medium text-green-900 mb-1">투자 타당성</div>
                  <div className="text-sm text-green-700">
                    {results.roi > 15
                      ? "투자 수익률이 15%를 초과하여 매우 우수한 사업성을 보입니다."
                      : results.roi > 5
                        ? "투자 수익률이 양호하여 사업 추진을 권장합니다."
                        : "투자 조건 재검토가 필요합니다."}
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="font-medium text-blue-900 mb-1">사회적 효과</div>
                  <div className="text-sm text-blue-700">
                    교통 소외지역 해소, 고령자 이동권 보장, 지역경제 활성화 등 다양한 사회적 편익이 예상됩니다.
                  </div>
                </div>

                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="font-medium text-orange-900 mb-1">추진 방안</div>
                  <div className="text-sm text-orange-700">
                    단계적 도입을 통해 리스크를 최소화하고, 운영 데이터 축적을 통한 지속적 개선을 권장합니다.
                  </div>
                </div>
              </div>
            </div>

            {/* Approval Section */}
            <div className="border-t pt-4 print:pt-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-600">검토자</div>
                  <div className="mt-8 border-b border-gray-300 w-32"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">승인자</div>
                  <div className="mt-8 border-b border-gray-300 w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>보고서 템플릿</CardTitle>
          <CardDescription>목적별 맞춤형 보고서 양식</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="font-medium mb-2">의회 보고용</div>
              <div className="text-sm text-gray-600 mb-3">정책 효과와 예산 타당성 중심의 종합 보고서</div>
              <Badge variant="outline" className="mb-3">
                15페이지
              </Badge>
              <Button size="sm" className="w-full">
                생성하기
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="font-medium mb-2">예산 심사용</div>
              <div className="text-sm text-gray-600 mb-3">비용 분석과 재정 영향 중심의 상세 분석서</div>
              <Badge variant="outline" className="mb-3">
                12페이지
              </Badge>
              <Button size="sm" className="w-full">
                생성하기
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="font-medium mb-2">사업 제안서</div>
              <div className="text-sm text-gray-600 mb-3">사업 개요와 추진 계획 중심의 제안서</div>
              <Badge variant="outline" className="mb-3">
                8페이지
              </Badge>
              <Button size="sm" className="w-full">
                생성하기
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
