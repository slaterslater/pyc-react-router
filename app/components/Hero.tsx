export function Hero({ hero, bgColor = "charcoal", textColor = "white" }: { title: string, bgColor?: "charcoal" | "cream", textColor?: "white" | "charcoal" }) {
  const { title, media } = hero
  console.log({ media })
  return (
    <div className="w-full px-4">
      <img src={media.url} alt="" className="w-full h-[575px] md:h-[650px] object-cover rounded-md" />
      {/* <div
        className="w-full h-[575px] md:h-[650px] flex justify-center items-center uppercase font-bold text-lg rounded-md"
        style={{ backgroundColor: bgColor === "charcoal" ? "var(--color-charcoal)" : "var(--color-cream)", color: textColor === "white" ? "var(--color-white)" : "var(--color-charcoal)" }}
      >
        {title}
      </div> */}
    </div>
  )
}