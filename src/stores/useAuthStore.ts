import { create } from 'zustand';
import { User, UserProfile } from '../types';
import { supabase } from '../config/supabase';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  isLoading: true,
  error: null,

  initialize: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        set({
          user: session.user as User,
          profile: profile as UserProfile,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        set({
          user: user as User,
          profile: profile as UserProfile,
          isLoading: false,
        });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  signUp: async (email: string, password: string, username: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              user_id: user.id,
              username,
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
            },
          ]);

        if (profileError) throw profileError;

        set({
          user: user as User,
          isLoading: false,
        });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      set({
        user: null,
        profile: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateProfile: async (data: Partial<UserProfile>) => {
    try {
      const { user, profile } = get();
      
      if (!user || !profile) throw new Error('Not authenticated');
      
      set({ isLoading: true, error: null });
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('user_id', user.id);

      if (error) throw error;
      
      set({
        profile: { ...profile, ...data },
        isLoading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));