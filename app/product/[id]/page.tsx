import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ProductPage } from "@/components/product-page"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function Product({ params }: ProductPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase.from("products").select("*").eq("id", id).single()

  if (!product) {
    notFound()
  }

  const { data: reviews } = await supabase
    .from("reviews")
    .select(`
      *,
      profiles:user_id (
        first_name,
        last_name
      )
    `)
    .eq("product_id", id)
    .order("created_at", { ascending: false })

  return <ProductPage product={product} reviews={reviews || []} />
}
