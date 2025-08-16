"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, ShoppingCart, ArrowRight, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function OnboardingPage() {
  const [selectedRole, setSelectedRole] = useState<"buyer" | "seller" | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/30 to-background">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif font-bold text-xl">DealConnect</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Welcome to DealConnect</Badge>
          <h1 className="font-serif font-bold text-3xl md:text-4xl mb-4">Let's make your M&A experience seamless</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            First, tell us whether you're looking to buy or sell a business. We'll customize your experience
            accordingly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Seller Card */}
          <Card
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
              selectedRole === "seller"
                ? "border-primary bg-primary/5 shadow-lg"
                : "border-border hover:border-primary/30"
            }`}
            onClick={() => setSelectedRole("seller")}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="font-serif text-xl">I'm Selling My Business</CardTitle>
              <CardDescription className="text-base">
                Connect with qualified buyers and manage your sale process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>Browse qualified buyer profiles</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>Control who you connect with</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>AI-powered deal management</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Buyer Card */}
          <Card
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
              selectedRole === "buyer"
                ? "border-primary bg-primary/5 shadow-lg"
                : "border-border hover:border-primary/30"
            }`}
            onClick={() => setSelectedRole("buyer")}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="font-serif text-xl">I'm Looking to Buy</CardTitle>
              <CardDescription className="text-base">
                Get discovered by sellers and find your perfect acquisition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>Get matched with relevant sellers</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>Showcase your acquisition criteria</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>Streamlined due diligence tools</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Button */}
        {selectedRole && (
          <div className="text-center">
            <Link href={`/onboarding/${selectedRole}`}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                Continue as {selectedRole === "seller" ? "Seller" : "Buyer"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
