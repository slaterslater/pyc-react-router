import { useEffect, useMemo, useRef } from "react"
import { useIsomorphicLayoutEffect, useScript } from "usehooks-ts";
import { HEALCODE_SRC, MB_WIDGET_SRC } from "~/lib/mindBodyScriptSrc";
import { escapeAttr, parseHealcodeTag } from "~/lib/parseHealcodeTag";

export function MindBodyWidget({ html = '' }: { html: string }) {
  if (html.startsWith('<healcode-widget')) return <MindBodyWidgetHealcode html={html} />
  return <MindBodyWidgetDiv html={html} />
}

function MindBodyWidgetDiv({ html = '' }: { html: string }) {
  const match = html?.match(/data-widget-type="([^"]*)".*?data-widget-id="([^"]*)"/);
  const [, widgetType, widgetId] = match ?? [];

  useEffect(() => {
    // Clear MB's "already ran" flag so it rescans the DOM
    delete (window as any)['bw-widget-unique-identifier']
  }, [widgetId])

  // can't load globally because it will not reload widgets on route change
  useScript(MB_WIDGET_SRC, {
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

function MindBodyWidgetHealcode({ html = '' }: { html: string }) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const attrs = useMemo(() => parseHealcodeTag(html), [html])

  // Fires 'ready' on the script's load event — independent of how healcode
  // registers its element (it's x-tag, NOT customElements v1, so whenDefined
  // never resolves). useScript also stamps data-status, so warm nav reads
  // 'ready' synchronously and injects instantly.
  const status = useScript(HEALCODE_SRC, { id: 'healcode-js' })

  useIsomorphicLayoutEffect(() => {
    if (status !== 'ready') return
    const container = containerRef.current
    if (!container || !attrs) return
    const finalAttrs = { ...attrs }
    const attrString = Object.entries(finalAttrs)
      .map(([k, v]) => `${k}="${escapeAttr(v)}"`).join(' ')
    container.innerHTML = `<healcode-widget ${attrString}></healcode-widget>`
    return () => { container.innerHTML = '' }
  }, [status, attrs])

  return <span ref={containerRef} />
}




