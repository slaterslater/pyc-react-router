import Grid from "./Grid";
import { Hero } from "./Hero";
import Offering from "./Offering";
import { Review, type ReviewType } from "./Reviews";
import { RichText } from "./RichText";

export function ContentBlocks({ block }: { block: any }) {
  const type = block.__typename;
  switch (type) {
    case 'Grid':
      const colNum = block.columns.replace('_', '');
      return (
        <Grid columns={colNum}>{block.items?.map((item: any) => (
          <ContentBlocks key={item.id} block={item} />
        ))}
        </Grid>
      )
    case 'OfferingBlock':
      return <Offering offering={block} />
    case 'Image':
      return (
        <img
          src={block.media.sizes.tablet.url ?? block.media.url}
          alt=""
          className="w-full h-full object-cover bg-charcoal rounded-md"
        />
      )
    case "Headline":
      const { heading, subtitle } = block;
      return (
        <div className="flex flex-col gap-4 text-center py-10">
          <h2 className="text-2xl font-bold">{heading}</h2>
          {subtitle && <div className="text-lg">{subtitle}</div>}
        </div>
      )
    case "Text":
      const className = 'bg-cream p-10 lg:p-16 rounded-md flex flex-col gap-4 [&_h2]:text-2xl [&_h2]:uppercase'
      return <RichText data={block.richText} className={className} />
    case 'Banner':
      return <Hero hero={{ title: block.title, media: block.media }} />
    case 'Reviews':
      const { length } = block.reviews;
      const cols = length > 2 ? 3 : length;
      return (
        // <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5">
        <div className={`grid grid-cols-${cols} gap-4`}>
          {block.reviews.map((review: ReviewType) => <Review key={review.id} review={review} />)}
        </div>
      )
    default:
      return <div className="text-center py-5 font-bold">{block.__typename}...</div>
  }
}