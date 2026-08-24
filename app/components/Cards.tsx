import { type MenuLink } from "./navigation/NavLink";
import { PYCButton } from "./PYCbutton";

export function Cards({ cards }: { cards: CardType[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  )
}

function Card({ card }: { card: CardType }) {
  return (
    <div
      className="w-full h-[350px] md:h-[450px] rounded-md flex flex-col items-center justify-end p-4"
      style={{
        backgroundImage: `url('${card.media?.sizes.tablet.url ?? card.media?.url}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <PYCButton button={card.button} />
    </div>
  )
}

type CardType = {
  id: string;
  title: string;
  media?: {
    url: string;
    sizes:
    {
      tablet: { url: string }
    }
  };
  button: MenuLink
}