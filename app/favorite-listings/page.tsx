"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useListings } from "@/contexts/ListingsContext"
import { ProductCard } from "@/components/product-card"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

export default function FavoriteListingsPage() {
  const { user } = useAuth()
  const { listings } = useListings()
  const [isLoading, setIsLoading] = useState(true)
  const [favoriteListings, setFavoriteListings] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchFavoriteListings = async () => {
      if (user) {
        try {
          // In a real application, you would fetch the user's favorite listings from your backend
          // For this example, we'll simulate it by randomly selecting some listings
          const simulatedFavorites = listings.sort(() => 0.5 - Math.random()).slice(0, 5)
          setFavoriteListings(simulatedFavorites)
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to fetch your favorite listings. Please try again.",
            variant: "destructive",
          })
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchFavoriteListings()
  }, [user, listings, toast])

  if (!user) {
    return <div className="container py-8">Please log in to view your favorite listings.</div>
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">My Favorite Listings</h1>
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-[300px] w-full" />
          ))}
        </div>
      ) : favoriteListings.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteListings.map((listing) => (
            <ProductCard
              key={listing.id}
              title={listing.title}
              price={listing.price.toString()}
              currency="AFN"
              location={listing.location}
              timeAgo={new Date(listing.createdAt).toLocaleDateString()}
              images={[listing.imageUrl]}
              href={`/listing/${listing.id}`}
            />
          ))}
        </div>
      ) : (
        <p>You haven't favorited any listings yet.</p>
      )}
    </div>
  )
}

