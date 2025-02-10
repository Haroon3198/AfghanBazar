"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import { useListings } from "@/contexts/ListingsContext"
import { Check, ChevronRight, Upload, X } from "lucide-react"

const categories = [
  { value: "real-estate", label: "Real Estate" },
  { value: "cars", label: "Cars" },
  { value: "mobile", label: "Mobile" },
  { value: "electronics", label: "Electronics" },
  { value: "bike", label: "Bike" },
  { value: "shops", label: "Shops" },
  { value: "animals", label: "Animals" },
]

const afghanCities = [
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

export function SellModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    condition: "",
    location: "",
    // Category-specific fields
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    amenities: [] as string[],
    make: "",
    model: "",
    year: "",
    mileage: "",
    transmission: "",
    fuelType: "",
    brand: "",
    storage: "",
    ram: "",
    color: "",
    type: "",
    warranty: "",
    frameSize: "",
    wheelSize: "",
    shopType: "",
    size: "",
    rentPeriod: "",
    features: [] as string[],
    breed: "",
    age: "",
    gender: "",
    vaccinated: false,
    pedigree: false,
  })

  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const { user } = useAuth()
  const { addListing } = useListings()
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setImageFiles((prevFiles) => [...prevFiles, ...files])

      const newPreviews = files.map((file) => URL.createObjectURL(file))
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews])
    }
  }

  const removeImage = (index: number) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      router.push("/login")
      onClose()
      return
    }

    const imageUrls = imagePreviews.length > 0 ? imagePreviews : ["/placeholder.svg"]

    const baseListing = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      imageUrls: imageUrls,
      userId: user.id,
      location: formData.location,
      condition: formData.condition,
    }

    let categorySpecificData = {}

    switch (formData.category) {
      case "real-estate":
        categorySpecificData = {
          propertyType: formData.propertyType,
          bedrooms: Number(formData.bedrooms),
          bathrooms: Number(formData.bathrooms),
          area: Number(formData.area),
          amenities: formData.amenities,
        }
        break
      case "cars":
        categorySpecificData = {
          make: formData.make,
          model: formData.model,
          year: Number(formData.year),
          mileage: Number(formData.mileage),
          transmission: formData.transmission,
          fuelType: formData.fuelType,
        }
        break
      // Add cases for other categories as needed
    }

    const newListing = {
      ...baseListing,
      ...categorySpecificData,
    }

    addListing(newListing)
    toast({
      title: "Listing created",
      description: "Your item has been successfully listed.",
    })
    onClose()
    router.push(`/?category=${formData.category}`)
  }

  const renderCategoryFields = () => {
    switch (formData.category) {
      case "real-estate":
        return (
          <>
            <div className="space-y-2">
              <Label>Property Type</Label>
              <Select onValueChange={(value) => handleChange("propertyType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <Input
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => handleChange("bedrooms", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Bathrooms</Label>
                <Input
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => handleChange("bathrooms", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Area (sq m)</Label>
              <Input type="number" value={formData.area} onChange={(e) => handleChange("area", e.target.value)} />
            </div>
          </>
        )

      case "cars":
        return (
          <>
            <div className="space-y-2">
              <Label>Make</Label>
              <Input
                value={formData.make}
                onChange={(e) => handleChange("make", e.target.value)}
                placeholder="e.g., Toyota"
              />
            </div>
            <div className="space-y-2">
              <Label>Model</Label>
              <Input
                value={formData.model}
                onChange={(e) => handleChange("model", e.target.value)}
                placeholder="e.g., Corolla"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Year</Label>
                <Input type="number" value={formData.year} onChange={(e) => handleChange("year", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Mileage</Label>
                <Input
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => handleChange("mileage", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Transmission</Label>
              <Select onValueChange={(value) => handleChange("transmission", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transmission type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="automatic">Automatic</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )

      // Add cases for other categories (mobile, electronics, bike, shops, animals) here
      // The structure will be similar to the above cases

      default:
        return null
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select onValueChange={(value) => handleChange("category", value)} value={formData.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter a title for your listing"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe your item"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button onClick={() => setStep(2)} disabled={!formData.category || !formData.title}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )

      case 2:
        return (
          <>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    placeholder="Enter price in AFN"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select onValueChange={(value) => handleChange("location", value)} value={formData.location}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      {afghanCities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Condition</Label>
                <Select onValueChange={(value) => handleChange("condition", value)} value={formData.condition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="like-new">Like New</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {renderCategoryFields()}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)} disabled={!formData.price || !formData.location}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )

      case 3:
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Upload Images</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/*"
                      multiple
                    />
                  </label>
                </div>
              </div>
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={preview || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        width={100}
                        height={100}
                        className="object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-0 right-0 h-6 w-6"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={imagePreviews.length === 0}>
                List Item <Check className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Sell an Item</DialogTitle>
          <DialogDescription>Fill out the details of the item you want to sell.</DialogDescription>
        </DialogHeader>
        <div className="flex justify-between mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex items-center justify-center w-8 h-8 border-2 rounded-full ${
                s === step ? "border-primary bg-primary text-white" : "border-gray-300 text-gray-500"
              }`}
            >
              {s}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderStep()}
        </form>
      </DialogContent>
    </Dialog>
  )
}

