import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import ComingSoon from "~/components/ComingSoon";
import { STUDIO_TEACHERS_QUERY } from "~/graphql/queries/studioTeacherQuery";
import { payload } from "~/lib/payloadClient.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const { studio } = params;
  const data = await payload.request(STUDIO_TEACHERS_QUERY, { studio })
  const teachers = data.Studios.docs[0].teachers.docs;
  return { teachers };
}

export default function TeachingTeam() {
  const { teachers } = useLoaderData<typeof loader>();
  const gridCols = teachers.length > 3 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2";
  return (
    <>
      <ComingSoon title="Teaching Team" />
      <section className={`grid ${gridCols} gap-4 px-4`}>
        {teachers.map((teacher: Teacher) => <Teacher key={teacher.id} teacher={teacher} />)}
      </section>
    </>
  )
}

function Teacher({ teacher }: { teacher: Teacher }) {
  return (
    <div key={teacher.id}>
      <img src={teacher.image.thumbnailURL} alt={teacher.name} className="aspect-square object-cover w-full bg-cream" />
      <h3>{teacher.name}</h3>
      <p>{teacher.description}</p>
    </div>
  )
}

type Teacher = {
  id: string;
  name: string;
  description: string;
  image: {
    thumbnailURL: string;
  };
}