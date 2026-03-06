import { useMindBodyLink } from "~/hooks/useMindBody"

export function BuyNowButton({ text, serviceId, linkClass, type }: MindbodyButtonProps) {
  useMindBodyLink()

  return (
    <healcode-widget
      data-version="0.2"
      data-link-class={linkClass}
      data-site-id="133467"
      data-mb-site-id="-2147479207"
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

{/* <script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script><healcode-widget data-version="0.2" data-link-class="healcode-gift-card-text-link" data-site-id="133467" data-mb-site-id="-2147479207" data-service-id="444" data-bw-identity-site="false" data-type="gift-card-link" data-inner-html="Buy Now" /> */ }


type MindbodyButtonProps = {
  text: string
  serviceId: string
  linkClass?: string
  type: string
}
