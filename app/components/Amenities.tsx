export function Amenities({ amenities }: Amenities) {
  if (amenities.length === 0) return null;

  return (
    <>
      <h2 className="heading px-4 text-center capitalize">studio amenities</h2>
      <div className="flex flex-wrap gap-4 md:gap-16 px-4 md:px-8 py-4 w-full justify-center">
        {amenities.map((amenity) => (
          <div key={amenity.name} className="flex flex-col items-center gap-2 text-sm">
            <img
              src={amenity.image.url}
              alt={amenity.name}
              // width={135}
              // height={135}
              className="w-20 h-20 md:w-28 md:h-28 object-contain"
            />
            {/* {amenity.name} */}
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