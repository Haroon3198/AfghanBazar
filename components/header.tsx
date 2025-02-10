"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Menu } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import { SellModal } from "@/components/sell-modal"
import { UserNav } from "@/components/user-nav"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const afghanCities = [
  "All Afghanistan",
  "Kabul",
  "Herat",
  "Mazar-i-Sharif",
  "Kandahar",
  "Jalalabad",
  "Kunduz",
  "Ghazni",
  "Balkh",
  "Baghlan",
  "Gardez",
  "Khost",
  "Lashkar Gah",
  "Pul-e-Khumri",
  "Sheberghan",
  "Charikar",
]

export function Header() {
  const { user } = useAuth()
  const [isSellModalOpen, setIsSellModalOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState("All Afghanistan")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const city = searchParams.get("city")
    if (city) {
      setSelectedCity(city)
    }
  }, [searchParams])

  const handleCityChange = (city: string) => {
    setSelectedCity(city)
    const category = searchParams.get("category") || "all"
    router.push(`/?category=${category}&city=${city}`)
  }

  const LocationDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-10 whitespace-nowrap">
          <MapPin className="mr-2 h-4 w-4" />
          {selectedCity}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-h-[300px] overflow-y-auto">
        {afghanCities.map((city) => (
          <DropdownMenuItem key={city} onSelect={() => handleCityChange(city)}>
            {city}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <header className="sticky top-0 z-50 w-full py-4 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container flex items-center gap-4">
        <Link href="/" className="text-2xl font-bold text-gradient mr-4">
          AfghanBazar
        </Link>

        <div className="hidden md:flex flex-1 items-center gap-4 max-w-3xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="search-bar pl-10" />
          </div>
          <LocationDropdown />
        </div>

        <div className="flex md:hidden flex-1 items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="search-bar pl-10" />
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Menu</h2>
                <LocationDropdown />
                {user ? (
                  <Button
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium"
                    onClick={() => setIsSellModalOpen(true)}
                  >
                    + Sell
                  </Button>
                ) : (
                  <Button variant="outline" className="font-medium border-border/50">
                    <Link href="/signup">Sign up</Link>
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <UserNav />
                <Button
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium"
                  onClick={() => setIsSellModalOpen(true)}
                >
                  + Sell
                </Button>
              </>
            ) : (
              <Button variant="outline" className="font-medium border-border/50">
                <Link href="/signup">Sign up</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      {user && <SellModal isOpen={isSellModalOpen} onClose={() => setIsSellModalOpen(false)} />}
    </header>
  )
}

