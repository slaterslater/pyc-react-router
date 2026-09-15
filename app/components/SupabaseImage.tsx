
import { supabase } from "~/lib/supabaseClient";

export function SupabaseImage({ media, sizes, className }: { media: Media, sizes?: string, className?: string }) {
  const srcSet = getSupabaseSrcSet(media);
  return (
    <img
      src={supabaseRawSrc(media.filename)}
      srcSet={srcSet || undefined}
      sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
      alt={media.alt ?? ''}
      className={className}
      loading="lazy"
    />
  );
}

// interface SupabaseImageOptions {
//   quality?: number;      // 20–100, defaults to 80
//   format?: 'origin';     // omit to let Supabase auto-negotiate webp/avif
// }

// export function supabaseImageSrc(path: string, { quality, format }: SupabaseImageOptions = {}) {
//   if (!path) return '';
//   const { data } = supabase.storage.from('media').getPublicUrl(path, {
//     transform: { quality, format },
//   });
//   return data.publicUrl;
// }

export function supabaseImageSrc(path: string) {
  return supabaseRawSrc(path);
}
function supabaseRawSrc(path: string) {
  if (!path) return '';
  const { data } = supabase.storage.from('media').getPublicUrl(path);
  return data.publicUrl;
}

function getSupabaseSrcSet(media: Media) {
  if (!media.sizes) return null;

  // Payload already resized these — serve them as-is, no transform.
  // (0 origin-image cost: transform-free getPublicUrl calls aren't metered.)
  return [
    media.sizes.thumbnail?.filename &&
    `${supabaseRawSrc(media.sizes.thumbnail.filename)} 400w`,
    media.sizes.tablet?.filename &&
    `${supabaseRawSrc(media.sizes.tablet.filename)} 768w`,
    media.sizes.desktop?.filename &&
    `${supabaseRawSrc(media.sizes.desktop.filename)} 1440w`,
    // Only the full-size original goes through quality transform,
    // since that's the one file where compression actually helps.
    media.filename && `${supabaseRawSrc(media.filename)} 2000w`,
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