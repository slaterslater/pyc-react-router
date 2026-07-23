import { useEffect, useMemo, useRef } from 'react'
import { useScript } from 'usehooks-ts'

const HEALCODE_SRC = 'https://widgets.mindbodyonline.com/javascripts/healcode.js'

function parseHealcodeTag(html: string) {
  const tag = html?.match(
    /<healcode-widget([^>]*?)\/?>(?:[\s\S]*?<\/healcode-widget>)?/i
  )
  if (!tag) return null

  const attrs: Record<string, string> = {}
  const attrRe = /([a-zA-Z0-9_-]+)\s*=\s*"([^"]*)"/g
  let m: RegExpExecArray | null
  while ((m = attrRe.exec(tag[1]))) attrs[m[1]] = m[2]

  return attrs
}

function escapeAttr(v: string) {
  return v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

export function MindbodyLink({
  html = '',
  className,
  children,
  onClick,
}: {
  html: string
  className?: string
  children: string
  onClick?: () => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const attrs = useMemo(() => parseHealcodeTag(html), [html])

  useScript(HEALCODE_SRC, { id: 'healcode-js' })

  // Inject the widget via innerHTML so the parser creates it with
  // attributes already set — healcode's createdCallback reads
  // data-type at creation time and crashes if attrs aren't there yet
  // (which is what happens when React createElement's an
  // already-registered custom element).
  useEffect(() => {
    const container = containerRef.current
    if (!container || !attrs) return

    const finalAttrs = {
      ...attrs,
      'data-inner-html': children,
      // 'data-link-class': className ?? attrs['data-link-class'] ?? '',
    }

    const attrString = Object.entries(finalAttrs)
      .map(([k, v]) => `${k}="${escapeAttr(v)}"`)
      .join(' ')

    container.innerHTML = `<healcode-widget ${attrString}></healcode-widget>`

    return () => {
      container.innerHTML = ''
    }
  }, [attrs, children, className])

  // History-arming trick from before: give healcode's
  // location.replace a sacrificial duplicate entry to consume.
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const armHistory = () => {
      window.history.pushState(window.history.state, '', window.location.href)
    }

    container.addEventListener('pointerdown', armHistory)
    return () => container.removeEventListener('pointerdown', armHistory)
  }, [attrs])

  if (!attrs) return null

  return <div ref={containerRef} className={className} onClick={onClick} />
}