import Link from 'next/link'
import styles from './SidebarLink.module.scss'

interface ISidebarLinkProps {
	name: string
	linkUrl?: string
	target?: string
	onClick?: () => void
	active?: boolean
}

export const SidebarLink = ({ name, linkUrl, target = '_self', onClick, active }: ISidebarLinkProps) => {
	return (
		<div className={`${styles.SidebarLink} ${active ? styles.active : ''}`}>
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
