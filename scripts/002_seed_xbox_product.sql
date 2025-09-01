-- Insert the Xbox Series X product from the Staples page
INSERT INTO products (
  name,
  description,
  price,
  original_price,
  image_url,
  brand,
  model,
  sku,
  stock_quantity,
  rating,
  review_count
) VALUES (
  'Microsoft Xbox Series X All Digital Console 1TB Robot White',
  'Experience the modernized design of the Xbox Wireless Controller, featuring sculpted surfaces and refined geometry for enhanced comfort during gameplay. Stay on target with a hybrid D-pad and textured grip on the triggers, bumpers, and back-case. Seamlessly capture and share content with a dedicated Share button. Quickly pair with, play on, and switch between devices including Xbox Series X|S, Xbox One, PC, mobile phones and tablets.',
  449.99,
  499.99,
  '/placeholder.svg?height=400&width=400',
  'Microsoft',
  'Xbox Series X All Digital',
  'EP2-00692',
  15,
  4.5,
  127
) ON CONFLICT (sku) DO NOTHING;
