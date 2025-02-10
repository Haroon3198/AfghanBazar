"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useListings } from "@/contexts/ListingsContext"
import { ProductCard } from "@/components/product-card"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

export default function MyListingsPage() {
  const { user } = useAuth()
  const { listings } = useListings()
  const [isLoading, setIsLoading] = useState(true)
  const [userListings, setUserListings] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      // Filter listings locally instead of calling an async function
      const filteredListings = listings.filter((listing) => listing.userId === user.id)
      setUserListings(filteredListings)
      setIsLoading(false)
    }
  }, [user, listings]) // Only depend on user and listings array

  if (!user) {
    return <div className="container py-8">Please log in to view your listings.</div>
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">My Listings</h1>
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-[300px] w-full" />
          ))}
        </div>
      ) : userListings.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {userListings.map((listing) => (
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
        <p>You haven't listed any items yet.</p>
      )}
    </div>
  )
}

