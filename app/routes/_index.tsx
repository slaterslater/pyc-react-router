import { BuyNowButton } from "~/components/MindbodyButton";
import { MindBodySchedule } from "~/components/MindBodySchedule";

export function meta() {
  return [
    { title: "dev PYC" },
    { name: "description", content: "development" },
  ];
}

export default function Home() {
  return (
    <section className="flex flex-col items-start justify-center bg-[#6F7C71] color-[#FAF9F7] px-5 sm:px-7 md:px-10">
      <h1 className="sr-only">pyc development</h1>
      <div className="w-full min-w-xs max-w-[980px] mx-auto pb-10">
        <h2 className="text-lg font-bold mt-7 mb-3">example buttons</h2>
        <div className="flex gap-2">
          <BuyNowButton
            text="Biweekly Membership $69"
            serviceId="320"
            // linkClass="healcode-contract-text-link"
            // type="contract-link"
            type="contract"
          />
          <BuyNowButton
            text="10 class pass"
            serviceId="1013"
            // linkClass="healcode-pricing-option-text-link"
            // type="pricing-link"
            type="pricing"
          />
        </div>
        <h2 className="text-lg font-bold mt-7 mb-3">mindbody widget</h2>
        <p>schedule widget has 3 options for colours</p>
        <ul className="list-disc list-inside">
          <li>primary: black/charcoal: #2B2B2B (book button)</li>
          <li>secondary: red/terracotta #733520 (account button and selected day)</li>
          <li>background: cream/white shade #FAF9F7</li>
        </ul>
        <p>doesn't seem like you can change the font of the widget...</p>
        <p>i haven't modifed the cart style because it would affect the current live site</p>
        <MindBodySchedule />
      </div >
    </section>
  );
}
