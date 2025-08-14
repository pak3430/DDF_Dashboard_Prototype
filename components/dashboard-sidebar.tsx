"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart3,
  MapPin,
  TrendingUp,
  Users,
  Car,
  Calculator,
  DollarSign,
  Building2,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

const navigation = [
  {
    name: "대시보드 개요",
    href: "/",
    icon: BarChart3,
  },
  {
    name: "수요 및 취약지 분석",
    icon: MapPin,
    children: [
      {
        name: "대중교통 취약지 분석",
        href: "/vulnerability-analysis",
        icon: MapPin,
      },
      {
        name: "가중점(O/D) 분석",
        href: "/od-analysis",
        icon: TrendingUp,
      },
      {
        name: "수단 분담률 분석",
        href: "/modal-split",
        icon: BarChart3,
      },
    ],
  },
  {
    name: "지역 특성 분석",
    icon: Users,
    children: [
      {
        name: "인구·사회경제 특성 분석",
        href: "/demographic-analysis",
        icon: Users,
      },
    ],
  },
  {
    name: "운영 시뮬레이션",
    icon: Car,
    children: [
      {
        name: "전환율·교통량 변화 예측",
        href: "/conversion-simulation",
        icon: Car,
      },
      {
        name: "통행 시간·비용 변화 예측",
        href: "/travel-impact",
        icon: TrendingUp,
      },
      {
        name: "차량 투입 및 배치 최적화",
        href: "/fleet-optimization",
        icon: Building2,
      },
    ],
  },
  {
    name: "운영 비용/수익 예측",
    icon: DollarSign,
    children: [
      {
        name: "비용·수입 예측",
        href: "/cost-revenue",
        icon: DollarSign,
      },
      {
        name: "재정 지원 규모 산정",
        href: "/financial-planning",
        icon: Calculator,
      },
    ],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionName) ? prev.filter((name) => name !== sectionName) : [...prev, sectionName],
    )
  }

  const isExpanded = (sectionName: string) => expandedSections.includes(sectionName)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">DDF Dashboard</h1>
          </div>

          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {navigation.map((item) => {
                if (item.children) {
                  const hasActiveChild = item.children.some((child) => pathname === child.href)
                  const expanded = isExpanded(item.name) || hasActiveChild

                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => toggleSection(item.name)}
                        className={cn(
                          "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
                          hasActiveChild
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                        )}
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-3 h-5 w-5" />
                          {item.name}
                        </div>
                        {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </button>

                      {expanded && (
                        <div className="ml-6 mt-1 space-y-1">
                          {item.children.map((child) => {
                            const isActive = pathname === child.href
                            return (
                              <Link
                                key={child.name}
                                href={child.href}
                                className={cn(
                                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                                  isActive
                                    ? "bg-blue-100 text-blue-700 font-medium"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                                )}
                                onClick={() => setIsOpen(false)}
                              >
                                <child.icon className="mr-3 h-4 w-4" />
                                {child.name}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                } else {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                }
              })}
            </nav>
          </ScrollArea>

          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 mb-2">MST-GCN 모델 상태</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">정상 운영</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}
