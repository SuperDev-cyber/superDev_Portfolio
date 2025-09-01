-- Add some sample reviews for the Xbox product
INSERT INTO reviews (product_id, user_id, rating, title, comment, helpful_count) 
SELECT 
  p.id,
  auth.uid(),
  5,
  'Amazing gaming console!',
  'This Xbox Series X is incredible. The graphics are stunning and the loading times are practically non-existent. The all-digital format is perfect for my gaming style. Highly recommended for any serious gamer.',
  12
FROM products p 
WHERE p.sku = 'EP2-00692'
AND NOT EXISTS (
  SELECT 1 FROM reviews r 
  WHERE r.product_id = p.id AND r.user_id = auth.uid()
);

-- Note: This will only work if there's an authenticated user
-- In a real scenario, you'd insert with specific user IDs
