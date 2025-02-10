export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  location?: string
  joinDate: string
}

export interface Notification {
  id: number
  title: string
  description: string
  timestamp: string
  read: boolean
}

