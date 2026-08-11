import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { STUDIO_TEACHERS_QUERY } from "~/graphql/queries/studioTeacherQuery";
import { payload } from "~/lib/payloadClient.server";
import { useRef, useState } from "react";

export async function loader({ params }: LoaderFunctionArgs) {
  const { studio } = params;
  const data = await payload.request(STUDIO_TEACHERS_QUERY, { studio })
  return {
    ...data.Studios.docs[0]
  };
}

export default function StudioTeachingTeam() {
  const { name, teachers } = useLoaderData<typeof loader>();
  const gridCols = teachers.docs.length > 3 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2";

  return (
    <>
      <h1 className="heading uppercase py-4 text-center">meet the {name} teaching team</h1>
      <section className={`grid ${gridCols} gap-4 px-4`}>
        {teachers.docs.map((teacher: Teacher) => <Teacher key={teacher.id} teacher={teacher} />)}
      </section>
    </>
  )
}

function Teacher({ teacher }: { teacher: Teacher }) {
  const [showDescription, setShowDescription] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      key={teacher.id}
      ref={containerRef}
      tabIndex={0}
      role="button"
      aria-pressed={showDescription}
      aria-label={`View description for ${teacher.name}`}
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
      onFocus={() => setShowDescription(true)}
      onBlur={() => setShowDescription(false)}
      className="relative flex flex-col items-center justify-center outline-none"
      style={{ cursor: "pointer" }}
    >
      <img
        src={teacher.image.thumbnailURL}
        alt={teacher.name}
        className="aspect-square object-cover w-full bg-cream"
        aria-hidden="true"
      />
      {!showDescription && (
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
          <h3 className="heading text-red text-5xl uppercase px-2 pb-22 rounded text-center">{teacher.name}</h3>
        </div>
      )}
      {showDescription && (
        <div
          className="h-full w-full flex flex-col items-start justify-center absolute bottom-0 left-0 right-0 bg-charcoal/70 text-white p-8"
          role="dialog"
          aria-modal="false"
        >
          <h3 className="text-xl uppercase text-white py-4 text-left">{teacher.name}</h3>
          <p className="max-h-[70%] overflow-y-hidden">{teacher.description}</p>
        </div>
      )}
    </div>
  );
}

type Teacher = {
  id: string;
  name: string;
  description: string;
  image: {
    thumbnailURL: string;
  };
}