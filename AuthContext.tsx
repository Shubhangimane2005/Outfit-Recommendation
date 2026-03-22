import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, authHelpers, checkSupabaseConnection } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  connected: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Check database connection
    checkSupabaseConnection().then(result => {
      setConnected(result.connected);
      console.log('Database connection:', result.message);
    });

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      checkAdminStatus(session?.user);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setUser(session?.user ?? null);
        checkAdminStatus(session?.user);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (user: User | null) => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    try {
      // Simple email-based admin check to avoid database recursion
      const adminEmails = ['admin@fashionstyle.com', 'developer@fashionstyle.com'];
      const isUserAdmin = adminEmails.includes(user.email || '');
      setIsAdmin(isUserAdmin);
      console.log('Admin status:', isUserAdmin, 'for user:', user.email);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await authHelpers.signIn(email, password);
      if (data?.user) {
        console.log('User signed in:', data.user.email);
      }
      return { error };
    } catch (error) {
      console.error('SignIn error:', error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      console.log('Attempting to sign up user:', email);
      const result = await authHelpers.signUp(email, password, fullName);
      
      if (result.error) {
        console.error('SignUp error:', result.error);
        // If it's a duplicate email error, provide a friendly message
        if (result.error.message?.includes('duplicate') || result.error.message?.includes('already')) {
          return { error: { message: 'An account with this email already exists. Please try logging in instead.' } };
        }
        return { error: result.error };
      }
      
      if (result.data?.user) {
        console.log('User signed up successfully:', result.data.user.email);
        setUser(result.data.user);
        checkAdminStatus(result.data.user);
        
        // Refresh admin data if current user is admin
        if (isAdmin) {
          console.log('Refreshing admin data after new user signup');
          // Trigger a refresh of admin dashboard if it's open
          window.dispatchEvent(new CustomEvent('refreshAdminData'));
        }
      }
      
      return { error: null };
    } catch (error) {
      console.error('SignUp error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await authHelpers.signOut();
      console.log('User signed out');
    } catch (error) {
      console.error('SignOut error:', error);
    }
  };

  const value = {
    user,
    isAdmin,
    loading,
    connected,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};