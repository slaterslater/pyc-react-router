import { useScript } from "usehooks-ts";

export function meta() {
  return [
    { title: "dev PYC" },
    { name: "description", content: "development" },
  ];
}

export default function Home() {
  const status = useScript(`https://brandedweb.mindbodyonline.com/embed/widget.js`, {
    removeOnUnmount: true,
    id: 'brandedweb',
  })

  return (
    <section className="flex flex-col items-start justify-center bg-[#6F7C71] p-10">
      <h1 className="text-lg font-bold">mindbody widget test</h1>
      <p>schedule widget has 3 options for colours</p>
      <ul className="list-disc list-inside">
        <li>primary: black/charcoal: #2B2B2B (book button)</li>
        <li>secondary: red/terracotta #733520 (account button and selected day)</li>
        <li>background: cream/white shade #FAF9F7</li>
      </ul>
      <p>doesn't seem like you can change the font of the widget...</p>
      <p>i haven't modifed the cart style because it would affect the current live site</p>
      {/* <!-- Mindbody Schedules widget begin --> */}
      <div className="mindbody-widget w-full outline-none mt-5" data-widget-type="Schedules" data-widget-id="254432542c3"></div>
      {/* <!-- Mindbody Schedules widget end --> */}
    </section>
  );
}
