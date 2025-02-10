"use client"

import { useListings, type Listing } from "@/contexts/ListingsContext"
import { ProductCard } from "@/components/product-card"

interface CategoryListingsProps {
  category: string
  city: string
}

export function CategoryListings({ category, city }: CategoryListingsProps) {
  const { listings } = useListings()
  const filteredListings = listings.filter((listing) => {
    const categoryMatch = category === "all" || listing.category === category
    const cityMatch = city === "All Afghanistan" || listing.location === city
    return categoryMatch && cityMatch
  })

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredListings.map((listing: Listing) => (
        <ProductCard
          key={listing.id}
          title={listing.title}
          price={listing.price.toString()}
          currency="AFN"
          location={listing.location}
          timeAgo={new Date(listing.createdAt).toLocaleDateString()}
          images={Array.isArray(listing.imageUrls) ? listing.imageUrls : ["/placeholder.svg"]}
          href={`/listing/${listing.id}`}
          className="h-full"
        />
      ))}
    </div>
  )
}

