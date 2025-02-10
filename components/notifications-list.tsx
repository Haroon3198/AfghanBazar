"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NotificationModal } from "@/components/notification-modal"
import type { Notification } from "@/types/user"

export function NotificationsList() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications")
        const data = await response.json()
        if (response.ok) {
          setNotifications(data.notifications)
        } else {
          throw new Error("Failed to fetch notifications")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not fetch notifications",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [toast])

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification)
  }

  const handleCloseModal = () => {
    setSelectedNotification(null)
  }

  if (loading) {
    return <div className="p-4 text-center">Loading notifications...</div>
  }

  if (notifications.length === 0) {
    return (
      <div className="p-4 text-center">
        <Bell className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">No new notifications</p>
      </div>
    )
  }

  return (
    <>
      <ScrollArea className="h-[300px] w-[350px] p-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="mb-4 last:mb-0 p-3 rounded-md transition-colors duration-200 hover:bg-accent/10 cursor-pointer"
            onClick={() => handleNotificationClick(notification)}
          >
            <h3 className="text-sm font-medium">{notification.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{notification.description}</p>
            <p className="text-xs text-muted-foreground mt-1">{new Date(notification.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </ScrollArea>
      <NotificationModal
        notification={selectedNotification}
        isOpen={!!selectedNotification}
        onClose={handleCloseModal}
      />
    </>
  )
}

