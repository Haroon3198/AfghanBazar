"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Listing {
  id: string
  title: string
  description: string
  price: number
  category: string
  imageUrl: string
  createdAt: Date
  userId: string
  location: string
}

interface ListingsContextType {
  listings: Listing[]
  addListing: (listing: Omit<Listing, "id" | "createdAt">) => void
  getListingsByCategory: (category: string) => Listing[]
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined)

export function ListingsProvider({ children }: { children: React.ReactNode }) {
  const [listings, setListings] = useState<Listing[]>([])

  useEffect(() => {
    const savedListings = localStorage.getItem("listings")
    if (savedListings) {
      setListings(JSON.parse(savedListings))
    }
  }, [])

  const addListing = (newListing: Omit<Listing, "id" | "createdAt">) => {
    const listing: Listing = {
      ...newListing,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setListings((prevListings) => {
      const updatedListings = [...prevListings, listing]
      localStorage.setItem("listings", JSON.stringify(updatedListings))
      return updatedListings
    })
  }

  const getListingsByCategory = (category: string) => {
    return category === "all" ? listings : listings.filter((listing) => listing.category === category)
  }

  return (
    <ListingsContext.Provider value={{ listings, addListing, getListingsByCategory }}>
      {children}
    </ListingsContext.Provider>
  )
}

export function useListings() {
  const context = useContext(ListingsContext)
  if (context === undefined) {
    throw new Error("useListings must be used within a ListingsProvider")
  }
  return context
}

