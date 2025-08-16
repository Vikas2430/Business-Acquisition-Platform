"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Heart,
  X,
  MapPin,
  DollarSign,
  TrendingUp,
  Building2,
  Clock,
  Star,
  MessageCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bot,
} from "lucide-react"
import Link from "next/link"

// Mock buyer data with guaranteed positive match scores
const mockBuyers = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Serial Entrepreneur",
    company: "Chen Ventures",
    location: "San Francisco, CA",
    budget: "$2M - $5M",
    experience: "Experienced (7 deals)",
    industries: ["Technology", "SaaS"],
    timeline: "3-6 months",
    matchScore: Math.max(85, Math.floor(Math.random() * 15) + 85), // 85-100
    avatar: "/professional-woman-diverse.png",
    background:
      "Former tech executive with 15+ years experience. Successfully scaled 3 companies from startup to exit.",
    fundingSource: "Personal + Investor backing",
    roiExpectation: "25-35% annually",
    involvementLevel: "Strategic oversight",
    recentActivity: "Active 2 hours ago",
    email: "sarah.chen@chenventures.com",
    phone: "+1 (415) 555-0123",
    linkedin: "linkedin.com/in/sarahchen",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Private Equity Partner",
    company: "Summit Capital",
    location: "Austin, TX",
    budget: "$5M - $10M",
    experience: "Serial acquirer (15+ deals)",
    industries: ["Healthcare", "Services"],
    timeline: "Immediate",
    matchScore: Math.max(75, Math.floor(Math.random() * 25) + 75), // 75-100
    avatar: "/professional-man.png",
    background:
      "PE partner specializing in healthcare services. Track record of successful exits and operational improvements.",
    fundingSource: "Fund capital",
    roiExpectation: "20-30% annually",
    involvementLevel: "Hands-on management",
    recentActivity: "Active 1 day ago",
    email: "m.rodriguez@summitcap.com",
    phone: "+1 (512) 555-0456",
    linkedin: "linkedin.com/in/michaelrodriguez",
  },
  {
    id: 3,
    name: "Jennifer Park",
    title: "Investment Director",
    company: "Growth Partners LLC",
    location: "New York, NY",
    budget: "$1M - $3M",
    experience: "Some experience (4 deals)",
    industries: ["Retail", "E-commerce"],
    timeline: "6-12 months",
    matchScore: Math.max(70, Math.floor(Math.random() * 30) + 70), // 70-100
    avatar: "/professional-asian-woman.png",
    background:
      "Investment professional focused on consumer brands and retail. Strong operational background in scaling businesses.",
    fundingSource: "Fund + SBA financing",
    roiExpectation: "15-25% annually",
    involvementLevel: "Strategic oversight",
    recentActivity: "Active 3 hours ago",
    email: "j.park@growthpartners.com",
    phone: "+1 (212) 555-0789",
    linkedin: "linkedin.com/in/jenniferpark",
  },
  {
    id: 4,
    name: "David Kim",
    title: "Business Owner",
    company: "Kim Holdings",
    location: "Seattle, WA",
    budget: "$3M - $7M",
    experience: "Experienced (5 deals)",
    industries: ["Manufacturing", "Technology"],
    timeline: "2-4 months",
    matchScore: Math.max(80, Math.floor(Math.random() * 20) + 80), // 80-100
    avatar: "/professional-asian-man.png",
    background:
      "Successful business owner looking to expand portfolio. Strong operational background in manufacturing and tech.",
    fundingSource: "Personal capital",
    roiExpectation: "20-30% annually",
    involvementLevel: "Strategic oversight",
    recentActivity: "Active 5 hours ago",
    email: "david@kimholdings.com",
    phone: "+1 (206) 555-0321",
    linkedin: "linkedin.com/in/davidkim",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    title: "Investment Manager",
    company: "Pacific Ventures",
    location: "Los Angeles, CA",
    budget: "$1.5M - $4M",
    experience: "Some experience (3 deals)",
    industries: ["Consumer Goods", "Services"],
    timeline: "4-8 months",
    matchScore: Math.max(65, Math.floor(Math.random() * 35) + 65), // 65-100
    avatar: "/professional-blonde-woman.png",
    background:
      "Investment manager with focus on consumer brands and service businesses. Strong analytical and operational skills.",
    fundingSource: "Fund capital + SBA",
    roiExpectation: "18-28% annually",
    involvementLevel: "Hands-on management",
    recentActivity: "Active 1 day ago",
    email: "lisa.thompson@pacificventures.com",
    phone: "+1 (310) 555-0654",
    linkedin: "linkedin.com/in/lisathompson",
  },
]

