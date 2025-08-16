"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageCircle, Calendar, MapPin, DollarSign, ArrowLeft, Phone, Mail, Star } from "lucide-react"
import Link from "next/link"

// Mock matches data
const mockMatches = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Serial Entrepreneur",
    company: "Chen Ventures",
    location: "San Francisco, CA",
    budget: "$2M - $5M",
    matchScore: 92,
    avatar: "/professional-woman-diverse.png",
    status: "active",
    lastMessage: "I'd love to discuss your business further. When would be a good time for a call?",
    matchedAt: "2 hours ago",
    email: "sarah@chenventures.com",
    phone: "+1 (555) 123-4567",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Private Equity Partner",
    company: "Summit Capital",
    location: "Austin, TX",
    budget: "$5M - $10M",
    matchScore: 88,
    avatar: "/professional-man.png",
    status: "pending",
    lastMessage: null,
    matchedAt: "1 day ago",
    email: "m.rodriguez@summitcap.com",
    phone: "+1 (555) 987-6543",
  },
]

const mockPending = [
  {
    id: 3,
    name: "Jennifer Park",
    title: "Investment Director",
    company: "Growth Partners LLC",
    location: "New York, NY",
    budget: "$1M - $3M",
    matchScore: 85,
    avatar: "/professional-asian-woman.png",
    status: "pending",
    matchedAt: "3 days ago",
  },
]

export default function SellerMatches() {
  const [activeTab, setActiveTab] = useState("active")

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/30 to-background">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/seller"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Discovery</span>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif font-bold text-3xl mb-2">Your Matches</h1>
          <p className="text-muted-foreground">Connect with buyers who are interested in your business</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Active Conversations ({mockMatches.filter((m) => m.status === "active").length})</span>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Pending Responses ({mockPending.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {mockMatches
              .filter((match) => match.status === "active")
              .map((match) => (
                <Card
                  key={match.id}
                  className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={match.avatar || "/placeholder.svg"} alt={match.name} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {match.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="font-serif text-xl">{match.name}</CardTitle>
                          <CardDescription className="text-base">
                            {match.title} at {match.company}
                          </CardDescription>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{match.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-3 h-3" />
                              <span>{match.budget}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-primary/10 text-primary border-primary/20 mb-2">
                          <Star className="w-3 h-3 mr-1" />
                          {match.matchScore}% Match
                        </Badge>
                        <p className="text-xs text-muted-foreground">Matched {match.matchedAt}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {match.lastMessage && (
                      <div className="bg-muted/50 p-3 rounded-lg mb-4">
                        <p className="text-sm text-muted-foreground mb-1">Latest message:</p>
                        <p className="text-sm">{match.lastMessage}</p>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{match.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{match.phone}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/buyer/${match.id}`}>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            View Profile
                          </Button>
                        </Link>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {mockPending.map((match) => (
              <Card
                key={match.id}
                className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={match.avatar || "/placeholder.svg"} alt={match.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {match.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="font-serif text-xl">{match.name}</CardTitle>
                        <CardDescription className="text-base">
                          {match.title} at {match.company}
                        </CardDescription>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{match.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-3 h-3" />
                            <span>{match.budget}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-primary/10 text-primary border-primary/20 mb-2">
                        <Star className="w-3 h-3 mr-1" />
                        {match.matchScore}% Match
                      </Badge>
                      <p className="text-xs text-muted-foreground">Matched {match.matchedAt}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg mb-4">
                    <p className="text-sm text-amber-800">
                      Waiting for {match.name.split(" ")[0]} to respond to your connection request.
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-amber-600 border-amber-200">
                      Pending Response
                    </Badge>
                    <Link href={`/buyer/${match.id}`}>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
