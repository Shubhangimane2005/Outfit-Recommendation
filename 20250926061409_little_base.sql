/*
  # Fashion Style AI Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `password` (text, hashed)
      - `full_name` (text)
      - `role` (text, default 'user')
      - `preferences` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `fashion_items`
      - `id` (uuid, primary key)
      - `name` (text)
      - `category` (text)
      - `subcategory` (text)
      - `color` (text)
      - `season` (text)
      - `occasion` (text)
      - `body_type` (text array)
      - `weather` (text array)
      - `image_url` (text)
      - `price` (decimal)
      - `brand` (text)
      - `description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `user_conversations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `message` (text)
      - `response` (text)
      - `recommendations` (jsonb)
      - `created_at` (timestamp)
    
    - `user_preferences`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `body_type` (text)
      - `preferred_colors` (text array)
      - `style_preferences` (text array)
      - `size_info` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
    - Admin access policies
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  full_name text NOT NULL,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create fashion_items table
CREATE TABLE IF NOT EXISTS fashion_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  subcategory text,
  color text,
  season text,
  occasion text,
  body_type text[],
  weather text[],
  image_url text,
  price decimal(10,2),
  brand text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_conversations table
CREATE TABLE IF NOT EXISTS user_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  message text NOT NULL,
  response text NOT NULL,
  recommendations jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  body_type text,
  preferred_colors text[],
  style_preferences text[],
  size_info jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE fashion_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Users can read and update their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Admin can read all users
CREATE POLICY "Admin can read all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Fashion items policies
CREATE POLICY "Anyone can read fashion items" ON fashion_items
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage fashion items" ON fashion_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- User conversations policies
CREATE POLICY "Users can read own conversations" ON user_conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations" ON user_conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can read all conversations" ON user_conversations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- User preferences policies
CREATE POLICY "Users can manage own preferences" ON user_preferences
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admin can read all preferences" ON user_preferences
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert sample fashion items
INSERT INTO fashion_items (name, category, subcategory, color, season, occasion, body_type, weather, price, brand, description) VALUES
('Classic White T-Shirt', 'tops', 'casual', 'white', 'all', 'casual', ARRAY['all'], ARRAY['hot', 'mild'], 29.99, 'StyleCo', 'Essential white cotton t-shirt'),
('Black Blazer', 'tops', 'formal', 'black', 'all', 'formal', ARRAY['all'], ARRAY['cold', 'mild'], 129.99, 'ProfessionalWear', 'Classic black blazer for professional occasions'),
('Blue Jeans', 'bottoms', 'casual', 'blue', 'all', 'casual', ARRAY['all'], ARRAY['cold', 'mild'], 79.99, 'DenimCo', 'Comfortable blue denim jeans'),
('Little Black Dress', 'dresses', 'formal', 'black', 'all', 'formal', ARRAY['hourglass', 'pear'], ARRAY['mild'], 159.99, 'ElegantStyle', 'Timeless little black dress'),
('Summer Floral Dress', 'dresses', 'casual', 'multicolor', 'summer', 'casual', ARRAY['all'], ARRAY['hot'], 89.99, 'SummerVibes', 'Light floral dress perfect for summer'),
('Leather Jacket', 'outerwear', 'casual', 'black', 'fall', 'casual', ARRAY['all'], ARRAY['cold'], 199.99, 'RockStyle', 'Classic black leather jacket'),
('White Sneakers', 'shoes', 'casual', 'white', 'all', 'casual', ARRAY['all'], ARRAY['all'], 99.99, 'ComfortWalk', 'Comfortable white sneakers'),
('High Heels', 'shoes', 'formal', 'black', 'all', 'formal', ARRAY['all'], ARRAY['mild'], 149.99, 'ElegantSteps', 'Classic black high heels');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fashion_items_updated_at BEFORE UPDATE ON fashion_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();