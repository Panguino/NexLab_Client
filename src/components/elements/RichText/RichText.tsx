import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { RootNode } from '@strapi/blocks-react-renderer/dist/BlocksRenderer'
import styles from './RichText.module.scss'

interface IRichText {
	text: RootNode[]
}

export const RichText = ({ text }: IRichText) => {
	return (
		<div className={styles.RichText}>
			<div className={styles.text}>
				<BlocksRenderer content={text} />
			</div>
		</div>
	)
}
