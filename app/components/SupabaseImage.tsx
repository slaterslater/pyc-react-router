
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
  const { thumbnail, tablet, desktop } = media.sizes;

  return [
    thumbnail && `${supabaseRawSrc(thumbnail.filename)} 400w`,
    tablet && `${supabaseRawSrc(tablet.filename)} 768w`,
    desktop && `${supabaseRawSrc(desktop.filename)} 1440w`,
    media.filename && `${supabaseRawSrc(media.filename)} 2000w`,
  ].filter(Boolean).join(', ');
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