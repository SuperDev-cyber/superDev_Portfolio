"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ThumbsUp } from "lucide-react"
import { WriteReviewDialog } from "@/components/write-review-dialog"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface Product {
  id: string
  name: string
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

interface ReviewsSectionProps {
  product: Product
  reviews: Review[]
}

export function ReviewsSection({ product, reviews }: ReviewsSectionProps) {
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set())
  const [isMarkingHelpful, setIsMarkingHelpful] = useState<Set<string>>(new Set())

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3)
  const supabase = createClient()
  const router = useRouter()

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />,
      )
    }
    return stars
  }

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0]
    reviews.forEach((review) => {
      distribution[review.rating - 1]++
    })
    return distribution.reverse()
  }

  const handleMarkHelpful = async (reviewId: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push("/auth/login")
      return
    }

    if (helpfulReviews.has(reviewId) || isMarkingHelpful.has(reviewId)) {
      return
    }

    setIsMarkingHelpful((prev) => new Set([...prev, reviewId]))

    try {
      // In a real app, you'd have a separate table for helpful votes
      // For now, we'll just increment the helpful_count
      const { error } = await supabase
        .from("reviews")
        .update({
          helpful_count: reviews.find((r) => r.id === reviewId)!.helpful_count + 1,
        })
        .eq("id", reviewId)

      if (error) throw error

      setHelpfulReviews((prev) => new Set([...prev, reviewId]))
      router.refresh()
    } catch (error) {
      console.error("Error marking review as helpful:", error)
    } finally {
      setIsMarkingHelpful((prev) => {
        const newSet = new Set(prev)
        newSet.delete(reviewId)
        return newSet
      })
    }
  }

  const ratingDistribution = getRatingDistribution()

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <WriteReviewDialog
          productId={product.id}
          productName={product.name}
          onReviewSubmitted={() => router.refresh()}
        />
      </div>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{product.rating}</div>
          <div className="flex items-center justify-center mb-2">{renderStars(Math.floor(product.rating))}</div>
          <div className="text-gray-600">{product.review_count} reviews</div>
        </div>

        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars, index) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="text-sm w-8">{stars}</span>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{
                    width: `${reviews.length > 0 ? (ratingDistribution[index] / reviews.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-8">{ratingDistribution[index]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(review.rating)}
                    <span className="font-semibold">{review.title}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    By {review.profiles.first_name} {review.profiles.last_name} •{" "}
                    {new Date(review.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{review.comment}</p>

              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-gray-600 hover:text-red-600 ${helpfulReviews.has(review.id) ? "text-red-600" : ""}`}
                  onClick={() => handleMarkHelpful(review.id)}
                  disabled={helpfulReviews.has(review.id) || isMarkingHelpful.has(review.id)}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {helpfulReviews.has(review.id)
                    ? "Marked Helpful"
                    : isMarkingHelpful.has(review.id)
                      ? "Marking..."
                      : `Helpful (${review.helpful_count})`}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length > 3 && (
        <div className="text-center mt-6">
          <Button variant="outline" onClick={() => setShowAllReviews(!showAllReviews)}>
            {showAllReviews ? "Show Less" : `Show All ${reviews.length} Reviews`}
          </Button>
        </div>
      )}

      {reviews.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">No reviews yet</div>
          <p className="text-gray-400 mb-6">Be the first to share your experience with this product</p>
          <WriteReviewDialog
            productId={product.id}
            productName={product.name}
            onReviewSubmitted={() => router.refresh()}
          />
        </div>
      )}
    </div>
  )
}
