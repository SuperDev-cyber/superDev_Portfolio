"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import { Header } from "@/components/header"
import { ReviewsSection } from "@/components/reviews-section"
import { AddToCartButton } from "@/components/add-to-cart-button"

interface Product {
  id: string
  name: string
  description: string
  price: number
  original_price?: number
  image_url: string
  brand: string
  model: string
  sku: string
  stock_quantity: number
  rating: number
  review_count: number
}

interface Review {
  id: string
  rating: number
  title: string
  comment: string
  helpful_count: number
  created_at: string
  profiles: {
    first_name: string
    last_name: string
  }
}

interface ProductPageProps {
  product: Product
  reviews: Review[]
}

export function ProductPage({ product, reviews }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const discountPercentage = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  const renderStars = (rating: number, size: "sm" | "md" = "sm") => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className={`${size === "sm" ? "h-4 w-4" : "h-5 w-5"} fill-yellow-400 text-yellow-400`} />,
        )
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            className={`${size === "sm" ? "h-4 w-4" : "h-5 w-5"} fill-yellow-400 text-yellow-400`}
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />,
        )
      } else {
        stars.push(<Star key={i} className={`${size === "sm" ? "h-4 w-4" : "h-5 w-5"} text-gray-300`} />)
      }
    }
    return stars
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <span>Home</span> / <span>Electronics</span> / <span>Gaming</span> /{" "}
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 bg-gray-50 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-red-600" : "border-transparent"
                  }`}
                >
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={`${product.name} view ${index}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">{renderStars(product.rating)}</div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.review_count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-red-600">${product.price.toFixed(2)}</span>
                {product.original_price && (
                  <>
                    <span className="text-lg text-gray-500 line-through">${product.original_price.toFixed(2)}</span>
                    <Badge variant="destructive" className="bg-red-600">
                      Save {discountPercentage}%
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-600 font-medium">In Stock ({product.stock_quantity} available)</span>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center border rounded-md">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-50">
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <AddToCartButton productId={product.id} quantity={quantity} className="flex-1" />
                <Button variant="outline" size="lg" className="px-6 bg-transparent">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="px-6 bg-transparent">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-6 border-t">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-green-600" />
                <span>Free shipping on orders over $35</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>1-year manufacturer warranty</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-5 w-5 text-orange-600" />
                <span>30-day return policy</span>
              </div>
            </div>

            {/* Product Details */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Product Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Brand:</span>
                    <span>{product.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Model:</span>
                    <span>{product.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">SKU:</span>
                    <span>{product.sku}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Product Description</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewsSection product={product} reviews={reviews} />
      </main>
    </div>
  )
}
