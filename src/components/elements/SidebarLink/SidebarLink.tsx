'use client'

import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
	const pathname = usePathname()
	const normalize = (p?: string) => (p ? p.replace(/\/+$/, '') || '/' : '')
	const isActive = Boolean(active ?? (linkUrl && normalize(pathname) === normalize(linkUrl)))
	const spanStyle = !isActive && onClick ? ({ cursor: 'pointer' } as const) : undefined

	return (
		<div className={`${styles.SidebarLink} ${isActive ? styles.active : ''} ${limited ? styles.limited : ''}`}>
			{linkUrl && !isActive ? (
				<Link href={linkUrl} target={target}>
					{name}
				</Link>
			) : (
				<span aria-current={isActive ? 'page' : undefined} onClick={!isActive ? onClick : undefined} style={spanStyle}>
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
