import { useMemo, useRef } from 'react'
import { useScript, useIsomorphicLayoutEffect } from 'usehooks-ts'

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

export function MindbodyLink({ html = '', className, children, onClick }: {
  html: string; className?: string; children: string; onClick?: () => void
}) {
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
    const finalAttrs = { ...attrs, 'data-inner-html': children }
    const attrString = Object.entries(finalAttrs)
      .map(([k, v]) => `${k}="${escapeAttr(v)}"`).join(' ')
    container.innerHTML = `<healcode-widget ${attrString}></healcode-widget>`
    return () => { container.innerHTML = '' }
  }, [status, attrs, children])

  if (!attrs) return null

  return (
    <span
      className={`relative inline-flex rounded-lg focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 ${className ?? ''}`}
      onClickCapture={onClick}
    >
      <span aria-hidden="true">{children}</span>
      <span
        ref={containerRef}
        className="absolute inset-0 [&_a]:absolute [&_a]:inset-0 [&_a]:h-full [&_a]:w-full [&_a]:opacity-0"
      />
    </span>
  )
}