import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { RootNode } from '@strapi/blocks-react-renderer/dist/BlocksRenderer'
import styles from './RichText.module.scss'

interface IRichText {
	// Some Strapi fields can come back as string or null; normalize to RootNode[] for the renderer
	text: RootNode[] | string | null | undefined
}

export const RichText = ({ text }: IRichText) => {
	// If we received an HTML string, render it as-is to preserve headings, lists, etc.
	if (typeof text === 'string' && /<[^>]+>/.test(text)) {
		return (
			<div className={styles.RichText}>
				<div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
			</div>
		)
	}

	// Otherwise, normalize to Strapi Blocks format
	const content: RootNode[] = Array.isArray(text)
		? (text as RootNode[])
		: typeof text === 'string' && text.trim().length > 0
			? ([
					{
						type: 'paragraph',
						children: [{ type: 'text', text }],
					},
				] as unknown as RootNode[])
			: ([] as RootNode[])

	return (
		<div className={styles.RichText}>
			<div className={styles.text}>
				<BlocksRenderer content={content} />
			</div>
		</div>
	)
}
