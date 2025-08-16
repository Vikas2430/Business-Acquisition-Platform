"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  MessageCircle,
  TrendingUp,
  DollarSign,
  MapPin,
  Users,
  Star,
  Building,
  Settings,
  Bell,
  Phone,
  Mail,
  Copy,
  Check,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

// Mock data for available businesses
const mockAvailableBusinesses = [
  {
    id: 1,
    name: "TechFlow Solutions",
    industry: "Technology",
    location: "San Francisco, CA",
    revenue: "$2.4M",
    asking: "$8.5M",
    multiple: "3.5x",
    description: "B2B SaaS platform for workflow automation with 500+ enterprise clients",
    growth: "+45%",
    employees: 28,
    established: 2019,
    image: "/professional-woman-diverse.png",
    seller: "Sarah Chen",
    matchScore: 94,
    tags: ["SaaS", "High Growth", "Profitable"],
  },
  {
    id: 2,
    name: "Green Valley Logistics",
    industry: "Transportation",
    location: "Austin, TX",
    revenue: "$5.2M",
    asking: "$12M",
    multiple: "2.3x",
    description: "Regional logistics company specializing in eco-friendly delivery solutions",
    growth: "+28%",
    employees: 45,
    established: 2016,
    image: "/professional-man.png",
    seller: "Michael Rodriguez",
    matchScore: 87,
    tags: ["Established", "Sustainable", "Regional Leader"],
  },
  {
    id: 3,
    name: "Artisan Coffee Co.",
    industry: "Food & Beverage",
    location: "Portland, OR",
    revenue: "$1.8M",
    asking: "$4.2M",
    multiple: "2.3x",
    description: "Premium coffee roastery with 12 retail locations and growing online presence",
    growth: "+32%",
    employees: 35,
    established: 2018,
    image: "/professional-asian-woman.png",
    seller: "Lisa Park",
    matchScore: 82,
    tags: ["Retail", "Brand", "Expanding"],
  },
]

const recentActivity = [
  {
    type: "match",
    business: "TechFlow Solutions",
    seller: "Sarah Chen",
    time: "2 hours ago",
    action: "New match available",
  },
  {
    type: "message",
    business: "Green Valley Logistics",
    seller: "Michael Rodriguez",
    time: "1 day ago",
    action: "Sent you a message",
  },
  {
    type: "favorite",
    business: "Artisan Coffee Co.",
    seller: "Lisa Park",
    time: "2 days ago",
    action: "Added to favorites",
  },
]

