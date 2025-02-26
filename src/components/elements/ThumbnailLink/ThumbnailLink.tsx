import { useRouter } from 'next/router'
import styles from './ThumbnailLink.module.scss'

interface IThumbnailLinkProps {
	name: string
	imgUrl?: string
	linkUrl?: string
	target?: string
}

export const ThumbnailLink = ({
	name,
	imgUrl = 'https://climate.cod.edu/storybook/logo/missing.png',
	linkUrl,
	target = '_self',
}: IThumbnailLinkProps) => {
	const router = useRouter()

	const handleClick = () => {
		if (linkUrl) {
			if (target === '_blank') {
				window.open(linkUrl, '_blank')
			} else {
				router.push(linkUrl)
			}
		}
	}
	return (
		<div className={styles.ThumbnailLinkContainer} onClick={handleClick}>
			<div className={styles.ThumbnailImageContainer}>
				<img className={styles.ThumbnailImage} src={imgUrl} alt={name} />
			</div>
			<span className={styles.linkName}>{name}</span>
		</div>
	)
}
