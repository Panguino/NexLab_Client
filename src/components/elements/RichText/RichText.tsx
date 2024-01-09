import { BlocksRenderer } from '@strapi/blocks-react-renderer'

import styles from './RichText.module.scss'

export const RichText = ({ text }) => {
	return (
		<div className={styles.RichText}>
			<div className={styles.text}>
				<BlocksRenderer content={text} />
			</div>
		</div>
	)
}
