import { NextResponse } from "next/server"
import type { Notification } from "@/types/user"

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "New message",
    description: "You have a new message from a buyer",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    read: false,
  },
  {
    id: 2,
    title: "Listing approved",
    description: "Your listing 'iPhone 12 Pro' has been approved",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    read: true,
  },
  {
    id: 3,
    title: "Price drop alert",
    description: "A listing you're watching has dropped in price",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: false,
  },
  {
    id: 4,
    title: "New feature",
    description: "Check out our new multi-image upload feature!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: true,
  },
]

export async function GET() {
  // In a real application, you would fetch notifications from a database
  // This is just a mock response
  return NextResponse.json({
    unread: mockNotifications.filter((n) => !n.read).length,
    notifications: mockNotifications,
  })
}

