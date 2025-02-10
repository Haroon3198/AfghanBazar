import type { ObjectId } from "mongodb"

export interface Listing {
  _id?: ObjectId
  title: string
  description: string
  price: number
  category: string
  imageUrl: string
  createdAt: Date
  userId: string
  location: string
  condition: string
}

export interface Notification {
  _id?: ObjectId
  title: string
  description: string
  timestamp: string
  read: boolean
}

