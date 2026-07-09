import { useLoaderData } from "react-router"

export function Reviews() {
  const { reviews } = useLoaderData()

  if (!reviews || reviews.length === 0) return null;

  return (
    <>
      <div className="bg-charcoal w-full mt-7">
        <h2 className="text-white text-center uppercase text-xl font-medium py-6 m-0">
          our community
        </h2>
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((review: Review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </>
  )
}

export function Review({ review }: { review: Review }) {
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

type Review = {
  id: string
  text: string
  name: string
  description: string
}