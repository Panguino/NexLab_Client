import Link from 'next/link'
import styles from './SidebarLink.module.scss'

export const SidebarLink = ({ name, linkUrl }) => {
	return (
		<div className={styles.SidebarLink}>
			<Link href={linkUrl}>{name}</Link>
		</div>
	)
}
