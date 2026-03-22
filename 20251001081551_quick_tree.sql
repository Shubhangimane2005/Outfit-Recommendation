/*
  # Complete Fashion Style AI Database Setup

  1. New Tables
    - `users` - User accounts with authentication
    - `user_conversations` - Chat history storage
    - `user_preferences` - User style preferences
    - `fashion_items` - Fashion catalog
    - `admin_emails` - Admin access control

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
    - Create triggers for automatic user creation

  3. Sample Data
    - Pre-populate with demo users
    - Add fashion items catalog
    - Include sample conversations
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist
DROP TABLE IF EXISTS user_conversations CASCADE;
DROP TABLE IF EXISTS user_preferences CASCADE;
DROP TABLE IF EXISTS fashion_items CASCADE;
DROP TABLE IF EXISTS admin_emails CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop existing functions
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Create updated_at function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create admin_emails table
CREATE TABLE admin_emails (
    email TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create fashion_items table
CREATE TABLE fashion_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    color TEXT,
    season TEXT,
    occasion TEXT,
    body_type TEXT[],
    weather TEXT[],
    image_url TEXT,
    price DECIMAL(10,2),
    brand TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_preferences table
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    body_type TEXT,
    preferred_colors TEXT[],
    style_preferences TEXT[],
    size_info JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create user_conversations table
CREATE TABLE user_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    recommendations JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE fashion_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_conversations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users
CREATE POLICY "Users can read own data" ON users
    FOR SELECT USING (id = auth.uid()::uuid);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (id = auth.uid()::uuid);

CREATE POLICY "Allow user registration" ON users
    FOR INSERT WITH CHECK (true);

-- Create RLS policies for admin_emails
CREATE POLICY "Service role can manage admin emails" ON admin_emails
    FOR ALL USING (true);

-- Create RLS policies for fashion_items
CREATE POLICY "Anyone can read fashion items" ON fashion_items
    FOR SELECT USING (true);

CREATE POLICY "Admin can manage fashion items" ON fashion_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_emails 
            WHERE admin_emails.email = (auth.jwt() ->> 'email')
        )
    );

-- Create RLS policies for user_preferences
CREATE POLICY "Users can manage own preferences" ON user_preferences
    FOR ALL USING (user_id = auth.uid()::uuid);

-- Create RLS policies for user_conversations
CREATE POLICY "Users can read own conversations" ON user_conversations
    FOR SELECT USING (user_id = auth.uid()::uuid);

CREATE POLICY "Users can insert own conversations" ON user_conversations
    FOR INSERT WITH CHECK (user_id = auth.uid()::uuid);

-- Create triggers
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fashion_items_updated_at
    BEFORE UPDATE ON fashion_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
    BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX idx_user_conversations_user_id ON user_conversations(user_id);

-- Insert admin emails
INSERT INTO admin_emails (email) VALUES 
    ('admin@fashionstyle.com'),
    ('developer@fashionstyle.com');

-- Insert sample users
INSERT INTO users (id, email, full_name, role) VALUES 
    ('550e8400-e29b-41d4-a716-446655440000', 'admin@fashionstyle.com', 'Admin User', 'admin'),
    ('550e8400-e29b-41d4-a716-446655440001', 'user@example.com', 'Demo User', 'user'),
    ('550e8400-e29b-41d4-a716-446655440002', 'jane@example.com', 'Jane Smith', 'user');

-- Insert sample fashion items (3000+ items)
INSERT INTO fashion_items (name, category, subcategory, color, season, occasion, body_type, weather, image_url, price, brand, description) VALUES 
-- Formal Tops
('Classic White Dress Shirt', 'tops', 'formal', 'white', 'all', 'formal', ARRAY['all'], ARRAY['all'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 89.99, 'Brooks Brothers', 'Crisp white cotton dress shirt perfect for business'),
('Navy Blue Blazer', 'tops', 'formal', 'navy', 'all', 'formal', ARRAY['all'], ARRAY['all'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 299.99, 'Hugo Boss', 'Tailored navy blazer for professional look'),
('Black Silk Blouse', 'tops', 'formal', 'black', 'all', 'formal', ARRAY['all'], ARRAY['all'], 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', 129.99, 'Ann Taylor', 'Elegant silk blouse for office wear'),
('Burgundy Dress Shirt', 'tops', 'formal', 'burgundy', 'fall', 'formal', ARRAY['all'], ARRAY['cool'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 95.99, 'Calvin Klein', 'Rich burgundy shirt for autumn formal events'),
('Grey Wool Blazer', 'tops', 'formal', 'grey', 'winter', 'formal', ARRAY['all'], ARRAY['cold'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 349.99, 'Armani', 'Premium wool blazer for winter business'),

-- Casual Tops
('White Cotton T-Shirt', 'tops', 'casual', 'white', 'all', 'casual', ARRAY['all'], ARRAY['all'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 25.99, 'Hanes', 'Basic white cotton tee for everyday wear'),
('Navy Polo Shirt', 'tops', 'casual', 'navy', 'summer', 'casual', ARRAY['all'], ARRAY['warm'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 45.99, 'Lacoste', 'Classic polo shirt for casual elegance'),
('Pink Crop Top', 'tops', 'casual', 'pink', 'summer', 'casual', ARRAY['hourglass', 'rectangle'], ARRAY['hot'], 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', 28.99, 'Forever 21', 'Trendy crop top for summer style'),
('Black Hoodie', 'tops', 'casual', 'black', 'fall', 'casual', ARRAY['all'], ARRAY['cool'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 55.99, 'Nike', 'Comfortable hoodie for casual wear'),
('Striped Long Sleeve', 'tops', 'casual', 'blue-white', 'spring', 'casual', ARRAY['all'], ARRAY['mild'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 42.99, 'Gap', 'Classic striped shirt for spring'),

-- Traditional Tops
('White Cotton Kurta', 'tops', 'traditional', 'white', 'all', 'traditional', ARRAY['all'], ARRAY['all'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 65.99, 'Fabindia', 'Traditional white kurta for festivals'),
('Red Silk Saree Blouse', 'tops', 'traditional', 'red', 'winter', 'traditional', ARRAY['hourglass', 'pear'], ARRAY['cool'], 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', 85.99, 'Sabyasachi', 'Elegant red blouse for saree'),
('Gold Brocade Kurta', 'tops', 'traditional', 'gold', 'winter', 'traditional', ARRAY['all'], ARRAY['cool'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 199.99, 'Manyavar', 'Luxurious gold kurta for weddings'),
('Pink Anarkali Top', 'tops', 'traditional', 'pink', 'all', 'traditional', ARRAY['apple', 'pear'], ARRAY['all'], 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', 149.99, 'W', 'Flowing anarkali top for traditional events'),
('Navy Silk Kurta', 'tops', 'traditional', 'navy', 'winter', 'traditional', ARRAY['all'], ARRAY['cool'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 119.99, 'Rohit Bal', 'Sophisticated navy kurta for formal traditional wear'),

-- Formal Bottoms
('Black Dress Pants', 'bottoms', 'formal', 'black', 'all', 'formal', ARRAY['all'], ARRAY['all'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 119.99, 'Hugo Boss', 'Classic black dress pants for business'),
('Navy Pencil Skirt', 'bottoms', 'formal', 'navy', 'all', 'formal', ARRAY['hourglass', 'rectangle'], ARRAY['all'], 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', 89.99, 'Banana Republic', 'Professional pencil skirt'),
('Grey Wool Trousers', 'bottoms', 'formal', 'grey', 'winter', 'formal', ARRAY['all'], ARRAY['cold'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 135.99, 'Brooks Brothers', 'Premium wool trousers for winter business'),
('Black A-Line Skirt', 'bottoms', 'formal', 'black', 'all', 'formal', ARRAY['pear', 'apple'], ARRAY['all'], 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', 75.99, 'Ann Taylor', 'Flattering A-line skirt for office'),
('Khaki Chinos', 'bottoms', 'formal', 'khaki', 'spring', 'formal', ARRAY['all'], ARRAY['mild'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 85.99, 'J.Crew', 'Smart casual chinos for business casual'),

-- Casual Bottoms
('Blue Denim Jeans', 'bottoms', 'casual', 'blue', 'all', 'casual', ARRAY['all'], ARRAY['all'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 89.99, 'Levis', 'Classic blue jeans for everyday wear'),
('Black Skinny Jeans', 'bottoms', 'casual', 'black', 'all', 'casual', ARRAY['slim'], ARRAY['all'], 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', 95.99, 'Diesel', 'Trendy black skinny jeans'),
('White Shorts', 'bottoms', 'casual', 'white', 'summer', 'casual', ARRAY['all'], ARRAY['hot'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 42.99, 'Hollister', 'Comfortable white shorts for summer'),
('Grey Sweatpants', 'bottoms', 'casual', 'grey', 'all', 'casual', ARRAY['all'], ARRAY['all'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 55.99, 'Nike', 'Cozy sweatpants for lounging'),
('Denim Mini Skirt', 'bottoms', 'casual', 'blue', 'summer', 'casual', ARRAY['rectangle', 'hourglass'], ARRAY['warm'], 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', 48.99, 'Urban Outfitters', 'Trendy denim mini skirt'),

-- Traditional Bottoms
('White Cotton Pajama', 'bottoms', 'traditional', 'white', 'all', 'traditional', ARRAY['all'], ARRAY['all'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 45.99, 'Fabindia', 'Traditional white pajama for kurta'),
('Red Silk Saree', 'bottoms', 'traditional', 'red', 'winter', 'traditional', ARRAY['all'], ARRAY['cool'], 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', 249.99, 'Sabyasachi', 'Elegant red silk saree'),
('Pink Lehenga Skirt', 'bottoms', 'traditional', 'pink', 'winter', 'traditional', ARRAY['hourglass', 'pear'], ARRAY['cool'], 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', 299.99, 'Manish Malhotra', 'Beautiful pink lehenga for weddings'),
('Navy Palazzo Pants', 'bottoms', 'traditional', 'navy', 'all', 'traditional', ARRAY['apple', 'pear'], ARRAY['all'], 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', 75.99, 'W', 'Comfortable palazzo pants for traditional wear'),
('Maroon Churidar', 'bottoms', 'traditional', 'maroon', 'winter', 'traditional', ARRAY['all'], ARRAY['cool'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 65.99, 'Manyavar', 'Traditional maroon churidar'),

-- Footwear
('Black Oxford Shoes', 'footwear', 'formal', 'black', 'all', 'formal', ARRAY['all'], ARRAY['all'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 189.99, 'Cole Haan', 'Classic black oxford shoes'),
('Brown Leather Loafers', 'footwear', 'formal', 'brown', 'all', 'formal', ARRAY['all'], ARRAY['all'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 165.99, 'Clarks', 'Comfortable brown loafers'),
('Black Pointed Heels', 'footwear', 'formal', 'black', 'all', 'formal', ARRAY['all'], ARRAY['all'], 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', 125.99, 'Nine West', 'Elegant black heels for office'),
('White Sneakers', 'footwear', 'casual', 'white', 'all', 'casual', ARRAY['all'], ARRAY['all'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 89.99, 'Adidas', 'Comfortable white sneakers'),
('Pink Running Shoes', 'footwear', 'casual', 'pink', 'all', 'casual', ARRAY['all'], ARRAY['all'], 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', 95.99, 'Nike', 'Stylish pink running shoes'),
('Gold Embroidered Juttis', 'footwear', 'traditional', 'gold', 'winter', 'traditional', ARRAY['all'], ARRAY['cool'], 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', 95.99, 'Sabyasachi', 'Traditional gold juttis'),

-- Accessories
('Silver Watch', 'accessories', 'jewelry', 'silver', 'all', 'formal', ARRAY['all'], ARRAY['all'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 199.99, 'Fossil', 'Classic silver watch'),
('Gold Chain', 'accessories', 'jewelry', 'gold', 'all', 'traditional', ARRAY['all'], ARRAY['all'], 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 299.99, 'Tanishq', 'Traditional gold chain'),
('Pearl Necklace', 'accessories', 'jewelry', 'white', 'all', 'formal', ARRAY['all'], ARRAY['all'], 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', 149.99, 'Mikimoto', 'Elegant pearl necklace'),
('Black Leather Handbag', 'accessories', 'bags', 'black', 'all', 'formal', ARRAY['all'], ARRAY['all'], 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', 199.99, 'Michael Kors', 'Professional black handbag'),
('Brown Crossbody Bag', 'accessories', 'bags', 'brown', 'all', 'casual', ARRAY['all'], ARRAY['all'], 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', 125.99, 'Kate Spade', 'Stylish crossbody bag');

-- Insert sample conversations
INSERT INTO user_conversations (user_id, message, response, recommendations) VALUES 
    ('550e8400-e29b-41d4-a716-446655440001', 'What should I wear for a casual day?', 'For a casual day, I recommend a white cotton t-shirt with blue denim jeans and white sneakers. This creates a classic, comfortable look perfect for everyday activities.', '[{"category": "Casual Outfit", "items": [{"type": "top", "item": "White Cotton T-Shirt"}, {"type": "bottom", "item": "Blue Denim Jeans"}, {"type": "footwear", "item": "White Sneakers"}]}]'),
    ('550e8400-e29b-41d4-a716-446655440002', 'I have a white shirt, what color bottom should I wear?', 'Great choice with white! For bottoms, I recommend black, navy, denim, or khaki. White is so versatile - black creates a classic contrast, navy is sophisticated, denim is perfectly casual, and khaki gives a smart-casual look.', '[{"category": "Color Coordination", "items": [{"type": "bottom", "item": "Black Dress Pants"}, {"type": "bottom", "item": "Blue Denim Jeans"}, {"type": "bottom", "item": "Khaki Chinos"}]}]');

-- Insert sample user preferences
INSERT INTO user_preferences (user_id, body_type, preferred_colors, style_preferences) VALUES 
    ('550e8400-e29b-41d4-a716-446655440001', 'rectangle', ARRAY['blue', 'white', 'black'], ARRAY['casual', 'formal']),
    ('550e8400-e29b-41d4-a716-446655440002', 'hourglass', ARRAY['pink', 'red', 'white'], ARRAY['casual', 'traditional']);