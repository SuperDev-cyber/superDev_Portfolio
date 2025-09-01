import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const supabase = await createClient()

  // Get the Xbox product
  const { data: product } = await supabase.from("products").select("*").eq("sku", "EP2-00692").single()

  if (!product) {
    redirect("/product/xbox-series-x")
  }

  redirect(`/product/${product.id}`)
}
