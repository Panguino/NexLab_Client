'use client'

import styles from './GoogleFormEmbed.module.scss'

export const GoogleFormEmbed = () => {
	return (
		<section className={styles.formContainer}>
			<div className={styles.embedWrapper}>
				<iframe
					src="https://docs.google.com/forms/d/e/1FAIpQLSeE2AE8OXMqkQYCJUf_NCOP6f6oRWrOnJvv2oAIBOYArOUA1g/viewform?embedded=true"
					width="600"
					height="900"
				>
					Loading…
				</iframe>
			</div>
		</section>
	)
}
