import Link from 'next/link'
import styles from './Button.module.scss'

export const Button = ({ Label, bURL, Style }) => {
	return (
		<Link href={bURL} className={styles[Style]}>
			{Label}
		</Link>
	)
}
