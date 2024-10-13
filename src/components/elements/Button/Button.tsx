'use client'
import Link from 'next/link'
import styles from './Button.module.scss'

export type ButtonType = {
	label: string
	link: string
	target: string
	style?: string | null
}
export const Button = ({ label, link, target, style }: ButtonType) => {
	return (
		<div className={styles.buttonWrapper}>
			<Link href={link} target={target}>
				<div className={`${styles.button} ${style ? style : ''}`}>{label}</div>
			</Link>
		</div>
	)
}
