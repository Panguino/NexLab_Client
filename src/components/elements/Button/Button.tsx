'use client'
import Link from 'next/link'
import styles from './Button.module.scss'

export type ButtonType = {
	label: string
	link?: string | null
	target?: string | null
	style?: string | null
	disabled?: boolean | null
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
export const Button = ({ label, link, target, style, disabled, onClick }: ButtonType) => {
	if (!link && !target && !onClick) {
		throw new Error("If 'link' and 'target' are not defined, 'onClick' must be defined, or visa versa.")
	}

	const buttonContent = (
		<div className={`${styles.button} ${style ? style : ''} ${disabled ? styles.disabled : ''}`} onClick={!disabled ? onClick : undefined}>
			{label}
		</div>
	)
	return (
		<div className={styles.buttonWrapper}>
			{link && target ? (
				<Link href={link} target={target}>
					{buttonContent}
				</Link>
			) : (
				buttonContent
			)}
		</div>
	)
}
