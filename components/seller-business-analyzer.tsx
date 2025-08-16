"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bot, FileText, CheckCircle, AlertTriangle, Zap, Eye, Target } from "lucide-react"

interface BusinessAnalyzerProps {
  onAnalysisComplete?: (results: BusinessAnalysisResults) => void
}

interface BusinessAnalysisResults {
  marketReadinessScore: number
  valuationRange: string
  confidence: number
  keyInsights: Array<{ type: string; finding: string }>
  recommendations: string[]
  timeToMarket: string
}

export function SellerBusinessAnalyzer({ onAnalysisComplete }: BusinessAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisResults, setAnalysisResults] = useState<BusinessAnalysisResults | null>(null)

  const startBusinessAnalysis = () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate comprehensive business analysis
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          const results = {
            marketReadinessScore: 78,
            valuationRange: "$2.8M - $3.5M",
            confidence: 89,
            keyInsights: [
              { type: "positive", finding: "Strong financial performance with 28% revenue growth" },
              { type: "positive", finding: "Diversified customer base reduces concentration risk" },
              { type: "attention", finding: "Key person dependency needs to be addressed" },
              { type: "attention", finding: "Some legal documentation requires updating" },
            ],
            recommendations: [
              "Prepare detailed financial projections",
              "Standardize customer contracts",
              "Document key business processes",
              "Create management succession plan",
            ],
            timeToMarket: "2-3 weeks",
          }
          setAnalysisResults(results)
          onAnalysisComplete?.(results)
          return 100
        }
        return prev + 8
      })
    }, 400)
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="font-serif flex items-center space-x-2">
          <Bot className="w-6 h-6 text-primary" />
          <span>Business Sale Readiness Analyzer</span>
        </CardTitle>
        <CardDescription>
          Get AI-powered insights to optimize your business for sale and maximize valuation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isAnalyzing && !analysisResults && (
          <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Analyze Your Business for Sale</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload your business documents for comprehensive market readiness analysis
            </p>
            <Button onClick={startBusinessAnalysis} className="bg-primary hover:bg-primary/90">
              <Zap className="w-4 h-4 mr-2" />
              Start Business Analysis
            </Button>
          </div>
        )}

        {isAnalyzing && (
          <div className="text-center py-8">
            <Bot className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
            <h3 className="font-medium mb-2">Analyzing Your Business</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Evaluating financial health, market position, valuation potential, and optimization opportunities...
            </p>
            <Progress value={analysisProgress} className="max-w-md mx-auto" />
            <p className="text-xs text-muted-foreground mt-2">{analysisProgress}% complete</p>
          </div>
        )}

        {analysisResults && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <p className="text-2xl font-bold text-primary">{analysisResults.marketReadinessScore}</p>
                <p className="text-xs text-muted-foreground">Market Readiness</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-lg font-bold text-green-600">{analysisResults.valuationRange}</p>
                <p className="text-xs text-muted-foreground">Est. Valuation</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{analysisResults.timeToMarket}</p>
                <p className="text-xs text-muted-foreground">Time to Market</p>
              </div>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Analysis Complete:</strong> {analysisResults.confidence}% confidence in recommendations
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Key Insights:</h4>
              {analysisResults.keyInsights.map((insight, index: number) => (
                <Alert key={index}>
                  {insight.type === "positive" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                  <AlertDescription>{insight.finding}</AlertDescription>
                </Alert>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Priority Actions:</h4>
              <ul className="space-y-1">
                {analysisResults.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="text-sm flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Eye className="w-4 h-4 mr-2" />
                View Full Analysis
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
