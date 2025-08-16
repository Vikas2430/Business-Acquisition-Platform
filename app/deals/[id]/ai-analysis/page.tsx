"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Users,
  ArrowLeft,
  Bot,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Eye,
  Download,
  Zap,
  BarChart3,
  Shield,
  Upload,
  X,
  File,
} from "lucide-react"
import Link from "next/link"

// Mock AI analysis data
const mockAnalysis = {
  dealId: 1,
  businessName: "CloudSync Pro",
  analysisDate: "2024-02-15",
  overallScore: 85,
  riskLevel: "Low",
  confidence: 92,
  documentsAnalyzed: 12,

  financialAnalysis: {
    revenueGrowth: {
      trend: "positive",
      rate: "23% YoY",
      consistency: "high",
      insights: "Strong and consistent revenue growth over the past 3 years with accelerating momentum in Q4 2023.",
    },
    profitability: {
      grossMargin: "68%",
      netMargin: "22%",
      trend: "improving",
      insights: "Healthy margins with improving efficiency. EBITDA margin increased from 18% to 22% over 2 years.",
    },
    cashFlow: {
      status: "strong",
      runway: "18 months",
      insights: "Positive operating cash flow with strong working capital management. Low customer concentration risk.",
    },
    redFlags: [
      {
        severity: "medium",
        issue: "Accounts receivable increased 15% faster than revenue",
        recommendation: "Review collection processes and customer payment terms",
      },
    ],
  },

  legalAnalysis: {
    contractsReviewed: 8,
    riskScore: 25,
    keyFindings: [
      {
        type: "positive",
        finding: "All major customer contracts have standard terms with no unusual clauses",
      },
      {
        type: "neutral",
        finding: "Employment agreements are standard with reasonable non-compete clauses",
      },
      {
        type: "attention",
        finding: "One supplier contract expires in 6 months - renewal recommended before closing",
      },
    ],
    ipAnalysis: {
      patents: 3,
      trademarks: 2,
      status: "well-protected",
      insights: "Strong IP portfolio with key technology patents providing competitive moat.",
    },
  },

  operationalAnalysis: {
    customerAnalysis: {
      concentration: "low",
      churnRate: "5% annually",
      satisfaction: "high",
      insights:
        "Diversified customer base with low churn and high satisfaction scores. Top 10 customers represent only 35% of revenue.",
    },
    teamAnalysis: {
      keyPersonRisk: "medium",
      retentionRate: "92%",
      insights: "Strong team with low turnover. Founder involvement is high - succession planning recommended.",
    },
  },

  recommendations: [
    {
      priority: "high",
      category: "Financial",
      recommendation: "Conduct deeper analysis of accounts receivable aging",
      impact: "Ensure cash flow projections are accurate",
    },
    {
      priority: "medium",
      category: "Legal",
      recommendation: "Negotiate supplier contract renewal before closing",
      impact: "Avoid potential supply chain disruption",
    },
    {
      priority: "medium",
      category: "Operational",
      recommendation: "Develop management succession plan",
      impact: "Reduce key person dependency risk",
    },
  ],
}

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  uploadDate: string
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
}

