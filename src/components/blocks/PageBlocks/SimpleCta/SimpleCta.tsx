import { ButtonType } from '@/components/elements/Button/Button'
import Link from 'next/link'
import styles from './SimpleCta.module.scss'

interface ISimpleCtaProps {
	introText?: string
	button?: ButtonType
}

export const SimpleCta = ({ introText, button }: ISimpleCtaProps) => {
	return (
		<section className={styles.simpleCta}>
			<div className={styles.container}>
				{introText && <div className={styles.intro} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: introText || '' }} />}
				{button && (
					<div className={styles.action}>
						<Link href={button.link} target={button.target}>
							<div className={styles.button}>{button.label}</div>
						</Link>
					</div>
				)}
			</div>
		</section>
	)
}
