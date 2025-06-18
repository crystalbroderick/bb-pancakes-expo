import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = "https://wmmtpfqzseugajsdzxrb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtbXRwZnF6c2V1Z2Fqc2R6eHJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MzcyOTYsImV4cCI6MjA1NjAxMzI5Nn0.m8eiCXrUwgcq6oLMU43_5DqQ7V-kwbPvW44SlqC8HLI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});