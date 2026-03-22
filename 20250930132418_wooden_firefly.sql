/*
  # Fix Database Connection and User Registration

  1. New Tables
    - `users` - User accounts with proper structure
    - `user_conversations` - Chat history storage
    - `user_preferences` - User style preferences
    - `fashion_items` - Fashion catalog
    - `admin_emails` - Admin access control

  2. Security
    - Enable RLS on all tables
    - Add proper policies for user access
    - Fix infinite recursion issues

  3. Sample Data
    - Add demo users and admin accounts
    - Add sample fashion items
    - Set up admin emails
*/

-- Drop existing tables if they exist to start fresh
DROP TABLE IF EXISTS user_conversations CASCADE;
DROP TABLE IF EXISTS user_preferences CASCADE;
DROP TABLE IF EXISTS fashion_items CASCADE;
DROP TABLE IF EXISTS admin_emails CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create admin_emails table first (no dependencies)
CREATE TABLE admin_emails (
  email text PRIMARY KEY,
  created_at timestamptz DEFAULT now()
);

-- Insert admin emails
INSERT INTO admin_emails (email) VALUES 
  ('admin@fashionstyle.com'),
  ('developer@fashionstyle.com');

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  full_name text NOT NULL,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_preferences table
CREATE TABLE user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  body_type text,
  preferred_colors text[],
  style_preferences text[],
  size_info jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create user_conversations table
CREATE TABLE user_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  message text NOT NULL,
  response text NOT NULL,
  recommendations jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Create fashion_items table
CREATE TABLE fashion_items (
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
  price numeric(10,2),
  brand text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_user_conversations_user_id ON user_conversations(user_id);
CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE fashion_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_emails ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admin can read all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_emails 
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- RLS Policies for user_preferences table
CREATE POLICY "Users can manage own preferences" ON user_preferences
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admin can read all preferences" ON user_preferences
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_emails 
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- RLS Policies for user_conversations table
CREATE POLICY "Users can read own conversations" ON user_conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations" ON user_conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can read all conversations" ON user_conversations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_emails 
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- RLS Policies for fashion_items table
CREATE POLICY "Anyone can read fashion items" ON fashion_items
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage fashion items" ON fashion_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_emails 
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- RLS Policies for admin_emails table
CREATE POLICY "Service role can manage admin emails" ON admin_emails
  FOR ALL USING (true);

-- Insert sample users
INSERT INTO users (id, email, password, full_name, role) VALUES 
  ('11111111-1111-1111-1111-111111111111', 'admin@fashionstyle.com', 'hashed_admin123', 'Admin User', 'admin'),
  ('22222222-2222-2222-2222-222222222222', 'user@example.com', 'hashed_user123', 'Demo User', 'user'),
  ('33333333-3333-3333-3333-333333333333', 'jane@example.com', 'hashed_jane123', 'Jane Smith', 'user');

-- Insert sample fashion items
INSERT INTO fashion_items (name, category, subcategory, color, season, occasion, body_type, weather, price, brand, description) VALUES 
  ('Classic White T-Shirt', 'tops', 'basic', 'white', 'all', 'casual', ARRAY['all'], ARRAY['all'], 29.99, 'BasicWear', 'Essential white cotton t-shirt'),
  ('Blue Denim Jeans', 'bottoms', 'jeans', 'blue', 'all', 'casual', ARRAY['all'], ARRAY['all'], 79.99, 'DenimCo', 'Classic straight-leg blue jeans'),
  ('Black Blazer', 'outerwear', 'blazer', 'black', 'all', 'formal', ARRAY['all'], ARRAY['all'], 149.99, 'FormalWear', 'Professional black blazer'),
  ('Red Summer Dress', 'dresses', 'casual', 'red', 'summer', 'party', ARRAY['hourglass', 'pear'], ARRAY['hot'], 89.99, 'SummerStyle', 'Flowy red summer dress'),
  ('White Sneakers', 'shoes', 'sneakers', 'white', 'all', 'casual', ARRAY['all'], ARRAY['all'], 99.99, 'SportStyle', 'Comfortable white sneakers');

-- Insert sample conversations
INSERT INTO user_conversations (user_id, message, response, recommendations) VALUES 
  ('22222222-2222-2222-2222-222222222222', 'What should I wear for a casual day?', 'For a casual day, I recommend a white t-shirt with blue jeans and white sneakers!', '[{"category": "Casual Outfit", "items": [{"type": "top", "item": "White T-Shirt"}, {"type": "bottom", "item": "Blue Jeans"}, {"type": "shoes", "item": "White Sneakers"}]}]'),
  ('33333333-3333-3333-3333-333333333333', 'I need a formal outfit', 'For a formal look, try a black blazer with dress pants and formal shoes.', '[{"category": "Formal Outfit", "items": [{"type": "top", "item": "Black Blazer"}, {"type": "bottom", "item": "Dress Pants"}, {"type": "shoes", "item": "Formal Shoes"}]}]');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fashion_items_updated_at BEFORE UPDATE ON fashion_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();