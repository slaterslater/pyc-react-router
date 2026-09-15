// use supbase client to transform the image png/jpg into webp
import { supabase } from './supabaseClient';

interface SupabaseImageOptions {
  quality?: number;      // 20–100, defaults to 80
  format?: 'origin';     // omit to let Supabase auto-negotiate webp/avif
}

export function supabaseImage(path: string, { quality = 75, format }: SupabaseImageOptions = {}) {
  if (!path) return '';
  const { data } = supabase.storage.from('media').getPublicUrl(path, {
    transform: { quality, format },
  });
  return data.publicUrl;
}