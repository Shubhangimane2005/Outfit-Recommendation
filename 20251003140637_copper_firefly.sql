/*
  # Fix Admin Dashboard Access

  1. New Functions
    - `get_all_users_admin()` - Admin function to get all users
    - `get_all_conversations_admin()` - Admin function to get all conversations
  
  2. Security
    - Functions check if user is admin before returning data
    - Bypass RLS for admin users only
  
  3. Changes
    - Updated RLS policies to allow admin access
    - Added admin check functions
*/

-- Function to check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_emails 
    WHERE email = (auth.jwt() ->> 'email')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin function to get all users
CREATE OR REPLACE FUNCTION get_all_users_admin()
RETURNS TABLE (
  id uuid,
  email text,
  full_name text,
  role text,
  preferences jsonb,
  created_at timestamptz,
  updated_at timestamptz
) AS $$
BEGIN
  -- Check if user is admin
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required.';
  END IF;
  
  RETURN QUERY
  SELECT u.id, u.email, u.full_name, u.role, u.preferences, u.created_at, u.updated_at
  FROM users u
  ORDER BY u.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin function to get all conversations
CREATE OR REPLACE FUNCTION get_all_conversations_admin()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  message text,
  response text,
  recommendations jsonb,
  created_at timestamptz,
  user_email text,
  user_full_name text
) AS $$
BEGIN
  -- Check if user is admin
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required.';
  END IF;
  
  RETURN QUERY
  SELECT 
    c.id, 
    c.user_id, 
    c.message, 
    c.response, 
    c.recommendations, 
    c.created_at,
    u.email as user_email,
    u.full_name as user_full_name
  FROM user_conversations c
  LEFT JOIN users u ON c.user_id = u.id
  ORDER BY c.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS policies for admin access
DROP POLICY IF EXISTS "Admin can manage all users" ON users;
CREATE POLICY "Admin can manage all users"
  ON users
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admin can view all conversations" ON user_conversations;
CREATE POLICY "Admin can view all conversations"
  ON user_conversations
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- Ensure admin emails table has the admin email
INSERT INTO admin_emails (email) 
VALUES ('admin@fashionstyle.com')
ON CONFLICT (email) DO NOTHING;