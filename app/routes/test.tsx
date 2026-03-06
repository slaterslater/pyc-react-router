import { BuyNowButton } from "~/components/MindbodyButton";
import { MindBodySchedule } from "~/components/MindBodySchedule";

export function meta() {
  return [
    { title: "dev PYC" },
    { name: "description", content: "development" },
  ];
}

export default function TestRoute() {
  return (
    <section className="flex flex-col items-start justify-center bg-[#6F7C71] color-[#FAF9F7] px-5 sm:px-7 md:px-10">
      <h1 className="">pyc development test route</h1>
      <div className="w-full min-w-xs max-w-[980px] mx-auto pb-10">
        <h2 className="text-lg font-bold mt-7 mb-3">example buttons</h2>
        <div className="flex gap-2">
          {/* <BuyNowButton
            text="Biweekly Membership $69"
            serviceId="320"
            // linkClass="healcode-contract-text-link"
            // type="contract-link"
            type="contract"
          /> */}
          <BuyNowButton
            text="gift card"
            serviceId="444"
            // linkClass="healcode-pricing-option-text-link"
            // type="pricing-link"
            type="gift-card"
          />

          {/* <script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script><healcode-widget data-version="0.2" data-link-class="healcode-gift-card-text-link" data-site-id="133467" data-mb-site-id="-2147479207" data-service-id="444" data-bw-identity-site="false" data-type="gift-card-link" data-inner-html="Buy Now" /> */}
        </div>
        {/* <h2 className="text-lg font-bold mt-7 mb-3">mindbody widget</h2>
        <p>schedule widget has 3 options for colours</p>
        <ul className="list-disc list-inside">
          <li>primary: black/charcoal: #2B2B2B (book button)</li>
          <li>secondary: red/terracotta #733520 (account button and selected day)</li>
          <li>background: cream/white shade #FAF9F7</li>
        </ul>
        <p>doesn't seem like you can change the font of the widget...</p>
        <p>i haven't modifed the cart style because it would affect the current live site</p> */}
        {/* <MindBodySchedule /> */}
      </div >
    </section>
  );
}
