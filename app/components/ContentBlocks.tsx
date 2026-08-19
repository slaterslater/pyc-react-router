import { useRouteLoaderData } from "react-router";
import Grid from "./Grid";
import { Hero } from "./Hero";
import LocationMap from "./LocationMap";
import { MindBodyWidget } from "./MindbodyWidget";
import Offering from "./Offering";
import { Review, type ReviewType } from "./Reviews";
import { RichText } from "./RichText";
import { Amenities } from "./Amenities";
import { ButtonRow } from "./ButtonRow";
import { ContactForm } from "./ContactForm";

export function ContentBlocks({ block }: { block: any }) {
  switch (block.blockType) {

    case 'grid':
      const colNum = block.columns.replace('_', '');
      return (
        <Grid columns={colNum}>{block.items?.map((item: any) => (
          <ContentBlocks key={item.id} block={item} />
        ))}
        </Grid>
      )

    case 'offering':
      return <Offering offering={block} />

    case 'image':
      return (
        <img
          src={block.media.sizes.tablet.url ?? block.media.url}
          alt=""
          className="w-full h-full object-cover bg-charcoal rounded-md"
        />
      )

    case "headline":
      const { heading, subtitle } = block;
      return (
        <div className="flex flex-col gap-4 text-center py-10 px-8">
          {heading && <h2 className="text-2xl font-bold">{heading}</h2>}
          {subtitle && <div className="text-lg max-w-4xl mx-auto">{subtitle}</div>}
        </div>
      )

    case "text":
      const className = 'bg-cream p-10 lg:p-16 rounded-md flex flex-col gap-4 [&_h2]:text-2xl [&_h2]:uppercase [&_a]:underline [&_a]:font-medium [&_ul]:list-disc [&_ul]:pl-5'
      return <RichText data={block.richText} className={className} />

    case 'banner':
      return <Hero hero={{ title: block.title, media: block.media }} parallax={false} />

    case 'reviews':
      const cols = Math.min(block.reviews.length, 3)
      return (
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {block.reviews.map((review: ReviewType) => <Review key={review.id} review={review} />)}
        </div>
      )

    case 'widget':
      return <MindBodyWidget html={block.code} />

    case 'locationMap':
      const addressParts = [
        block.address1,
        block.address2,
        block.city,
        block.province,
        block.state,
        block.zip,
        block.postalCode,
      ].filter(Boolean);
      return <LocationMap fullAddress={addressParts.join(" ")} />

    case 'amenities':
      return <AmenitiesContentBlocks block={block} />;

    case 'buttons':
      return <ButtonRow buttons={block.buttons} className="py-6" />

    case 'contactForm':
      return <ContactForm />

    default:
      // return <div className="text-center py-5 font-bold">{block.blockType}...</div>
      return null
  }
}

function AmenitiesContentBlocks({ block }: { block: any }) {
  const studioData = useRouteLoaderData('routes/studios.$studio_.$slug')
  return <Amenities amenities={studioData?.amenities} />
}