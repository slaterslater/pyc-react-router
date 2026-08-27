import type {
  DefaultNodeTypes,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import { LinkJSXConverter, RichText as RichTextConverter, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type Props = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { relationTo, value } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug

  console.log(relationTo, slug);

  switch (relationTo) {
    case 'studio':
      return `/studios/${slug}`
    case 'pages':
      return `/${slug}`
    default:
      return `/${relationTo}/${slug}`
  }
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
})

export function RichText(props: Props) {
  const { className, ...rest } = props

  return (
    <RichTextConverter
      {...rest}
      className={className}
      converters={jsxConverters}
    />
  )
}