
import { supabase } from "~/lib/supabaseClient";

// use supbase client to transform the image png/jpg into webp
export function SupabaseImage({ media, className }: { media: Media, className?: string }) {
  const srcSet = getSupabaseSrcSet(media);
  return (
    <img
      src={supabaseImageSrc(media.filename)}
      srcSet={srcSet || undefined}
      sizes="(max-width: 768px) 100vw, 50vw" // adjust to actual layout
      alt={media.alt ?? ''}
      className={className}
      loading="lazy"
    />
  );
}

interface SupabaseImageOptions {
  quality?: number;      // 20–100, defaults to 80
  format?: 'origin';     // omit to let Supabase auto-negotiate webp/avif
}

export function supabaseImageSrc(path: string, { quality = 75, format }: SupabaseImageOptions = {}) {
  if (!path) return '';
  const { data } = supabase.storage.from('media').getPublicUrl(path, {
    transform: { quality, format },
  });
  return data.publicUrl;
}

function getSupabaseSrcSet(media: Media) {
  const sizes = media.sizes;
  if (!sizes) return null;
  return [
    media.sizes.mobile && `${supabaseImageSrc(media.sizes.mobile.filename)}`,
    media.sizes.tablet && `${supabaseImageSrc(media.sizes.tablet.filename)}`,
    media.sizes.desktop && `${supabaseImageSrc(media.sizes.desktop.filename)}`,
  ]
    .filter(Boolean)
    .join(', ');
}

interface Media {
  filename: string;
  alt: string;
  sizes: {
    mobile?: {
      filename: string;
    };
    tablet?: {
      filename: string;
    };
    desktop?: {
      filename: string;
    };
  };
}