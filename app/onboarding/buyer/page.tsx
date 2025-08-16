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
import { ArrowLeft, ArrowRight, Users, User, DollarSign, Target, Search } from "lucide-react"
import Link from "next/link"

const steps = [
  { id: 1, title: "Personal Profile", icon: User },
  { id: 2, title: "Investment Criteria", icon: DollarSign },
  { id: 3, title: "Acquisition Preferences", icon: Target },
  { id: 4, title: "Search Parameters", icon: Search },
]

export default function BuyerOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Personal Profile
    fullName: "",
    title: "",
    company: "",
    experience: "",
    background: "",

    // Step 2: Investment Criteria
    budgetRange: "",
    fundingSource: "",
    investmentType: "",
    roiExpectation: "",

    // Step 3: Acquisition Preferences
    preferredIndustries: [],
    businessTypes: [],
    geographicPreference: "",
    involvementLevel: "",

    // Step 4: Search Parameters
    dealSize: "",
    timeline: "",
    specificRequirements: "",
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
              <Badge className="mb-2 bg-primary/10 text-primary border-primary/20">Buyer Onboarding</Badge>
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
              {currentStep === 1 && "Tell us about yourself and your acquisition experience."}
              {currentStep === 2 && "Define your investment capacity and criteria."}
              {currentStep === 3 && "Specify your acquisition preferences and involvement level."}
              {currentStep === 4 && "Set your search parameters to find the right opportunities."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Profile */}
            {currentStep === 1 && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => updateFormData("fullName", e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => updateFormData("title", e.target.value)}
                      placeholder="e.g., CEO, Investor, Entrepreneur"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Current Company/Organization</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => updateFormData("company", e.target.value)}
                    placeholder="Enter your current company or investment firm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Acquisition Experience</Label>
                  <Select value={formData.experience} onValueChange={(value) => updateFormData("experience", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first-time">First-time buyer</SelectItem>
                      <SelectItem value="some">Some experience (1-3 deals)</SelectItem>
                      <SelectItem value="experienced">Experienced (4-10 deals)</SelectItem>
                      <SelectItem value="serial">Serial acquirer (10+ deals)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background">Professional Background</Label>
                  <Textarea
                    id="background"
                    value={formData.background}
                    onChange={(e) => updateFormData("background", e.target.value)}
                    placeholder="Describe your professional background, relevant experience, and what makes you a strong buyer..."
                    rows={4}
                  />
                </div>
              </>
            )}

            {/* Step 2: Investment Criteria */}
            {currentStep === 2 && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budgetRange">Budget Range</Label>
                    <Select
                      value={formData.budgetRange}
                      onValueChange={(value) => updateFormData("budgetRange", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
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
                    <Label htmlFor="fundingSource">Funding Source</Label>
                    <Select
                      value={formData.fundingSource}
                      onValueChange={(value) => updateFormData("fundingSource", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select funding source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal funds</SelectItem>
                        <SelectItem value="sba">SBA loan</SelectItem>
                        <SelectItem value="bank">Bank financing</SelectItem>
                        <SelectItem value="investors">Investor backing</SelectItem>
                        <SelectItem value="combination">Combination</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="investmentType">Investment Type</Label>
                    <Select
                      value={formData.investmentType}
                      onValueChange={(value) => updateFormData("investmentType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select investment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner-operator">Owner-operator</SelectItem>
                        <SelectItem value="passive">Passive investment</SelectItem>
                        <SelectItem value="strategic">Strategic acquisition</SelectItem>
                        <SelectItem value="turnaround">Turnaround opportunity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roiExpectation">ROI Expectation</Label>
                    <Select
                      value={formData.roiExpectation}
                      onValueChange={(value) => updateFormData("roiExpectation", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select ROI expectation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10-15">10-15% annually</SelectItem>
                        <SelectItem value="15-25">15-25% annually</SelectItem>
                        <SelectItem value="25-35">25-35% annually</SelectItem>
                        <SelectItem value="35+">35%+ annually</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Acquisition Preferences */}
            {currentStep === 3 && (
              <>
                <div className="space-y-3">
                  <Label>Preferred Industries (Select all that apply)</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { id: "technology", label: "Technology" },
                      { id: "healthcare", label: "Healthcare" },
                      { id: "retail", label: "Retail" },
                      { id: "manufacturing", label: "Manufacturing" },
                      { id: "services", label: "Professional Services" },
                      { id: "hospitality", label: "Hospitality" },
                      { id: "real-estate", label: "Real Estate" },
                      { id: "education", label: "Education" },
                    ].map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={formData.preferredIndustries.includes(option.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateFormData("preferredIndustries", [...formData.preferredIndustries, option.id])
                            } else {
                              updateFormData(
                                "preferredIndustries",
                                formData.preferredIndustries.filter((item: string) => item !== option.id),
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

                <div className="space-y-3">
                  <Label>Business Types of Interest (Select all that apply)</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { id: "saas", label: "SaaS" },
                      { id: "ecommerce", label: "E-commerce" },
                      { id: "brick-mortar", label: "Brick & Mortar" },
                      { id: "franchise", label: "Franchise" },
                      { id: "consulting", label: "Consulting" },
                      { id: "subscription", label: "Subscription Model" },
                    ].map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={formData.businessTypes.includes(option.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateFormData("businessTypes", [...formData.businessTypes, option.id])
                            } else {
                              updateFormData(
                                "businessTypes",
                                formData.businessTypes.filter((item: string) => item !== option.id),
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

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="geographicPreference">Geographic Preference</Label>
                    <Select
                      value={formData.geographicPreference}
                      onValueChange={(value) => updateFormData("geographicPreference", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select geographic preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local/Regional</SelectItem>
                        <SelectItem value="national">National</SelectItem>
                        <SelectItem value="international">International</SelectItem>
                        <SelectItem value="remote">Remote-friendly</SelectItem>
                        <SelectItem value="no-preference">No preference</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="involvementLevel">Desired Involvement Level</Label>
                    <Select
                      value={formData.involvementLevel}
                      onValueChange={(value) => updateFormData("involvementLevel", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select involvement level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hands-on">Hands-on management</SelectItem>
                        <SelectItem value="strategic">Strategic oversight</SelectItem>
                        <SelectItem value="passive">Passive investment</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            {/* Step 4: Search Parameters */}
            {currentStep === 4 && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dealSize">Preferred Deal Size</Label>
                    <Select value={formData.dealSize} onValueChange={(value) => updateFormData("dealSize", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select deal size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="micro">Micro ($0-$500K)</SelectItem>
                        <SelectItem value="small">Small ($500K-$2M)</SelectItem>
                        <SelectItem value="medium">Medium ($2M-$10M)</SelectItem>
                        <SelectItem value="large">Large ($10M+)</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Acquisition Timeline</Label>
                    <Select value={formData.timeline} onValueChange={(value) => updateFormData("timeline", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate (0-3 months)</SelectItem>
                        <SelectItem value="short">Short-term (3-6 months)</SelectItem>
                        <SelectItem value="medium">Medium-term (6-12 months)</SelectItem>
                        <SelectItem value="long">Long-term (1+ years)</SelectItem>
                        <SelectItem value="ongoing">Ongoing search</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specificRequirements">Specific Requirements or Deal-Breakers</Label>
                  <Textarea
                    id="specificRequirements"
                    value={formData.specificRequirements}
                    onChange={(e) => updateFormData("specificRequirements", e.target.value)}
                    placeholder="Describe any specific requirements, must-haves, or absolute deal-breakers..."
                    rows={4}
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
            <Link href="/dashboard/buyer">
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
