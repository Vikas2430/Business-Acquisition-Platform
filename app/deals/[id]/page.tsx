"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Users,
  ArrowLeft,
  FileText,
  MessageCircle,
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
  Download,
  Eye,
  Bot,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

// Mock deal data
const mockDeal = {
  id: 1,
  businessName: "CloudSync Pro",
  buyerName: "Sarah Chen",
  buyerCompany: "Chen Ventures",
  buyerAvatar: "/professional-woman-diverse.png",
  dealValue: "$3.2M",
  stage: "Due Diligence",
  progress: 65,
  startDate: "2024-01-15",
  estimatedClose: "2024-03-30",
  lastActivity: "2 hours ago",
}

const dealStages = [
  { name: "Initial Contact", completed: true, current: false },
  { name: "Letter of Intent", completed: true, current: false },
  { name: "Due Diligence", completed: false, current: true },
  { name: "Final Negotiations", completed: false, current: false },
  { name: "Closing", completed: false, current: false },
]

const mockTasks = [
  {
    id: 1,
    title: "Financial statements review",
    description: "Review last 3 years of financial statements",
    assignee: "buyer",
    status: "completed",
    dueDate: "2024-02-15",
    priority: "high",
  },
  {
    id: 2,
    title: "Legal document preparation",
    description: "Prepare purchase agreement draft",
    assignee: "seller",
    status: "in-progress",
    dueDate: "2024-02-20",
    priority: "high",
  },
  {
    id: 3,
    title: "Customer contract analysis",
    description: "Analyze top 10 customer contracts",
    assignee: "buyer",
    status: "pending",
    dueDate: "2024-02-25",
    priority: "medium",
  },
  {
    id: 4,
    title: "Employee retention agreements",
    description: "Draft key employee retention agreements",
    assignee: "seller",
    status: "pending",
    dueDate: "2024-03-01",
    priority: "medium",
  },
]

const mockDocuments = [
  {
    id: 1,
    name: "Financial Statements 2021-2023.pdf",
    type: "Financial",
    uploadedBy: "seller",
    uploadDate: "2024-02-10",
    status: "reviewed",
    aiAnalysis: true,
  },
  {
    id: 2,
    name: "Purchase Agreement Draft v1.pdf",
    type: "Legal",
    uploadedBy: "buyer",
    uploadDate: "2024-02-12",
    status: "pending-review",
    aiAnalysis: false,
  },
  {
    id: 3,
    name: "Customer List & Contracts.xlsx",
    type: "Commercial",
    uploadedBy: "seller",
    uploadDate: "2024-02-14",
    status: "ai-analyzing",
    aiAnalysis: true,
  },
]

export default function DealDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/30 to-background">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/deals" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Deals</span>
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
        {/* Deal Header */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={mockDeal.buyerAvatar || "/placeholder.svg"} alt={mockDeal.buyerName} />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {mockDeal.buyerName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="font-serif text-2xl mb-1">{mockDeal.businessName}</CardTitle>
                  <CardDescription className="text-base">
                    Buyer: {mockDeal.buyerName} from {mockDeal.buyerCompany}
                  </CardDescription>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <span>Started: {mockDeal.startDate}</span>
                    <span>•</span>
                    <span>Est. Close: {mockDeal.estimatedClose}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2 mb-2">
                  {mockDeal.dealValue}
                </Badge>
                <p className="text-sm text-muted-foreground">Deal Value</p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Deal Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-serif font-semibold">Deal Progress</h3>
                <span className="text-sm text-muted-foreground">{mockDeal.progress}% Complete</span>
              </div>
              <Progress value={mockDeal.progress} className="h-3 mb-4" />

              {/* Stage Timeline */}
              <div className="flex items-center justify-between">
                {dealStages.map((stage, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        stage.completed
                          ? "bg-green-600 text-white"
                          : stage.current
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {stage.completed ? <CheckCircle className="w-4 h-4" /> : <span>{index + 1}</span>}
                    </div>
                    <span className="text-xs text-center max-w-20">{stage.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deal Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Current Stage: {mockDeal.stage}</CardTitle>
                  <CardDescription>Key activities and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">Financial statements reviewed</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">Legal structure analysis complete</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-amber-600" />
                      <span className="text-sm">Customer contract review in progress</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="text-sm">Employee retention agreements pending</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Deal Insights</CardTitle>
                  <CardDescription>AI-powered analysis and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Bot className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Risk Assessment: Low</p>
                        <p className="text-xs text-muted-foreground">
                          Financial health is strong with consistent revenue growth
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Deal Probability: 85%</p>
                        <p className="text-xs text-muted-foreground">Based on current progress and engagement</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Timeline Status: On Track</p>
                        <p className="text-xs text-muted-foreground">Expected to close within estimated timeframe</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Deal Tasks</CardTitle>
                <CardDescription>Track progress on key deal activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`border rounded-lg p-4 ${
                        task.status === "completed" ? "bg-green-50 border-green-200" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={task.status === "completed"}
                            className="mt-1"
                            disabled={task.status === "completed"}
                          />
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                              <span>Assigned to: {task.assignee}</span>
                              <span>Due: {task.dueDate}</span>
                              <Badge
                                variant={task.priority === "high" ? "destructive" : "secondary"}
                                className="text-xs"
                              >
                                {task.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={
                            task.status === "completed"
                              ? "default"
                              : task.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {task.status.replace("-", " ")}
                        </Badge>
                      </div>
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
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="font-serif">Deal Documents</CardTitle>
                    <CardDescription>Manage and review all deal-related documents</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/deals/${params.id}/ai-analysis`}>
                      <Button variant="outline" className="bg-transparent">
                        <Bot className="w-4 h-4 mr-2" />
                        AI Analysis Dashboard
                      </Button>
                    </Link>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDocuments.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>Type: {doc.type}</span>
                              <span>Uploaded by: {doc.uploadedBy}</span>
                              <span>Date: {doc.uploadDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {doc.aiAnalysis && (
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                              <Bot className="w-3 h-3 mr-1" />
                              AI Analyzed
                            </Badge>
                          )}
                          <Badge
                            variant={
                              doc.status === "reviewed"
                                ? "default"
                                : doc.status === "ai-analyzing"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {doc.status.replace("-", " ")}
                          </Badge>
                          {doc.aiAnalysis && doc.status === "reviewed" && (
                            <Link href={`/deals/${params.id}/ai-analysis`}>
                              <Button variant="outline" size="sm" className="bg-transparent">
                                <Bot className="w-4 h-4 mr-2" />
                                View AI Analysis
                              </Button>
                            </Link>
                          )}
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <h3 className="font-serif font-semibold text-lg mb-4">Upload & Analyze New Documents</h3>
                  <div className="border-2 border-dashed border-muted rounded-lg p-6">
                    <div className="text-center">
                      <Bot className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h4 className="font-medium mb-2">AI-Powered Document Analysis</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload documents for instant AI analysis including financial insights, risk assessment, and key
                        findings
                      </p>
                      <Button className="bg-primary hover:bg-primary/90">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload & Analyze with AI
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communication Tab */}
          <TabsContent value="communication" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Deal Communication</CardTitle>
                <CardDescription>Messages and updates related to this deal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Communication features coming soon</p>
                  <Button className="mt-4 bg-primary hover:bg-primary/90">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Conversation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
