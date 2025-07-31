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
	if (!link && !onClick) {
		throw new Error("Either 'link' or 'onClick' must be defined.")
	}

	const buttonContent = (
		<div
			className={`${styles.button} ${variantClassName ? variantClassName : ''} ${disabled ? styles.disabled : ''} ${className ? className : ''}`}
			onClick={!disabled ? onClick : undefined}
		>
			{label}
		</div>
	)
	return (
		<div className={styles.buttonWrapper}>
			{link ? (
				<Link href={link} target={target}>
					{buttonContent}
				</Link>
			) : (
				buttonContent
			)}
		</div>
	)
}
