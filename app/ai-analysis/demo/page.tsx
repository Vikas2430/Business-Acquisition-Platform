"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, FileText, AlertTriangle, CheckCircle, Zap, BarChart3 } from "lucide-react"
import Link from "next/link"

interface UploadedFile {
  name: string
  size: number
  type: string
  progress: number
  status: "uploading" | "processing" | "complete"
}

export default function AIAnalysisDemo() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [overallScore, setOverallScore] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (files: FileList) => {
    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: "uploading",
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])

    // Simulate file processing
    newFiles.forEach((file) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 20
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)

          setUploadedFiles((prev) =>
            prev.map((f) => (f.name === file.name ? { ...f, progress: 100, status: "complete" } : f)),
          )

          // Generate analysis results after all files are processed
          setTimeout(() => {
            setAnalysisComplete(true)
            setOverallScore(Math.floor(Math.random() * 30) + 70) // 70-100 score
          }, 1000)
        } else {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.name === file.name ? { ...f, progress, status: progress > 50 ? "processing" : "uploading" } : f,
            ),
          )
        }
      }, 200)
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/30 to-background">
      {/* Header */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Zap className="w-6 h-6 text-primary" />
              <span className="font-serif font-bold text-xl">AI Analysis Demo</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Business Documents
            </CardTitle>
            <CardDescription>
              Upload your financial statements, contracts, or operational documents for AI-powered analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Drop files here or click to upload</p>
              <p className="text-sm text-muted-foreground">Supports PDF, Word, Excel, and image files</p>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6 space-y-3">
                <h4 className="font-medium">Uploaded Documents</h4>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <FileText className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{file.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Progress value={file.progress} className="flex-1 h-2" />
                        <span className="text-xs text-muted-foreground">{file.progress.toFixed(0)}%</span>
                      </div>
                    </div>
                    <Badge variant={file.status === "complete" ? "default" : "secondary"}>
                      {file.status === "uploading" && "Uploading"}
                      {file.status === "processing" && "Processing"}
                      {file.status === "complete" && "Complete"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysisComplete && (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Analysis Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{overallScore}</div>
                      <p className="text-sm text-muted-foreground">Overall Score</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">{uploadedFiles.length}</div>
                      <p className="text-sm text-muted-foreground">Documents Analyzed</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                      <p className="text-sm text-muted-foreground">Analysis Confidence</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Key Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                      <span className="text-sm">Strong revenue growth trend</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                      <span className="text-sm">Diversified customer base</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                      <span className="text-sm">Healthy profit margins</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                      Areas of Attention
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-600 rounded-full" />
                      <span className="text-sm">Increasing operational costs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-600 rounded-full" />
                      <span className="text-sm">Key person dependency</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-600 rounded-full" />
                      <span className="text-sm">Market concentration risk</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Financial Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Revenue Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Annual Growth Rate</span>
                          <span className="font-medium text-green-600">+23%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Revenue Stability</span>
                          <span className="font-medium">High</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Recurring Revenue</span>
                          <span className="font-medium">67%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Profitability</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Gross Margin</span>
                          <span className="font-medium">42%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">EBITDA Margin</span>
                          <span className="font-medium">18%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Net Margin</span>
                          <span className="font-medium">12%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risks" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-red-800">High Customer Concentration</p>
                      <p className="text-sm text-red-600">Top 3 customers represent 65% of revenue</p>
                    </div>
                    <Badge variant="destructive">High Risk</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div>
                      <p className="font-medium text-amber-800">Key Person Dependency</p>
                      <p className="text-sm text-amber-600">Business heavily dependent on founder</p>
                    </div>
                    <Badge variant="secondary">Medium Risk</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">Financial Health</p>
                      <p className="text-sm text-green-600">Strong cash flow and low debt</p>
                    </div>
                    <Badge variant="default">Low Risk</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Immediate Actions</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Diversify customer base to reduce concentration risk</li>
                      <li>• Implement succession planning for key personnel</li>
                      <li>• Document all critical business processes</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Value Enhancement</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Leverage strong growth metrics in marketing materials</li>
                      <li>• Highlight recurring revenue model to buyers</li>
                      <li>• Prepare detailed financial projections</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* CTA Section */}
        <Card className="text-center">
          <CardContent className="pt-6">
            <h3 className="font-serif font-bold text-xl mb-2">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-4">
              Join our platform to access the full suite of AI-powered M&A tools
            </p>
            <Link href="/onboarding">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Your Journey
                <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