export default function SellerDashboard() {
  const [matches, setMatches] = useState<number[]>([])
  const [rejected, setRejected] = useState<number[]>([])
  const [showDetails, setShowDetails] = useState(false)
  const [currentBuyerIndex, setCurrentBuyerIndex] = useState(0)
  const [availableBuyers, setAvailableBuyers] = useState<Array<{
    id: number
    name: string
    title: string
    company: string
    avatar: string
    location: string
    budget: string
    experience: string
    industries: string[]
    timeline: string
    background: string
    fundingSource: string
    roiExpectation: string
    involvementLevel: string
    recentActivity: string
    matchScore: number
  }>>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedMatches = localStorage.getItem("seller-matches")
    const savedRejected = localStorage.getItem("seller-rejected")

    if (savedMatches) {
      setMatches(JSON.parse(savedMatches))
    }
    if (savedRejected) {
      setRejected(JSON.parse(savedRejected))
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    localStorage.setItem("seller-matches", JSON.stringify(matches))
  }, [matches])

  useEffect(() => {
    localStorage.setItem("seller-rejected", JSON.stringify(rejected))
  }, [rejected])

  useEffect(() => {
    const filteredBuyers = mockBuyers.filter((buyer) => !matches.includes(buyer.id) && !rejected.includes(buyer.id))
    setAvailableBuyers(filteredBuyers)

    if (filteredBuyers.length === 0 && (matches.length > 0 || rejected.length > 0)) {
      // Reset after a short delay to show completion state briefly
      setTimeout(() => {
        setMatches([])
        setRejected([])
        localStorage.removeItem("seller-matches")
        localStorage.removeItem("seller-rejected")
        localStorage.removeItem("matched-buyers")
        setCurrentBuyerIndex(0)
      }, 3000)
    } else if (filteredBuyers.length > 0 && currentBuyerIndex >= filteredBuyers.length) {
      setCurrentBuyerIndex(0)
    }
  }, [matches, rejected, currentBuyerIndex])

  const currentBuyer = availableBuyers[currentBuyerIndex]

  const handleAccept = () => {
    if (currentBuyer) {
      const newMatches = [...matches, currentBuyer.id]
      setMatches(newMatches)

      const matchedBuyers = JSON.parse(localStorage.getItem("matched-buyers") || "[]")
      const buyerWithMatchDate = {
        ...currentBuyer,
        matchedAt: new Date().toISOString(),
        status: "pending",
      }
      matchedBuyers.push(buyerWithMatchDate)
      localStorage.setItem("matched-buyers", JSON.stringify(matchedBuyers))

      nextBuyer()
    }
  }

  const handleReject = () => {
    if (currentBuyer) {
      setRejected([...rejected, currentBuyer.id])
      nextBuyer()
    }
  }

  const nextBuyer = () => {
    if (currentBuyerIndex < availableBuyers.length - 1) {
      setCurrentBuyerIndex(currentBuyerIndex + 1)
    } else {
      setCurrentBuyerIndex(0)
    }
    setShowDetails(false)
  }

  const prevBuyer = () => {
    if (currentBuyerIndex > 0) {
      setCurrentBuyerIndex(currentBuyerIndex - 1)
    } else {
      setCurrentBuyerIndex(availableBuyers.length - 1)
    }
    setShowDetails(false)
  }

  if (isLoading || (availableBuyers.length === 0 && !isLoading) || (!currentBuyer && !isLoading)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent/30 to-background flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle className="font-serif">
              {isLoading ? "Loading..." : availableBuyers.length === 0 ? "Great Job!" : "Loading..."}
            </CardTitle>
            <CardDescription>
              {isLoading
                ? "Loading your buyer preferences..."
                : availableBuyers.length === 0
                  ? "You've reviewed all buyers! Resetting in 3 seconds for more practice..."
                  : "Please wait while we load buyer profiles."}
            </CardDescription>
          </CardHeader>
          {!isLoading && (
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">{matches.length}</p>
                  <p className="text-sm text-muted-foreground">Matches Made</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-muted-foreground">{rejected.length}</p>
                  <p className="text-sm text-muted-foreground">Buyers Passed</p>
                </div>
              </div>
              {matches.length > 0 && (
                <Link href="/dashboard/seller/matches">
                  <Button className="bg-primary hover:bg-primary/90 w-full">View Your Matches</Button>
                </Link>
              )}
              <Link href="/dashboard/seller/ai-analysis">
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Analyze Your Business with AI
                </Button>
              </Link>
            </CardContent>
          )}
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/30 to-background">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif font-bold text-xl">DealConnect</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/seller/matches">
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer">
                  {matches.length} Matches
                </Badge>
              </Link>
              <Badge variant="outline">{availableBuyers.length} Remaining</Badge>
              <Link href="/dashboard/seller/ai-analysis">
                <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Bot className="w-4 h-4 mr-2" />
                  AI Business Analysis
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Messages
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="font-serif font-bold text-2xl">Discover Buyers</h1>
            <span className="text-sm text-muted-foreground">
              {currentBuyerIndex + 1} of {availableBuyers.length}
            </span>
          </div>
          <Progress value={((currentBuyerIndex + 1) / availableBuyers.length) * 100} className="h-2" />
        </div>

        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 shadow-md">
          <CardContent className="py-6">
            <h3 className="font-serif font-semibold text-lg text-center mb-4">How to Match with Buyers</h3>
            <div className="flex items-center justify-center space-x-12 text-sm">
              <div className="flex flex-col items-center space-y-2 text-red-600">
                <div className="w-12 h-12 rounded-full border-3 border-red-200 flex items-center justify-center bg-red-50">
                  <X className="w-6 h-6" />
                </div>
                <span className="font-medium">Pass</span>
                <span className="text-xs text-center">Remove from feed</span>
              </div>
              <div className="flex flex-col items-center space-y-2 text-primary">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="font-medium">Match</span>
                <span className="text-xs text-center">Connect with buyer</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Card */}
        <div className="relative">
          <Card className="max-w-2xl mx-auto border-2 shadow-xl">
            {/* Match Score Badge */}
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-primary text-primary-foreground flex items-center space-x-1">
                <Star className="w-3 h-3" />
                <span>{currentBuyer.matchScore}% Match</span>
              </Badge>
            </div>

            <CardHeader className="text-center pb-4">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={currentBuyer.avatar || "/placeholder.svg"} alt={currentBuyer.name} />
                <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                  {currentBuyer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="font-serif text-2xl">{currentBuyer.name}</CardTitle>
              <CardDescription className="text-base">
                {currentBuyer.title} at {currentBuyer.company}
              </CardDescription>
              <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground mt-2">
                <MapPin className="w-4 h-4" />
                <span>{currentBuyer.location}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Key Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-accent/50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-sm font-medium">Budget</p>
                  <p className="text-xs text-muted-foreground">{currentBuyer.budget}</p>
                </div>
                <div className="text-center p-3 bg-accent/50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-sm font-medium">Experience</p>
                  <p className="text-xs text-muted-foreground">{currentBuyer.experience}</p>
                </div>
                <div className="text-center p-3 bg-accent/50 rounded-lg">
                  <Building2 className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-sm font-medium">Industries</p>
                  <p className="text-xs text-muted-foreground">{currentBuyer.industries.join(", ")}</p>
                </div>
                <div className="text-center p-3 bg-accent/50 rounded-lg">
                  <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-sm font-medium">Timeline</p>
                  <p className="text-xs text-muted-foreground">{currentBuyer.timeline}</p>
                </div>
              </div>

              {/* Background Preview */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Background</h4>
                <p className="text-sm text-muted-foreground line-clamp-3">{currentBuyer.background}</p>
              </div>

              {/* Show More Details Button */}
              <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? "Show Less" : "View Full Profile"}
              </Button>

              {/* Detailed Information */}
              {showDetails && (
                <div className="space-y-4 border-t pt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-sm mb-1">Funding Source</h5>
                      <p className="text-sm text-muted-foreground">{currentBuyer.fundingSource}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-1">ROI Expectation</h5>
                      <p className="text-sm text-muted-foreground">{currentBuyer.roiExpectation}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-1">Involvement Level</h5>
                      <p className="text-sm text-muted-foreground">{currentBuyer.involvementLevel}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-1">Recent Activity</h5>
                      <p className="text-sm text-muted-foreground">{currentBuyer.recentActivity}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={prevBuyer}
            disabled={availableBuyers.length <= 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={nextBuyer}
            disabled={availableBuyers.length <= 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex justify-center space-x-12 mt-8">
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="w-24 h-24 rounded-full border-4 border-red-200 hover:border-red-300 hover:bg-red-50 bg-background shadow-lg transition-all duration-200 hover:scale-105 mb-3"
              onClick={handleReject}
            >
              <X className="w-10 h-10 text-red-500" />
            </Button>
            <p className="text-base font-semibold text-red-600">Pass</p>
            <p className="text-xs text-muted-foreground">Remove from feed</p>
          </div>
          <div className="text-center">
            <Button
              size="lg"
              className="w-24 h-24 rounded-full bg-primary hover:bg-primary/90 shadow-xl transition-all duration-200 hover:scale-105 mb-3"
              onClick={handleAccept}
            >
              <Heart className="w-10 h-10" />
            </Button>
            <p className="text-base font-semibold text-primary">Match</p>
            <p className="text-xs text-muted-foreground">Connect with buyer</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex justify-center space-x-8 mt-8 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">{matches.length}</p>
            <p className="text-sm text-muted-foreground">Matches</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-muted-foreground">{rejected.length}</p>
            <p className="text-sm text-muted-foreground">Passed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{availableBuyers.length}</p>
            <p className="text-sm text-muted-foreground">Remaining</p>
          </div>
        </div>

        {/* Prominent Call-to-Action for AI Analysis */}
        <div className="mt-12 text-center">
          <Card className="max-w-md mx-auto bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="py-6">
              <Bot className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-serif font-semibold text-lg mb-2">Ready to Sell?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get AI-powered insights to optimize your business for sale and maximize valuation
              </p>
              <Link href="/dashboard/seller/ai-analysis">
                <Button className="bg-primary hover:bg-primary/90 w-full">
                  <Bot className="w-4 h-4 mr-2" />
                  Analyze Your Business
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
