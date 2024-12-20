import Link from 'next/link'
import styles from './SidebarLink.module.scss'

interface ISidebarLinkProps {
	name: string
	linkUrl?: string
	target?: string
	onClick?: () => void
	active?: boolean
	limited?: boolean
}

export const SidebarLink = ({ name, linkUrl, target = '_self', onClick, active, limited }: ISidebarLinkProps) => {
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
		</div>
	)
}
