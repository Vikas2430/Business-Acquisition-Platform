"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  MessageCircle,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Building2,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

// Mock deals data
const mockDeals = [
  {
    id: 1,
    businessName: "CloudSync Pro",
    buyerName: "Sarah Chen",
    buyerCompany: "Chen Ventures",
    buyerAvatar: "/professional-woman-diverse.png",
    dealValue: "$3.2M",
    stage: "Due Diligence",
    progress: 65,
    status: "active",
    startDate: "2024-01-15",
    estimatedClose: "2024-03-30",
    lastActivity: "2 hours ago",
    nextMilestone: "Financial Review Complete",
    urgentTasks: 2,
    completedTasks: 12,
    totalTasks: 18,
  },
  {
    id: 2,
    businessName: "RetailFlow",
    buyerName: "Michael Rodriguez",
    buyerCompany: "Summit Capital",
    buyerAvatar: "/professional-man.png",
    dealValue: "$1.8M",
    stage: "Letter of Intent",
    progress: 35,
    status: "active",
    startDate: "2024-02-01",
    estimatedClose: "2024-04-15",
    lastActivity: "1 day ago",
    nextMilestone: "LOI Signed",
    urgentTasks: 1,
    completedTasks: 6,
    totalTasks: 17,
  },
  {
    id: 3,
    businessName: "DataViz Solutions",
    buyerName: "Jennifer Park",
    buyerCompany: "Growth Partners LLC",
    buyerAvatar: "/professional-asian-woman.png",
    dealValue: "$4.1M",
    stage: "Completed",
    progress: 100,
    status: "completed",
    startDate: "2023-11-01",
    estimatedClose: "2024-01-30",
    lastActivity: "Completed",
    nextMilestone: "Deal Closed",
    urgentTasks: 0,
    completedTasks: 20,
    totalTasks: 20,
  },
]

const dealStages = [
  { name: "Initial Contact", progress: 10 },
  { name: "Letter of Intent", progress: 25 },
  { name: "Due Diligence", progress: 60 },
  { name: "Final Negotiations", progress: 85 },
  { name: "Closing", progress: 100 },
]

export default function DealsPage() {
  const [activeTab, setActiveTab] = useState("active")

  const activeDealCount = mockDeals.filter((deal) => deal.status === "active").length
  const completedDealCount = mockDeals.filter((deal) => deal.status === "completed").length
  const totalDealValue = mockDeals.reduce(
    (sum, deal) => sum + Number.parseFloat(deal.dealValue.replace(/[$M,]/g, "")),
    0,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/30 to-background">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif font-bold text-xl">DealConnect</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Messages
              </Button>
              <Button variant="ghost" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Calendar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif font-bold text-3xl mb-2">Deal Management</h1>
          <p className="text-muted-foreground">Track and manage your active acquisitions</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold">{activeDealCount}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-2xl font-bold">{completedDealCount}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Deal Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold">${totalDealValue.toFixed(1)}M</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Deal Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold">89 days</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Deals List */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active Deals ({activeDealCount})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedDealCount})</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {mockDeals
              .filter((deal) => deal.status === "active")
              .map((deal) => (
                <Card key={deal.id} className="border-2 hover:border-primary/20 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={deal.buyerAvatar || "/placeholder.svg"} alt={deal.buyerName} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {deal.buyerName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="font-serif text-xl">{deal.businessName}</CardTitle>
                          <CardDescription>
                            Buyer: {deal.buyerName} from {deal.buyerCompany}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-primary/10 text-primary border-primary/20 mb-2">{deal.dealValue}</Badge>
                        <p className="text-sm text-muted-foreground">Started {deal.startDate}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress Section */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Current Stage: {deal.stage}</span>
                        <span className="text-sm text-muted-foreground">{deal.progress}% Complete</span>
                      </div>
                      <Progress value={deal.progress} className="h-2" />
                    </div>

                    {/* Key Metrics */}
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-accent/50 rounded-lg">
                        <p className="text-sm font-medium">Next Milestone</p>
                        <p className="text-xs text-muted-foreground mt-1">{deal.nextMilestone}</p>
                      </div>
                      <div className="text-center p-3 bg-accent/50 rounded-lg">
                        <p className="text-sm font-medium">Est. Close Date</p>
                        <p className="text-xs text-muted-foreground mt-1">{deal.estimatedClose}</p>
                      </div>
                      <div className="text-center p-3 bg-accent/50 rounded-lg">
                        <p className="text-sm font-medium">Tasks Progress</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {deal.completedTasks}/{deal.totalTasks}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-accent/50 rounded-lg">
                        <p className="text-sm font-medium">Urgent Tasks</p>
                        <p className="text-xs text-red-600 mt-1 font-medium">{deal.urgentTasks}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Last activity: {deal.lastActivity}</span>
                        </div>
                        {deal.urgentTasks > 0 && (
                          <div className="flex items-center space-x-1 text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            <span>{deal.urgentTasks} urgent tasks</span>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Link href={`/deals/${deal.id}`}>
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            Manage Deal
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {mockDeals
              .filter((deal) => deal.status === "completed")
              .map((deal) => (
                <Card key={deal.id} className="border-2 border-green-200 bg-green-50/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={deal.buyerAvatar || "/placeholder.svg"} alt={deal.buyerName} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {deal.buyerName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="font-serif text-xl flex items-center space-x-2">
                            <span>{deal.businessName}</span>
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </CardTitle>
                          <CardDescription>
                            Buyer: {deal.buyerName} from {deal.buyerCompany}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800 border-green-200 mb-2">{deal.dealValue}</Badge>
                        <p className="text-sm text-muted-foreground">Completed</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Deal Duration: 89 days</span>
                        <span>•</span>
                        <span>All tasks completed</span>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        View Summary
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Deal Pipeline</CardTitle>
                  <CardDescription>Current deals by stage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dealStages.map((stage, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{stage.name}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${stage.progress}%` }} />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">{stage.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Success Rate</span>
                      <span className="text-sm font-bold text-green-600">85%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Avg. Deal Size</span>
                      <span className="text-sm font-bold">${(totalDealValue / mockDeals.length).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Time to Close</span>
                      <span className="text-sm font-bold">89 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Active Pipeline Value</span>
                      <span className="text-sm font-bold text-primary">$5.0M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
