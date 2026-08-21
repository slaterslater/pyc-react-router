import { NavLink, type MenuLink } from "./navigation/NavLink";

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
      {/* {card.title} */}
      {/* <NavLink link={card.button} /> */}
      <div className="flex justify-center text-center items-center gap-2 mt-4 border border-white py-2 px-4 rounded-md bg-black/40 min-w-[150px]">
        <img src="/pyc-icon.png" alt="" className="w-3 h-3" />
        <NavLink
          link={card.button}
          className="underline uppercase text-white"
        />
      </div>
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