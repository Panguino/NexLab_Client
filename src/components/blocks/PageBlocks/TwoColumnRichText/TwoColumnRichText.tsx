import { Button, ButtonType } from '@/components/elements/Button/Button'
import { RichText } from '@/components/elements/RichText/RichText'
import { RootNode } from '@strapi/blocks-react-renderer/dist/BlocksRenderer'
import styles from './TwoColumnRichText.module.scss'

interface TwoColumnRichTextProps {
	leftButtons: ButtonType[]
	leftText: RootNode[]
	rightText: RootNode[]
	rightButtons: ButtonType[]
}

export const TwoColumnRichText = ({ leftButtons, leftText, rightText, rightButtons }: TwoColumnRichTextProps) => {
	return (
		<section className={styles.twoColRichText}>
			<div className={styles.container}>
				<div className={styles.col}>
					{leftText && <RichText text={leftText} />}
					{leftButtons && leftButtons.length > 0 && (
						<div className={styles.buttons}>
							{leftButtons.map((b, i) => (
								<Button key={i} {...b} />
							))}
						</div>
					)}
				</div>
				<div className={styles.col}>
					<div className={styles.panel}>
						{rightText && <RichText text={rightText} />}
						{rightButtons && rightButtons.length > 0 && (
							<div className={styles.buttons}>
								{rightButtons.map((b, i) => (
									<Button key={i} {...b} />
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default TwoColumnRichText
