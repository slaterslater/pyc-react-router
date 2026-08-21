export function HomepageFeature({ feature }: { feature: HomepageFeatureType }) {
  return (
    <div>
      <img src={feature.media?.sizes.tablet.url ?? feature.media?.url} alt={feature.media?.alt} className="w-full h-[350px] object-cover rounded-md" />
      <h3 className="uppercase text-lg font-medium pt-3">{feature.title}</h3>
      <p className="text-light-gray pb-5">{feature.description}</p>
    </div>
  )
}

type HomepageFeatureType = {
  title: string;
  description: string;
  media: {
    url: string;
    alt: string;
    sizes: {
      tablet: {
        url: string;
      };
    };
  };
}


