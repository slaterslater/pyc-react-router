import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { STUDIO_TEACHERS_QUERY } from "~/graphql/queries/studioTeacherQuery";
import { payload } from "~/lib/payloadClient.server";
import { useRef, useState, type RefObject } from "react";
import { FadeIn } from "~/components/FadeIn";
import { useOnClickOutside } from "usehooks-ts";
import { motion } from "motion/react";
import SEO from "~/components/SEO";

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
      <SEO title={`Meet the ${name} Teaching Team`} />
      <h2 className="heading uppercase py-5 text-center">meet the {name} teaching team</h2>
      <section className={`grid ${gridCols} gap-4 px-4`}>
        {teachers.docs.map((teacher: Teacher, i: number) => (
          <FadeIn key={teacher.id} delay={i * 0.08} className="h-full grid">
            <Teacher teacher={teacher} />
          </FadeIn>
        ))}
      </section>
    </>
  )
}

const nameVariants = { hidden: { opacity: 1 }, show: { opacity: 0 } };
const descVariants = { hidden: { opacity: 0 }, show: { opacity: 1 } };

function Teacher({ teacher }: { teacher: Teacher }) {
  const [tapped, setTapped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef as RefObject<HTMLElement>, () => setTapped(false));

  return (
    <motion.div
      ref={containerRef}
      tabIndex={0}
      role="button"
      aria-label={`View description for ${teacher.name}`}
      initial="hidden"
      animate={tapped ? "show" : "hidden"} // touch toggle
      whileHover="show"                     // desktop, device-filtered
      whileFocus="show"                     // keyboard
      onClick={() => setTapped((v) => !v)}  // touch/tap
      className="relative flex flex-col items-center justify-center outline-none"
      style={{ cursor: "pointer" }}
    >
      <img
        src={teacher.image.thumbnailURL}
        alt={teacher.name}
        className="aspect-square object-cover w-full bg-cream rounded-sm"
        aria-hidden="true"
      />

      <motion.div
        variants={nameVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex items-end justify-center pointer-events-none"
      >
        <h3
          className="heading text-red text-4xl uppercase px-2 pb-22 rounded text-center"
          style={{ textShadow: "0 1px 1px #b8aa92, 0 1px 2px #b8aa92" }}

        >
          {teacher.name}
        </h3>
      </motion.div>

      <motion.div
        variants={descVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-full w-full flex flex-col items-start justify-center absolute bottom-0 left-0 right-0 bg-charcoal/70 text-white p-8 rounded-sm"
      >
        <h3 className="text-xl uppercase text-white py-4 text-left">{teacher.name}</h3>
        <p className="max-h-[75%] overflow-y-hidden text-sm">{teacher.description}</p>
      </motion.div>
    </motion.div>
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