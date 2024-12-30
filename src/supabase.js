import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gmejhueduqofgkjkadtr.supabase.co'; // Ganti dengan URL proyek Supabase Anda
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZWpodWVkdXFvZmdramthZHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1Njk3ODksImV4cCI6MjA1MTE0NTc4OX0.oKl0C3iEVKndFGqzgEVt6EDHY1M7aC80umAtK8yRFiE'; // Ganti dengan key anonim Anda

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
