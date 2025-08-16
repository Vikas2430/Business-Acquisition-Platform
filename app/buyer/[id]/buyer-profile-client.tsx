"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Users,
  ArrowLeft,
  MapPin,
  Star,
  CheckCircle,
  Phone,
  Mail,
  LinkedinIcon as LinkedIn,
  Globe,
  Calendar,
  Target,
  Award,
  Heart,
  X,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock buyer data - in real app this would come from API
const mockBuyer = {
  id: 1,
  name: "Sarah Chen",
  title: "Serial Entrepreneur & Investor",
  company: "Chen Ventures",
  location: "San Francisco, CA",
  joinedDate: "March 2023",
  verified: true,
  premium: true,
  avatar: "/professional-woman-diverse.png",
  email: "sarah@chenventures.com",
  phone: "+1 (555) 123-4567",
  linkedin: "linkedin.com/in/sarahchen",
  website: "chenventures.com",
  budget: "$2M - $5M",
  budgetFlexible: true,
  experience: "Experienced (7 deals)",
  industries: ["Technology", "SaaS", "E-commerce"],
  businessTypes: ["SaaS", "Subscription Model", "E-commerce"],
  timeline: "3-6 months",
  geographicPreference: "National",
  involvementLevel: "Strategic oversight",
  fundingSource: "Personal + Investor backing",
  roiExpectation: "25-35% annually",
  dealStructurePrefs: ["All Cash", "Earnout Structure", "Equity Rollover"],
  background: "Former tech executive with 15+ years experience building and scaling technology companies. Successfully scaled 3 companies from startup to exit, with a combined exit value of over $150M. Currently managing a $25M investment fund focused on profitable SaaS businesses.",
  dealHistory: [
    {
      company: "CloudSync Pro",
      industry: "SaaS",
      dealSize: "$3.2M",
      year: "2023",
      outcome: "Active - 40% revenue growth",
      role: "Lead Investor",
    },
    {
      company: "RetailFlow",
      industry: "E-commerce",
      dealSize: "$1.8M",
      year: "2022",
      outcome: "Successful exit - 3.2x return",
      role: "Strategic Advisor",
    },
    {
      company: "DataViz Solutions",
      industry: "Technology",
      dealSize: "$4.1M",
      year: "2021",
      outcome: "Active - Expanded to 3 markets",
      role: "Operating Partner",
    },
  ],
  specificRequirements: "Looking for profitable SaaS businesses with recurring revenue models. Strong preference for companies with proven product-market fit and growth potential. Must have clean financials and scalable operations.",
  recentActivity: "Active 2 hours ago",
  responseRate: 95,
  avgResponseTime: "4 hours",
  reviews: [
    {
      seller: "Mike Johnson",
      company: "TechFlow Solutions",
      rating: 5,
      comment: "Sarah was professional, transparent, and made the entire process smooth. Highly recommend working with her.",
      date: "2 months ago",
    },
    {
      seller: "Lisa Wang",
      company: "E-commerce Plus",
      rating: 5,
      comment: "Excellent communication and fair deal terms. Sarah brought valuable strategic insights to help grow the business.",
      date: "6 months ago",
    },
  ],
  matchScore: 92,
}

interface BuyerProfileClientProps {
  id: string
}

