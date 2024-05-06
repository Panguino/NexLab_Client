import Link from 'next/link'
import styles from './SidebarSectionLink.module.scss'

export const SidebarSectionLink = ({ name, linkUrl }) => {
	return (
		<div className={styles.SidebarSectionLink}>
			<Link href={linkUrl}>
				{name}
				<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M0.963555 11.6863C0.612083 11.3349 0.612083 10.765 0.963555 10.4136L5.12716 6.24995L0.963555 2.08635C0.612083 1.73488 0.612083 1.16503 0.963555 0.813555C1.31503 0.462084 1.88487 0.462084 2.23635 0.813555L7.03635 5.61356C7.38782 5.96503 7.38782 6.53488 7.03635 6.88635L2.23635 11.6863C1.88488 12.0378 1.31503 12.0378 0.963555 11.6863Z"
					/>
				</svg>
			</Link>
		</div>
	)
}
