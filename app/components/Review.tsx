export function Review() {
  return (
    <article className="bg-cream rounded-md p-4 flex flex-col gap-4 flex-1 min-h-[200px] p-8">
      <p className="text-2xl">"a fantastic bit of feedback"</p>
      <div className="grid grid-cols-[45px_1fr] gap-4 mt-auto">
        <div className="rounded-full bg-red w-[45px] h-[45px]" />
        <div className="flex flex-col items-start justify-center">
          <span className="font-medium relative">Name</span>
          <span className="text-light-gray relative">Description</span>
        </div>
      </div>
    </article>
  )
}