import type { Studio } from "~/routes/studios._index";

export default function Contact({ studio }: { studio: Studio }) {
  return (
    <div className="flex flex-col gap-2 w-fit">
      <address className="not-italic uppercase text-sm">
        <div>{studio.address1} {studio.address2 && `- ${studio.address2}`}</div>
        <div>
          {[studio.city, studio.province || studio.state]
            .filter(Boolean)
            .join(", ")}
        </div>
        <div>{studio.postalCode || studio.zip}</div>
      </address>
      {(studio.phone || studio.email) && (
        <div className="flex flex-col text-sm">
          {studio.phone && (
            <a href={`tel:${studio.phone.replace(/[^+\d]/g, "")}`} className="underline">
              {studio.phone}
            </a>
          )}
          <a href={`mailto:${studio.email}`} className="underline">{studio.email}</a>
        </div>
      )}
    </div>
  )
}