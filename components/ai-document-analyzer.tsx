"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bot, Upload, FileText, CheckCircle, AlertTriangle, Zap, Eye } from "lucide-react"

interface DocumentAnalyzerProps {
  onAnalysisComplete?: (results: AnalysisResults) => void
}

interface AnalysisResults {
  documentType: string
  confidence: number
  keyFindings: Array<{ type: string; finding: string }>
  riskScore: number
  recommendations: string[]
}

export function AIDocumentAnalyzer({ onAnalysisComplete }: DocumentAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null)

  const startAnalysis = () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate AI analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          const results = {
            documentType: "Financial Statements",
            confidence: 94,
            keyFindings: [
              { type: "positive", finding: "Revenue growth of 23% YoY" },
              { type: "attention", finding: "Accounts receivable increased 15%" },
              { type: "positive", finding: "Strong cash flow position" },
            ],
            riskScore: 25,
            recommendations: ["Review accounts receivable collection processes", "Verify revenue recognition policies"],
          }
          setAnalysisResults(results)
          onAnalysisComplete?.(results)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="font-serif flex items-center space-x-2">
          <Bot className="w-6 h-6 text-primary" />
          <span>AI Document Analyzer</span>
        </CardTitle>
        <CardDescription>Upload documents for instant AI-powered analysis and insights</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isAnalyzing && !analysisResults && (
          <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Upload Documents for Analysis</h3>
            <p className="text-sm text-muted-foreground mb-4">Supported formats: PDF, Excel, Word documents</p>
            <Button onClick={startAnalysis} className="bg-primary hover:bg-primary/90">
              <Zap className="w-4 h-4 mr-2" />
              Start AI Analysis
            </Button>
          </div>
        )}

        {isAnalyzing && (
          <div className="text-center py-8">
            <Bot className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
            <h3 className="font-medium mb-2">AI Analysis in Progress</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Analyzing document structure, extracting key data, and generating insights...
            </p>
            <Progress value={analysisProgress} className="max-w-md mx-auto" />
            <p className="text-xs text-muted-foreground mt-2">{analysisProgress}% complete</p>
          </div>
        )}

        {analysisResults && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Analysis Complete</h3>
              <Badge className="bg-primary text-primary-foreground">{analysisResults.confidence}% Confidence</Badge>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Document Type Detected:</strong> {analysisResults.documentType}
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Key Findings:</h4>
              {analysisResults.keyFindings.map((finding, index: number) => (
                <Alert key={index}>
                  {finding.type === "positive" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                  <AlertDescription>{finding.finding}</AlertDescription>
                </Alert>
              ))}
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Eye className="w-4 h-4 mr-2" />
                View Full Report
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                Export Results
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
