import type { Listing, Notification } from "../types"

export const listings: Listing[] = [
  {
    id: "1",
    title: "Modern Apartment in Kabul",
    description: "A beautiful modern apartment in the heart of Kabul.",
    price: 50000,
    category: "real-estate",
    imageUrl: "https://example.com/apartment.jpg",
    createdAt: new Date(),
    userId: "user1",
    location: "Kabul",
    condition: "Excellent",
  },
  {
    id: "2",
    title: "Toyota Corolla 2019",
    description: "Well-maintained Toyota Corolla, 2019 model.",
    price: 800000,
    category: "vehicles",
    imageUrl: "https://example.com/corolla.jpg",
    createdAt: new Date(),
    userId: "user2",
    location: "Herat",
    condition: "Used",
  },
]

export const notifications: Notification[] = [
  {
    id: 1,
    title: "New message",
    description: "You have a new message from a buyer",
    timestamp: new Date().toISOString(),
    read: false,
  },
  {
    id: 2,
    title: "Listing approved",
    description: 'Your listing "iPhone 12 Pro" has been approved',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: true,
  },
]

