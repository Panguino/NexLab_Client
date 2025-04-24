'use client'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import styles from './MobileMenuItem.module.scss'

const MobileMenuItem = ({ title, url, target = '_self', onArrowClick = null, leftArrow = false }) => {
	return (
		<div className={styles.MobileMenuItem}>
			{onArrowClick && leftArrow && (
				<div className={`${styles.arrow} ${styles.leftArrow}`} onClick={onArrowClick}>
					<FontAwesomeIcon icon={faChevronDown} />
				</div>
			)}
			{url ? (
				<Link className={styles.label} href={url} target={target}>
					{title}
				</Link>
			) : (
				<div className={styles.label} onClick={onArrowClick}>
					{title}
				</div>
			)}
			{onArrowClick && !leftArrow && (
				<div className={styles.arrow} onClick={onArrowClick}>
					<FontAwesomeIcon icon={faChevronDown} />
				</div>
			)}
		</div>
	)
}

export default MobileMenuItem
