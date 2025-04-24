// src/types.ts
export interface RichTextChild {
	text: string
	bold?: boolean
	type: 'text'
}

export interface RichTextNode {
	type: 'paragraph'
	children: RichTextChild[]
}

export type RichTextContent = RichTextNode[]
