'use client'
import Link from 'next/link'
import styles from './Button.module.scss'

export type ButtonType = {
	label?: string | null
	link?: string | null
	target?: string | null
	variantClassName?: string | null
	disabled?: boolean | null
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
export const Button = ({ label, link, target, variantClassName, disabled, onClick }: ButtonType) => {
	if (!link && !target && !onClick) {
		throw new Error("If 'link' and 'target' are not defined, 'onClick' must be defined, or visa versa.")
	}

	const buttonContent = (
		<div
			className={`${styles.button} ${variantClassName ? variantClassName : ''} ${disabled ? styles.disabled : ''}`}
			onClick={!disabled ? onClick : undefined}
		>
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
