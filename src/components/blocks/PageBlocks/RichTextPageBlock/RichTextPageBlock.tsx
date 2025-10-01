import { RichText } from '@/components/elements/RichText/RichText'
import { RootNode } from '@strapi/blocks-react-renderer/dist/BlocksRenderer'
import styles from './RichTextPageBlock.module.scss'

interface IRichTextPageBlock {
	body: RootNode[]
}
export const RichTextPageBlock = ({ body }: IRichTextPageBlock) => {
	return (
		<>
			{body && (
				<div className={styles.wrapper}>
					<RichText text={body} />
				</div>
			)}
		</>
	)
}
