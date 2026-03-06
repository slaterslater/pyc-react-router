import { Link } from "react-router";

export function Card({ title, text }: { title: string, text: string }) {
  return (
    <div className="flex flex-col gap-4 flex-1 min-h-[200px] max-w-[625px]">
      <div className="w-full h-[340px] bg-cream rounded-md" />
      <Link to="/" className="text-2xl font-medium uppercase">{title}</Link>
      <p className="text-light-gray text-xl leading-[150%] pb-4">{text}</p>
    </div>
  )
}