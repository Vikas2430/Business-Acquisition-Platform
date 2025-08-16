"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, TrendingUp, Building2, Clock, Star, CheckCircle, Award } from "lucide-react"
import Link from "next/link"

interface BuyerProfileCardProps {
  buyer: {
    id: number
    name: string
    title: string
    company: string
    location: string
    budget: string
    experience: string
    industries: string[]
    timeline: string
    matchScore: number
    avatar?: string
    verified?: boolean
    premium?: boolean
    background: string
    recentActivity: string
  }
  showActions?: boolean
  onAccept?: () => void
  onReject?: () => void
}

export function BuyerProfileCard({ buyer, showActions = false, onAccept, onReject }: BuyerProfileCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      {/* Match Score Badge */}
      <div className="absolute top-4 right-4 z-10">
        <Badge className="bg-primary text-primary-foreground flex items-center space-x-1">
          <Star className="w-3 h-3" />
          <span>{buyer.matchScore}% Match</span>
        </Badge>
      </div>

      <CardHeader className="text-center pb-4">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarImage src={buyer.avatar || "/placeholder.svg"} alt={buyer.name} />
          <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
            {buyer.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex items-center justify-center space-x-2 mb-2">
          <CardTitle className="font-serif text-xl">{buyer.name}</CardTitle>
          {buyer.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
          {buyer.premium && <Award className="w-4 h-4 text-amber-600" />}
        </div>

        <CardDescription className="text-base">
          {buyer.title} at {buyer.company}
        </CardDescription>
        <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground mt-2">
          <MapPin className="w-4 h-4" />
          <span>{buyer.location}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-accent/50 rounded-lg">
            <DollarSign className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-xs font-medium">Budget</p>
            <p className="text-xs text-muted-foreground">{buyer.budget}</p>
          </div>
          <div className="text-center p-3 bg-accent/50 rounded-lg">
            <TrendingUp className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-xs font-medium">Experience</p>
            <p className="text-xs text-muted-foreground">{buyer.experience}</p>
          </div>
          <div className="text-center p-3 bg-accent/50 rounded-lg">
            <Building2 className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-xs font-medium">Industries</p>
            <p className="text-xs text-muted-foreground">{buyer.industries.slice(0, 2).join(", ")}</p>
          </div>
          <div className="text-center p-3 bg-accent/50 rounded-lg">
            <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-xs font-medium">Timeline</p>
            <p className="text-xs text-muted-foreground">{buyer.timeline}</p>
          </div>
        </div>

        {/* Background Preview */}
        <div className="bg-muted/50 p-3 rounded-lg">
          <p className="text-sm text-muted-foreground line-clamp-2">{buyer.background}</p>
        </div>

        {/* Activity */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">{buyer.recentActivity}</p>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Link href={`/buyer/${buyer.id}`} className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              View Profile
            </Button>
          </Link>
          {showActions && (
            <>
              <Button variant="outline" size="sm" onClick={onReject} className="bg-transparent">
                Pass
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={onAccept}>
                Connect
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
