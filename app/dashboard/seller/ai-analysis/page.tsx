"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AIDocumentAnalyzer } from "@/components/ai-document-analyzer"
import {
  Users,
  ArrowLeft,
  Bot,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Zap,
  BarChart3,
  Shield,
  Target,
  Lightbulb,
  DollarSign,
  Star,
} from "lucide-react"
import Link from "next/link"

// Mock seller business analysis data
const mockSellerAnalysis = {
  businessName: "Your Business",
  analysisDate: "2024-02-15",
  marketReadinessScore: 78,
  valuationRange: "$2.8M - $3.5M",
  confidence: 89,
  documentsAnalyzed: 8,
  timeToMarket: "2-3 weeks",

  businessHealthCheck: {
    financialHealth: {
      score: 85,
      status: "strong",
      highlights: [
        "Consistent revenue growth of 28% over 3 years",
        "Healthy profit margins at 24%",
        "Strong cash flow position",
      ],
      improvements: ["Standardize financial reporting processes", "Prepare detailed revenue breakdown by segment"],
    },
    operationalHealth: {
      score: 72,
      status: "good",
      highlights: ["Low customer concentration risk", "Experienced management team", "Scalable business processes"],
      improvements: [
        "Document standard operating procedures",
        "Create management succession plan",
        "Implement customer retention strategies",
      ],
    },
    legalHealth: {
      score: 68,
      status: "needs-attention",
      highlights: ["Clean corporate structure", "Up-to-date employment agreements"],
      improvements: [
        "Update customer contracts to standard terms",
        "Resolve pending legal matters",
        "Strengthen IP protection",
      ],
    },
  },

  marketPositioning: {
    competitiveAdvantages: [
      "Proprietary technology with patent protection",
      "Strong brand recognition in target market",
      "Exclusive supplier relationships",
    ],
    marketOpportunities: [
      "Growing market with 15% annual growth",
      "Potential for geographic expansion",
      "Opportunity for product line extension",
    ],
    buyerAppeal: {
      strategicBuyers: "High - fits well with tech companies looking to expand",
      financialBuyers: "Medium - steady cash flows attractive to PE firms",
      individualBuyers: "Medium - may require owner financing",
    },
  },

  valuationInsights: {
    currentMultiple: "3.2x revenue",
    industryAverage: "2.8x revenue",
    valuationDrivers: [
      "Recurring revenue model (65% of total revenue)",
      "High customer retention rate (94%)",
      "Scalable technology platform",
    ],
    valuationRisks: [
      "Key person dependency on founder",
      "Limited geographic diversification",
      "Competitive market pressures",
    ],
  },

  sellerRecommendations: [
    {
      priority: "high",
      category: "Financial",
      recommendation: "Prepare 3-year financial projections with detailed assumptions",
      impact: "Increases buyer confidence and supports higher valuation",
      timeframe: "1-2 weeks",
    },
    {
      priority: "high",
      category: "Legal",
      recommendation: "Standardize all customer contracts and resolve pending issues",
      impact: "Reduces legal due diligence risks and speeds up process",
      timeframe: "2-3 weeks",
    },
    {
      priority: "medium",
      category: "Operational",
      recommendation: "Document key processes and create management transition plan",
      impact: "Reduces key person risk and appeals to more buyers",
      timeframe: "3-4 weeks",
    },
    {
      priority: "medium",
      category: "Strategic",
      recommendation: "Develop growth strategy presentation for potential buyers",
      impact: "Demonstrates future potential and justifies premium valuation",
      timeframe: "1-2 weeks",
    },
  ],
}

