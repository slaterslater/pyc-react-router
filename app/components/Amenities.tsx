export function Amenities({ amenities, title }: Amenities & { title?: string }) {
  if (amenities.length === 0) return null;

  return (
    <>
      {title && <h2 className="heading px-4 text-center">{title}</h2>}
      <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 lg:gap-16 px-4 md:px-8 py-6 w-full justify-center">
        {amenities.map((amenity) => (
          <div key={amenity.name} className="flex flex-col items-center gap-2 text-sm">
            <img
              src={amenity.image.url}
              alt={amenity.name}
              className="w-18 h-20 md:w-22 md:h-22 object-contain"
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