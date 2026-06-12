import { useMindBodyWidget } from "~/hooks/useMindBody"

export function MindBodyWidget({ html = '' }: { html: string }) {
  useMindBodyWidget()

  const match = html?.match(/data-widget-type="([^"]*)".*?data-widget-id="([^"]*)"/);
  const [, widgetType, widgetId] = match ?? [];

  if (!widgetType || !widgetId) return null

  return (
    <div
      className="mindbody-widget w-full outline-none px-2 -mt-4"
      data-widget-type={widgetType}
      data-widget-id={widgetId}
    />
  )
}