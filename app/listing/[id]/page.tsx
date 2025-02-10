"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeft, MessageCircle, Share2, Heart, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useListings } from "@/contexts/ListingsContext"
import { useAuth } from "@/contexts/AuthContext"
import { ProductCard } from "@/components/product-card"

export default function ListingPage({ params }: { params: { id: string } }) {
  const { listings } = useListings()
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [message, setMessage] = useState("")
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const listing = listings.find((l) => l.id === params.id)

  if (!listing) {
    return (
      <div className="container py-8">
        <p>Listing not found</p>
        <Button variant="link" onClick={() => router.push("/")}>
          Return to home
        </Button>
      </div>
    )
  }

  const relatedListings = listings.filter((l) => l.category === listing.category && l.id !== listing.id).slice(0, 3)

  const handleContact = async () => {
    if (!user) {
      router.push("/login")
      return
    }

    toast({
      title: "Message sent",
      description: "The seller will get back to you soon.",
    })
    setMessage("")
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: listing.title,
        text: listing.description,
        url: window.location.href,
      })
    } catch (error) {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "The listing URL has been copied to your clipboard.",
      })
    }
  }

  const toggleFavorite = () => {
    if (!user) {
      router.push("/login")
      return
    }
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite
        ? "This item has been removed from your favorites."
        : "This item has been added to your favorites.",
    })
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const images = Array.isArray(listing.imageUrls) ? listing.imageUrls : ["/placeholder.svg"]

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="container py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Image Gallery Section */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={`${listing.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              unoptimized={images[currentImageIndex]?.startsWith?.("data:")}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                className={`relative w-20 h-20 rounded-md overflow-hidden ${
                  index === currentImageIndex ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${listing.title} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized={image?.startsWith?.("data:")}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{listing.title}</h1>
            <p className="mt-2 text-2xl font-semibold text-accent">{listing.price.toLocaleString()} AFN</p>
          </div>

          <div className="flex gap-4">
            <Button onClick={toggleFavorite} variant={isFavorite ? "default" : "outline"}>
              <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
              {isFavorite ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Details</h2>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-muted-foreground">Location</dt>
                <dd className="text-sm font-medium">{listing.location}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Listed</dt>
                <dd className="text-sm font-medium">{formatDate(listing.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Category</dt>
                <dd className="text-sm font-medium capitalize">{listing.category}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Condition</dt>
                <dd className="text-sm font-medium capitalize">{listing.condition}</dd>
              </div>
            </dl>
          </div>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-muted-foreground">{listing.description}</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Seller
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Contact Seller</DialogTitle>
                <DialogDescription>Send a message to the seller about this item.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Textarea
                  placeholder="Write your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
                <Button onClick={handleContact} className="w-full">
                  Send Message
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Related Listings */}
      {relatedListings.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Listings</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedListings.map((relatedListing) => (
              <ProductCard
                key={relatedListing.id}
                title={relatedListing.title}
                price={relatedListing.price.toString()}
                currency="AFN"
                location={relatedListing.location}
                timeAgo={new Date(relatedListing.createdAt).toLocaleDateString()}
                images={Array.isArray(relatedListing.imageUrls) ? relatedListing.imageUrls : ["/placeholder.svg"]}
                href={`/listing/${relatedListing.id}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

