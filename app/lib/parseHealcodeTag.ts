export function parseHealcodeTag(html: string) {
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

export function escapeAttr(v: string) {
  return v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}