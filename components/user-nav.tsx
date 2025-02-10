"use client"

import { User, Package, Settings, Bell, LogOut, UserCircle, Heart } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/components/ui/use-toast"
import { NotificationsList } from "@/components/notifications-list"

export function UserNav() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  if (!user) return null

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
      toast({
        title: "Logged out successfully",
        description: "Come back soon!",
      })
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  const handleProfileClick = () => {
    router.push("/profile")
  }

  const handleListingsClick = () => {
    router.push("/my-listings")
  }

  const handleFavoriteListingsClick = () => {
    router.push("/favorite-listings")
  }

  const handleSettingsClick = () => {
    router.push("/settings")
  }

  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[350px]">
          <NotificationsList />
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt="Profile picture"
              fill
              className="rounded-full object-cover"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer" onClick={handleProfileClick}>
            <User className="h-4 w-4" />
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="nav-item cursor-pointer" onClick={handleProfileClick}>
            <UserCircle className="h-4 w-4" />
            My Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="nav-item cursor-pointer" onClick={handleListingsClick}>
            <Package className="h-4 w-4" />
            My Listings
          </DropdownMenuItem>
          <DropdownMenuItem className="nav-item cursor-pointer" onClick={handleFavoriteListingsClick}>
            <Heart className="h-4 w-4" />
            Favorite Listings
          </DropdownMenuItem>
          <DropdownMenuItem className="nav-item cursor-pointer" onClick={handleSettingsClick}>
            <Settings className="h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="nav-item text-red-500 cursor-pointer" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

