'use client'

import styles from './GoogleFormEmbed.module.scss'

export const GoogleFormEmbed = () => {
	return (
		<section className={styles.formContainer}>
			<div className={styles.embedWrapper}>
				{/* PLACEHOLDER: Insert Google Form embed code here */}
				<div className={styles.placeholder}>
					<p>Google Form embed code will be inserted here</p>
					<p className={styles.instruction}>Replace this placeholder with the iframe embed code from your Google Form</p>
				</div>
			</div>
		</section>
	)
}
