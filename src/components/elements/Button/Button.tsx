'use client'
import Link from 'next/link'
import styles from './Button.module.scss'

export type ButtonType = {
	label?: string | null
	link?: string | null
	target?: string | null
	variantClassName?: string | null
	disabled?: boolean | null
	className?: string | null
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
export const Button = ({ label, link, target, variantClassName, disabled, className, onClick }: ButtonType) => {
	const isClickable = Boolean(link) || Boolean(onClick)
	const buttonContent = (
		<div
			className={`${styles.button} ${variantClassName ? variantClassName : ''} ${disabled || !isClickable ? styles.disabled : ''} ${className ? className : ''}`}
			onClick={!disabled ? onClick : undefined}
		>
			{label}
		</div>
	)
	return (
		<div className={styles.buttonWrapper}>
			{link ? (
				<Link href={link} target={target || undefined}>
					{buttonContent}
				</Link>
			) : (
				buttonContent
			)}
		</div>
	)
}