export default function BuyerProfileClient({ id }: BuyerProfileClientProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showConnectDialog, setShowConnectDialog] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const router = useRouter()

  const handlePass = () => {
    const passedBusinesses = JSON.parse(localStorage.getItem("passedBusinesses") || "[]")
    if (!passedBusinesses.includes(id)) {
      passedBusinesses.push(id)
      localStorage.setItem("passedBusinesses", JSON.stringify(passedBusinesses))
    }
    router.push("/dashboard/buyer")
  }

  const handleConnect = () => {
    const matches = JSON.parse(localStorage.getItem("buyerMatches") || "[]")
    const matchData = {
      id: id,
      businessName: mockBuyer.name,
      businessTitle: mockBuyer.title,
      businessCompany: mockBuyer.company,
      businessAvatar: mockBuyer.avatar,
      matchScore: mockBuyer.matchScore,
      connectedAt: new Date().toISOString(),
      contactInfo: {
        email: mockBuyer.email,
        phone: mockBuyer.phone,
        linkedin: mockBuyer.linkedin,
        website: mockBuyer.website,
      },
    }
    if (!matches.find((match: { id: string }) => match.id === id)) {
      matches.push(matchData)
      localStorage.setItem("buyerMatches", JSON.stringify(matches))
    }
    setShowConnectDialog(true)
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/30 to-background">
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/buyer" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Buyer Dashboard</span>
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={mockBuyer.avatar || "/placeholder.svg"} alt={mockBuyer.name} />
                  <AvatarFallback className="text-2xl font-semibold bg-primary/10 text-primary">
                    {mockBuyer.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <CardTitle className="font-serif text-3xl">{mockBuyer.name}</CardTitle>
                    {mockBuyer.verified && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {mockBuyer.premium && (
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                        <Award className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-lg mb-2">
                    {mockBuyer.title} at {mockBuyer.company}
                  </CardDescription>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{mockBuyer.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {mockBuyer.joinedDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-3">
                <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">
                  <Star className="w-4 h-4 mr-2" />
                  {mockBuyer.matchScore}% Match
                </Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="bg-transparent hover:bg-red-50 hover:border-red-200 hover:text-red-600" onClick={handlePass}>
                    <X className="w-4 h-4 mr-2" />
                    Pass
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={handleConnect}>
                    <Heart className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="track-record">Track Record</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center space-x-2">
                    <Target className="w-5 h-5 text-primary" />
                    <span>Investment Criteria</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Budget Range</p>
                      <p className="font-medium">{mockBuyer.budget}</p>
                      {mockBuyer.budgetFlexible && (
                        <Badge variant="outline" className="mt-1 text-xs">Flexible</Badge>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Experience</p>
                      <p className="font-medium">{mockBuyer.experience}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Timeline</p>
                      <p className="font-medium">{mockBuyer.timeline}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">ROI Target</p>
                      <p className="font-medium">{mockBuyer.roiExpectation}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Preferred Industries</p>
                    <div className="flex flex-wrap gap-2">
                      {mockBuyer.industries.map((industry) => (
                        <Badge key={industry} variant="secondary">{industry}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <span>Contact & Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{mockBuyer.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{mockBuyer.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <LinkedIn className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{mockBuyer.linkedin}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{mockBuyer.website}</span>
                    </div>
                  </div>
                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Response Rate</span>
                      <span className="text-sm font-medium">{mockBuyer.responseRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Avg Response Time</span>
                      <span className="text-sm font-medium">{mockBuyer.avgResponseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Last Active</span>
                      <span className="text-sm font-medium">{mockBuyer.recentActivity}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Professional Background</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{mockBuyer.background}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="track-record" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Investment History</CardTitle>
                <CardDescription>Recent acquisitions and their outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBuyer.dealHistory.map((deal, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{deal.company}</h4>
                          <p className="text-sm text-muted-foreground">{deal.industry} • {deal.year}</p>
                        </div>
                        <Badge variant="outline">{deal.dealSize}</Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-sm text-muted-foreground">Role: </span>
                          <span className="font-medium">{deal.role}</span>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Outcome: </span>
                          <span className="font-medium">{deal.outcome}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Deal Structure Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Preferred Structures</p>
                      <div className="flex flex-wrap gap-2">
                        {mockBuyer.dealStructurePrefs.map((pref) => (
                          <Badge key={pref} variant="secondary">{pref}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Funding Source</p>
                      <p className="text-sm">{mockBuyer.fundingSource}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Involvement Level</p>
                      <p className="text-sm">{mockBuyer.involvementLevel}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Geographic & Other Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Geographic Preference</p>
                      <p className="text-sm">{mockBuyer.geographicPreference}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Specific Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{mockBuyer.specificRequirements}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Seller Reviews</CardTitle>
                <CardDescription>Feedback from previous business sellers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockBuyer.reviews.map((review, index) => (
                    <div key={index} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{review.seller}</h4>
                          <p className="text-sm text-muted-foreground">{review.company}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 border-2 border-primary/20">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg mb-1">Ready to connect with {mockBuyer.name.split(" ")[0]}?</h3>
                <p className="text-muted-foreground">Start a conversation and explore this opportunity</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" size="lg" className="bg-transparent hover:bg-red-50 hover:border-red-200 hover:text-red-600" onClick={handlePass}>
                  <X className="w-4 h-4 mr-2" />
                  Pass
                </Button>
                <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={handleConnect}>
                  <Heart className="w-4 h-4 mr-2" />
                  Connect Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Connection Successful! 🎉</DialogTitle>
            <DialogDescription>
              You&apos;re now connected with {mockBuyer.name}. Here&apos;s their contact information:
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{mockBuyer.email}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(mockBuyer.email, "email")}>
                {copiedField === "email" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{mockBuyer.phone}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(mockBuyer.phone, "phone")}>
                {copiedField === "phone" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <LinkedIn className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{mockBuyer.linkedin}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(`https://${mockBuyer.linkedin}`, "linkedin")}>
                {copiedField === "linkedin" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setShowConnectDialog(false)}>Close</Button>
            <Link href="/dashboard/seller/matches">
              <Button onClick={() => setShowConnectDialog(false)}>View in My Matches</Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
