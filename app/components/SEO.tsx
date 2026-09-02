import { useSite } from "~/hooks/useSite"
import { getMimeType } from "~/lib/getMimeType";

export default function SEO({ title, description, path, media }: SEOProps) {
  const { site } = useSite()

  const url = `https://${site.hostname}${path}`
  const fullTitle = `${title} | Power Yoga ${site.name}`

  const defaultImage = `https://${site.hostname}/pyc-icon.png`
  const mimeType = getMimeType(media?.mimeType);
  const image = mimeType === 'image' ? media?.sizes?.desktop?.url ?? media?.url ?? defaultImage : defaultImage;

  return (
    <>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={`Power Yoga ${site.name}`} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  )
}

type SEOProps = {
  title: string;
  description: string;
  path: string;
  media?: {
    mimeType: string;
    url: string;
    sizes:
    {
      desktop: { url: string },
      tablet: { url: string }
    }
  };
}