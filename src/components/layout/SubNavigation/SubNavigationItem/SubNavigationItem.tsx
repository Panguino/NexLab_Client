import Link from 'next/link'
import styles from './SubNavigationItem.module.scss'

interface SubNavigationItemProps {
	name: string
	link: string
}

const SubNavigationItem = ({ name, link }: SubNavigationItemProps) => {
	return (
		<Link href={link}>
			<div className={styles.NavItem}>{name}</div>
		</Link>
	)
}

export default SubNavigationItem
