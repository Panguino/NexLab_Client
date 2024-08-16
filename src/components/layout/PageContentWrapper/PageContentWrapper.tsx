'use client'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import styles from './PageContentWrapper.module.scss'

interface PageContentWrapperProps {
	children: React.ReactNode
}

const PageContentWrapper = ({ children }: PageContentWrapperProps) => {
	return (
		<div>
			<ScrollArea>
				<div className={styles.PageContentWrapper}>{children}</div>
			</ScrollArea>
		</div>
	)
}

export default PageContentWrapper