const generateAnalysisFromFiles = (files: UploadedFile[]) => {
  const completedFiles = files.filter((f) => f.status === "completed")
  if (completedFiles.length === 0) return mockAnalysis

  // Generate different analysis based on file types and names
  const hasFinancials = completedFiles.some(
    (f) =>
      f.name.toLowerCase().includes("financial") ||
      f.name.toLowerCase().includes("revenue") ||
      f.name.toLowerCase().includes("income") ||
      f.type.includes("spreadsheet") ||
      f.name.includes(".xlsx") ||
      f.name.includes(".xls"),
  )

  const hasContracts = completedFiles.some(
    (f) =>
      f.name.toLowerCase().includes("contract") ||
      f.name.toLowerCase().includes("agreement") ||
      f.name.toLowerCase().includes("legal") ||
      f.type.includes("pdf"),
  )

  const hasOperational = completedFiles.some(
    (f) =>
      f.name.toLowerCase().includes("operational") ||
      f.name.toLowerCase().includes("employee") ||
      f.name.toLowerCase().includes("customer"),
  )

  // Generate dynamic scores based on uploaded documents
  let overallScore = 75 + Math.floor(Math.random() * 20) // 75-95
  let confidence = 85 + Math.floor(Math.random() * 10) // 85-95
  let riskLevel = "Medium"

  if (hasFinancials && hasContracts && hasOperational) {
    overallScore = 85 + Math.floor(Math.random() * 15) // 85-100
    confidence = 90 + Math.floor(Math.random() * 10) // 90-100
    riskLevel = "Low"
  } else if (hasFinancials && hasContracts) {
    overallScore = 80 + Math.floor(Math.random() * 15) // 80-95
    confidence = 88 + Math.floor(Math.random() * 7) // 88-95
    riskLevel = "Low"
  }

  // Generate dynamic insights based on file analysis
  const insights = []
  if (hasFinancials) {
    insights.push("Financial documents show strong revenue growth and healthy cash flow patterns.")
  }
  if (hasContracts) {
    insights.push("Contract analysis reveals standard terms with minimal legal risks identified.")
  }
  if (hasOperational) {
    insights.push("Operational documents indicate efficient processes and stable team structure.")
  }

  return {
    ...mockAnalysis,
    overallScore,
    confidence,
    riskLevel,
    documentsAnalyzed: completedFiles.length,
    analysisDate: new Date().toISOString().split("T")[0],
    businessName: "Your Business", // Dynamic based on uploaded docs

    // Update financial analysis based on uploaded files
    financialAnalysis: {
      ...mockAnalysis.financialAnalysis,
      revenueGrowth: {
        ...mockAnalysis.financialAnalysis.revenueGrowth,
        rate: hasFinancials ? `${15 + Math.floor(Math.random() * 20)}% YoY` : "Data needed",
        insights: hasFinancials
          ? "Analysis of uploaded financial statements shows consistent growth trajectory with strong fundamentals."
          : "Upload financial statements for detailed revenue analysis.",
      },
      profitability: {
        ...mockAnalysis.financialAnalysis.profitability,
        grossMargin: hasFinancials ? `${60 + Math.floor(Math.random() * 15)}%` : "N/A",
        netMargin: hasFinancials ? `${15 + Math.floor(Math.random() * 15)}%` : "N/A",
        insights: hasFinancials
          ? "Uploaded financial data indicates healthy profit margins with room for optimization."
          : "Financial documents required for profitability analysis.",
      },
    },

    // Update legal analysis based on contracts
    legalAnalysis: {
      ...mockAnalysis.legalAnalysis,
      contractsReviewed: hasContracts ? completedFiles.filter((f) => f.type.includes("pdf")).length : 0,
      riskScore: hasContracts ? 20 + Math.floor(Math.random() * 30) : 50,
      keyFindings: hasContracts
        ? [
            {
              type: "positive",
              finding: "Uploaded contracts contain standard commercial terms with appropriate protections.",
            },
            {
              type: "neutral",
              finding: "Contract portfolio shows typical industry arrangements.",
            },
          ]
        : [
            {
              type: "attention",
              finding: "No contracts uploaded - legal analysis incomplete.",
            },
          ],
    },

    // Generate dynamic recommendations
    recommendations: [
      ...(hasFinancials
        ? []
        : [
            {
              priority: "high" as const,
              category: "Documentation",
              recommendation: "Upload financial statements for comprehensive analysis",
              impact: "Enable detailed financial health assessment",
            },
          ]),
      ...(hasContracts
        ? []
        : [
            {
              priority: "medium" as const,
              category: "Legal",
              recommendation: "Upload key contracts for legal risk assessment",
              impact: "Identify potential legal issues before closing",
            },
          ]),
      ...mockAnalysis.recommendations.slice(0, hasFinancials && hasContracts ? 3 : 1),
    ],
  }
}

