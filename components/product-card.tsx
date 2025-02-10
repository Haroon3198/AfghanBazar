"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  title: string
  price: string
  currency: string
  location: string
  timeAgo: string
  images: string[]
  href: string
  className?: string
}

export function ProductCard({ title, price, currency, location, timeAgo, images, href, className }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const validImages = Array.isArray(images) && images.length > 0 ? images : ["/placeholder.svg"]

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % validImages.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + validImages.length) % validImages.length)
  }

  return (
    <Link href={href}>
      <Card className={cn("overflow-hidden group card-hover bg-secondary/20", className)}>
        <CardContent className="p-0">
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image
              src={validImages[currentImageIndex] || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              unoptimized={validImages[currentImageIndex]?.startsWith?.("data:")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {validImages.length > 1 && (
              <>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={(e) => {
                e.preventDefault()
                // Add favorite functionality here
              }}
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to favorites</span>
            </Button>
            <Badge className="absolute bottom-2 left-2 bg-accent text-accent-foreground">
              {price} {currency}
            </Badge>
          </div>
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-accent transition-colors duration-300">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{timeAgo}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

