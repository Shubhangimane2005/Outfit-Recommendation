import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mjehlbcekzkuvsdgoqsk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZWhsYmNla3prdXZzZGdvcXNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3MzQ0MDAsImV4cCI6MjA1MTMxMDQwMH0.demo-key-for-development';

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  return supabaseUrl && 
         supabaseAnonKey && 
         supabaseUrl.includes('supabase.co') &&
         supabaseAnonKey.length > 20;
};

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Auth helper functions
export const authHelpers = {
  signUp: async (email: string, password: string, fullName: string) => {
    try {
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, using demo mode');
        return { 
          data: { 
            user: { 
              id: 'demo-user-' + Date.now(), 
              email, 
              user_metadata: { full_name: fullName } 
            } 
          }, 
          error: null 
        };
      }

      console.log('Starting user registration for:', email);
      
      // First create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          },
          emailRedirectTo: undefined
        }
      });

      if (authError) return { data: null, error: authError };

      console.log('Auth user created successfully:', authData.user?.email);

      // Then create the user record in our users table using the auth user ID
      if (authData.user) {
        console.log('Creating user record with ID:', authData.user.id);
        const { data: userData, error: userError } = await supabase
          .from('users')
          .insert([{
            id: authData.user.id,
            email,
            full_name: fullName,
            role: 'user'
          }])
          .select()
          .single();

        if (userError) {
          console.error('Error creating user record:', userError);
          // If user record creation fails, try to get existing user
          const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('id', authData.user.id)
            .single();
          
          if (fetchError) {
            console.error('User record creation and fetch both failed:', userError, fetchError);
          } else {
            console.log('Found existing user record:', existingUser);
          }
        } else {
          console.log('User record created successfully:', userData);
        }
      }
      return { data: authData, error: null };
    } catch (error) {
      console.error('SignUp error:', error);
      return { data: null, error };
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, using demo mode');
        // Demo credentials
        const demoUsers = [
          { email: 'admin@fashionstyle.com', password: 'admin123', fullName: 'Admin User', role: 'admin' },
          { email: 'user@example.com', password: 'user123', fullName: 'Demo User', role: 'user' }
        ];
        
        const user = demoUsers.find(u => u.email === email && u.password === password);
        if (user) {
          return { 
            data: { 
              user: { 
                id: 'demo-' + user.role, 
                email: user.email, 
                user_metadata: { full_name: user.fullName } 
              } 
            }, 
            error: null 
          };
        } else {
          return { data: null, error: { message: 'Invalid credentials' } };
        }
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    } catch (error) {
      console.error('SignIn error:', error);
      return { data: null, error };
    }
  },

  signOut: async () => {
    try {
      if (!isSupabaseConfigured()) {
        return { error: null };
      }
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      console.error('SignOut error:', error);
      return { error };
    }
  },

  getCurrentUser: async () => {
    try {
      if (!isSupabaseConfigured()) {
        return null;
      }
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }
};

