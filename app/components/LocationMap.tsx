// https://embed-googlemap.com/

export default function LocationMap({ fullAddress }: { fullAddress: string }) {
  if (!fullAddress) return null;

  return (
    <div className="relative text-right w-full px-4">
      <div className="gmap_canvas overflow-hidden bg-none w-full h-[400px]">
        <iframe
          className="rounded-md h-[400px] w-full"
          width="100%"
          src={`https://maps.google.com/maps?width=600&height=400&hl=en&q=${encodeURIComponent(
            `power yoga ${fullAddress}`
          )}&t=&z=16&ie=UTF8&iwloc=B&output=embed`}
          title="Power Yoga Map"
          // allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  )
}


