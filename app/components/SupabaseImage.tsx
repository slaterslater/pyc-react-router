
import { supabase } from "~/lib/supabaseClient";

export function SupabaseImage({ media, sizes, className }: { media: Media, sizes?: string, className?: string }) {
  const srcSet = getSupabaseSrcSet(media);
  return (
    <img
      src={supabaseImageSrc(media.filename)}
      srcSet={srcSet || undefined}
      sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
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
  if (!media.sizes) return null;

  return [
    media.sizes.thumbnail?.filename &&
    `${supabaseImageSrc(media.sizes.thumbnail.filename)} 400w`,
    media.sizes.tablet?.filename &&
    `${supabaseImageSrc(media.sizes.tablet.filename)} 768w`,
    media.sizes.desktop?.filename &&
    `${supabaseImageSrc(media.sizes.desktop.filename)} 1440w`,
    media.filename &&
    `${supabaseImageSrc(media.filename)} 2000w`,
  ]
    .filter(Boolean)
    .join(', ');
}

interface Media {
  filename: string;
  alt: string;
  sizes?: {
    thumbnail?: {
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