export default function AIAnalysisPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState(mockAnalysis)

  useEffect(() => {
    const newAnalysis = generateAnalysisFromFiles(uploadedFiles)
    setCurrentAnalysis(newAnalysis)
  }, [uploadedFiles])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [handleFiles])

  const handleFiles = (files: File[]) => {
    files.forEach((file) => {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString(),
        status: "uploading",
        progress: 0,
      }

      setUploadedFiles((prev) => [...prev, newFile])

      // Simulate file upload and processing
      simulateFileProcessing(newFile.id)
    })
  }

  const simulateFileProcessing = (fileId: string) => {
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId && file.status === "uploading") {
            const newProgress = Math.min(file.progress + 10, 100)
            if (newProgress === 100) {
              clearInterval(uploadInterval)
              // Start processing phase
              setTimeout(() => {
                setUploadedFiles((prev) =>
                  prev.map((f) => (f.id === fileId ? { ...f, status: "processing", progress: 0 } : f)),
                )
                simulateProcessing(fileId)
              }, 500)
              return { ...file, progress: newProgress, status: "processing" }
            }
            return { ...file, progress: newProgress }
          }
          return file
        }),
      )
    }, 200)
  }

  const simulateProcessing = (fileId: string) => {
    const processingInterval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId && file.status === "processing") {
            const newProgress = Math.min(file.progress + 15, 100)
            if (newProgress === 100) {
              clearInterval(processingInterval)
              setTimeout(() => {
                setCurrentAnalysis(
                  generateAnalysisFromFiles([
                    ...prev.filter((f) => f.id !== fileId),
                    { ...file, status: "completed", progress: 100 },
                  ]),
                )
              }, 500)
              return { ...file, progress: newProgress, status: "completed" }
            }
            return { ...file, progress: newProgress }
          }
          return file
        }),
      )
    }, 300)
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const startNewAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setCurrentAnalysis(generateAnalysisFromFiles(uploadedFiles))
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/30 to-background">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href={`/deals/${params.id}`}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Deal</span>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-serif font-bold text-xl">DealConnect</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analysis Header */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="font-serif text-2xl mb-2 flex items-center space-x-3">
                  <Bot className="w-8 h-8 text-primary" />
                  <span>AI Deal Analysis</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Comprehensive AI-powered analysis of {currentAnalysis.businessName}
                </CardDescription>
                <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                  <span>Last updated: {currentAnalysis.analysisDate}</span>
                  <span>•</span>
                  <span>
                    {currentAnalysis.documentsAnalyzed + uploadedFiles.filter((f) => f.status === "completed").length}{" "}
                    documents analyzed
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">
                    Score: {currentAnalysis.overallScore}/100
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={currentAnalysis.riskLevel === "Low" ? "default" : "destructive"}
                    className={
                      currentAnalysis.riskLevel === "Low" ? "bg-green-100 text-green-800 border-green-200" : ""
                    }
                  >
                    {currentAnalysis.riskLevel} Risk
                  </Badge>
                  <Badge variant="outline">{currentAnalysis.confidence}% Confidence</Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {isAnalyzing ? (
              <div className="text-center py-8">
                <Bot className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
                <h3 className="font-serif font-semibold text-lg mb-2">AI Analysis in Progress</h3>
                <p className="text-muted-foreground mb-4">Analyzing uploaded documents and generating insights...</p>
                <Progress value={65} className="max-w-md mx-auto" />
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{currentAnalysis.overallScore}</p>
                    <p className="text-sm text-muted-foreground">Overall Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {currentAnalysis.documentsAnalyzed + uploadedFiles.filter((f) => f.status === "completed").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Documents</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{currentAnalysis.confidence}%</p>
                    <p className="text-sm text-muted-foreground">Confidence</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="bg-transparent" onClick={() => setShowUploadDialog(true)}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Documents
                  </Button>
                  <Link href={`/deals/${params.id}?tab=documents`}>
                    <Button variant="outline" className="bg-transparent">
                      <FileText className="w-4 h-4 mr-2" />
                      Manage Documents
                    </Button>
                  </Link>
                  <Button onClick={startNewAnalysis} className="bg-primary hover:bg-primary/90">
                    <Zap className="w-4 h-4 mr-2" />
                    Run New Analysis
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
            <TabsTrigger value="operational">Operational</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {uploadedFiles.filter((f) => f.status === "completed").length === 0 && (
              <Alert>
                <Upload className="h-4 w-4" />
                <AlertDescription>
                  <strong>Upload documents to get personalized analysis:</strong> The current analysis is based on
                  sample data. Upload your financial statements, contracts, and operational documents to get AI-powered
                  insights specific to your business.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <span>Financial Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Revenue Growth</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {uploadedFiles.some(
                          (f) =>
                            f.status === "completed" &&
                            (f.name.toLowerCase().includes("financial") || f.type.includes("spreadsheet")),
                        )
                          ? "Strong"
                          : "Upload Needed"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Profitability</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {uploadedFiles.some(
                          (f) =>
                            f.status === "completed" &&
                            (f.name.toLowerCase().includes("financial") || f.type.includes("spreadsheet")),
                        )
                          ? "Healthy"
                          : "Upload Needed"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Cash Flow</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {uploadedFiles.some(
                          (f) =>
                            f.status === "completed" &&
                            (f.name.toLowerCase().includes("financial") || f.type.includes("spreadsheet")),
                        )
                          ? "Positive"
                          : "Upload Needed"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span>Legal & Compliance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Contract Risk</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {uploadedFiles.some((f) => f.status === "completed" && f.type.includes("pdf"))
                          ? "Low"
                          : "Upload Needed"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">IP Protection</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {uploadedFiles.some((f) => f.status === "completed" && f.type.includes("pdf"))
                          ? "Strong"
                          : "Upload Needed"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Compliance</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {uploadedFiles.some((f) => f.status === "completed" && f.type.includes("pdf"))
                          ? "Good"
                          : "Upload Needed"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Operational</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Customer Base</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Diversified</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Team Stability</span>
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">Medium</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Operations</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Efficient</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Key AI Insights</CardTitle>
                <CardDescription>Most important findings from the analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadedFiles.filter((f) => f.status === "completed").length > 0 ? (
                    <>
                      {uploadedFiles.some(
                        (f) =>
                          f.status === "completed" &&
                          (f.name.toLowerCase().includes("financial") || f.type.includes("spreadsheet")),
                      ) && (
                        <Alert>
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Financial Documents Analyzed:</strong>{" "}
                            {currentAnalysis.financialAnalysis.revenueGrowth.insights}
                          </AlertDescription>
                        </Alert>
                      )}
                      {uploadedFiles.some((f) => f.status === "completed" && f.type.includes("pdf")) && (
                        <Alert>
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Contract Analysis Complete:</strong>{" "}
                            {currentAnalysis.legalAnalysis.keyFindings[0]?.finding}
                          </AlertDescription>
                        </Alert>
                      )}
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Analysis Confidence:</strong> {currentAnalysis.confidence}% confidence based on{" "}
                          {uploadedFiles.filter((f) => f.status === "completed").length} uploaded document(s).
                        </AlertDescription>
                      </Alert>
                    </>
                  ) : (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Sample Analysis Shown:</strong> Upload your business documents to get personalized AI
                        insights and recommendations.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Revenue Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Growth Rate</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {currentAnalysis.financialAnalysis.revenueGrowth.rate}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Trend</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {currentAnalysis.financialAnalysis.revenueGrowth.trend}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Consistency</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {currentAnalysis.financialAnalysis.revenueGrowth.consistency}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      {currentAnalysis.financialAnalysis.revenueGrowth.insights}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Profitability Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Gross Margin</span>
                      <span className="font-semibold">
                        {currentAnalysis.financialAnalysis.profitability.grossMargin}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Net Margin</span>
                      <span className="font-semibold">{currentAnalysis.financialAnalysis.profitability.netMargin}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Trend</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {currentAnalysis.financialAnalysis.profitability.trend}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      {currentAnalysis.financialAnalysis.profitability.insights}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Red Flags */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-red-600">Financial Red Flags</CardTitle>
                <CardDescription>Areas requiring attention or further investigation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentAnalysis.financialAnalysis.redFlags.map((flag, index) => (
                    <Alert key={index}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>{flag.issue}</strong>
                        <br />
                        <span className="text-sm text-muted-foreground">Recommendation: {flag.recommendation}</span>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Legal Tab */}
          <TabsContent value="legal" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Contract Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Contracts Reviewed</span>
                      <span className="font-semibold">{currentAnalysis.legalAnalysis.contractsReviewed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Risk Score</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {currentAnalysis.legalAnalysis.riskScore}/100
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">IP Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Patents</span>
                      <span className="font-semibold">{currentAnalysis.legalAnalysis.ipAnalysis.patents}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Trademarks</span>
                      <span className="font-semibold">{currentAnalysis.legalAnalysis.ipAnalysis.trademarks}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Protection Status</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {currentAnalysis.legalAnalysis.ipAnalysis.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      {currentAnalysis.legalAnalysis.ipAnalysis.insights}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Legal Findings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Key Legal Findings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentAnalysis.legalAnalysis.keyFindings.map((finding, index) => (
                    <Alert key={index}>
                      {finding.type === "positive" && <CheckCircle className="h-4 w-4" />}
                      {finding.type === "attention" && <AlertTriangle className="h-4 w-4" />}
                      {finding.type === "neutral" && <FileText className="h-4 w-4" />}
                      <AlertDescription>{finding.finding}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Operational Tab */}
          <TabsContent value="operational" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Customer Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Concentration Risk</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {currentAnalysis.operationalAnalysis.customerAnalysis.concentration}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Annual Churn Rate</span>
                      <span className="font-semibold">
                        {currentAnalysis.operationalAnalysis.customerAnalysis.churnRate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Satisfaction</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {currentAnalysis.operationalAnalysis.customerAnalysis.satisfaction}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      {currentAnalysis.operationalAnalysis.customerAnalysis.insights}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Team Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Key Person Risk</span>
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                        {currentAnalysis.operationalAnalysis.teamAnalysis.keyPersonRisk}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Retention Rate</span>
                      <span className="font-semibold">
                        {currentAnalysis.operationalAnalysis.teamAnalysis.retentionRate}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      {currentAnalysis.operationalAnalysis.teamAnalysis.insights}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">AI Recommendations</CardTitle>
                <CardDescription>Prioritized action items based on the analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentAnalysis.recommendations.map((rec, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={rec.priority === "high" ? "destructive" : "secondary"}
                            className={rec.priority === "high" ? "" : "bg-amber-100 text-amber-800 border-amber-200"}
                          >
                            {rec.priority} priority
                          </Badge>
                          <Badge variant="outline">{rec.category}</Badge>
                        </div>
                      </div>
                      <h4 className="font-medium mb-2">{rec.recommendation}</h4>
                      <p className="text-sm text-muted-foreground">Impact: {rec.impact}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Export Analysis</CardTitle>
                <CardDescription>Download comprehensive reports for your records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button variant="outline" className="bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF Report
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Export to Excel
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    Share Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif">Upload Documents for AI Analysis</DialogTitle>
            <DialogDescription>
              Upload financial statements, contracts, or other business documents for AI-powered analysis.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif font-semibold mb-2">Drop files here or click to upload</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Supports PDF, Excel, Word, and image files up to 10MB each
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.xlsx,.xls,.docx,.doc,.png,.jpg,.jpeg"
                onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
                className="absolute opacity-0 w-full h-full cursor-pointer"
                id="file-upload"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              />
              <Button
                variant="outline"
                className="bg-transparent relative z-10 pointer-events-none"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Choose Files
              </Button>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Uploaded Files</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                      <File className="w-5 h-5 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{formatFileSize(file.size)}</span>
                          <span>•</span>
                          <span className="capitalize">{file.status}</span>
                        </div>
                        {(file.status === "uploading" || file.status === "processing") && (
                          <Progress value={file.progress} className="h-1 mt-1" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {file.status === "completed" && <CheckCircle className="w-4 h-4 text-green-600" />}
                        <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowUploadDialog(false)
                  if (uploadedFiles.some((f) => f.status === "completed")) {
                    startNewAnalysis()
                  }
                }}
                disabled={!uploadedFiles.some((f) => f.status === "completed")}
              >
                Analyze Documents
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
