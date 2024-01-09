import Link from 'next/link'
import styles from './SubNavigationItem.module.scss'

const SubNavigationItem = ({ name, link }) => {
	return (
		<Link href={link}>
			<div className={styles.NavItem}>{name}</div>
		</Link>
	)
}

export default SubNavigationItem
