"use client"

import { Home, Store, Car, Bike, Smartphone, Tv2, Dog } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

const categories = [
  { icon: Home, label: "Real Estate", href: "/?category=real-estate" },
  { icon: Store, label: "Shops", href: "/?category=shops" },
  { icon: Car, label: "Vehicles", href: "/?category=vehicles" },
  { icon: Bike, label: "Bikes", href: "/?category=bikes" },
  { icon: Smartphone, label: "Mobile", href: "/?category=mobile" },
  { icon: Tv2, label: "Electronics", href: "/?category=electronics" },
  { icon: Dog, label: "Animals", href: "/?category=animals" },
]

export function CategoriesNav() {
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") || "all"

  return (
    <nav className="w-full border-b border-border/50 bg-secondary/30">
      <div className="container py-4">
        <div className="flex gap-6 justify-center overflow-x-auto px-4">
          {categories.map((category) => {
            const isActive = category.href.includes(currentCategory)
            return (
              <Link
                key={category.label}
                href={category.href}
                className={cn("nav-item flex-shrink-0 relative group", isActive && "active")}
              >
                <div className="flex flex-col items-center">
                  <div className={cn("icon-wrapper", isActive && "active")}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <span className="mt-2 text-xs font-medium">{category.label}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