export default function SellerAIAnalysisPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const startBusinessAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
    }, 4000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/30 to-background">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/seller"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
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
                  <span>Business Sale Readiness Analysis</span>
                </CardTitle>
                <CardDescription className="text-base">
                  AI-powered analysis to optimize your business for sale and maximize valuation
                </CardDescription>
                <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                  <span>Last updated: {mockSellerAnalysis.analysisDate}</span>
                  <span>•</span>
                  <span>{mockSellerAnalysis.documentsAnalyzed} documents analyzed</span>
                  <span>•</span>
                  <span>Time to market: {mockSellerAnalysis.timeToMarket}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">
                    Readiness: {mockSellerAnalysis.marketReadinessScore}/100
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className="bg-green-100 text-green-800 border-green-200 text-base px-3 py-1">
                    {mockSellerAnalysis.valuationRange}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{mockSellerAnalysis.confidence}% Confidence</Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {isAnalyzing ? (
              <div className="text-center py-8">
                <Bot className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
                <h3 className="font-serif font-semibold text-lg mb-2">Analyzing Your Business</h3>
                <p className="text-muted-foreground mb-4">
                  Evaluating market readiness, valuation potential, and optimization opportunities...
                </p>
                <Progress value={75} className="max-w-md mx-auto" />
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{mockSellerAnalysis.marketReadinessScore}</p>
                    <p className="text-sm text-muted-foreground">Market Readiness</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {mockSellerAnalysis.valuationRange.split(" - ")[1]}
                    </p>
                    <p className="text-sm text-muted-foreground">Est. Max Value</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{mockSellerAnalysis.confidence}%</p>
                    <p className="text-sm text-muted-foreground">Confidence</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-600">{mockSellerAnalysis.timeToMarket}</p>
                    <p className="text-sm text-muted-foreground">Time to Market</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Upload Documents
                  </Button>
                  <Button onClick={startBusinessAnalysis} className="bg-primary hover:bg-primary/90">
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="health-check">Health Check</TabsTrigger>
            <TabsTrigger value="positioning">Market Position</TabsTrigger>
            <TabsTrigger value="valuation">Valuation</TabsTrigger>
            <TabsTrigger value="recommendations">Action Plan</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <span>Financial Readiness</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Overall Score</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {mockSellerAnalysis.businessHealthCheck.financialHealth.score}/100
                      </Badge>
                    </div>
                    <Progress value={mockSellerAnalysis.businessHealthCheck.financialHealth.score} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Strong financial performance with consistent growth and healthy margins
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span>Operational Readiness</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Overall Score</span>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        {mockSellerAnalysis.businessHealthCheck.operationalHealth.score}/100
                      </Badge>
                    </div>
                    <Progress value={mockSellerAnalysis.businessHealthCheck.operationalHealth.score} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Good operational foundation with room for process documentation improvements
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center space-x-2">
                    <Target className="w-5 h-5 text-amber-600" />
                    <span>Legal Readiness</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Overall Score</span>
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                        {mockSellerAnalysis.businessHealthCheck.legalHealth.score}/100
                      </Badge>
                    </div>
                    <Progress value={mockSellerAnalysis.businessHealthCheck.legalHealth.score} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Some legal items need attention before going to market
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Insights for Sellers */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Key Insights for Your Sale</CardTitle>
                <CardDescription>Most important findings to maximize your business value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Strong Valuation Position:</strong> Your business is valued above industry average due to
                      recurring revenue model and high customer retention.
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <Star className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Competitive Advantages:</strong> Proprietary technology and exclusive supplier
                      relationships create strong buyer appeal.
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Action Required:</strong> Address legal documentation and key person dependency issues to
                      maximize buyer interest and reduce due diligence risks.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Check Tab */}
          <TabsContent value="health-check" className="space-y-6">
            <div className="space-y-6">
              {Object.entries(mockSellerAnalysis.businessHealthCheck).map(([key, health]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="font-serif capitalize flex items-center justify-between">
                      <span>{key.replace("Health", " Health")}</span>
                      <Badge
                        className={
                          health.status === "strong"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : health.status === "good"
                              ? "bg-blue-100 text-blue-800 border-blue-200"
                              : "bg-amber-100 text-amber-800 border-amber-200"
                        }
                      >
                        {health.score}/100 - {health.status.replace("-", " ")}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-green-600 mb-3 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Strengths
                        </h4>
                        <ul className="space-y-2">
                          {health.highlights.map((highlight, index) => (
                            <li key={index} className="text-sm flex items-start">
                              <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-amber-600 mb-3 flex items-center">
                          <Lightbulb className="w-4 h-4 mr-2" />
                          Improvements
                        </h4>
                        <ul className="space-y-2">
                          {health.improvements.map((improvement, index) => (
                            <li key={index} className="text-sm flex items-start">
                              <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Market Positioning Tab */}
          <TabsContent value="positioning" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Competitive Advantages</CardTitle>
                  <CardDescription>What makes your business attractive to buyers</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {mockSellerAnalysis.marketPositioning.competitiveAdvantages.map((advantage, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="w-4 h-4 text-primary mt-1 mr-3 flex-shrink-0" />
                        <span className="text-sm">{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Market Opportunities</CardTitle>
                  <CardDescription>Growth potential that appeals to buyers</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {mockSellerAnalysis.marketPositioning.marketOpportunities.map((opportunity, index) => (
                      <li key={index} className="flex items-start">
                        <TrendingUp className="w-4 h-4 text-green-600 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-sm">{opportunity}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Buyer Appeal Analysis</CardTitle>
                <CardDescription>How attractive your business is to different buyer types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(mockSellerAnalysis.marketPositioning.buyerAppeal).map(([buyerType, appeal]) => (
                    <div key={buyerType} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium capitalize">{buyerType.replace(/([A-Z])/g, " $1").trim()}</span>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            appeal.startsWith("High")
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-amber-100 text-amber-800 border-amber-200"
                          }
                        >
                          {appeal.split(" - ")[0]}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{appeal.split(" - ")[1]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Valuation Tab */}
          <TabsContent value="valuation" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Valuation Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Estimated Range</span>
                      <span className="font-bold text-lg text-primary">{mockSellerAnalysis.valuationRange}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Current Multiple</span>
                      <span className="font-semibold">{mockSellerAnalysis.valuationInsights.currentMultiple}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Industry Average</span>
                      <span className="font-semibold">{mockSellerAnalysis.valuationInsights.industryAverage}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Premium vs Industry</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">+14%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Valuation Drivers</CardTitle>
                  <CardDescription>Factors increasing your business value</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {mockSellerAnalysis.valuationInsights.valuationDrivers.map((driver, index) => (
                      <li key={index} className="flex items-start">
                        <DollarSign className="w-4 h-4 text-green-600 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-sm">{driver}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-red-600">Valuation Risks</CardTitle>
                <CardDescription>Factors that could reduce your business value</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {mockSellerAnalysis.valuationInsights.valuationRisks.map((risk, index) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-sm">{risk}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Seller Action Plan</CardTitle>
                <CardDescription>Prioritized steps to optimize your business for sale</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSellerAnalysis.sellerRecommendations.map((rec, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={rec.priority === "high" ? "destructive" : "secondary"}
                            className={rec.priority === "high" ? "" : "bg-amber-100 text-amber-800 border-amber-200"}
                          >
                            {rec.priority} priority
                          </Badge>
                          <Badge variant="outline">{rec.category}</Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {rec.timeframe}
                          </Badge>
                        </div>
                      </div>
                      <h4 className="font-medium mb-2">{rec.recommendation}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Impact:</strong> {rec.impact}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Document Preparation Center</CardTitle>
                <CardDescription>Analyze and optimize your business documents for sale</CardDescription>
              </CardHeader>
              <CardContent>
                <AIDocumentAnalyzer onAnalysisComplete={(results) => console.log("Analysis complete:", results)} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
