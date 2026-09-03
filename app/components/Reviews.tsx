export function Reviews({ reviews }: { reviews: ReviewType[] }) {

  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 max-w-[1200px] mx-auto">
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
      <div
        className="flex flex-col items-start justify-center mt-auto"
        style={{
          backgroundImage: 'url(/pyc-icon.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left',
          backgroundSize: '32px 32px',
          paddingLeft: '45px'
        }}
      >
        <span className="font-medium relative text-sm">{review.name}</span>
        <span className="text-light-gray relative text-xs">{review.description}</span>
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