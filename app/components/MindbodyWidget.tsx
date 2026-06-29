import { useEffect } from "react"
import { useScript } from "usehooks-ts";

export function MindBodyWidget({ html = '' }: { html: string }) {

  const match = html?.match(/data-widget-type="([^"]*)".*?data-widget-id="([^"]*)"/);
  const [, widgetType, widgetId] = match ?? [];

  useEffect(() => {
    // Clear MB's "already ran" flag so it rescans the DOM
    delete (window as any)['bw-widget-unique-identifier']
  }, [widgetId])

  // can't load globally because it will not reload widgets on route change
  useScript(`https://brandedweb.mindbodyonline.com/embed/widget.js`, {
    removeOnUnmount: true,
    id: `mb-widget`,
  })

  if (!widgetType || !widgetId) return null

  return (
    <div
      className="mindbody-widget w-full outline-none px-2 -mt-4 min-h-[200px]"
      data-widget-type={widgetType}
      data-widget-id={widgetId}
    />
  )
}
