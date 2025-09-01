"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface AddToCartButtonProps {
  productId: string
  quantity: number
  className?: string
}

export function AddToCartButton({ productId, quantity, className }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleAddToCart = async () => {
    setIsLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .single()

      if (existingItem) {
        // Update quantity
        const { error } = await supabase
          .from("cart")
          .update({ quantity: existingItem.quantity + quantity })
          .eq("id", existingItem.id)

        if (error) throw error
      } else {
        // Add new item
        const { error } = await supabase.from("cart").insert({
          user_id: user.id,
          product_id: productId,
          quantity,
        })

        if (error) throw error
      }

      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)

      // Refresh header to update cart count
      router.refresh()
    } catch (error) {
      console.error("Error adding to cart:", error)
      alert("Failed to add item to cart. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewCart = () => {
    router.push("/cart")
  }

  if (isAdded) {
    return (
      <div className={`flex gap-2 ${className}`}>
        <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white flex-1" disabled>
          <Check className="h-5 w-5 mr-2" />
          Added to Cart
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={handleViewCart}
          className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
        >
          View Cart
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading}
      size="lg"
      className={`bg-red-600 hover:bg-red-700 text-white ${className}`}
    >
      <ShoppingCart className="h-5 w-5 mr-2" />
      {isLoading ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
