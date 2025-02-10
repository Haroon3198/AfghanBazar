export interface BaseListing {
  id: string
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

export interface RealEstateListing extends BaseListing {
  propertyType: "apartment" | "house" | "land" | "commercial"
  bedrooms?: number
  bathrooms?: number
  area: number
  amenities: string[]
}

export interface CarListing extends BaseListing {
  make: string
  model: string
  year: number
  mileage: number
  transmission: "automatic" | "manual"
  fuelType: string
}

export interface MobileListing extends BaseListing {
  brand: string
  model: string
  storage: string
  ram: string
  color: string
}

export interface ElectronicsListing extends BaseListing {
  brand: string
  model: string
  type: string
  warranty?: string
}

export interface BikeListing extends BaseListing {
  type: "mountain" | "road" | "hybrid" | "electric"
  brand: string
  frameSize: string
  wheelSize: string
}

export interface ShopListing extends BaseListing {
  type: "retail" | "restaurant" | "service" | "office"
  size: number
  rentPeriod: "monthly" | "yearly"
  features: string[]
}

export interface AnimalListing extends BaseListing {
  type: string
  breed: string
  age: string
  gender: "male" | "female"
  vaccinated: boolean
  pedigree?: boolean
}

export type ListingType =
  | RealEstateListing
  | CarListing
  | MobileListing
  | ElectronicsListing
  | BikeListing
  | ShopListing
  | AnimalListing

