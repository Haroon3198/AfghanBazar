import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import type { Notification } from "@/types/user"

interface NotificationModalProps {
  notification: Notification | null
  isOpen: boolean
  onClose: () => void
}

export function NotificationModal({ notification, isOpen, onClose }: NotificationModalProps) {
  if (!notification) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{notification.title}</DialogTitle>
          <DialogDescription>{new Date(notification.timestamp).toLocaleString()}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p>{notification.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

