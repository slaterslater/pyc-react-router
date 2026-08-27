import { useSite } from "~/hooks/useSite"

export default function SEO({ title }: { title: string }) {
  const { siteName } = useSite()
  return (
    <>
      <title>{`${title} | Power Yoga ${siteName}`}</title>
    </>
  )
}