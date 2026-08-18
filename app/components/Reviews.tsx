import { useRouteLoaderData } from "react-router"

export function Reviews() {
  const { reviews } = useRouteLoaderData("routes/studios.$studio")

  if (!reviews || reviews.length === 0) return null;

  return (
    <>
      <div className="bg-charcoal w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <h2 className="text-white text-center uppercase text-xl font-medium py-6 max-w-5xl mx-auto">
          our community
        </h2>
      </div>

      <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 px-5">
        {reviews.map((review: ReviewType) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </>
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