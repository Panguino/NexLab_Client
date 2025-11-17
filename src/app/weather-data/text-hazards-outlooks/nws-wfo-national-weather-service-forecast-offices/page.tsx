'use client'

import { WFOAnimator } from '@/components/elements/WFOAnimator/WFOAnimator'
import styles from './page.module.scss'

const Page = () => {
	return (
		<div className={styles.wfoPage}>
			<WFOAnimator view="overview" />
		</div>
	)
}

export default Page
