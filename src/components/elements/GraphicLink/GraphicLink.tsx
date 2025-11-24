import Link from 'next/link'
import styles from './GraphicLink.module.scss'

interface GraphicLinkProps {
	imageUrl: string
	label: string
	linkUrl: string
	target?: '_self' | '_blank'
}

export const GraphicLink = ({ imageUrl, label, linkUrl, target = '_self' }: GraphicLinkProps) => {
	return (
		<Link href={linkUrl} target={target} className={styles.graphicLink}>
			<div className={styles.imageContainer}>
				<img src={imageUrl} alt={`${label} Outlook`} className={styles.image} />
			</div>
			<div className={styles.banner}>
				<span>{label}</span>
			</div>
		</Link>
	)
}