export default function BuyerDashboardPage() {
  const [matches, setMatches] = useState<Array<{
    id: string
    businessName: string
    businessTitle: string
    businessCompany: string
    businessAvatar: string
    matchScore: number
    connectedAt: string
    contactInfo: {
      email: string
      phone: string
      linkedin: string
      website: string
    }
  }>>([])
  const [passedBusinesses, setPassedBusinesses] = useState<string[]>([])
  const [likedBusinesses, setLikedBusinesses] = useState<string[]>([])
  const [currentBusinessIndex, setCurrentBusinessIndex] = useState(0)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const defaultTab = searchParams?.get("tab") || "browse"

  const [availableBusinesses, setAvailableBusinesses] = useState(mockAvailableBusinesses)

  useEffect(() => {
    const savedMatches = JSON.parse(localStorage.getItem("buyerMatches") || "[]")
    const savedPassedBusinesses = JSON.parse(localStorage.getItem("passedBusinesses") || "[]")
    const savedLikedBusinesses = JSON.parse(localStorage.getItem("likedBusinesses") || "[]")
    setMatches(savedMatches)
    setPassedBusinesses(savedPassedBusinesses)
    setLikedBusinesses(savedLikedBusinesses)
    setAvailableBusinesses(
      mockAvailableBusinesses.filter(
        (business) =>
          !savedPassedBusinesses.includes(business.id.toString()) &&
          !savedLikedBusinesses.includes(business.id.toString()),
      ),
    )
  }, [])

  useEffect(() => {
    if (currentBusinessIndex >= availableBusinesses.length && availableBusinesses.length > 0) {
      setCurrentBusinessIndex(0)
    }
  }, [availableBusinesses.length, currentBusinessIndex])

  const currentBusiness = availableBusinesses[currentBusinessIndex]

  const handlePass = () => {
    if (!currentBusiness) return

    const newPassedBusinesses = [...passedBusinesses, currentBusiness.id.toString()]
    setPassedBusinesses(newPassedBusinesses)
    localStorage.setItem("passedBusinesses", JSON.stringify(newPassedBusinesses))

    // Move to next business
    if (currentBusinessIndex < availableBusinesses.length - 1) {
      setCurrentBusinessIndex(currentBusinessIndex + 1)
    }
  }

  const handleLike = () => {
    if (!currentBusiness) return

    const newLikedBusinesses = [...likedBusinesses, currentBusiness.id.toString()]
    setLikedBusinesses(newLikedBusinesses)
    localStorage.setItem("likedBusinesses", JSON.stringify(newLikedBusinesses))

    // Move to next business
    if (currentBusinessIndex < availableBusinesses.length - 1) {
      setCurrentBusinessIndex(currentBusinessIndex + 1)
    }
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/30 to-background">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-serif font-bold text-xl">DealConnect</span>
              </div>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">Buyer Dashboard</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/professional-man.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-serif font-bold text-3xl mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">
            Discover your next acquisition opportunity. {availableBusinesses.length} businesses match your criteria.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available Matches</p>
                  <p className="text-2xl font-bold">{availableBusinesses.length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Conversations</p>
                  <p className="text-2xl font-bold">{matches.length}</p>
                </div>
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Saved Businesses</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <Heart className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Budget Range</p>
                  <p className="text-2xl font-bold">$1M-5M</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue={defaultTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="browse">Browse Businesses</TabsTrigger>
            <TabsTrigger value="matches">My Matches</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Browse Businesses Tab */}
          <TabsContent value="browse" className="space-y-6">
            {availableBusinesses.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Building className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-serif font-semibold text-xl mb-2">All caught up!</h3>
                  <p className="text-muted-foreground mb-4">
                    You&apos;ve reviewed all available businesses. Check back later for new opportunities!
                  </p>
                  <Button
                    onClick={() => {
                      setPassedBusinesses([])
                      setLikedBusinesses([])
                      localStorage.removeItem("passedBusinesses")
                      localStorage.removeItem("likedBusinesses")
                      setCurrentBusinessIndex(0)
                    }}
                  >
                    Reset and Browse Again
                  </Button>
                </CardContent>
              </Card>
            ) : currentBusiness ? (
              <div className="max-w-2xl mx-auto">
                <Card className="overflow-hidden shadow-xl">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
                      <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                        <AvatarImage src={currentBusiness.image || "/placeholder.svg"} />
                        <AvatarFallback className="text-2xl font-bold">
                          {currentBusiness.seller
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-lg px-3 py-1">
                        {Math.max(65, currentBusiness.matchScore)}% match
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h2 className="font-serif font-bold text-2xl mb-2">{currentBusiness.name}</h2>
                      <p className="text-muted-foreground text-lg">{currentBusiness.seller}</p>
                      <div className="flex items-center justify-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Building className="w-4 h-4" />
                          <span>{currentBusiness.industry}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{currentBusiness.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <p className="text-center text-muted-foreground">{currentBusiness.description}</p>

                      <div className="flex flex-wrap justify-center gap-2">
                        {currentBusiness.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <DollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
                          <p className="font-semibold">{currentBusiness.revenue}</p>
                          <p className="text-xs text-muted-foreground">Annual Revenue</p>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                          <p className="font-semibold">{currentBusiness.growth}</p>
                          <p className="text-xs text-muted-foreground">Growth Rate</p>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                          <p className="font-semibold">{currentBusiness.employees}</p>
                          <p className="text-xs text-muted-foreground">Employees</p>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <Star className="w-6 h-6 text-primary mx-auto mb-2" />
                          <p className="font-semibold">{currentBusiness.asking}</p>
                          <p className="text-xs text-muted-foreground">Asking Price</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-center space-x-6 pt-6">
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={handlePass}
                          className="w-16 h-16 rounded-full border-2 border-red-200 hover:border-red-300 hover:bg-red-50 bg-transparent"
                        >
                          <span className="text-2xl">✕</span>
                        </Button>

                        <Link href={`/business/${currentBusiness.id}`}>
                          <Button variant="outline" size="lg" className="px-8 bg-transparent">
                            View Details
                          </Button>
                        </Link>

                        <Button
                          size="lg"
                          onClick={handleLike}
                          className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90"
                        >
                          <Heart className="w-6 h-6" />
                        </Button>
                      </div>

                      <div className="text-center text-sm text-muted-foreground">
                        {currentBusinessIndex + 1} of {availableBusinesses.length} businesses
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : null}
          </TabsContent>

          {/* My Matches Tab */}
          <TabsContent value="matches">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Active Matches</CardTitle>
                <CardDescription>Buyers you&apos;ve connected with and their contact information</CardDescription>
              </CardHeader>
              <CardContent>
                {matches.length > 0 ? (
                  <div className="space-y-4">
                    {matches.map((match) => (
                      <Card key={match.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={match.businessAvatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {match.businessName
                                    .split(" ")
                                    .map((n: string) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-serif font-semibold text-lg">{match.businessName}</h3>
                                <p className="text-muted-foreground">
                                  {match.businessTitle} at {match.businessCompany}
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge className="bg-green-100 text-green-700 border-green-200">
                                    <Star className="w-3 h-3 mr-1" />
                                    {match.matchScore}% match
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    Connected {new Date(match.connectedAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <h4 className="font-medium text-sm text-muted-foreground">Contact Information</h4>

                              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                <div className="flex items-center space-x-2">
                                  <Mail className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm font-medium">{match.contactInfo.email}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(match.contactInfo.email, `email-${match.id}`)}
                                >
                                  {copiedField === `email-${match.id}` ? (
                                    <Check className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </Button>
                              </div>

                              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                <div className="flex items-center space-x-2">
                                  <Phone className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm font-medium">{match.contactInfo.phone}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(match.contactInfo.phone, `phone-${match.id}`)}
                                >
                                  {copiedField === `phone-${match.id}` ? (
                                    <Check className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </Button>
                              </div>
                            </div>

                            <div className="flex flex-col justify-center space-y-2">
                              <Button className="w-full">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Start Conversation
                              </Button>
                              <Link href={`/buyer/${match.id}`}>
                                <Button variant="outline" className="w-full bg-transparent">
                                  View Full Profile
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No active matches yet</h3>
                    <p className="text-muted-foreground mb-4">Connect with buyers to start building relationships</p>
                    <Link href="/dashboard/buyer?tab=browse">
                      <Button>Browse Businesses</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Tab */}
          <TabsContent value="saved">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Saved Businesses</CardTitle>
                <CardDescription>Businesses you&apos;ve saved for later review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No saved businesses yet</h3>
                  <p className="text-muted-foreground mb-4">Save interesting businesses to review them later</p>
                  <Button>Browse Businesses</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Recent Activity</CardTitle>
                <CardDescription>Your latest interactions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        {activity.type === "match" && <Star className="w-5 h-5 text-primary" />}
                        {activity.type === "message" && <MessageCircle className="w-5 h-5 text-primary" />}
                        {activity.type === "favorite" && <Heart className="w-5 h-5 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.business}</p>
                        <p className="text-sm text-muted-foreground">{activity.action}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
