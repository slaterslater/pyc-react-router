import { useEffect, useMemo, useRef } from 'react'
import { useScript, useIsomorphicLayoutEffect } from 'usehooks-ts'
import { HEALCODE_SRC } from '~/lib/mindBodyScriptSrc';
import { escapeAttr, parseHealcodeTag } from '~/lib/parseHealcodeTag';

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