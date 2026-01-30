import { useMindBodyLink } from "~/hooks/useMindbody"

export function BuyNowButton({ text, serviceId, linkClass, type }: MindbodyButtonProps) {
  useMindBodyLink()

  return (
    <healcode-widget
      data-version="0.2"
      data-link-class={linkClass}
      data-site-id="579"
      data-mb-site-id="7861"
      data-service-id={serviceId}
      data-bw-identity-site="false"
      data-type={`${type}-link`}
      data-inner-html={text}
      className="bg-[#2B2B2B] text-[#FAF9F7] px-4 py-2 rounded-md text-sm"
    >
      {text}
    </healcode-widget>
  )
}

type MindbodyButtonProps = {
  text: string
  serviceId: string
  linkClass?: string
  type: string
}
