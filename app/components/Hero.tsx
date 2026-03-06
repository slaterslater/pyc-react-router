export function Hero({ title, bgColor = "charcoal", textColor = "white" }: { title: string, bgColor?: "charcoal" | "cream", textColor?: "white" | "charcoal" }) {
  return (
    <div
      className="flex justify-center items-center uppercase font-bold text-lg text-white bg-charcoal rounded-md p-4 w-full h-[575px] md:h-[650px]"
      style={{ backgroundColor: bgColor === "charcoal" ? "var(--color-charcoal)" : "var(--color-cream)", color: textColor === "white" ? "var(--color-white)" : "var(--color-charcoal)" }}
    >
      {title}
    </div>
  )
}