export function Reviews({ reviews }: { reviews: ReviewType[] }) {

  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 px-5">
      {reviews.map((review: ReviewType) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  )
}

export function Review({ review }: { review: ReviewType }) {
  return (
    <article className="bg-cream rounded-md p-4 flex flex-col gap-4 flex-1 p-8">
      <p className="text-md">"{review.text}"</p>
      <div className="grid grid-cols-[45px_1fr] gap-4 mt-auto">
        <div className="rounded-full bg-red w-[45px] h-[45px]" />
        <div className="flex flex-col items-start justify-center">
          <span className="font-medium relative text-sm">{review.name}</span>
          <span className="text-light-gray relative text-xs">{review.description}</span>
        </div>
      </div>
    </article>
  )
}

export type ReviewType = {
  id: string
  text: string
  name: string
  description: string
}