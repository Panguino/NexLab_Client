'use client'

import styles from './PageContentWrapper.module.scss'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'

const PageContentWrapper = ({ children }) => {
	return (
		<div>
			<ScrollArea>
				<div className={styles.PageContentWrapper}>{children}</div>
			</ScrollArea>
		</div>
	)
}

export default PageContentWrapper
