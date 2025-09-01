import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { CartPage } from "@/components/cart-page"

export default async function Cart() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get cart items with product details
  const { data: cartItems } = await supabase
    .from("cart")
    .select(`
      *,
      products (
        id,
        name,
        price,
        image_url,
        brand,
        stock_quantity
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return <CartPage cartItems={cartItems || []} />
}
