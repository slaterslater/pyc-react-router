export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[200px]">
      <h1 className="heading text-center">{title}</h1>
      <p className="text-center">coming soon</p>
    </div>
  )
}