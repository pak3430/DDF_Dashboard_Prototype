"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Target } from "lucide-react"

interface QuestionMappingCardProps {
  question: {
    id: number
    question: string
    category: string
    phase: string
    description: string
    targetPage: string
    features: string[]
    difficulty: string
    estimatedTime: string
  }
  onNavigate: (targetPage: string) => void
}

export function QuestionMappingCard({ question, onNavigate }: QuestionMappingCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500"
      case "intermediate":
        return "bg-yellow-500"
      case "advanced":
        return "bg-orange-500"
      case "expert":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "초급"
      case "intermediate":
        return "중급"
      case "advanced":
        return "고급"
      case "expert":
        return "전문가"
      default:
        return "미상"
    }
  }

  const getPhaseLabel = (phase: string) => {
    switch (phase) {
      case "pre-implementation":
        return "도입 전"
      case "post-implementation":
        return "도입 후"
      case "validation":
        return "효과 검증"
      default:
        return "기타"
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "pre-implementation":
        return "bg-blue-100 text-blue-800"
      case "post-implementation":
        return "bg-green-100 text-green-800"
      case "validation":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary" className={getPhaseColor(question.phase)}>
            {getPhaseLabel(question.phase)}
          </Badge>
          <div className="flex items-center gap-2">
            <Badge className={`text-white ${getDifficultyColor(question.difficulty)}`}>
              {getDifficultyLabel(question.difficulty)}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
          {question.question}
        </CardTitle>
        <CardDescription className="text-sm">{question.description}</CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* 기능 목록 */}
          <div>
            <h4 className="text-sm font-medium mb-2">관련 기능</h4>
            <div className="flex flex-wrap gap-1">
              {question.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* 예상 소요 시간 */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>예상 소요 시간: {question.estimatedTime}</span>
          </div>

          {/* 이동 버튼 */}
          <Button
            className="w-full group-hover:bg-blue-600 transition-colors"
            onClick={() => onNavigate(question.targetPage)}
          >
            <Target className="h-4 w-4 mr-2" />
            해당 기능으로 이동
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
