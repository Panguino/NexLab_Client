import Link from 'next/link'
import styles from './SidebarLink.module.scss'

export const SidebarLink = ({ name, linkUrl, target = '_self' }) => {
	return (
		<div className={styles.SidebarLink}>
			<Link href={linkUrl} target={target}>
				{name}
			</Link>
		</div>
	)
}
