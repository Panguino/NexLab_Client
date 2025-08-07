import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import styles from './SidebarLink.module.scss'

interface ISidebarLinkProps {
	name: string
	linkUrl?: string
	target?: string
	onClick?: () => void
	active?: boolean
	limited?: boolean
	onInfoClick?: () => void
}

export const SidebarLink = ({ name, linkUrl, target = '_self', onClick, active, limited, onInfoClick }: ISidebarLinkProps) => {
	return (
		<div className={`${styles.SidebarLink} ${active ? styles.active : ''} ${limited ? styles.limited : ''}`}>
			{linkUrl ? (
				<Link href={linkUrl} target={target}>
					{name}
				</Link>
			) : (
				<span onClick={onClick} style={{ cursor: 'pointer' }}>
					{name}
				</span>
			)}
			{onInfoClick && (
				<button
					type="button"
					className={styles.infoIconBtn}
					onClick={(e) => {
						e.stopPropagation()
						onInfoClick && onInfoClick()
					}}
					aria-label="More info"
				>
					<FontAwesomeIcon icon={faCircleInfo} />
				</button>
			)}
		</div>
	)
}
