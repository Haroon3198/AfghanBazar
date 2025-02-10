import { CategoriesNav } from "@/components/categories-nav"
import { CategoryListings } from "@/components/category-listings"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Home({ searchParams }: { searchParams: { category?: string; city?: string } }) {
  const category = searchParams.category || "all"
  const city = searchParams.city || "All Afghanistan"

  return (
    <div className="flex min-h-screen flex-col">
      <CategoriesNav />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-medium">
              Listings in {category === "all" ? "All Categories" : category} - {city}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Sort By:</span>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[140px] bg-secondary/50 border-0">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <CategoryListings category={category} city={city} />
        </div>
      </main>
    </div>
  )
}

