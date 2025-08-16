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
  ArrowLeft,
  Bot,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Eye,
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
    operationalEfficiency: {
      employeeProductivity: "high",
      processAutomation: "moderate",
      scalability: "good",
      insights: "Well-established operational processes with room for automation improvements. Team shows strong productivity metrics.",
    },
    marketPosition: {
      competitiveAdvantage: "strong",
      marketShare: "growing",
      industryTrends: "favorable",
      insights: "Leading position in growing market segment with strong competitive moat through technology and customer relationships.",
    },
  },

  recommendations: [
    {
      priority: "high" as const,
      category: "Financial",
      recommendation: "Implement automated accounts receivable monitoring",
      impact: "Reduce cash flow risk and improve working capital efficiency",
    },
    {
      priority: "medium" as const,
      category: "Operational",
      recommendation: "Invest in process automation for customer onboarding",
      impact: "Improve scalability and reduce operational costs",
    },
    {
      priority: "low" as const,
      category: "Legal",
      recommendation: "Renew expiring supplier contract before closing",
      impact: "Ensure business continuity and maintain favorable terms",
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

interface AIAnalysisClientProps {
  id: string
}

// Generate analysis based on uploaded files
const generateAnalysisFromFiles = (files: UploadedFile[]) => {
  const completedFiles = files.filter((f) => f.status === "completed")
  const hasFinancials = completedFiles.some((f) => f.type.includes("pdf") || f.type.includes("excel"))
  const hasContracts = completedFiles.some((f) => f.type.includes("pdf") || f.type.includes("word"))

  return {
    ...mockAnalysis,
    dealId: parseInt(files[0]?.id || "1"),
    overallScore: Math.min(100, mockAnalysis.overallScore + (hasFinancials ? 5 : 0) + (hasContracts ? 3 : 0)),
    confidence: Math.min(100, mockAnalysis.confidence + (hasFinancials ? 3 : 0) + (hasContracts ? 2 : 0)),
    riskLevel: hasFinancials && hasContracts ? "Low" : hasFinancials || hasContracts ? "Medium" : "High",
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

export default function AIAnalysisClient({ id }: AIAnalysisClientProps) {
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

  const simulateFileProcessing = useCallback((fileId: string) => {
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
  }, [])

  const simulateProcessing = useCallback((fileId: string) => {
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
  }, [])

  const handleFiles = useCallback((files: File[]) => {
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
  }, [simulateFileProcessing])

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href={`/deals/${id}`} className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Deal</span>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-serif font-bold text-xl">AI Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analysis Overview */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
              <div>
                <CardTitle className="font-serif text-3xl mb-2">AI-Powered Deal Analysis</CardTitle>
                <CardDescription className="text-lg">
                  Comprehensive analysis of deal {id} using advanced AI algorithms and document analysis
                </CardDescription>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={() => setShowUploadDialog(true)}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Documents
                </Button>
                <Button onClick={startNewAnalysis} disabled={isAnalyzing || uploadedFiles.length === 0}>
                  <Zap className="w-4 h-4 mr-2" />
                  {isAnalyzing ? "Analyzing..." : "Run Analysis"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{currentAnalysis.overallScore}%</div>
                <div className="text-sm text-muted-foreground">Overall Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{currentAnalysis.confidence}%</div>
                <div className="text-sm text-muted-foreground">Confidence</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">{currentAnalysis.riskLevel}</div>
                <div className="text-sm text-muted-foreground">Risk Level</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{currentAnalysis.documentsAnalyzed}</div>
                <div className="text-sm text-muted-foreground">Documents</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
            <TabsTrigger value="operational">Operational</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Key Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-primary" />
                    <span>Key Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Strong Revenue Growth</p>
                        <p className="text-sm text-muted-foreground">
                          {currentAnalysis.financialAnalysis.revenueGrowth.insights}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Low Legal Risk</p>
                        <p className="text-sm text-muted-foreground">
                          Contract portfolio shows standard commercial terms with appropriate protections.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <BarChart3 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Operational Excellence</p>
                        <p className="text-sm text-muted-foreground">
                          Well-established processes with strong productivity metrics and growth potential.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Top Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentAnalysis.recommendations.slice(0, 3).map((rec, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge
                            variant={rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "default" : "secondary"}
                          >
                            {rec.priority}
                          </Badge>
                          <Badge variant="outline">{rec.category}</Badge>
                        </div>
                        <p className="font-medium mb-1">{rec.recommendation}</p>
                        <p className="text-sm text-muted-foreground">{rec.impact}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Risk Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  <span>Risk Assessment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Risk Level</span>
                    <Badge
                      variant={
                        currentAnalysis.riskLevel === "Low" ? "default" : currentAnalysis.riskLevel === "Medium" ? "secondary" : "destructive"
                      }
                    >
                      {currentAnalysis.riskLevel}
                    </Badge>
                  </div>
                  <Progress
                    value={
                      currentAnalysis.riskLevel === "Low" ? 25 : currentAnalysis.riskLevel === "Medium" ? 50 : 75
                    }
                    className="h-2"
                  />
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-muted-foreground mb-1">Financial Risk</p>
                      <p className="font-medium">Low</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground mb-1">Legal Risk</p>
                      <p className="font-medium">Low</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground mb-1">Operational Risk</p>
                      <p className="font-medium">Medium</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Financial Analysis</CardTitle>
                <CardDescription>Comprehensive financial health assessment based on uploaded documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Revenue Growth</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Trend</span>
                        <Badge variant="default">{currentAnalysis.financialAnalysis.revenueGrowth.trend}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Rate</span>
                        <span className="font-medium">{currentAnalysis.financialAnalysis.revenueGrowth.rate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Consistency</span>
                        <Badge variant="secondary">{currentAnalysis.financialAnalysis.revenueGrowth.consistency}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      {currentAnalysis.financialAnalysis.revenueGrowth.insights}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Profitability</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Gross Margin</span>
                        <span className="font-medium">{currentAnalysis.financialAnalysis.profitability.grossMargin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Net Margin</span>
                        <span className="font-medium">{currentAnalysis.financialAnalysis.profitability.netMargin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Trend</span>
                        <Badge variant="default">{currentAnalysis.financialAnalysis.profitability.trend}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      {currentAnalysis.financialAnalysis.profitability.insights}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Cash Flow</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <Badge variant="default">{currentAnalysis.financialAnalysis.cashFlow.status}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Runway</p>
                      <span className="font-medium">{currentAnalysis.financialAnalysis.cashFlow.runway}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{currentAnalysis.financialAnalysis.cashFlow.insights}</p>
                </div>

                {currentAnalysis.financialAnalysis.redFlags.length > 0 && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        {currentAnalysis.financialAnalysis.redFlags.map((flag, index) => (
                          <div key={index}>
                            <p className="font-medium">{flag.issue}</p>
                            <p className="text-sm text-muted-foreground">{flag.recommendation}</p>
                          </div>
                        ))}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Legal Tab */}
          <TabsContent value="legal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Legal Analysis</CardTitle>
                <CardDescription>Contract review and legal risk assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Contract Review</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Contracts Reviewed</span>
                        <span className="font-medium">{currentAnalysis.legalAnalysis.contractsReviewed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Risk Score</span>
                        <Badge variant="secondary">{currentAnalysis.legalAnalysis.riskScore}/100</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">IP Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Patents</span>
                        <span className="font-medium">{currentAnalysis.legalAnalysis.ipAnalysis.patents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Trademarks</span>
                        <span className="font-medium">{currentAnalysis.legalAnalysis.ipAnalysis.trademarks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <Badge variant="default">{currentAnalysis.legalAnalysis.ipAnalysis.status}</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Key Findings</h4>
                  <div className="space-y-3">
                    {currentAnalysis.legalAnalysis.keyFindings.map((finding, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            finding.type === "positive"
                              ? "bg-green-500"
                              : finding.type === "attention"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                          }`}
                        />
                        <p className="text-sm">{finding.finding}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">{currentAnalysis.legalAnalysis.ipAnalysis.insights}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Operational Tab */}
          <TabsContent value="operational" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Operational Analysis</CardTitle>
                <CardDescription>Business operations and market position assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Customer Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Concentration</span>
                        <Badge variant="secondary">{currentAnalysis.operationalAnalysis.customerAnalysis.concentration}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Churn Rate</span>
                        <span className="font-medium">{currentAnalysis.operationalAnalysis.customerAnalysis.churnRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Satisfaction</span>
                        <Badge variant="default">{currentAnalysis.operationalAnalysis.customerAnalysis.satisfaction}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      {currentAnalysis.operationalAnalysis.customerAnalysis.insights}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Operational Efficiency</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Employee Productivity</span>
                        <Badge variant="default">{currentAnalysis.operationalAnalysis.operationalEfficiency.employeeProductivity}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Process Automation</span>
                        <Badge variant="secondary">{currentAnalysis.operationalAnalysis.operationalEfficiency.processAutomation}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Scalability</span>
                        <Badge variant="default">{currentAnalysis.operationalAnalysis.operationalEfficiency.scalability}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      {currentAnalysis.operationalAnalysis.operationalEfficiency.insights}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Market Position</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Competitive Advantage</p>
                      <Badge variant="default">{currentAnalysis.operationalAnalysis.marketPosition.competitiveAdvantage}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Market Share</p>
                      <Badge variant="secondary">{currentAnalysis.operationalAnalysis.marketPosition.marketShare}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Industry Trends</p>
                      <Badge variant="default">{currentAnalysis.operationalAnalysis.marketPosition.industryTrends}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    {currentAnalysis.operationalAnalysis.marketPosition.insights}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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
    </div>
  )
}
