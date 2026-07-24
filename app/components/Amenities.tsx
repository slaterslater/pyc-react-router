export function Amenities({ amenities }: Amenities) {
  if (amenities.length === 0) return null;

  return (
    <>
      <h2 className="heading px-4 text-center capitalize">studio amenities</h2>
      <div className="flex flex-wrap gap-8 md:gap-16 md:px-8 py-4 w-full justify-center">
        {amenities.map((amenity) => (
          <div key={amenity.name} className="flex flex-col items-center gap-2">
            <img
              src={amenity.image.url}
              alt={amenity.name}
              // width={135}
              // height={135}
              className="w-20 h-20 md:w-32 md:h-32 object-contain"
            />
            {amenity.name}
          </div>
        ))}
      </div>
    </>
  )
}

type Amenities = {
  amenities: {
    name: string
    image: {
      url: string
    }
  }[]
}