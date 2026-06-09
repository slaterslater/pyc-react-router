export function Amenities({ amenities }: Amenities) {

  return (
    <>
      <h2 className="uppercase text-4xl font-medium mx-auto px-4 py-8">studio amenities</h2>
      <div className="flex flex-wrap gap-8 px-8 py-4 w-full justify-center md:justify-around">
        {/* <img src="/development/towels.svg" alt="towels" width={135} />
        <img src="/development/hot-yoga.svg" alt="hot yoga" width={135} />
        <img src="/development/showers.svg" alt="showers" width={135} />
        <img src="/development/power-yoga.svg" alt="warm yoga" width={135} />
        <img src="/development/mat-rental.svg" alt="mat rental" width={135} /> */}
        {amenities.map((amenity) => (
          <div key={amenity.name}> {amenity.name} </div>
        ))}
      </div>
    </>
  )
}

type Amenities = {
  amenities: {
    name: string
    description: string
  }[]
}