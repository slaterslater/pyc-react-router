import { getMimeType } from "~/lib/getMimeType";

export function HomepageFeature({ feature }: { feature: HomepageFeatureType }) {
  return (
    <div>
      <FeatureMedia media={feature.media} />
      <h3 className="uppercase text-lg font-medium pt-3">{feature.title}</h3>
      <p className="text-light-gray pb-5">{feature.description}</p>
    </div>
  )
}

function FeatureMedia({ media }: { media: HomepageFeatureType['media'] }) {
  const mimeType = getMimeType(media?.mimeType);
  switch (mimeType) {
    case 'video':
      return (
        <video src={media?.url} autoPlay muted loop className="w-full h-[350px] object-cover rounded-md" />
      );
    case 'image':
      return <img src={media?.sizes.tablet.url ?? media?.url} alt={media?.alt} className="w-full h-[350px] object-cover rounded-md" />;
    default:
      return <div className="w-full h-[350px] bg-charcoal rounded-md" />;
  }
}

type HomepageFeatureType = {
  title: string;
  description: string;
  media: {
    mimeType: string;
    url: string;
    alt: string;
    sizes: {
      tablet: {
        url: string;
      };
    };
  };
}