// Database helper functions
export const dbHelpers = {
  // Test database connection
  testConnection: async () => {
    try {
      if (!isSupabaseConfigured()) {
        return { connected: false, error: 'Supabase not configured' };
      }

      const { data, error } = await supabase
        .from('users')
        .select('count')
        .limit(1);
      
      return { connected: !error, error };
    } catch (error) {
      return { connected: false, error };
    }
  },

  // Fashion Items
  getFashionItems: async () => {
    try {
      if (!isSupabaseConfigured()) {
        // Return demo data
        return { 
          data: [
            { id: '1', name: 'Classic White T-Shirt', category: 'tops', color: 'white', price: 29.99, brand: 'BasicWear' },
            { id: '2', name: 'Blue Denim Jeans', category: 'bottoms', color: 'blue', price: 79.99, brand: 'DenimCo' },
            { id: '3', name: 'Black Blazer', category: 'outerwear', color: 'black', price: 149.99, brand: 'FormalWear' }
          ], 
          error: null 
        };
      }

      const { data, error } = await supabase
        .from('fashion_items')
        .select('*')
        .order('created_at', { ascending: false });
      return { data: data || [], error };
    } catch (error) {
      console.error('Get fashion items error:', error);
      return { data: [], error };
    }
  },

  addFashionItem: async (item: any) => {
    try {
      if (!isSupabaseConfigured()) {
        console.warn('Cannot add item - Supabase not configured');
        return { data: null, error: { message: 'Database not configured' } };
      }

      const { data, error } = await supabase
        .from('fashion_items')
        .insert([item])
        .select();
      return { data, error };
    } catch (error) {
      console.error('Add fashion item error:', error);
      return { data: null, error };
    }
  },

  updateFashionItem: async (id: string, updates: any) => {
    try {
      if (!isSupabaseConfigured()) {
        return { data: null, error: { message: 'Database not configured' } };
      }

      const { data, error } = await supabase
        .from('fashion_items')
        .update(updates)
        .eq('id', id)
        .select();
      return { data, error };
    } catch (error) {
      console.error('Update fashion item error:', error);
      return { data: null, error };
    }
  },

  deleteFashionItem: async (id: string) => {
    try {
      if (!isSupabaseConfigured()) {
        return { error: { message: 'Database not configured' } };
      }

      const { error } = await supabase
        .from('fashion_items')
        .delete()
        .eq('id', id);
      return { error };
    } catch (error) {
      console.error('Delete fashion item error:', error);
      return { error };
    }
  },

  // User Conversations
  saveConversation: async (userId: string, message: string, response: string, recommendations: any[]) => {
    try {
      if (!isSupabaseConfigured()) {
        console.warn('Cannot save conversation - Supabase not configured');
        return { data: null, error: null };
      }

      const { data, error } = await supabase
        .from('user_conversations')
        .insert([{
          user_id: userId,
          message,
          response,
          recommendations
        }]);
      return { data, error };
    } catch (error) {
      console.error('Save conversation error:', error);
      return { data: null, error };
    }
  },

  getUserConversations: async (userId: string) => {
    try {
      if (!isSupabaseConfigured()) {
        return { data: [], error: null };
      }

      const { data, error } = await supabase
        .from('user_conversations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      return { data: data || [], error };
    } catch (error) {
      console.error('Get user conversations error:', error);
      return { data: [], error };
    }
  },

  // User Preferences
  getUserPreferences: async (userId: string) => {
    try {
      if (!isSupabaseConfigured()) {
        return { data: null, error: null };
      }

      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();
      return { data, error };
    } catch (error) {
      console.error('Get user preferences error:', error);
      return { data: null, error };
    }
  },

  saveUserPreferences: async (userId: string, preferences: any) => {
    try {
      if (!isSupabaseConfigured()) {
        return { data: null, error: null };
      }

      const { data, error } = await supabase
        .from('user_preferences')
        .upsert([{
          user_id: userId,
          ...preferences
        }]);
      return { data, error };
    } catch (error) {
      console.error('Save user preferences error:', error);
      return { data: null, error };
    }
  },

  // Admin functions
  getAllUsers: async () => {
    try {
      if (!isSupabaseConfigured()) {
        // Return demo data
        return { 
          data: [
            { id: '1', email: 'admin@fashionstyle.com', full_name: 'Admin User', role: 'admin', created_at: new Date() },
            { id: '2', email: 'user@example.com', full_name: 'Demo User', role: 'user', created_at: new Date() },
            { id: '3', email: 'jane@example.com', full_name: 'Jane Smith', role: 'user', created_at: new Date() }
          ], 
          error: null 
        };
      }

      console.log('Fetching all users from database...');
      
      // First try with service role for admin access
      const { data, error } = await supabase.rpc('get_all_users_admin');
      
      if (error) {
        console.log('RPC failed, trying direct query...');
        // Fallback to direct query
        const { data: directData, error: directError } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (directError) {
          console.error('Direct query also failed:', directError);
          // Return current user data at least
          const currentUser = await supabase.auth.getUser();
          if (currentUser.data.user) {
            return {
              data: [{
                id: currentUser.data.user.id,
                email: currentUser.data.user.email,
                full_name: currentUser.data.user.user_metadata?.full_name || 'Current User',
                role: 'admin',
                created_at: new Date()
              }],
              error: null
            };
          }
        }
        
        console.log('Users fetched via direct query:', directData?.length || 0, 'users');
        return { data: directData || [], error: directError };
      }
      
      console.log('Users fetched:', data?.length || 0, 'users');
      
      return { data: data || [], error };
    } catch (error) {
      console.error('Get all users error:', error);
      return { data: [], error };
    }
  },

  getAllConversations: async () => {
    try {
      if (!isSupabaseConfigured()) {
        // Return demo data
        return { 
          data: [
            {
              id: '1',
              user_id: '2',
              message: 'What should I wear for a casual day?',
              response: 'For a casual day, I recommend a white t-shirt with jeans and sneakers.',
              recommendations: [{ category: 'Casual Outfit', items: [{ type: 'top', item: 'White T-Shirt' }] }],
              created_at: new Date(),
              users: { full_name: 'Demo User', email: 'user@example.com' }
            }
          ], 
          error: null 
        };
      }

      console.log('Fetching all conversations from database...');
      
      // First try with RPC function for admin access
      const { data, error } = await supabase.rpc('get_all_conversations_admin');
      
      if (error) {
        console.log('RPC failed, trying direct query...');
        // Fallback to direct query
        const { data: directData, error: directError } = await supabase
          .from('user_conversations')
          .select(`
            *,
            users (
              email,
              full_name
            )
          `)
          .order('created_at', { ascending: false });
        
        console.log('Conversations fetched via direct query:', directData?.length || 0, 'conversations');
        if (directError) console.error('Error fetching conversations:', directError);
        
        return { data: directData || [], error: directError };
      }
      
      console.log('Conversations fetched:', data?.length || 0, 'conversations');
      return { data: data || [], error };
    } catch (error) {
      console.error('Get all conversations error:', error);
      return { data: [], error };
    }
  }
};

// Export connection status checker
export const checkSupabaseConnection = async () => {
  if (!isSupabaseConfigured()) {
    return { 
      connected: false, 
      message: 'Supabase not configured. Click "Connect to Supabase" to set up your database.' 
    };
  }

  const result = await dbHelpers.testConnection();
  return {
    connected: result.connected,
    message: result.connected ? 'Database connected successfully!' : 'Database connection failed. Please check your Supabase configuration.'
  };
};