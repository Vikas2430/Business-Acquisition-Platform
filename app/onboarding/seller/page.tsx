"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Users, Building2, DollarSign, Calendar, Target } from "lucide-react"
import Link from "next/link"

const steps = [
  { id: 1, title: "Business Overview", icon: Building2 },
  { id: 2, title: "Financial Details", icon: DollarSign },
  { id: 3, title: "Sale Preferences", icon: Target },
  { id: 4, title: "Timeline & Goals", icon: Calendar },
]

export default function SellerOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Business Overview
    businessName: "",
    industry: "",
    businessType: "",
    location: "",
    employeeCount: "",
    businessDescription: "",

    // Step 2: Financial Details
    annualRevenue: "",
    profitMargin: "",
    askingPrice: "",
    revenueGrowth: "",

    // Step 3: Sale Preferences
    buyerType: "",
    dealStructure: [],
    timeCommitment: "",

    // Step 4: Timeline & Goals
    timeline: "",
    saleReason: "",
    postSaleInvolvement: "",
  })

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/30 to-background">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/onboarding" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Role Selection</span>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Badge className="mb-2 bg-primary/10 text-primary border-primary/20">Seller Onboarding</Badge>
              <h1 className="font-serif font-bold text-2xl md:text-3xl">{steps[currentStep - 1].title}</h1>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                Step {currentStep} of {steps.length}
              </p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              {React.createElement(steps[currentStep - 1].icon, {
                className: "w-6 h-6 text-primary",
              })}
              <CardTitle className="font-serif">{steps[currentStep - 1].title}</CardTitle>
            </div>
            <CardDescription>
              {currentStep === 1 && "Tell us about your business to help us find the right buyers."}
              {currentStep === 2 && "Share financial details to attract serious buyers."}
              {currentStep === 3 && "Define your ideal buyer and deal preferences."}
              {currentStep === 4 && "Set your timeline and sale objectives."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Business Overview */}
            {currentStep === 1 && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => updateFormData("businessName", e.target.value)}
                      placeholder="Enter your business name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="services">Professional Services</SelectItem>
                        <SelectItem value="hospitality">Hospitality</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) => updateFormData("businessType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saas">SaaS</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="brick-mortar">Brick & Mortar</SelectItem>
                        <SelectItem value="franchise">Franchise</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeCount">Number of Employees</Label>
                    <Select
                      value={formData.employeeCount}
                      onValueChange={(value) => updateFormData("employeeCount", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5 employees</SelectItem>
                        <SelectItem value="6-20">6-20 employees</SelectItem>
                        <SelectItem value="21-50">21-50 employees</SelectItem>
                        <SelectItem value="51-100">51-100 employees</SelectItem>
                        <SelectItem value="100+">100+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Business Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                    placeholder="City, State/Country"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessDescription">Business Description</Label>
                  <Textarea
                    id="businessDescription"
                    value={formData.businessDescription}
                    onChange={(e) => updateFormData("businessDescription", e.target.value)}
                    placeholder="Describe what your business does, your unique value proposition, and key strengths..."
                    rows={4}
                  />
                </div>
              </>
            )}

            {/* Step 2: Financial Details */}
            {currentStep === 2 && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="annualRevenue">Annual Revenue</Label>
                    <Select
                      value={formData.annualRevenue}
                      onValueChange={(value) => updateFormData("annualRevenue", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select revenue range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-100k">Under $100K</SelectItem>
                        <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                        <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                        <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                        <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                        <SelectItem value="10m+">$10M+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profitMargin">Profit Margin</Label>
                    <Select
                      value={formData.profitMargin}
                      onValueChange={(value) => updateFormData("profitMargin", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select profit margin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-10">0-10%</SelectItem>
                        <SelectItem value="10-20">10-20%</SelectItem>
                        <SelectItem value="20-30">20-30%</SelectItem>
                        <SelectItem value="30-40">30-40%</SelectItem>
                        <SelectItem value="40+">40%+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="askingPrice">Asking Price Range</Label>
                    <Select
                      value={formData.askingPrice}
                      onValueChange={(value) => updateFormData("askingPrice", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-500k">Under $500K</SelectItem>
                        <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                        <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                        <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                        <SelectItem value="10m-25m">$10M - $25M</SelectItem>
                        <SelectItem value="25m+">$25M+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="revenueGrowth">Revenue Growth (Last 3 Years)</Label>
                    <Select
                      value={formData.revenueGrowth}
                      onValueChange={(value) => updateFormData("revenueGrowth", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select growth rate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="declining">Declining</SelectItem>
                        <SelectItem value="stable">Stable (0-5%)</SelectItem>
                        <SelectItem value="moderate">Moderate (5-20%)</SelectItem>
                        <SelectItem value="high">High (20-50%)</SelectItem>
                        <SelectItem value="very-high">Very High (50%+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Sale Preferences */}
            {currentStep === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="buyerType">Preferred Buyer Type</Label>
                  <Select value={formData.buyerType} onValueChange={(value) => updateFormData("buyerType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred buyer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual Investor</SelectItem>
                      <SelectItem value="strategic">Strategic Buyer</SelectItem>
                      <SelectItem value="private-equity">Private Equity</SelectItem>
                      <SelectItem value="competitor">Competitor</SelectItem>
                      <SelectItem value="no-preference">No Preference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Deal Structure Preferences (Select all that apply)</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { id: "cash", label: "All Cash" },
                      { id: "earnout", label: "Earnout Structure" },
                      { id: "seller-financing", label: "Seller Financing" },
                      { id: "equity-rollover", label: "Equity Rollover" },
                      { id: "asset-sale", label: "Asset Sale" },
                      { id: "stock-sale", label: "Stock Sale" },
                    ].map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={formData.dealStructure.includes(option.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateFormData("dealStructure", [...formData.dealStructure, option.id])
                            } else {
                              updateFormData(
                                "dealStructure",
                                formData.dealStructure.filter((item: string) => item !== option.id),
                              )
                            }
                          }}
                        />
                        <Label htmlFor={option.id} className="text-sm font-normal">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeCommitment">Post-Sale Time Commitment</Label>
                  <Select
                    value={formData.timeCommitment}
                    onValueChange={(value) => updateFormData("timeCommitment", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time commitment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No involvement</SelectItem>
                      <SelectItem value="consulting">Consulting role (3-6 months)</SelectItem>
                      <SelectItem value="transition">Transition period (6-12 months)</SelectItem>
                      <SelectItem value="ongoing">Ongoing involvement (1+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Step 4: Timeline & Goals */}
            {currentStep === 4 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Sale Timeline</Label>
                  <Select value={formData.timeline} onValueChange={(value) => updateFormData("timeline", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (0-3 months)</SelectItem>
                      <SelectItem value="short">Short-term (3-6 months)</SelectItem>
                      <SelectItem value="medium">Medium-term (6-12 months)</SelectItem>
                      <SelectItem value="long">Long-term (1+ years)</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="saleReason">Primary Reason for Sale</Label>
                  <Select value={formData.saleReason} onValueChange={(value) => updateFormData("saleReason", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retirement">Retirement</SelectItem>
                      <SelectItem value="new-venture">Starting new venture</SelectItem>
                      <SelectItem value="health">Health reasons</SelectItem>
                      <SelectItem value="growth">Need capital for growth</SelectItem>
                      <SelectItem value="partnership">Seeking strategic partnership</SelectItem>
                      <SelectItem value="market-timing">Market timing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postSaleInvolvement">Desired Post-Sale Involvement</Label>
                  <Textarea
                    id="postSaleInvolvement"
                    value={formData.postSaleInvolvement}
                    onChange={(e) => updateFormData("postSaleInvolvement", e.target.value)}
                    placeholder="Describe your ideal role after the sale, if any..."
                    rows={3}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={nextStep} className="bg-primary hover:bg-primary/90 flex items-center space-x-2">
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Link href="/dashboard/seller">
              <Button className="bg-primary hover:bg-primary/90 flex items-center space-x-2">
                <span>Complete Setup</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
