"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface CartItem {
  id: string
  quantity: number
  created_at: string
  products: {
    id: string
    name: string
    price: number
    image_url: string
    brand: string
    stock_quantity: number
  }
}

interface CartPageProps {
  cartItems: CartItem[]
}

export function CartPage({ cartItems: initialCartItems }: CartPageProps) {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [isUpdating, setIsUpdating] = useState<Set<string>>(new Set())
  const [isRemoving, setIsRemoving] = useState<Set<string>>(new Set())

  const supabase = createClient()
  const router = useRouter()

  const updateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setIsUpdating((prev) => new Set([...prev, cartItemId]))

    try {
      const { error } = await supabase.from("cart").update({ quantity: newQuantity }).eq("id", cartItemId)

      if (error) throw error

      setCartItems((prev) => prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item)))
    } catch (error) {
      console.error("Error updating quantity:", error)
      alert("Failed to update quantity. Please try again.")
    } finally {
      setIsUpdating((prev) => {
        const newSet = new Set(prev)
        newSet.delete(cartItemId)
        return newSet
      })
    }
  }

  const removeItem = async (cartItemId: string) => {
    setIsRemoving((prev) => new Set([...prev, cartItemId]))

    try {
      const { error } = await supabase.from("cart").delete().eq("id", cartItemId)

      if (error) throw error

      setCartItems((prev) => prev.filter((item) => item.id !== cartItemId))
    } catch (error) {
      console.error("Error removing item:", error)
      alert("Failed to remove item. Please try again.")
    } finally {
      setIsRemoving((prev) => {
        const newSet = new Set(prev)
        newSet.delete(cartItemId)
        return newSet
      })
    }
  }

  const clearCart = async () => {
    if (!confirm("Are you sure you want to clear your cart?")) return

    try {
      const { error } = await supabase
        .from("cart")
        .delete()
        .in(
          "id",
          cartItems.map((item) => item.id),
        )

      if (error) throw error

      setCartItems([])
    } catch (error) {
      console.error("Error clearing cart:", error)
      alert("Failed to clear cart. Please try again.")
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.products.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax
  const shipping = subtotal > 35 ? 0 : 9.99 // Free shipping over $35
  const total = subtotal + tax + shipping

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-red-600 hover:text-red-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{cartItems.length} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Items</h2>
              <Button variant="ghost" onClick={clearCart} className="text-red-600 hover:text-red-700">
                Clear Cart
              </Button>
            </div>

            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.products.image_url || "/placeholder.svg"}
                        alt={item.products.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.products.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.products.brand}</p>
                      <p className="text-lg font-bold text-red-600">${item.products.price.toFixed(2)}</p>

                      {item.products.stock_quantity < 10 && (
                        <p className="text-sm text-orange-600 mt-1">
                          Only {item.products.stock_quantity} left in stock
                        </p>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || isUpdating.has(item.id)}
                          className="p-2 hover:bg-gray-50 disabled:opacity-50"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const newQuantity = Number.parseInt(e.target.value) || 1
                            if (newQuantity !== item.quantity && newQuantity > 0) {
                              updateQuantity(item.id, newQuantity)
                            }
                          }}
                          className="w-16 text-center border-0 focus:ring-0"
                          min="1"
                          max={item.products.stock_quantity}
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.products.stock_quantity || isUpdating.has(item.id)}
                          className="p-2 hover:bg-gray-50 disabled:opacity-50"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        disabled={isRemoving.has(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">Add ${(35 - subtotal).toFixed(2)} more for free shipping!</p>
                  </div>
                )}

                <Button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3">Proceed to Checkout</Button>

                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <span>🔒</span>
                    <span>Secure checkout</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
